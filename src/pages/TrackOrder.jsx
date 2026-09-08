import { useState } from "react";
import { Seo } from "@/lib/seo";

export default function TrackOrder() {
  const [order, setOrder] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 py-20 sm:py-28">
      <Seo
        title="Track Your Order — AUREVA"
        description="Track your AUREVA order with your order number and email."
        canonicalPath="/track-order"
      />
      <div className="text-center mb-14">
        <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-4">Order Status</p>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground">Track Your Order</h1>
        <p className="mt-5 text-muted-foreground">Enter your order details to see your current status.</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setChecked(true); }} className="space-y-6">
        <label className="block">
          <span className="text-[11px] tracking-wide-sm uppercase text-muted-foreground block mb-2">Order Number</span>
          <input required value={order} onChange={(e) => setOrder(e.target.value)} className="contact-input" placeholder="e.g. #1001" />
        </label>
        <label className="block">
          <span className="text-[11px] tracking-wide-sm uppercase text-muted-foreground block mb-2">Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="contact-input" />
        </label>
        <button type="submit" className="w-full text-[11px] tracking-wide-sm uppercase bg-foreground text-background py-4 hover:bg-foreground/85 transition-colors">
          Track Order
        </button>
      </form>

      {checked && (
        <div className="mt-10 p-8 border hairline text-center">
          <p className="font-display text-2xl text-foreground">Order received</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Live tracking will appear here once your order ships and tracking becomes available. You'll also receive an email with tracking details.
          </p>
        </div>
      )}
    </div>
  );
}