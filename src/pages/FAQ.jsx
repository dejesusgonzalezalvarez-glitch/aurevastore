import { useState } from "react";
import { Seo, faqSchema } from "@/lib/seo";

const SECTIONS = [
  {
    title: "Your Jewelry",
    items: [
      { q: "How does Build Your Story work?", a: "Every piece is designed around a meaning — a heart, a star, an initial — and on select pieces you can choose the finish and chain style that fit you." },
      { q: "Can I choose the finish or chain style?", a: "Yes, wherever it's offered on the product page — Silver or Gold finish, and a choice of chain styles." },
      { q: "Can I build a fuller collection over time?", a: "Yes. Many customers layer several pieces together, and buying more than one unlocks bundle savings — see any product page for current bundle pricing." },
      { q: "What materials are used?", a: "We carefully select our materials. Specific details are confirmed with our supplier and available on each product page." },
      { q: "Is it suitable for everyday wear?", a: "Yes. AUREVA pieces are designed to be worn, layered and loved every day." },
    ],
  },
  {
    title: "Orders",
    items: [
      { q: "Can I change my order?", a: "Please contact our support team as quickly as possible after placing your order. We'll do our best to accommodate changes before your item is processed." },
      { q: "Can I cancel my order?", a: "Contact support promptly. If your order hasn't been processed yet, we can help you cancel it." },
    ],
  },
  {
    title: "Shipping",
    items: [
      { q: "Where do you ship?", a: "We ship to the United States and internationally. Shipping times vary by destination." },
      { q: "How can I track my order?", a: "Once your order ships, you'll receive tracking information when it becomes available. You can also check your order on our Track Your Order page." },
    ],
  },
  {
    title: "Returns",
    items: [
      { q: "Can personalized items be returned?", a: "Because personalized pieces are made uniquely for you, they may be treated differently from standard items. Please review our Returns & Refunds policy for full details." },
      { q: "What should I do if my order arrives damaged?", a: "Please contact our support team before returning any item. We'll help resolve it quickly." },
    ],
  },
];

export default function FAQ() {
  const allQuestions = SECTIONS.flatMap((s) => s.items);
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-20 sm:py-28">
      <Seo
        title="FAQ — AUREVA | Personalized Jewelry Help"
        description="Answers about personalized jewelry, how personalization works, shipping, returns and order tracking at AUREVA."
        canonicalPath="/faq"
        jsonLd={[faqSchema(allQuestions)]}
      />
      <div className="text-center mb-16">
        <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-4">Help Center</p>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground">Frequently Asked Questions</h1>
      </div>
      <div className="space-y-14">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-2xl text-foreground mb-6 pb-3 border-b hairline">{s.title}</h2>
            <div className="space-y-2">
              {s.items.map((it, i) => <Accordion key={i} {...it} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b hairline">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-between w-full py-5 text-left">
        <span className="text-[15px] text-foreground font-light pr-4">{q}</span>
        <span className="text-muted-foreground text-xl leading-none shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="pb-6 text-sm text-muted-foreground leading-relaxed">{a}</p>}
    </div>
  );
}