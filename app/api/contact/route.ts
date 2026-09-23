import { NextResponse } from "next/server";

// Vercel-native serverless route. No standing server, no Django.
export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  company?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, projectType, budget, message, company } = body;

  // Honeypot hit — pretend success, drop silently.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and a message." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email doesn't look right." },
      { status: 400 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "hello@rainteractive.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "RA Interactive <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;

  const subject = `New inquiry — ${name} (${projectType ?? "general"})`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType ?? "—"}`,
    `Budget: ${budget ?? "—"}`,
    "",
    message,
  ].join("\n");

  // If Resend is configured, deliver by email. Otherwise log and still succeed,
  // so the form works out-of-the-box in dev / before keys are set.
  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        console.error("Resend error:", res.status, detail);
        return NextResponse.json(
          { error: "We couldn't send that right now. Please email us directly." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Contact send failed:", err);
      return NextResponse.json(
        { error: "We couldn't send that right now. Please email us directly." },
        { status: 502 }
      );
    }
  } else {
    console.log("[contact] (no RESEND_API_KEY — logging only)\n" + text);
  }

  return NextResponse.json({ ok: true });
}
