import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { submitContactMessage } from "@/lib/contact.functions";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const submit = useServerFn(submitContactMessage);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await submit({ data: form });
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-sm">
        <div className="flex items-center gap-2 font-medium text-primary">
          <CheckCircle2 className="h-5 w-5" /> Message sent
        </div>
        <p className="mt-2 text-muted-foreground">
          Thanks for reaching out — I'll get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs text-primary hover:text-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Name</label>
          <input
            required
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputCls}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</label>
          <input
            required
            type="email"
            maxLength={255}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputCls}
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Message</label>
        <textarea
          required
          maxLength={2000}
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={inputCls}
          placeholder="Tell me about your project, role, or question…"
        />
      </div>
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : null}
      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send message
            </>
          )}
        </button>
      </div>
    </form>
  );
}