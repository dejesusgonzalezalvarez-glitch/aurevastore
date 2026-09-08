import { Link } from "react-router-dom";
import PolicyPage from "@/components/PolicyPage";
import { Seo } from "@/lib/seo";

export default function ReturnsRefunds() {
  return (
    <>
      <Seo
        title="Returns & Refunds — AUREVA"
        description="AUREVA returns and refunds policy for standard and personalized jewelry."
        canonicalPath="/returns"
      />
      <PolicyPage eyebrow="Returns" title="Returns & Refunds">
      <Section title="Our Approach">
        <p>We want you to love your AUREVA piece. If something isn't right, we're here to help. Please review the conditions below.</p>
      </Section>
      <Section title="Standard Products">
        <p>Standard, non-personalized items may be returned within the return period defined in your store settings, provided they are unworn, in original condition and in their original packaging.</p>
      </Section>
      <Section title="Personalized Products">
        <p>Because personalized pieces are made uniquely for you, they may not be eligible for return unless they arrive damaged or incorrect. Please review your personalization carefully before ordering.</p>
      </Section>
      <Section title="Damaged or Incorrect Items">
        <p>If your order arrives damaged or incorrect, please contact our support team promptly with details and photos. We'll make it right.</p>
      </Section>
      <Section title="How to Start a Return">
        <p>Contact our support team before returning any item. We'll guide you through the process and provide the next steps.</p>
        <div className="pt-3">
          <Link to="/contact" className="text-[11px] tracking-wide-sm uppercase border hairline px-6 py-3 inline-block hover:bg-secondary transition-colors">
            Contact Support
          </Link>
        </div>
      </Section>
      <Section title="Refunds">
        <p>Once your return is received and inspected, an eligible refund will be issued to your original payment method. Processing times depend on your bank or payment provider.</p>
      </Section>
    </PolicyPage>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-2xl text-foreground mb-4">{title}</h2>
      <div className="space-y-3 text-[15px] text-muted-foreground leading-relaxed font-light">{children}</div>
    </div>
  );
}