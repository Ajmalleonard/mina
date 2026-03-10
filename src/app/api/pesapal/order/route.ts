import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, submitOrder, registerIPN } from "@/lib/pesapal";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, description, email, firstName, lastName, isMonthly } = body;

    console.log("PesaPal Order Request:", { amount, email, isMonthly });

    if (!amount || !email) {
      return NextResponse.json({ error: "Amount and email are required" }, { status: 400 });
    }

    // 1. Authenticate with PesaPal
    const authResult = await getAccessToken();
    const token = authResult.token;
    
    if (!token) {
      console.error("PesaPal Auth Failed Details:", authResult.error);
      return NextResponse.json({ 
          error: "Failed to authenticate with payment gateway", 
          details: authResult.error,
          status: authResult.status 
      }, { status: 500 });
    }

    // 2. Prepare Order Data
    const orderId = uuidv4();
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/donate/payment-result`;
    
    // Register IPN
    const notificationId = await registerIPN(token);

    if (!notificationId) {
        console.error("PesaPal IPN Registration Failed");
        return NextResponse.json({ error: "Failed to register IPN" }, { status: 500 });
    }

    const orderData: any = {
      id: orderId,
      currency: "USD",
      amount: parseFloat(amount),
      description: description || "Donation to Mina Foundation",
      callback_url: callbackUrl,
      notification_id: notificationId,
      billing_address: {
        email_address: email,
        first_name: firstName,
        last_name: lastName,
        country_code: "TZ",
      },
    };

    // 3. Add Subscription Details if Monthly
    if (isMonthly) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 5); // 5 years subscription

        // Format Date to DD-MM-YYYY
        const formatDate = (date: Date) => {
            const d = String(date.getDate()).padStart(2, '0');
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const y = date.getFullYear();
            return `${d}-${m}-${y}`;
        };

        orderData.subscription_details = {
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            frequency: "MONTHLY"
        };
    }

    // 4. Submit Order
    console.log("Submitting Order to PesaPal:", JSON.stringify(orderData, null, 2));
    const result = await submitOrder(token, orderData);
    console.log("PesaPal Order Result:", result);

    if (result.error) {
        console.error("PesaPal Order Error:", result.error);
        return NextResponse.json({ 
            error: "Payment Gateway Error", 
            details: result.error.message || result.error.code,
            pesapal_error: result.error
        }, { status: 400 });
    }

    return NextResponse.json({ 
        redirect_url: result.redirect_url,
        order_tracking_id: result.order_tracking_id,
        merchant_reference: result.merchant_reference 
    });

  } catch (error: any) {
    console.error("Payment initiation error detailed:", error);
    // Be more verbose about the error
    return NextResponse.json({ 
        error: "Internal Server Error", 
        details: error?.message || String(error) 
    }, { status: 500 });
  }
}
