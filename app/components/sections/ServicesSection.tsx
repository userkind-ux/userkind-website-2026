'use client';

import Link from 'next/link';

const services = [
  { title: 'Websites', href: '/services/websites' },
  { title: 'E-commerce', href: '/services/ecommerce' },
  { title: 'Web Apps', href: '/services/web-apps' },
  { title: 'Branding', href: '/services/branding' },
  { title: 'Design Systems', href: '/services/design-systems' },
];

export function ServicesSection() {
  return (
    <section className="bg-black">
      <div className="container-uk py-[var(--spacing-2xl)]">
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
          <div className="lg:col-span-5 pr-0 lg:pr-[var(--spacing-2xl)]">
            <h2 className="font-heading text-h1 text-white -rotate-[4deg] origin-left">
              <span className="text-[var(--color-lilac)]">We think big</span>, design beautifully and build for performance
            </h2>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-4 justify-center">
            <p className="font-body text-body-lg text-white">Great design is so much more than how things look. We think about your content, your customers and your team to design and build the perfect digital experience for your brand.</p>
            <Link href="/about" className="font-body text-body-md text-white underline underline-offset-4 uppercase tracking-wider hover:text-[var(--color-lilac)] transition-colors">Learn more</Link>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-[var(--spacing-xl)]">
        <div className="flex gap-4 pl-[var(--container-padding)] pr-0">
          {services.map((service, i) => (
            <Link key={i} href={service.href} className="group flex flex-col gap-6 w-[395px] flex-shrink-0">
              <div className="aspect-[395/346] border-2 border-white rounded-[var(--radius-lg)] overflow-hidden bg-gradient-to-br from-[var(--color-lilac)] to-[var(--color-lilac-light)] group-hover:scale-[1.02] transition-transform" />
              <h3 className="font-heading text-h4 text-white">{service.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

