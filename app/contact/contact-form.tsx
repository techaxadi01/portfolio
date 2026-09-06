"use client";

import { useState } from "react";

interface ContactFormProps {
  email: string;
  recipientName?: string;
}

export default function ContactForm({ email, recipientName = "there" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    senderEmail: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Form submission simulation / direct mailto option
    setTimeout(() => {
      setStatus("sent");
    }, 600);
  };

  return (
    <div className="glass-card p-6 sm:p-8">
      <div className="border-b border-[#30363d] pb-4 mb-6">
        <h2 className="text-xl font-bold text-white">Send a Direct Message</h2>
        <p className="text-xs text-[#8b949e] mt-1">
          Have an inquiry? Fill out the details below to reach out directly.
        </p>
      </div>

      {status === "sent" ? (
        <div className="py-12 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#00e676]/15 text-[#00e676] shadow-[0_0_16px_rgba(0,230,118,0.3)]">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white">Message Prepared!</h3>
          <p className="text-sm text-[#8b949e] max-w-sm mx-auto">
            Thank you, {formData.name || "friend"}. You can also email directly at{" "}
            <a href={`mailto:${email}`} className="text-[#00e676] underline">
              {email}
            </a>.
          </p>
          <div className="pt-2">
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}&body=${encodeURIComponent(
                `Hi ${recipientName},\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.senderEmail})`
              )}`}
              className="btn-accent text-xs inline-block"
            >
              Open in Mail Client
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              setFormData({ name: "", senderEmail: "", subject: "", message: "" });
              setStatus("idle");
            }}
            className="text-xs font-mono text-[#8b949e] hover:text-white block mx-auto mt-4"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-xs font-mono text-[#8b949e] block mb-1.5">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. John Doe"
                className="w-full rounded-lg border border-[#30363d] bg-[#161b22] px-3.5 py-2.5 text-sm text-[#e6edf3] placeholder-[#6e7681] focus:border-[#00e676] focus:outline-none focus:ring-1 focus:ring-[#00e676] transition-all"
              />
            </div>

            <div>
              <label htmlFor="senderEmail" className="text-xs font-mono text-[#8b949e] block mb-1.5">
                Your Email Address
              </label>
              <input
                id="senderEmail"
                type="email"
                required
                value={formData.senderEmail}
                onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                placeholder="e.g. john@example.com"
                className="w-full rounded-lg border border-[#30363d] bg-[#161b22] px-3.5 py-2.5 text-sm text-[#e6edf3] placeholder-[#6e7681] focus:border-[#00e676] focus:outline-none focus:ring-1 focus:ring-[#00e676] transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="text-xs font-mono text-[#8b949e] block mb-1.5">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Internship Opportunity / Full-Stack Project"
              className="w-full rounded-lg border border-[#30363d] bg-[#161b22] px-3.5 py-2.5 text-sm text-[#e6edf3] placeholder-[#6e7681] focus:border-[#00e676] focus:outline-none focus:ring-1 focus:ring-[#00e676] transition-all"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-xs font-mono text-[#8b949e] block mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your team, timeline, and what you're looking to build..."
              className="w-full rounded-lg border border-[#30363d] bg-[#161b22] px-3.5 py-2.5 text-sm text-[#e6edf3] placeholder-[#6e7681] focus:border-[#00e676] focus:outline-none focus:ring-1 focus:ring-[#00e676] transition-all resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-accent w-full text-sm py-2.5"
            >
              {status === "submitting" ? "Sending..." : "Submit Message"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
