import PolicyPage from "@/components/PolicyPage";
import { Seo } from "@/lib/seo";

export default function ShippingPolicy() {
  return (
    <>
      <Seo
        title="Shipping Policy — AUREVA"
        description="AUREVA shipping policy: order processing, delivery times and tracking for personalized jewelry."
        canonicalPath="/shipping-policy"
      />
      <PolicyPage eyebrow="Shipping" title="Shipping Policy">
      <Section title="Order Processing">
        <p>All orders require a processing period before shipment, as each piece is carefully prepared and, where applicable, personalized to your selections. You'll receive a confirmation email once your order has been placed and another when it ships.</p>
      </Section>
      <Section title="Shipping Times">
        <p>Shipping times vary by destination. Estimated timeframes will be confirmed at checkout based on your location and the selected shipping method.</p>
        <ul>
          <li><strong>United States:</strong> Processing plus standard delivery time, shown at checkout.</li>
          <li><strong>International Shipping:</strong> Processing plus international delivery time, shown at checkout. Customs processing may add time.</li>
        </ul>
      </Section>
      <Section title="Tracking">
        <p>When your order ships, you'll receive tracking information as soon as it becomes available. You can also check your status on our Track Your Order page.</p>
      </Section>
      <Section title="Address Changes">
        <p>If you need to modify your shipping address, please contact our support team as quickly as possible. We'll do our best to update it before your order is processed for shipment.</p>
      </Section>
      <Section title="Delays">
        <p>While we work to deliver within the estimated timeframes, external factors such as carrier delays, customs, weather or peak seasons can affect delivery times and are outside our control. We appreciate your patience.</p>
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