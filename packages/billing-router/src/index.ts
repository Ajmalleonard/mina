export interface DomainMetadata {
  status: 'active' | 'suspended';
  billingFrequency: 'monthly' | 'yearly';
  renewalDay: number;
  nextRenewalDate: string; // Format: YYYY-MM-DD
}

export interface CloudflareKVConfig {
  apiToken?: string;
  accountId?: string;
  namespaceId?: string;
}

/**
 * Calculates the next renewal date (YYYY-MM-DD) based on frequency and renewal day.
 */
export function calculateNextRenewalDate(frequency: 'monthly' | 'yearly', renewalDay: number): string {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth(); // 0-indexed

  // If current day of month is on or after the renewal day, push to the next period
  if (now.getDate() >= renewalDay) {
    if (frequency === 'monthly') {
      month += 1;
      if (month > 11) {
        month = 0;
        year += 1;
      }
    } else {
      year += 1;
    }
  }

  // Create the renewal Date object
  const renewalDate = new Date(year, month, renewalDay);

  const yyyy = renewalDate.getFullYear();
  const mm = String(renewalDate.getMonth() + 1).padStart(2, '0');
  const dd = String(renewalDate.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export class BillingRouter {
  private apiToken: string;
  private accountId: string;
  private namespaceId: string;

  constructor(config: CloudflareKVConfig = {}) {
    this.apiToken = config.apiToken || process.env.CLOUDFLARE_GLOBAL || '';
    this.accountId = config.accountId || process.env.CLOUDFLARE_ACCOUNT_ID || '';
    this.namespaceId = config.namespaceId || process.env.CLOUDFLARE_KV_NAMESPACE_ID || '';
  }

  private get baseUrl() {
    return `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}`;
  }

  private async request<T = any>(path: string, options: RequestInit = {}): Promise<T> {
    if (!this.apiToken || !this.accountId || !this.namespaceId) {
      throw new Error(
        `Cloudflare KV configuration is incomplete. Required variables: ` +
        `CLOUDFLARE_GLOBAL, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_KV_NAMESPACE_ID`
      );
    }

    const url = `${this.baseUrl}${path}`;
    const headers = {
      'Authorization': `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudflare API Error [${response.status}]: ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return response.text() as unknown as T;
  }

  /**
   * Helper to check if a domain is excluded from suspension.
   * Matches both the apex domain and any of its subdomains.
   */
  isExcluded(domain: string): boolean {
    const cleanDomain = domain.toLowerCase().trim();
    const excluded = ['squareexp.com', 'zhio.dev'];
    return excluded.some(
      exc => cleanDomain === exc || cleanDomain.endsWith(`.${exc}`)
    );
  }

  /**
   * Gets domain metadata from Cloudflare KV.
   */
  async getDomainMetadata(domain: string): Promise<DomainMetadata | null> {
    try {
      const value = await this.request<string>(`/values/${domain}`);
      return JSON.parse(value) as DomainMetadata;
    } catch (error: any) {
      if (error.message && (error.message.includes('404') || error.message.includes('10009'))) {
        return null;
      }
      console.error(`Error fetching metadata for ${domain}:`, error);
      return null;
    }
  }

  /**
   * Saves domain metadata to Cloudflare KV.
   */
  async saveDomainMetadata(domain: string, metadata: DomainMetadata): Promise<void> {
    if (this.isExcluded(domain)) {
      throw new Error(`Cannot modify metadata for excluded domain: ${domain}`);
    }
    await this.request(`/values/${domain}`, {
      method: 'PUT',
      body: JSON.stringify(metadata),
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  /**
   * Checks if a domain is suspended.
   * Performs lazy evaluation of expiration dates.
   */
  async isDomainSuspended(domain: string): Promise<boolean> {
    if (this.isExcluded(domain)) {
      return false; // Excluded domains are never suspended
    }

    const metadata = await this.getDomainMetadata(domain);
    if (!metadata) {
      return false; // Unconfigured domains are active by default
    }

    if (metadata.status === 'suspended') {
      return true;
    }

    // Lazy Evaluation: Check if current date is past the next renewal date
    if (metadata.status === 'active' && metadata.nextRenewalDate) {
      const now = new Date();
      const [year, month, day] = metadata.nextRenewalDate.split('-').map(Number);
      const renewalDate = new Date(year, month - 1, day, 23, 59, 59);

      if (now > renewalDate) {
        console.warn(`[Hosting Suspension] Domain ${domain} exceeded renewal date ${metadata.nextRenewalDate}. Auto-suspending.`);
        metadata.status = 'suspended';
        await this.saveDomainMetadata(domain, metadata);
        return true;
      }
    }

    return false;
  }

  /**
   * Suspends a domain immediately.
   */
  async suspendDomain(domain: string): Promise<void> {
    const metadata = await this.getDomainMetadata(domain);
    const updatedMetadata: DomainMetadata = metadata || {
      status: 'suspended',
      billingFrequency: 'monthly',
      renewalDay: 25,
      nextRenewalDate: calculateNextRenewalDate('monthly', 25),
    };
    updatedMetadata.status = 'suspended';
    await this.saveDomainMetadata(domain, updatedMetadata);
  }

  /**
   * Reactivates a domain, calculating and setting the next renewal date.
   */
  async reactivateDomain(
    domain: string,
    billingFrequency: 'monthly' | 'yearly' = 'monthly',
    renewalDay: number = 25
  ): Promise<void> {
    const nextRenewal = calculateNextRenewalDate(billingFrequency, renewalDay);
    const metadata: DomainMetadata = {
      status: 'active',
      billingFrequency,
      renewalDay,
      nextRenewalDate: nextRenewal,
    };
    await this.saveDomainMetadata(domain, metadata);
  }
}
