import { Link } from "react-router-dom";
import PolicyPage from "@/components/PolicyPage";

export default function PrivacyPolicy() {
  return (
    <PolicyPage eyebrow="Legal" title="Privacy Policy">
      <Section title="Information We Collect">
        <p>We collect information you provide directly — such as your name, email, shipping address and payment details when you place an order or contact us — as well as information gathered automatically, such as browsing and device data.</p>
      </Section>
      <Section title="How We Use Your Information">
        <p>We use your information to process orders, communicate with you about your purchases, provide customer support, and improve our store and your experience.</p>
      </Section>
      <Section title="Order Processing">
        <p>Your payment and order information is used solely to fulfill your purchases. Payment is processed through secure third-party providers.</p>
      </Section>
      <Section title="Emails & Marketing">
        <p>With your consent, we may send you emails about new collections, meaningful moments and exclusive offers. You can unsubscribe at any time using the link in any email.</p>
      </Section>
      <Section title="Cookies">
        <p>We use cookies and similar technologies to operate our store, remember your preferences, and understand how the site is used. You can control cookies through your browser settings.</p>
      </Section>
      <Section title="Service Providers">
        <p>We work with trusted third-party service providers — including payment, shipping and analytics partners — who help us run our store. They only access the information needed to perform their services.</p>
      </Section>
      <Section title="Security">
        <p>We take reasonable measures to protect your information. However, no method of transmission or storage is completely secure.</p>
      </Section>
      <Section title="Your Rights">
        <p>Depending on your location, you may have rights to access, correct or delete your personal information, or to object to certain processing. To exercise these rights, contact us.</p>
      </Section>
      <Section title="Contact Us">
        <p>If you have any questions about privacy, we're happy to help.</p>
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