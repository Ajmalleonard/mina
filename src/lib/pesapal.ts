
const PESAPAL_ENV = process.env.PESAPAL_ENV || 'sandbox'; // 'sandbox' or 'production'
const BASE_URL = PESAPAL_ENV === 'production' 
  ? 'https://pay.pesapal.com/v3/api' 
  : 'https://cybqa.pesapal.com/pesapalv3/api';

const CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;

interface PesaPalConfig {
  consumerKey: string;
  consumerSecret: string;
}

if (!CONSUMER_KEY || !CONSUMER_SECRET) {
  console.warn("PesaPal Consumer Key or Secret is missing in environment variables.");
}

/**
 * Authenticate with PesaPal to get a Bearer token.
 * Token is valid for 5 minutes.
 */
interface AuthResponse {
    token: string | null;
    error?: string;
    status?: number;
}

export async function getAccessToken(): Promise<AuthResponse> {
  console.log("Attempting PesaPal Authentication...");
  console.log("PESAPAL_ENV:", PESAPAL_ENV);
  // Log masked key for debugging
  const maskedKey = CONSUMER_KEY ? `${CONSUMER_KEY.substring(0, 4)}...${CONSUMER_KEY.substring(CONSUMER_KEY.length - 4)}` : "None";
  console.log(`Using Key: ${maskedKey}, Length: ${CONSUMER_KEY?.length}`);

  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      console.error("MISSING PESAPAL CREDENTIALS");
      return { token: null, error: "Missing Credentials" };
  }

  try {
    const response = await fetch(`${BASE_URL}/Auth/RequestToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
      }),
      cache: "no-store", // Ensure we don't cache auth requests
    });

    const responseText = await response.text();
    console.log("PesaPal Raw Auth Response:", responseText);

    if (!response.ok) {
        console.error("PesaPal Auth Error:", response.status, responseText);
        return { token: null, error: `Auth Failed (${response.status}): ${responseText || 'No details'}`, status: response.status };
    }

    let data;
    try {
        data = JSON.parse(responseText);
    } catch (e) {
        console.error("Failed to parse PesaPal response as JSON:", e);
        return { token: null, error: "Invalid JSON response from PesaPal" };
    }

    console.log("PesaPal Parsed Auth Response:", JSON.stringify(data, null, 2));
    
    if (!data.token) {
        console.error("Token missing in response!");
        return { token: null, error: "Token field missing in successful response", status: 200 };
    }

    return { token: data.token };
  } catch (error: any) {
    console.error("Error getting PesaPal access token:", error);
    return { token: null, error: error.message };
  }
}

/**
 * Register the IPN URL.
 * This should be done once (or checked) before submitting orders.
 */
export async function registerIPN(token: string): Promise<string | null> {
    // Ideally, this URL should be your production URL for callbacks
    // For local dev, you might need a tunnel (ngrok)
    const ipnUrl = process.env.NEXT_PUBLIC_APP_URL 
        ? `${process.env.NEXT_PUBLIC_APP_URL}/api/pesapal/ipn`
        : "https://www.minafoundation.org/api/pesapal/ipn"; // Fallback/Default

    try {
        const response = await fetch(`${BASE_URL}/URLSetup/RegisterIPN`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                url: ipnUrl,
                ipn_notification_type: "POST" // 'GET' or 'POST'
            })
        });

        if (!response.ok) {
             const errorText = await response.text();
             console.error("PesaPal Register IPN Error:", response.status, errorText);
             return null;
        }

        const data = await response.json();
        return data.ipn_id; // Store this if possible, or request it every time
    } catch (error) {
        console.error("Error registering IPN:", error);
        return null;
    }
}

interface OrderData {
    id: string; // Unique Merchant Reference
    currency: string;
    amount: number;
    description: string;
    callback_url: string;
    notification_id: string;
    billing_address: {
        email_address: string;
        phone_number?: string;
        country_code?: string;
        first_name?: string;
        middle_name?: string;
        last_name?: string;
        line_1?: string;
        line_2?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        zip_code?: string;
    };
    subscription_details?: {
        start_date: string; // DD-MM-YYYY
        end_date: string;   // DD-MM-YYYY
        frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
    };
}

/**
 * Submit an order request to PesaPal.
 */
export async function submitOrder(token: string, orderData: OrderData) {
    try {
        const response = await fetch(`${BASE_URL}/Transactions/SubmitOrderRequest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
             const errorText = await response.text();
             console.error("PesaPal Submit Order Error:", response.status, errorText);
             throw new Error(`Failed to submit order: ${response.status}`);
        }

        const data = await response.json();
        return data; // Contains redirect_url, etc.
    } catch (error) {
        console.error("Error submitting order:", error);
        throw error;
    }
}

/**
 * Get transaction status using OrderTrackingId.
 */
export async function getTransactionStatus(token: string, orderTrackingId: string) {
     try {
        const response = await fetch(`${BASE_URL}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
             throw new Error(`Failed to get transaction status: ${response.status}`);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error getting transaction status:", error);
        throw error;
    }
}
