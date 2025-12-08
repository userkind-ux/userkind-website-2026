'use client';

const testimonials = [
  { quote: "... because they're the best at what they do", author: 'Cameron Gomes' },
  { quote: "... because they're the best at what they do", author: 'Cameron Gomes' },
  { quote: "... because they're the best at what they do", author: 'Cameron Gomes' },
];

export function TestimonialsTicker() {
  return (
    <section className="bg-[var(--color-yellow-light)] border-y-2 border-black overflow-hidden">
      <div className="flex items-center gap-16 py-4 animate-ticker-slow">
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="flex items-center gap-6 shrink-0">
            <p className="font-special text-special-lg text-black whitespace-nowrap">"{t.quote}"</p>
            <p className="font-body text-body-lg text-black whitespace-nowrap">{t.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

