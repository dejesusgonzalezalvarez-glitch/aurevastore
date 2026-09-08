export default function PolicyPage({ eyebrow, title, children }) {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-20 sm:py-28">
      <div className="text-center mb-16">
        {eyebrow && <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-4">{eyebrow}</p>}
        <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground">{title}</h1>
      </div>
      <div className="prose-policy">{children}</div>
    </div>
  );
}