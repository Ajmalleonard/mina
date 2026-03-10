import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, getTransactionStatus } from "@/lib/pesapal";

export async function GET(req: NextRequest) {
    // PesaPal sends OrderTrackingId and OrderMerchantReference as query params
    const searchParams = req.nextUrl.searchParams;
    const orderTrackingId = searchParams.get("OrderTrackingId");
    const orderMerchantReference = searchParams.get("OrderMerchantReference");

    if (!orderTrackingId) {
        return NextResponse.json({ error: "Missing OrderTrackingId" }, { status: 400 });
    }

    try {
        const authResult = await getAccessToken();
        const token = authResult.token;
        if (!token) {
            console.error("IPN Auth Failed:", authResult.error);
            return NextResponse.json({ error: "Auth Failed" }, { status: 500 });
        }

        const status = await getTransactionStatus(token, orderTrackingId);
        
        // Here you would typically update your database with the status
        console.log("IPN Update received:", status);

        // PesaPal expects a 200 OK response with specific format roughly
        return NextResponse.json({
            status: 200,
            message: "IPN Received"
        });

    } catch (error) {
        console.error("IPN Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    // PesaPal might also use POST for IPN depending on config.
    // The payload structure might differ slightly but usually contains the same IDs.
    // For now, let's assume they send it as query params or body.
    // If body:
    try {
        const body = await req.json(); // May fail if content-type is not json
        // ... Logic similarly ...
        console.log("IPN POST Received:", body);
         return NextResponse.json({ status: 200 });
    } catch (e) {
        // Fallback to query params if body parsing fails
        return GET(req);
    }
}
