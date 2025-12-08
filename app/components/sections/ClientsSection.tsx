'use client';

import { Button } from '../ui/Button';

const clients = [
  { heading: 'Business owners', description: "As fellow business owners, we understand no one has more skin in the game than you.\n\nPremium design and smart efficient solutions are how you stand apart and get ahead." },
  { heading: '', description: "Choose Userkind when you need a partner who 'gets it', understands what you want and delivers what you need", isQuote: true },
  { heading: "CEO's & CMOs", description: "Big ideas and creative solutions are vital, but we know what you need is delivery and reliability.\n\nOur solutions are focused on achieving business goals with efficiency" },
  { heading: 'Marketers', description: "We know the frustration of clunky sites and a weak brand experience.\n\nWe deliver modern design, content flexibility and easy site management" },
  { heading: 'E-commerce Managers', description: "We feel your pain. Inflexible, hard-to-manage stores are frustrating.\n\nWe create storefronts that elevate brands, reduce friction and boost conversion" },
];

export function ClientsSection() {
  return (
    <section className="bg-[var(--color-grey)]">
      <div className="py-[var(--spacing-xl)] flex flex-col items-center">
        <div className="w-full max-w-[800px] mx-auto px-[var(--spacing-xs)] text-center">
          <h2 className="font-heading text-h2 text-black mb-8">Who we help</h2>
          <p className="font-body text-body-lg text-black">Why brands, business leaders and ambitious marketers like to work with us</p>
        </div>
      </div>

      <div className="overflow-x-auto pb-[var(--spacing-lg)]">
        <div className="flex gap-4 pl-[var(--container-padding)] pr-0">
          {clients.map((client, i) => (
            <article key={i} className={`${client.isQuote ? 'bg-[var(--color-yellow)]' : 'bg-white'} border-2 border-black rounded-[var(--radius-lg)] p-8 pr-12 h-[530px] w-[395px] flex-shrink-0`}>
              {client.isQuote ? (
                <p className="font-special text-special-lg text-black">"{client.description}"</p>
              ) : (
                <div className="flex flex-col gap-6">
                  <h3 className="font-heading text-h3 text-black">{client.heading}</h3>
                  <p className="font-body text-body-lg text-black whitespace-pre-line">{client.description}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className="flex justify-center pb-[var(--spacing-xl)]">
        <Button label="Book a call" />
      </div>
    </section>
  );
}

