'use client';

const usps = [
  { icon: '✏️', title: 'Design-led approach', description: "We design what the experience needs to be first, then pick the tech that fits your project best - not just the one we know." },
  { icon: '😊', title: 'Perform & Delight', description: 'We care about the little things that make a big difference. Clear, polished, and always with the end goal in mind.' },
  { icon: '📌', title: 'Your project matters', description: "No matter how big or small your project is, we stay close, care about the outcome, and work like it's our name on the line too." },
  { icon: '❤️', title: 'Sharing is caring', description: 'We explain things, share thinking, and bring you into the process, because we want you to feel confident, not confused.' },
];

export function USPSection() {
  return (
    <section className="bg-[var(--color-lilac-lighter)] border-y-2 border-black py-[var(--spacing-lg)]">
      <div className="container-uk">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {usps.map((usp, i) => (
            <div key={i} className="flex-1 flex flex-col gap-6 items-center text-center px-6">
              <div className="text-4xl">{usp.icon}</div>
              <h3 className="font-heading text-h4 text-black">{usp.title}</h3>
              <p className="font-body text-body-md text-black max-w-[320px]">{usp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

