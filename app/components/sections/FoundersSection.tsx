'use client';

import { Button } from '../ui/Button';

const listItems = [
  'Garreth leads the UX thinking, bringing clarity to structure and flow.',
  'Lucie crafts the visual identity with precision and creative flair.',
  'Together, they balance strategy with aesthetics.',
  'Every project gets founder-level attention.',
  'Direct communication, no account managers in between.',
  'Small team means big care for every detail.',
  'Passion-driven work, not just deliverables.',
];

export function FoundersSection() {
  return (
    <section className="bg-white border-t-2 border-black py-[var(--spacing-2xl)]">
      <div className="container-uk flex flex-col gap-[var(--spacing-xl)]">
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
          <div className="lg:col-span-3 flex items-center gap-8">
            <div className="flex items-center pr-8">
              <div className="w-[118px] h-[118px] rounded-full border-2 border-black bg-[var(--color-yellow-light)] -mr-8" />
              <div className="w-[118px] h-[118px] rounded-full border-2 border-black bg-[var(--color-lilac-lighter)]" />
            </div>
            <div className="flex flex-wrap items-center gap-1 max-w-[279px]">
              <span className="font-heading text-h5 text-black">Userkind founders,</span>
              <span className="bg-[var(--color-yellow-light)] border-2 border-black rounded-full px-2 py-1 font-heading text-[20px] uppercase tracking-wider">Lucie Bertiau</span>
              <span className="font-heading text-h5 text-black">and</span>
              <span className="bg-[var(--color-lilac-lighter)] border-2 border-black rounded-full px-2 py-1 font-heading text-[20px] uppercase tracking-wider">Garreth Wills</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="font-heading text-h3 text-black">
              Our founding principle is that user experience isn't a step in the process. It is the process.{' '}
              <span className="text-[var(--color-lilac)]">The full experience is shaped through design</span>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
          <div className="lg:col-span-3 flex flex-col gap-[var(--spacing-lg)] pr-0 lg:pr-6">
            <div className="border-t-2 border-black">
              {listItems.map((item, i) => (
                <div key={i} className="flex gap-4 items-start py-4 border-b-2 border-black">
                  <div className="w-4 h-4 rounded-full bg-[var(--color-yellow)] border-2 border-black mt-1 flex-shrink-0" />
                  <p className="font-body text-body-lg text-black">{item}</p>
                </div>
              ))}
            </div>
            <Button label="Book a call" className="w-[248px]" />
          </div>

          <div className="lg:col-span-5 aspect-[1012/670]">
            <div className="w-full h-full border-2 border-black rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-lilac-lighter)] to-[var(--color-lilac)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

