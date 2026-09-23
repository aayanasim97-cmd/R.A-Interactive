"use client";

import { useState } from "react";

const projectTypes = [
  "Business website",
  "Web app / dashboard",
  "Local business + SEO",
  "E-commerce",
  "AI product",
  "Not sure yet",
];

const budgets = [
  "A simple site (a few pages)",
  "A standard site (multiple pages)",
  "A larger site or web app",
  "A full product or platform",
  "Not sure yet — advise me",
];

type State = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — bots fill this hidden field, humans don't.
    if (data.company) {
      setState("success");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't send that. Please email us directly."
      );
    }
  }

  if (state === "success") {
    return (
      <div className="glass p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m5 13 4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mt-5 text-2xl font-bold">Message received.</h2>
        <p className="mt-2 text-ink-muted">
          Thanks — we&apos;ll get back to you within one business day. Keep an eye
          on your inbox.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="btn-ghost mt-6"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass space-y-5 p-6 sm:p-8" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="input"
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="input"
            placeholder="jane@company.com"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Project type" htmlFor="projectType">
          <select id="projectType" name="projectType" required className="input" defaultValue="">
            <option value="" disabled>
              Select one…
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Project scale" htmlFor="budget">
          <select id="budget" name="budget" required className="input" defaultValue="">
            <option value="" disabled>
              Select one…
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Tell us about your project" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="input resize-y"
          placeholder="What are you building, and what would a win look like?"
        />
      </Field>

      {state === "error" && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary w-full disabled:opacity-60"
      >
        {state === "submitting" ? "Sending…" : "Send inquiry"}
      </button>
      <p className="text-center text-xs text-ink-faint">
        No spam, ever. We reply within one business day.
      </p>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #22222a;
          background: rgba(11, 11, 13, 0.6);
          padding: 0.75rem 1rem;
          font-size: 0.925rem;
          color: #f5f5f4;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.input::placeholder) {
          color: #6e6e76;
        }
        :global(.input:focus) {
          outline: none;
          border-color: #ffb020;
          box-shadow: 0 0 0 3px rgba(255, 176, 32, 0.15);
        }
        :global(select.input) {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23A8A8AD' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}
