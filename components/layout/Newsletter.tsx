"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value) || value.length > 254) {
      setState("error"); setMessage("Please enter a valid email address."); return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: value }) });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      trackEvent("newsletter_subscribe");
      setState("done"); setMessage("Thank you. Gifting inspiration is on its way.");
      setEmail("");
    } catch (err) {
      setState("error"); setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const dark = tone === "dark";
  return (
    <form onSubmit={onSubmit} noValidate aria-label="Newsletter" className="w-full max-w-md">
      <label htmlFor="newsletter-email" className={`block text-sm font-semibold ${dark ? "text-background" : ""}`}>Get gifting inspiration in your inbox.</label>
      <div className="mt-3 flex">
        <input
          id="newsletter-email" type="email" inputMode="email" autoComplete="email" required maxLength={254} value={email}
          onChange={(e) => { setEmail(e.target.value); if (state !== "idle") setState("idle"); }}
          aria-invalid={state === "error"} aria-describedby="newsletter-status" placeholder="Your email address"
          className={`h-12 min-w-0 flex-1 rounded-l-sm border bg-transparent px-4 text-sm outline-none ${dark ? "border-background/30 text-background placeholder:text-background/50 focus:border-background" : "border-border focus:border-foreground"}`}
        />
        <button type="submit" disabled={state === "loading"} className={`t-button h-12 shrink-0 rounded-r-sm px-5 transition-colors disabled:opacity-60 ${dark ? "bg-background text-foreground hover:bg-champagne" : "bg-primary text-primary-foreground hover:bg-brown"}`}>
          {state === "loading" ? "Joining…" : "Subscribe"}
        </button>
      </div>
      <p id="newsletter-status" role="status" aria-live="polite" className={`mt-2 min-h-5 text-xs ${state === "error" ? "text-rose" : dark ? "text-background/75" : "text-muted"}`}>
        {state === "done" && <Check aria-hidden className="mr-1 inline h-3.5 w-3.5" />}{message}
      </p>
    </form>
  );
}
