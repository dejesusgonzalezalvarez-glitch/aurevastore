import { useState } from "react";
import { Seo } from "@/lib/seo";

const CATEGORIES = ["Order Question", "Shipping", "Returns", "Product Question", "Other"];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", order: "", category: CATEGORIES[0], message: "" });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-8 py-20 sm:py-28">
      <Seo
        title="Contact — AUREVA"
        description="Contact AUREVA for help with personalized jewelry orders, shipping, returns or product questions."
        canonicalPath="/contact"
      />
      <div className="text-center mb-14">
        <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-4">Contact Us</p>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground">We're here to help.</h1>
        <p className="mt-5 text-muted-foreground">Response time may vary — we'll get back to you as soon as we can.</p>
      </div>

      {sent ? (
        <div className="text-center py-16 border hairline">
          <p className="font-display text-3xl font-light text-foreground">Thank you.</p>
          <p className="mt-4 text-muted-foreground">Your message has been received. We'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
          <Field label="Name"><input required value={form.name} onChange={update("name")} className="contact-input" /></Field>
          <Field label="Email"><input type="email" required value={form.email} onChange={update("email")} className="contact-input" /></Field>
          <Field label="Order Number"><input value={form.order} onChange={update("order")} className="contact-input" /></Field>
          <Field label="Category">
            <select value={form.category} onChange={update("category")} className="contact-input cursor-pointer">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Message"><textarea required rows={5} value={form.message} onChange={update("message")} className="contact-input resize-none" /></Field>
          <button type="submit" className="w-full text-[11px] tracking-wide-sm uppercase bg-foreground text-background py-4 hover:bg-foreground/85 transition-colors">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-wide-sm uppercase text-muted-foreground block mb-2">{label}</span>
      {children}
    </label>
  );
}