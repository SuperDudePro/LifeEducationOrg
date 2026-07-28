export const LIMITS = Object.freeze({
  questionChars: 1200,
  historyMessages: 8,
  historyMessageChars: 1800,
  requestBytes: 18000,
  retrievedChunks: 7,
  answerChars: 3000,
  requestsPerWindow: 12,
  rateWindowMs: 15 * 60 * 1000,
});

export const STANDARD_DECLINE =
  "That is not part of the public LifeEducation system yet. The public framework is close to locked while anything beyond it is still unwritten, unfinished, or untested. I won’t guess beyond the approved public sources, but I can pass the question to Will if you’d like.";

const STOP_WORDS = new Set([
  "a", "about", "an", "and", "are", "as", "at", "be", "but", "by", "can", "do", "for",
  "best", "child", "children", "from", "had", "has", "have", "how", "i", "if", "in", "is", "it", "kid", "kids", "me", "my", "of",
  "on", "or", "our", "so", "that", "the", "their", "there", "this", "to", "was", "we",
  "what", "when", "where", "which", "who", "why", "will", "with", "would", "you", "your",
]);

function stem(token) {
  if (token.length > 6 && token.endsWith("ing")) return token.slice(0, -3);
  if (token.length > 5 && token.endsWith("ed")) return token.slice(0, -2);
  if (token.length > 4 && token.endsWith("es")) return token.slice(0, -2);
  if (token.length > 3 && token.endsWith("s")) return token.slice(0, -1);
  return token;
}

