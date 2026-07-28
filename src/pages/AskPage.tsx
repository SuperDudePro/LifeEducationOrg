import { type FormEvent, useState } from "react";
import { PageShell } from "../components/PageShell";
import "../styles/ask.css";

type Source = { id: string; title: string; publicUrl: string };
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  warnings?: string[];
  pending?: boolean;
};

type StreamEvent =
  | { type: "meta" }
  | { type: "delta"; text: string }
  | { type: "sources"; sources: Source[] }
  | { type: "done"; warnings?: string[] };

const MAX_TURNS = 4;
const MAX_QUESTION_CHARS = 1200;

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AskPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("");
  const [asking, setAsking] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const [escalationState, setEscalationState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [escalationMessage, setEscalationMessage] = useState("");
  const userTurns = messages.filter((message) => message.role === "user").length;
  const lastQuestion = [...messages].reverse().find((message) => message.role === "user")?.content || "";
  const turnLimitReached = userTurns >= MAX_TURNS;

  async function handleAsk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || asking || turnLimitReached) return;

    const priorHistory = messages
      .filter((message) => !message.pending)
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));
    const userMessage: Message = { id: makeId("user"), role: "user", content: trimmed };
    const assistantId = makeId("assistant");
    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      pending: true,
    };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setQuestion("");
    setStatus("Checking the approved LifeEducation sources…");
    setAsking(true);
    setShowEscalation(false);
    setEscalationState("idle");
    setEscalationMessage("");

    const controller = new AbortController();

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, history: priorHistory, website: "" }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const error = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(error?.error || "The answer service is unavailable.");
      }
      if (!response.body) throw new Error("The answer stream did not start.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";

      const applyEvent = (streamEvent: StreamEvent) => {
        if (streamEvent.type === "delta") answer += streamEvent.text;
        setMessages((current) => current.map((message) => {
          if (message.id !== assistantId) return message;
          if (streamEvent.type === "delta") return { ...message, content: answer, pending: false };
          if (streamEvent.type === "sources") return { ...message, sources: streamEvent.sources };
          if (streamEvent.type === "done") return { ...message, pending: false, warnings: streamEvent.warnings || [] };
          return message;
        }));
      };

      while (true) {
        const { done, value } = await reader.read();
        buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
        const lines = buffer.split("\n");
        buffer = done ? "" : lines.pop() || "";
        for (const line of lines) {
          if (!line.trim()) continue;
          applyEvent(JSON.parse(line) as StreamEvent);
        }
        if (done) break;
      }
      if (buffer.trim()) applyEvent(JSON.parse(buffer) as StreamEvent);
      setStatus("");
      setShowEscalation(true);
    } catch (error) {
      if (controller.signal.aborted) return;
      const message = error instanceof Error ? error.message : "The answer service is unavailable.";
      setMessages((current) => current.map((item) =>
        item.id === assistantId
          ? { ...item, content: message, pending: false, warnings: [] }
          : item,
      ));
      setStatus("");
      setShowEscalation(true);
    } finally {
      setAsking(false);
    }
  }

  async function handleEscalation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!lastQuestion || escalationState === "sending") return;
    setEscalationState("sending");
    setEscalationMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/ask-escalate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: lastQuestion,
          history: messages.slice(-8).map(({ role, content }) => ({ role, content })),
          email: String(formData.get("email") || ""),
          note: String(formData.get("note") || ""),
          sendCopy: formData.get("sendCopy") === "yes",
          website: String(formData.get("website") || ""),
        }),
      });
      const result = await response.json().catch(() => null) as { error?: string; warning?: string } | null;
      if (!response.ok) throw new Error(result?.error || "The question could not be sent.");
      setEscalationState("sent");
      setEscalationMessage(result?.warning || "Your question was sent to Will.");
      form.reset();
    } catch (error) {
      setEscalationState("error");
      setEscalationMessage(error instanceof Error ? error.message : "The question could not be sent.");
    }
  }

  return (
    <PageShell>
      <section className="ask-page" aria-labelledby="ask-title">
        <div className="ask-intro">
          <div>
            <span className="ask-beta">Private beta</span>
            <h1 id="ask-title">Ask LifeEducation</h1>
            <p>
              Ask about the current LifeEducation framework. Answers are limited to the approved public
              sources and show exactly which source pages support them.
            </p>
          </div>
          <aside className="ask-boundary" aria-label="Beta boundaries">
            <strong>What this is</strong>
            <p>A source-grounded explainer, not a general chatbot.</p>
            <strong>What it is not</strong>
            <p>No web browsing, private documents, diagnosis, or personal legal or medical advice.</p>
            <strong>Outside the sources</strong>
            <p>It is not public LifeEducation yet—it may still be unwritten, unfinished, or untested.</p>
          </aside>
        </div>

        <div className="ask-chat" aria-label="Conversation">
          {messages.length === 0 && (
            <div className="ask-empty">
              <p>Good starting questions:</p>
              <button type="button" onClick={() => setQuestion("What is the 18-year-old Floor?")}>
                What is the 18-year-old Floor?
              </button>
              <button type="button" onClick={() => setQuestion("Is LifeEducation anti-school?")}>
                Is LifeEducation anti-school?
              </button>
              <button type="button" onClick={() => setQuestion("What are the ten Domains for?")}>
                What are the ten Domains for?
              </button>
            </div>
          )}

          {messages.map((message) => (
            <article key={message.id} className={`ask-message ask-message-${message.role}`}>
              <div className="ask-message-label">{message.role === "user" ? "You" : "LifeEducation"}</div>
              <div className="ask-message-text">
                {message.content || (message.pending ? "Reading…" : "")}
              </div>
              {message.sources && message.sources.length > 0 && (
                <div className="ask-sources">
                  <strong>Sources</strong>
                  <ul>
                    {message.sources.map((source) => (
                      <li key={source.id}>
                        <a href={source.publicUrl} target="_blank" rel="noreferrer">{source.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {message.warnings && message.warnings.length > 0 && (
                <ul className="ask-warnings">
                  {message.warnings.map((warning) => <li key={warning}>{warning}</li>)}
                </ul>
              )}
            </article>
          ))}
          <div className="ask-status" aria-live="polite">{status}</div>
        </div>

        <form className="ask-form" onSubmit={handleAsk}>
          <div className="ask-honeypot" aria-hidden="true">
            <label htmlFor="ask-website">Website</label>
            <input id="ask-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <label htmlFor="ask-question">Your question</label>
          <textarea
            id="ask-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={MAX_QUESTION_CHARS}
            rows={4}
            disabled={asking || turnLimitReached}
            placeholder="Ask about the Floor, Domains, purpose, or current Q&A…"
          />
          <div className="ask-form-row">
            <span>{question.length}/{MAX_QUESTION_CHARS} · {userTurns}/{MAX_TURNS} questions</span>
            <button type="submit" disabled={!question.trim() || asking || turnLimitReached}>
              {asking ? "Checking sources…" : "Ask"}
            </button>
          </div>
          {turnLimitReached && (
            <p className="ask-limit">This beta conversation has reached its four-question limit. Refresh to start a new one.</p>
          )}
        </form>

        {showEscalation && lastQuestion && (
          <details className="ask-escalation">
            <summary>Want Will to answer or review this?</summary>
            <form onSubmit={handleEscalation}>
              <div className="ask-honeypot" aria-hidden="true">
                <label htmlFor="escalate-website">Website</label>
                <input id="escalate-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <label htmlFor="escalate-note">Optional note</label>
              <textarea id="escalate-note" name="note" maxLength={1800} rows={3} />
              <label htmlFor="escalate-email">Email, if you want a reply or copy</label>
              <input id="escalate-email" name="email" type="email" maxLength={180} autoComplete="email" />
              <label className="ask-checkbox">
                <input name="sendCopy" type="checkbox" value="yes" />
                Email me a copy of my question
              </label>
              <button type="submit" disabled={escalationState === "sending"}>
                {escalationState === "sending" ? "Sending…" : "Send to Will"}
              </button>
              <p
                className={escalationState === "error" ? "ask-escalation-error" : "ask-escalation-status"}
                aria-live="polite"
              >
                {escalationMessage}
              </p>
            </form>
          </details>
        )}

        <p className="ask-privacy">
          Questions are sent only to produce the answer. The beta does not intentionally store conversation
          transcripts. If you choose “Send to Will,” that question and the bounded conversation are emailed to him.
        </p>
      </section>
    </PageShell>
  );
}
