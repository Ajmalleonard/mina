import { isIP } from "node:net";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CLOUDFLARE_API_BASE_URL = "https://api.cloudflare.com/client/v4";
const DNS_RECORD_TTL_AUTO = 1;
const APP_SUBDOMAIN = "minafoundation";

type CreateDnsRecordsRequest = {
  ipv4?: unknown;
  ipv6?: unknown;
};

type CloudflareApiMessage = {
  code: number;
  message: string;
  documentation_url?: string;
  source?: {
    pointer?: string;
  };
};

type CloudflareApiEnvelope<T> = {
  success: boolean;
  errors: CloudflareApiMessage[];
  messages: CloudflareApiMessage[];
  result: T;
};

type CloudflareDnsRecord = {
  id: string;
  type: string;
  name: string;
  content: string;
  ttl: number;
  proxied: boolean;
  zone_id: string;
  zone_name: string;
  proxiable: boolean;
  created_on: string;
  modified_on: string;
};

type DesiredDnsRecord = {
  type: "A" | "AAAA";
  content: string;
};

type CloudflareResult<T> =
  | {
      ok: true;
      status: number;
      data: CloudflareApiEnvelope<T>;
    }
  | {
      ok: false;
      status: number;
      response: NextResponse;
    };

/**
 * Builds a consistent JSON error response for this route.
 */
function jsonError(
  message: string,
  status: number,
  details?: Record<string, unknown>
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(details ?? {}),
    },
    { status }
  );
}

/**
 * Uses Node's built-in IP parser so IPv4 and IPv6 validation stay reliable.
 */
function isValidIpv4(ip: string) {
  return isIP(ip) === 4;
}

/**
 * Uses Node's built-in IP parser so IPv4 and IPv6 validation stay reliable.
 */
function isValidIpv6(ip: string) {
  return isIP(ip) === 6;
}

/**
 * Reads and validates required Cloudflare environment variables.
 */
function getCloudflareConfig() {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;

  if (!apiToken || !zoneId) {
    return {
      error: jsonError(
        "Cloudflare environment variables are not configured.",
        500
      ),
      ok: false as const,
    };
  }

  return {
    ok: true as const,
    apiToken,
    zoneId,
  };
}

/**
 * Calls the Cloudflare API with native fetch and returns either typed data
 * or a ready-to-return NextResponse when Cloudflare rejects the request.
 */
