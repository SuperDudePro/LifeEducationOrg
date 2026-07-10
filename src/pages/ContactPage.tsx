import { type CSSProperties, type FormEvent, useState } from "react";
import { PageShell } from "../components/PageShell";

type FormState = "idle" | "sending" | "sent" | "partial" | "error";

const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "1.35rem",
  maxWidth: "760px",
};

const hiddenFieldStyle: CSSProperties = {
  position: "absolute",
  left: "-9999px",
  width: "1px",
  height: "1px",
  overflow: "hidden",
};

const fieldStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
};

const labelStyle: CSSProperties = {
  color: "#0f172a",
  fontWeight: 800,
};

const controlStyle: CSSProperties = {
  width: "100%",
  border: "2px solid rgba(15,23,42,0.18)",
  borderRadius: "14px",
  color: "#0f172a",
  font: "inherit",
  padding: "0.78rem 0.85rem",
};

const textareaStyle: CSSProperties = {
  ...controlStyle,
  minHeight: "190px",
  resize: "vertical",
};

const checkboxRowStyle: CSSProperties = {
  alignItems: "flex-start",
  display: "flex",
  gap: "0.7rem",
};

const checkboxStyle: CSSProperties = {
  flex: "0 0 auto",
  height: "1.1rem",
  marginTop: "0.15rem",
  width: "1.1rem",
};

const checkboxTextStyle: CSSProperties = {
  color: "#334155",
  lineHeight: 1.5,
};

const statusStyle: CSSProperties = {
  color: "#0D4B39",
  fontWeight: 800,
  marginBottom: 0,
};

const warningStatusStyle: CSSProperties = {
  ...statusStyle,
  color: "#7c4a03",
};

const errorStatusStyle: CSSProperties = {
  ...statusStyle,
  color: "#8b1a1a",
};

export function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("sending");
    setErrorMessage("");
    setSuccessMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as {
        error?: string;
        subscribed?: boolean;
        warning?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.error ?? "The message did not send.");
      }

      const requestedSubscription = formData.get("subscribe") === "yes";
      form.reset();

      if (result?.warning) {
        setSuccessMessage(result.warning);
        setFormState("partial");
        return;
      }

      setSuccessMessage(
        requestedSubscription && result?.subscribed
          ? "Message sent, and you are subscribed."
          : "Message sent.",
      );
      setFormState("sent");
    } catch (error) {
      setFormState("error");
      setErrorMessage(error instanceof Error ? error.message : "The message did not send.");
    }
  }

  const isSending = formState === "sending";

  return (
    <PageShell>
      <section className="doc-section">
        <p className="doc-section-text">
          I’m building LifeEducation in public because the target matters too much to hide the weak spots. If you see a hole in the logic, a better example, or something that needs to be said more plainly, send it.
        </p>

        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={hiddenFieldStyle} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle} htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" required maxLength={120} style={controlStyle} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle} htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required maxLength={180} style={controlStyle} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle} htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" maxLength={160} style={controlStyle} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle} htmlFor="message">Message</label>
            <textarea id="message" name="message" required maxLength={4000} rows={8} style={textareaStyle} />
          </div>

          <label style={checkboxRowStyle}>
            <input type="checkbox" name="subscribe" value="yes" style={checkboxStyle} />
            <span style={checkboxTextStyle}>Also send me new LifeEducation posts by email.</span>
          </label>

          <button className="why-button" type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send note"}
          </button>

          {formState === "sent" && <p style={statusStyle}>{successMessage}</p>}
          {formState === "partial" && <p style={warningStatusStyle}>{successMessage}</p>}
          {formState === "error" && <p style={errorStatusStyle}>{errorMessage}</p>}
        </form>
      </section>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-text">© LifeEducation.org</div>
          <a className="footer-link" href="/contact">Contact</a>
        </div>
      </footer>
    </PageShell>
  );
}
