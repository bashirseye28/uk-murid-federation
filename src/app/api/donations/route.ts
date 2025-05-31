import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function GET() {
  try {
    // Get last 100 successful payments
    const payments = await stripe.paymentIntents.list({
      limit: 100,
    });

    const donations = payments.data
      .filter((p) => p.status === "succeeded")
      .map((p) => ({
        reference_id: p.id,
        donor_email: p.receipt_email || p.metadata?.donor_email || "Unknown",
        amount_gbp: (p.amount_received / 100).toFixed(2),
        donation_date: new Date(p.created * 1000).toISOString(),
        donor_name: p.metadata?.donor_name || "Anonymous",
        campaign: p.metadata?.campaign || "General",
        item_title: p.metadata?.item_title || "-", // Labelled as "Reference" in UI
        is_anonymous: p.metadata?.is_anonymous === "true",
        dahira_city: p.metadata?.dahira_city || "",
        children_under_16: p.metadata?.children_under_16 || "",
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