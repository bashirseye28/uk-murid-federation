import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function GET() {
  try {
    const payments = await stripe.paymentIntents.list({
      limit: 100,
    });

    const donations = payments.data.map((p) => ({
      donor_email: p.receipt_email || p.metadata?.donor_email || "Unknown",
      amount_gbp: (p.amount_received / 100).toFixed(2), // Stripe uses pence
      donation_date: new Date(p.created * 1000).toISOString(),
      donor_name: p.metadata?.donor_name || "Anonymous",
      campaign: p.metadata?.campaign || "General",
      item_title: p.metadata?.item_title || "-", // Show as “Reference” in frontend
      is_anonymous: p.metadata?.is_anonymous === "true",
    }));

    return new NextResponse(JSON.stringify(donations), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Stripe fetch error:", error);
    return new NextResponse(JSON.stringify({ error: "Stripe error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}