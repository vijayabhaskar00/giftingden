import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter sign-up. Forwards to the webhook in NEWSLETTER_WEBHOOK_URL
 * (Mailchimp / Brevo / Zapier / Make / your CRM). Server-side only, never exposed to the client.
 * Without it, production returns 503 rather than silently dropping subscribers.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[newsletter] (dev, no webhook configured) subscriber captured");
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Sign-ups are temporarily unavailable. Please message us on WhatsApp." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "giftingden-website", subscribedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "We couldn't save your sign-up. Please try again shortly." }, { status: 502 });
  }
}
