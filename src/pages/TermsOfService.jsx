import { Link } from "react-router-dom";
import PolicyPage from "@/components/PolicyPage";

export default function TermsOfService() {
  return (
    <PolicyPage eyebrow="Legal" title="Terms of Service">
      <Section title="Use of the Store">
        <p>By accessing and using this store, you agree to these terms. Please use our site lawfully and with respect for others.</p>
      </Section>
      <Section title="Products">
        <p>We strive to display our products accurately. Colors and details may vary slightly from what you see on your screen. Personalized items are made to your specifications.</p>
      </Section>
      <Section title="Pricing">
        <p>All prices are shown in the store's currency and are subject to change. We reserve the right to correct errors and update pricing at any time.</p>
      </Section>
      <Section title="Orders">
        <p>Placing an order is a request to purchase. We may decline or cancel an order; if we do, any payment made will be refunded.</p>
      </Section>
      <Section title="Payments">
        <p>Payments are processed through secure third-party providers. By placing an order you authorize us to charge your selected payment method.</p>
      </Section>
      <Section title="Intellectual Property">
        <p>All content on this store — including the AUREVA name, designs, images and copy — is owned by or licensed to us and protected by intellectual property laws.</p>
      </Section>
      <Section title="Limitations">
        <p>To the fullest extent permitted by law, we are not liable for indirect or consequential damages arising from your use of our store.</p>
      </Section>
      <Section title="Responsibility">
        <p>We are responsible for providing the products you order and the support you need. We are not responsible for circumstances beyond our reasonable control.</p>
      </Section>
      <Section title="Contact">
        <p>Questions about these terms? We're here to help.</p>
        <div className="pt-3">
          <Link to="/contact" className="text-[11px] tracking-wide-sm uppercase border hairline px-6 py-3 inline-block hover:bg-secondary transition-colors">
            Contact Us
          </Link>
        </div>
      </Section>
    </PolicyPage>
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