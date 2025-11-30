import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message }: ContactEmailRequest = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields:", { name: !!name, email: !!email, subject: !!subject, message: !!message });
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Sending contact email for:", { name, email, subject });

    // Send notification email to NHIS
    const notificationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "NHIS Contact Form <onboarding@resend.dev>",
        to: ["info@nhia.gov.gh"],
        reply_to: email,
        subject: `NHIS Contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0066B3, #00A651); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
            </div>
            <div style="padding: 30px; background: #f9f9f9;">
              <h2 style="color: #0066B3;">Contact Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Name:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Subject:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${subject}</td>
                </tr>
              </table>
              <h3 style="color: #0066B3; margin-top: 20px;">Message:</h3>
              <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            <div style="background: #0066B3; padding: 15px; text-align: center;">
              <p style="color: white; margin: 0; font-size: 12px;">National Health Insurance Authority, Ghana</p>
            </div>
          </div>
        `,
      }),
    });

    if (!notificationResponse.ok) {
      const errorData = await notificationResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send notification email: ${errorData}`);
    }

    console.log("Notification email sent successfully");

    // Send confirmation email to user
    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "NHIS Ghana <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for contacting NHIS Ghana",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0066B3, #00A651); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">Thank You for Contacting Us</h1>
            </div>
            <div style="padding: 30px; background: #f9f9f9;">
              <p style="font-size: 16px;">Dear ${name},</p>
              <p style="font-size: 16px;">Thank you for reaching out to the National Health Insurance Scheme. We have received your message and will respond as soon as possible.</p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #0066B3; margin: 20px 0;">
                <p style="margin: 0; font-weight: bold;">Your message:</p>
                <p style="margin: 10px 0 0 0; color: #666;">${subject}</p>
              </div>
              
              <p style="font-size: 14px; color: #666;">For urgent inquiries, please contact our Call Center:</p>
              <p style="font-size: 18px; font-weight: bold; color: #0066B3;">054 444 6447</p>
              
              <p style="font-size: 14px; color: #666;">You can also renew your membership via USSD:</p>
              <p style="font-size: 24px; font-weight: bold; color: #F7B32B;">*929#</p>
            </div>
            <div style="background: #0066B3; padding: 15px; text-align: center;">
              <p style="color: white; margin: 0; font-size: 12px;">National Health Insurance Authority, Ghana</p>
              <p style="color: rgba(255,255,255,0.7); margin: 5px 0 0 0; font-size: 11px;">Quality Healthcare Made Accessible to Every Ghanaian</p>
            </div>
          </div>
        `,
      }),
    });

    if (!confirmationResponse.ok) {
      console.error("Confirmation email failed but notification was sent");
    } else {
      console.log("Confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
