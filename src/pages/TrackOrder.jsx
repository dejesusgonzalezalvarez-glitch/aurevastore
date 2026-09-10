import { Link } from "react-router-dom";
import { Seo, SUPPORT_EMAIL } from "@/lib/seo";

export default function TrackOrder() {
  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 py-20 sm:py-28">
      <Seo
        title="Track Your Order — AUREVA"
        description="How to track your AUREVA order."
        canonicalPath="/track-order"
      />
      <div className="text-center mb-14">
        <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-4">Order Status</p>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground">Track Your Order</h1>
      </div>

      <div className="p-8 border hairline text-center space-y-4">
        <p className="text-foreground">
          Once your order ships, we'll email you tracking details at the address you used at checkout.
        </p>
        <p className="text-sm text-muted-foreground">
          Can't find that email, or has it been a while? We're happy to look it up for you.
        </p>
        <Link
          to="/contact"
          className="inline-block mt-4 text-[11px] tracking-wide-sm uppercase bg-foreground text-background px-8 py-4 hover:bg-foreground/85 transition-colors"
        >
          Contact Us About an Order
        </Link>
        <p className="text-xs text-muted-foreground pt-2">
          Or email us directly at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-foreground underline">{SUPPORT_EMAIL}</a> with your order number.
        </p>
      </div>
    </div>
  );
}
