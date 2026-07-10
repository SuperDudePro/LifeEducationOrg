import { type CSSProperties, type FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

type Props = {
  idPrefix: string;
};

const panelStyle: CSSProperties = {
  background: "#0D4B39",
  borderRadius: "24px",
  color: "#ffffff",
  margin: "2rem 0 2.75rem",
  padding: "clamp(1.4rem, 4vw, 2.4rem)",
};

const headingStyle: CSSProperties = {
  color: "#ffffff",
  fontSize: "clamp(1.55rem, 3vw, 2.2rem)",
  lineHeight: 1.1,
  margin: 0,
};

const copyStyle: CSSProperties = {
  color: "rgba(255,255,255,0.86)",
  fontSize: "1rem",
  lineHeight: 1.6,
  margin: "0.65rem 0 1.2rem",
  maxWidth: "680px",
};

const formStyle: CSSProperties = {
  alignItems: "stretch",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.7rem",
  maxWidth: "720px",
};

const inputStyle: CSSProperties = {
  border: "2px solid rgba(255,255,255,0.3)",
  borderRadius: "12px",
  flex: "1 1 260px",
  font: "inherit",
  minHeight: "48px",
  padding: "0.75rem 0.9rem",
};

const buttonStyle: CSSProperties = {
  background: "#ffffff",
  border: 0,
  borderRadius: "12px",
  color: "#0D4B39",
  cursor: "pointer",
  font: "inherit",
  fontWeight: 800,
  minHeight: "48px",
  padding: "0.75rem 1.2rem",
};

const hiddenFieldStyle: CSSProperties = {
  height: "1px",
  left: "-9999px",
  overflow: "hidden",
  position: "absolute",
  width: "1px",
};

const statusStyle: CSSProperties = {
  color: "#ffffff",
  fontWeight: 800,
  margin: "0.85rem 0 0",
};

const errorStyle: CSSProperties = {
  ...statusStyle,
  color: "#ffe3e3",
};

export function SubscribeForm({ idPrefix }: Props) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const emailId = `${idPrefix}-subscriber-email`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error ?? "Subscription could not be completed.");
      }

      form.reset();
      setMessage("You’re subscribed. I’ll send a note when a new post is published.");
      setFormState("sent");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Subscription could not be completed.");
      setFormState("error");
    }
  }

  const isSending = formState === "sending";

  return (
    <section style={panelStyle} aria-labelledby={`${idPrefix}-subscribe-heading`}>
      <h2 id={`${idPrefix}-subscribe-heading`} style={headingStyle}>Get new LifeEducation posts by email.</h2>
      <p style={copyStyle}>No schedule and no filler. Just a note when something new is published.</p>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={hiddenFieldStyle} aria-hidden="true">
          <label htmlFor={`${idPrefix}-website`}>Website</label>
          <input id={`${idPrefix}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label htmlFor={emailId} style={hiddenFieldStyle}>Email address</label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          required
          maxLength={180}
          style={inputStyle}
        />
        <button type="submit" disabled={isSending} style={buttonStyle}>
          {isSending ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {formState === "sent" && <p style={statusStyle}>{message}</p>}
      {formState === "error" && <p style={errorStyle}>{message}</p>}
    </section>
  );
}
