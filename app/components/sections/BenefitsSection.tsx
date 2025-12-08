'use client';

import { Button } from '../ui/Button';

interface BenefitCardProps {
  heading: string;
  imagePosition?: 'top' | 'bottom';
}

function BenefitCard({ heading, imagePosition = 'bottom' }: BenefitCardProps) {
  const content = <div className="p-4 py-6 px-5 flex-1"><h3 className="font-heading text-h4 text-black">{heading}</h3></div>;
  const image = <div className="aspect-[423/300] border-2 border-black rounded-lg bg-gradient-to-br from-[var(--color-lilac-lighter)] to-[var(--color-lilac)] m-4" />;

  return (
    <article className="flex flex-col min-h-[560px] w-[455px] flex-shrink-0">
      <div className="card flex flex-col min-h-[500px] p-4">
        {imagePosition === 'top' ? <>{image}{content}</> : <>{content}{image}</>}
      </div>
    </article>
  );
}

export function BenefitsSection() {
  const benefits = [
    { heading: 'Strategic, brand elevating design', imagePosition: 'bottom' as const },
    { heading: 'Design scalable design systems for growth and consistency', imagePosition: 'top' as const },
    { heading: 'Clarity-led UX motivates action', imagePosition: 'bottom' as const },
    { heading: 'A fourth benefit focused solution friction', imagePosition: 'top' as const },
  ];

  return (
    <section className="bg-[var(--color-grey)]">
      <div className="py-[var(--spacing-xl)] flex flex-col items-center gap-8">
        <div className="w-full max-w-[800px] mx-auto px-[var(--spacing-xs)] text-center">
          <h2 className="font-heading text-h2 text-black mb-8">We love helping ambitious brands live their potential</h2>
          <p className="font-body text-body-lg text-black max-w-[600px] mx-auto">Our flexibility, understanding and experience help our brands create amazing experiences that customers enjoy.</p>
        </div>
      </div>

      <div className="overflow-x-auto pb-[var(--spacing-lg)]">
        <div className="flex 2xl:justify-center gap-[var(--spacing-lg)] px-[var(--container-padding)]">
          {benefits.map((benefit, i) => <BenefitCard key={i} {...benefit} />)}
        </div>
      </div>

      <div className="flex justify-center pb-[var(--spacing-xl)]">
        <Button label="Book a call" />
      </div>
    </section>
  );
}

