import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Feedback endpoint. Receives contact-form submissions and newsletter
 * subscriptions, then relays them by email through Mailtrap (SMTP).
 *
 * Required env vars (set in Vercel → Project → Environment Variables):
 *   MAILTRAP_HOST  - SMTP host (e.g. live.smtp.mailtrap.io or sandbox.smtp.mailtrap.io)
 *   MAILTRAP_PORT  - SMTP port (e.g. 587 or 2525)
 *   MAILTRAP_USER  - SMTP username
 *   MAILTRAP_PASS  - SMTP password / API token
 *   MAIL_TO        - company inbox that should receive the message
 *   MAIL_FROM      - verified "from" address (defaults to MAIL_TO)
 */

export const runtime = "nodejs";

interface FeedbackBody {
  name?: string;
  email?: string;
  contactReasons?: string[] | null;
  budgetMin?: number | null;
  budgetMax?: number | null;
  question?: string | null;
}

const isEmail = (v: unknown): v is string =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function buildTransport() {
  const { MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASS } =
    process.env;

  if (!MAILTRAP_HOST || !MAILTRAP_PORT || !MAILTRAP_USER || !MAILTRAP_PASS) {
    return null;
  }

  const port = Number(MAILTRAP_PORT);
  return nodemailer.createTransport({
    host: MAILTRAP_HOST,
    port,
    secure: port === 465,
    auth: { user: MAILTRAP_USER, pass: MAILTRAP_PASS },
  });
}

export async function POST(request: Request) {
  let body: FeedbackBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isEmail(body.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const transport = buildTransport();
  if (!transport) {
    console.error("Mailtrap env vars are not configured");
    return NextResponse.json(
      { error: "Mailer not configured" },
      { status: 500 },
    );
  }

  const to = process.env.MAIL_TO;
  if (!to) {
    console.error("MAIL_TO is not configured");
    return NextResponse.json(
      { error: "Mailer not configured" },
      { status: 500 },
    );
  }
  const from = process.env.MAIL_FROM || to;

  // A submission with a name is a contact request; email-only is a subscription.
  const isContact = typeof body.name === "string" && body.name.trim().length > 0;

  const subject = isContact
    ? `New contact request — ${body.name}`
    : `New newsletter subscription — ${body.email}`;

  const rows: [string, string][] = [["Email", body.email]];
  if (isContact) {
    rows.unshift(["Name", body.name!.trim()]);
    if (body.contactReasons?.length)
      rows.push(["Reasons", body.contactReasons.join(", ")]);
    if (body.budgetMin != null || body.budgetMax != null)
      rows.push(["Budget", `${body.budgetMin ?? "?"} – ${body.budgetMax ?? "?"}`]);
    if (body.question) rows.push(["Message", body.question]);
  }

  const html = `
    <h2>${esc(subject)}</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="font-weight:600;vertical-align:top">${esc(
              k,
            )}</td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
        )
        .join("")}
    </table>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    await transport.sendMail({
      from,
      to,
      replyTo: body.email,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("Failed to send feedback email", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
