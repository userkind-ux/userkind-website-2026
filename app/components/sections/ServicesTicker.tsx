'use client';

const services = ['Solution Design', 'UX Design', 'UI Design', 'Interaction Design'];

export function ServicesTicker() {
  return (
    <section className="bg-[var(--color-lilac)] border-y-2 border-black overflow-hidden">
      <div className="flex items-center gap-6 py-6 animate-ticker">
        {[...services, ...services].map((service, i) => (
          <div key={i} className="flex items-center gap-6 flex-shrink-0">
            <span className="font-heading text-ticker text-black whitespace-nowrap">{service}</span>
            <svg width="26" height="30" viewBox="0 0 26 30" fill="currentColor"><path d="M13 0L26 15L13 30L0 15L13 0Z" /></svg>
          </div>
        ))}
      </div>
    </section>
  );
}

