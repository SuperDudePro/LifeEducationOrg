import {
  LIMITS,
  checkRateLimit,
  clientIp,
  getString,
  normalizeHistory,
  readJsonBody,
  validSameSiteOrigin,
} from "./ask/lib.mjs";

const rateStore = new Map();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(response, status, body) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  return response.status(status).json(body);
}

async function sendEmail(apiKey, payload) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return json(response, 405, { ok: false, error: "Method not allowed." });
  }
  if (!validSameSiteOrigin(request)) {
    return json(response, 403, { ok: false, error: "Request origin was not accepted." });
  }
  const rate = checkRateLimit(rateStore, `escalate:${clientIp(request)}`, { limit: 4, windowMs: 60 * 60 * 1000 });
  if (!rate.allowed) return json(response, 429, { ok: false, error: "Please wait before sending another note." });

  let body;
  try {
    body = await readJsonBody(request);
  } catch {
    return json(response, 400, { ok: false, error: "Invalid request." });
  }
  if (getString(body, "website")) return json(response, 200, { ok: true });

  const question = getString(body, "question", LIMITS.questionChars);
  const note = getString(body, "note", 1800);
  const email = getString(body, "email", 180).toLowerCase();
  const wantsCopy = body?.sendCopy === true;
  const history = normalizeHistory(body.history);

  if (!question) return json(response, 400, { ok: false, error: "There is no question to send." });
  if (email && !EMAIL_PATTERN.test(email)) return json(response, 400, { ok: false, error: "Use a valid email address." });

  const {
    RESEND_API_KEY,
    ASK_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL,
    ASK_TO_EMAIL = process.env.CONTACT_TO_EMAIL,
  } = process.env;
  if (!RESEND_API_KEY || !ASK_FROM_EMAIL || !ASK_TO_EMAIL) {
    return json(response, 503, { ok: false, error: "Question forwarding is not configured yet." });
  }

  const transcript = history.map((message) => `${message.role.toUpperCase()}: ${message.content}`).join("\n\n");
  const text = [
    "Ask LifeEducation escalation",
    email ? `Visitor email: ${email}` : "Visitor email: not provided",
    "",
    "Current question:",
    question,
    note ? `\nVisitor note:\n${note}` : "",
    transcript ? `\nBounded conversation:\n${transcript}` : "",
  ].filter(Boolean).join("\n");
  const ownerResponse = await sendEmail(RESEND_API_KEY, {
    from: ASK_FROM_EMAIL,
    to: [ASK_TO_EMAIL],
    reply_to: email || undefined,
    subject: "LifeEducation question needs a human answer",
    text,
  });
  if (!ownerResponse.ok) {
    console.error(`Ask LifeEducation escalation failed (${ownerResponse.status}).`);
    return json(response, 502, { ok: false, error: "The question could not be sent." });
  }

  if (wantsCopy && email) {
    const copyResponse = await sendEmail(RESEND_API_KEY, {
      from: ASK_FROM_EMAIL,
      to: [email],
      subject: "Copy of your LifeEducation question",
      text: `Your question was passed to Will.\n\n${question}${note ? `\n\nYour note:\n${note}` : ""}`,
    });
    if (!copyResponse.ok) {
      return json(response, 200, { ok: true, warning: "Your question was sent, but the email copy could not be delivered." });
    }
  }
  return json(response, 200, { ok: true });
}
