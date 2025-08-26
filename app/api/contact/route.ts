// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  context: "general" | "distribution";
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  businessName?: string;
  contactPerson?: string;
  businessEmail?: string;
  businessPhone?: string;
  location?: string;
  businessType?: string;
  businessDetails?: string;
};

const BRAND_NAME = "Unique Solution Farms";

function s(v?: string) {
  return (v ?? "").toString().trim();
}

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

function makeTransport() {
  const host = requireEnv("SMTP_HOST");
  const port = Number(requireEnv("SMTP_PORT")); // 465 (SSL) or 587 (STARTTLS)
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

// Build a consistent "From" header with the brand name
function fromHeader() {
  const fromEmail = requireEnv("MAIL_FROM"); // e.g., no-reply@uniquesolutionfarms.com
  return `"${BRAND_NAME}" <${fromEmail}>`;
}

function internalRecipient() {
  return requireEnv("MAIL_TO"); // where internal notifications go
}

function isValidEmail(v?: string) {
  return !!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function summarize(payload: Payload) {
  const fullName =
    [s(payload.firstName), s(payload.lastName)].filter(Boolean).join(" ") || "N/A";

  const common = [
    `Context: ${payload.context}`,
    `Name: ${fullName}`,
    `Email: ${s(payload.email) || "N/A"}`,
    `Phone: ${s(payload.phone) || "N/A"}`,
    `Subject: ${s(payload.subject) || "N/A"}`,
    `Message: ${s(payload.message) || "N/A"}`,
  ];

  if (payload.context === "distribution") {
    const dist = [
      `Business Name: ${s(payload.businessName) || "N/A"}`,
      `Contact Person: ${s(payload.contactPerson) || "N/A"}`,
      `Business Email: ${s(payload.businessEmail) || "N/A"}`,
      `Business Phone: ${s(payload.businessPhone) || "N/A"}`,
      `Location: ${s(payload.location) || "N/A"}`,
      `Business Type: ${s(payload.businessType) || "N/A"}`,
      `Business Details: ${s(payload.businessDetails) || "N/A"}`,
    ];
    return [...common, "", "— Distribution Details —", ...dist].join("\n");
  }

  return common.join("\n");
}

async function sendInternal(payload: Payload) {
  const transporter = makeTransport();

  const subjectBase =
    payload.context === "distribution"
      ? "New Distribution Enquiry"
      : "New Contact Form Submission";

  const mail = await transporter.sendMail({
    from: fromHeader(), // ALWAYS “Unique Solution Farms”
    to: internalRecipient(),
    subject: `[Website] ${subjectBase}: ${s(payload.subject) || "No subject"}`,
    replyTo: s(payload.email) && isValidEmail(payload.email) ? s(payload.email) : undefined,
    text: summarize(payload),
  });

  return mail.messageId;
}

async function sendAutoReply(payload: Payload) {
  const transporter = makeTransport();

  // choose recipient email (prefer businessEmail for distribution)
  const recipient =
    payload.context === "distribution"
      ? s(payload.businessEmail) || s(payload.email)
      : s(payload.email);

  if (!isValidEmail(recipient)) return null;

  const fullName = [s(payload.firstName), s(payload.lastName)]
    .filter(Boolean)
    .join(" ")
    .trim();

  const text = [
    `Hi ${fullName || "there"},`,
    "",
    `Thanks for contacting ${BRAND_NAME}. We’ve received your message and our team will get back to you shortly.`,
    "",
    "For your reference, here’s a copy of your submission:",
    "",
    summarize(payload),
    "",
    `— ${BRAND_NAME} Team`,
  ].join("\n");

  const mail = await transporter.sendMail({
    from: fromHeader(), // ALWAYS “Unique Solution Farms”
    to: recipient,
    subject: `We received your message — ${BRAND_NAME}`,
    text,
  });

  return mail.messageId;
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Payload;

    // Basic validation
    if (!payload?.context || !["general", "distribution"].includes(payload.context)) {
      return NextResponse.json({ ok: false, error: "Invalid or missing context" }, { status: 400 });
    }

    // Require at least an email somewhere
    const anyEmail =
      (payload.context === "distribution" ? s(payload.businessEmail) : "") || s(payload.email);
    if (!isValidEmail(anyEmail)) {
      return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 400 });
    }

    const internalId = await sendInternal(payload);
    const autoId = await sendAutoReply(payload);

    return NextResponse.json({
      ok: true,
      message: "Submission received.",
      ids: { internal: internalId, autoReply: autoId },
    });
  } catch (err: any) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send email(s). Check server logs and SMTP settings." },
      { status: 500 }
    );
  }
}
