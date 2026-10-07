const items = [
  ["Bulk orders", "From 25 to 500+ hampers"],
  ["Custom branding", "Logo, packaging and message cards"],
  ["Multi-address delivery", "One address or many, across India"],
  ["GST invoicing", "Company-ready paperwork"],
];

export default function CapabilityStrip() {
  return (
    <section aria-label="What we offer" className="border-y border-border bg-surface">
      <ul className="container-page grid grid-cols-2 gap-x-6 gap-y-6 py-8 md:grid-cols-4">
        {items.map(([t, d]) => (
          <li key={t}><p className="font-display text-xl font-semibold md:text-2xl">{t}</p><p className="t-caption mt-0.5">{d}</p></li>
        ))}
      </ul>
    </section>
  );
}