async function callCloudflare<T>(
  path: string,
  init: RequestInit,
  apiToken: string
): Promise<CloudflareResult<T>> {
  let response: Response;

  try {
    response = await fetch(`${CLOUDFLARE_API_BASE_URL}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch (error) {
    console.error("[Cloudflare DNS] Network error while calling Cloudflare", {
      error,
      path,
    });

    return {
      ok: false,
      status: 502,
      response: jsonError(
        "Failed to reach Cloudflare while creating DNS records.",
        502
      ),
    };
  }

  let payload: CloudflareApiEnvelope<T> | null = null;

  try {
    payload = (await response.json()) as CloudflareApiEnvelope<T>;
  } catch (error) {
    console.error("[Cloudflare DNS] Failed to parse Cloudflare response", {
      error,
      path,
      status: response.status,
    });

    return {
      ok: false,
      status: response.status || 502,
      response: jsonError(
        "Cloudflare returned a non-JSON response.",
        response.status || 502
      ),
    };
  }

  if (!response.ok || !payload.success) {
    console.error("[Cloudflare DNS] Cloudflare API request failed", {
      path,
      status: response.status,
      errors: payload.errors,
      messages: payload.messages,
    });

    return {
      ok: false,
      status: response.status || 502,
      response: NextResponse.json(
        {
          success: false,
          error: "Cloudflare API request failed.",
          cloudflare: {
            errors: payload.errors,
            messages: payload.messages,
          },
        },
        { status: response.status || 502 }
      ),
    };
  }

  return {
    ok: true,
    status: response.status,
    data: payload,
  };
}

/**
 * Lists DNS records for the app subdomain so we can skip exact duplicates
 * and stop before creating conflicting records.
 */
async function findExistingRecords(
  zoneId: string,
  subdomain: string,
  apiToken: string
) {
  const searchParams = new URLSearchParams({
    match: "all",
  });

  searchParams.set("name.exact", subdomain);

  return callCloudflare<CloudflareDnsRecord[]>(
    `/zones/${zoneId}/dns_records?${searchParams.toString()}`,
    {
      method: "GET",
    },
    apiToken
  );
}

/**
 * Creates a single DNS record in Cloudflare.
 */
async function createDnsRecord(
  zoneId: string,
  record: DesiredDnsRecord,
  apiToken: string
) {
  return callCloudflare<CloudflareDnsRecord>(
    `/zones/${zoneId}/dns_records`,
    {
      method: "POST",
      body: JSON.stringify({
        type: record.type,
        name: APP_SUBDOMAIN,
        content: record.content,
        ttl: DNS_RECORD_TTL_AUTO,
        proxied: true,
      }),
    },
    apiToken
  );
}

/**
 * POST /api/cloudflare/dns
 *
 * Creates both A and AAAA records for the current app subdomain:
 * - minafoundation
 */
export async function POST(request: Request) {
  const config = getCloudflareConfig();

  if (!config.ok) {
    return config.error;
  }

  let body: CreateDnsRecordsRequest;

  try {
    body = (await request.json()) as CreateDnsRecordsRequest;
  } catch {
    return jsonError("Request body must be valid JSON.", 400);
  }

  const ipv4 = String(body.ipv4 ?? "").trim();
  const ipv6 = String(body.ipv6 ?? "").trim();

  // Both records are required because this route now provisions IPv4 and IPv6 together.
  if (!ipv4 || !ipv6) {
    return jsonError("Both ipv4 and ipv6 are required.", 400);
  }

  // Validate the IPv4 address for the A record.
  if (!isValidIpv4(ipv4)) {
    return jsonError("ipv4 must be a valid IPv4 address.", 400);
  }

  // Validate the IPv6 address for the AAAA record.
  if (!isValidIpv6(ipv6)) {
    return jsonError("ipv6 must be a valid IPv6 address.", 400);
  }

  const desiredRecords: DesiredDnsRecord[] = [
    {
      type: "A",
      content: ipv4,
    },
    {
      type: "AAAA",
      content: ipv6,
    },
  ];

  console.info("[Cloudflare DNS] Create records request received", {
    subdomain: APP_SUBDOMAIN,
    ipv4,
    ipv6,
  });

  const existingRecordsResult = await findExistingRecords(
    config.zoneId,
    APP_SUBDOMAIN,
    config.apiToken
  );

  if (existingRecordsResult.ok === false) {
    return existingRecordsResult.response;
  }

  const existingRecords = existingRecordsResult.data.result;
  const exactMatches: CloudflareDnsRecord[] = [];
  const recordsToCreate: DesiredDnsRecord[] = [];
  const conflicts: Array<{
    type: DesiredDnsRecord["type"];
    desiredContent: string;
    existingRecords: CloudflareDnsRecord[];
  }> = [];

  for (const desiredRecord of desiredRecords) {
    const exactRecord = existingRecords.find(
      (record) =>
        record.type === desiredRecord.type && record.content === desiredRecord.content
    );

    if (exactRecord) {
      exactMatches.push(exactRecord);
      continue;
    }

    const conflictingRecords = existingRecords.filter(
      (record) =>
        record.type === desiredRecord.type && record.content !== desiredRecord.content
    );

    if (conflictingRecords.length > 0) {
      conflicts.push({
        type: desiredRecord.type,
        desiredContent: desiredRecord.content,
        existingRecords: conflictingRecords,
      });
      continue;
    }

    recordsToCreate.push(desiredRecord);
  }

  if (conflicts.length > 0) {
    console.error("[Cloudflare DNS] Conflicting records found", {
      subdomain: APP_SUBDOMAIN,
      conflicts,
    });

    return NextResponse.json(
      {
        success: false,
        error:
          "Conflicting DNS records already exist for the app subdomain. Resolve them before creating new records.",
        subdomain: APP_SUBDOMAIN,
        conflicts,
      },
      { status: 409 }
    );
  }

  const createdRecords: CloudflareDnsRecord[] = [];

  for (const record of recordsToCreate) {
    const createRecordResult = await createDnsRecord(
      config.zoneId,
      record,
      config.apiToken
    );

    if (createRecordResult.ok === false) {
      return createRecordResult.response;
    }

    createdRecords.push(createRecordResult.data.result);
  }

  console.info("[Cloudflare DNS] DNS records processed successfully", {
    subdomain: APP_SUBDOMAIN,
    createdCount: createdRecords.length,
    existingCount: exactMatches.length,
  });

  return NextResponse.json(
    {
      success: true,
      message:
        createdRecords.length > 0
          ? "DNS records processed successfully."
          : "DNS records already exist.",
      subdomain: APP_SUBDOMAIN,
      records: {
        created: createdRecords,
        existing: exactMatches,
      },
    },
    { status: createdRecords.length > 0 ? 201 : 200 }
  );
}