export function tokenize(value) {
  return [...new Set(
    String(value || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .map(stem)
      .filter((token) => token.length > 2 && !STOP_WORDS.has(token)),
  )];
}

function occurrences(tokens, token) {
  return tokens.reduce((count, item) => count + (item === token ? 1 : 0), 0);
}

export function retrieveChunks(corpus, question, history = [], limit = LIMITS.retrievedChunks) {
  const priorUserText = history
    .filter((message) => message?.role === "user")
    .slice(-2)
    .map((message) => String(message.content || ""))
    .join(" ");
  const questionTokens = tokenize(question);
  const contextTokens = tokenize(priorUserText).filter((token) => !questionTokens.includes(token));
  if (!questionTokens.length) return [];

  const scored = corpus.map((chunk) => {
    const title = tokenize(`${chunk.title} ${chunk.heading}`);
    const text = String(chunk.text || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .map(stem)
      .filter(Boolean);
    const source = tokenize(`${chunk.sourceId} ${chunk.topic}`);
    let score = 0;
    let matchedQuestionTokens = 0;

    for (const token of questionTokens) {
      const titleHits = occurrences(title, token);
      const textHits = occurrences(text, token);
      const sourceHits = occurrences(source, token);
      if (titleHits || textHits || sourceHits) matchedQuestionTokens += 1;
      score += Math.min(titleHits, 3) * 5 + Math.min(sourceHits, 2) * 4 + Math.min(textHits, 5) * 1.5;
    }
    for (const token of contextTokens) {
      score += Math.min(occurrences(title, token), 2) * 1.5 + Math.min(occurrences(text, token), 3) * 0.4;
    }
    if (matchedQuestionTokens >= 2) score += matchedQuestionTokens * 2;
    score += chunk.authorityRank === 1 ? 0.25 : 0;
    return { ...chunk, retrievalScore: Number(score.toFixed(2)), matchedQuestionTokens };
  });

  const minimumScore = questionTokens.length === 1 ? 5 : 3;
  return scored
    .filter((chunk) => chunk.retrievalScore >= minimumScore && chunk.matchedQuestionTokens > 0)
    .sort((a, b) =>
      b.retrievalScore - a.retrievalScore ||
      a.authorityRank - b.authorityRank ||
      a.id.localeCompare(b.id),
    )
    .slice(0, limit);
}

const INJECTION_PATTERN =
  /\b(ignore|override|disregard|reveal|repeat|print|show)\b.{0,45}\b(instruction|prompt|policy|system|developer|hidden|secret)\b/i;
const PRIVATE_PATTERN =
  /\b(private|internal|unpublished|confidential|drive|google doc|email|inbox|password|credential|api key)\b/i;
const WEB_PATTERN =
  /\b(search|browse|look up|google|internet|web|latest news|today'?s)\b/i;
const PERSONAL_HIGH_STAKES_PATTERN =
  /\b(diagnos|symptom|medication|dose|lawyer|legal advice|sue|custody|abuse|suicid|self-harm|emergency)\b/i;

export function preflightQuestion(question) {
  const value = String(question || "").trim();
  if (INJECTION_PATTERN.test(value)) {
    return { blocked: true, category: "prompt-injection", message: STANDARD_DECLINE };
  }
  if (PRIVATE_PATTERN.test(value)) {
    return {
      blocked: true,
      category: "private-material",
      message: "That is not part of the public LifeEducation system yet. I only use the approved public sources and can’t access private files, email, credentials, or unpublished material.",
    };
  }
  if (WEB_PATTERN.test(value)) {
    return {
      blocked: true,
      category: "web-request",
      message: "This beta does not browse the web. Anything beyond the approved sources is not part of the public LifeEducation system yet, so I won’t use it or guess at it.",
    };
  }
  if (PERSONAL_HIGH_STAKES_PATTERN.test(value)) {
    return {
      blocked: true,
      category: "high-stakes",
      message: "I can explain the current LifeEducation materials, but I can’t give personal medical, legal, crisis, or family-safety advice.",
    };
  }
  return { blocked: false };
}

export function normalizeHistory(value) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(-LIMITS.historyMessages)
    .filter((message) => message && (message.role === "user" || message.role === "assistant"))
    .map((message) => ({
      role: message.role,
      content: String(message.content || "").trim().slice(0, LIMITS.historyMessageChars),
    }))
    .filter((message) => message.content);
}

export function getString(body, key, max = Infinity) {
  const value = body && typeof body === "object" ? body[key] : undefined;
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function readJsonBody(request) {
  const declaredSize = Number(request.headers?.["content-length"] || 0);
  if (declaredSize > LIMITS.requestBytes) throw new Error("request-too-large");
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body === "string") {
    if (Buffer.byteLength(request.body, "utf8") > LIMITS.requestBytes) throw new Error("request-too-large");
    try {
      return JSON.parse(request.body);
    } catch {
      throw new Error("invalid-json");
    }
  }
  return {};
}

export function validSameSiteOrigin(request) {
  const origin = String(request.headers?.origin || "");
  const host = String(request.headers?.["x-forwarded-host"] || request.headers?.host || "").split(",")[0].trim();
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function clientIp(request) {
  return String(request.headers?.["x-forwarded-for"] || request.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim()
    .slice(0, 80);
}

export function checkRateLimit(store, key, options = {}) {
  const now = options.now ?? Date.now();
  const limit = options.limit ?? LIMITS.requestsPerWindow;
  const windowMs = options.windowMs ?? LIMITS.rateWindowMs;
  const current = store.get(key);
  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  current.count += 1;
  return {
    allowed: current.count <= limit,
    remaining: Math.max(0, limit - current.count),
    resetAt: current.resetAt,
  };
}

export function extractResponseText(payload) {
  if (typeof payload?.output_text === "string") return payload.output_text;
  for (const item of payload?.output || []) {
    for (const content of item?.content || []) {
      if (typeof content?.text === "string") return content.text;
    }
  }
  return "";
}

export function validateModelResult(value, retrievedChunks, sources) {
  const allowed = new Set(retrievedChunks.map((chunk) => chunk.sourceId));
  const knownSources = new Map(sources.map((source) => [source.id, source]));
  const rawCitations = Array.isArray(value?.sourceCitations) ? value.sourceCitations : [];
  const sourceCitations = [...new Set(rawCitations)]
    .filter((id) => typeof id === "string" && allowed.has(id) && knownSources.has(id));
  const answer = typeof value?.answer === "string" ? value.answer.trim().slice(0, LIMITS.answerChars) : "";
  const answerable = value?.answerable === true && Boolean(answer) && sourceCitations.length > 0;
  if (!answerable) {
    return {
      answerable: false,
      answer: STANDARD_DECLINE,
      sourceCitations: [],
      sources: [],
      confidence: "low",
      scopeWarnings: [],
      privacyWarnings: [],
      suggestedCategory: typeof value?.suggestedCategory === "string" ? value.suggestedCategory.slice(0, 80) : "other",
      possibleExistingQA: false,
    };
  }

  const confidence = ["high", "medium", "low"].includes(value?.confidence) ? value.confidence : "medium";
  return {
    answerable: true,
    answer,
    sourceCitations,
    sources: sourceCitations.map((id) => knownSources.get(id)),
    confidence,
    scopeWarnings: Array.isArray(value?.scopeWarnings)
      ? value.scopeWarnings.filter((item) => typeof item === "string").slice(0, 3).map((item) => item.slice(0, 240))
      : [],
    privacyWarnings: Array.isArray(value?.privacyWarnings)
      ? value.privacyWarnings.filter((item) => typeof item === "string").slice(0, 3).map((item) => item.slice(0, 240))
      : [],
    suggestedCategory: typeof value?.suggestedCategory === "string" ? value.suggestedCategory.slice(0, 80) : "other",
    possibleExistingQA: value?.possibleExistingQA === true,
  };
}
