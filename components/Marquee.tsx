const items = [
  "Business Websites",
  "Web Apps",
  "AI Products",
  "Local SEO",
  "E-commerce",
  "Dashboards",
  "Booking Systems",
  "Landing Pages",
];

export function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div
      className="relative flex overflow-hidden border-y border-base-border bg-base-soft/40 py-5"
      aria-hidden="true"
    >
      <div className="flex shrink-0 animate-marquee gap-10 pr-10 motion-reduce:animate-none">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-sm font-medium uppercase tracking-[0.2em] text-ink-faint"
          >
            {item}
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-base to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base to-transparent" />
    </div>
  );
}
