'use client';

import { Button } from '../ui/Button';
import { LogoMark } from '../ui/Logo';

export function HeroSection() {
  return (
    <section className="bg-[var(--color-lilac)] pt-[var(--spacing-2xl)] pb-0">
      <div className="w-full px-[var(--spacing-xs)] md:px-[var(--spacing-sm)] lg:px-[var(--container-padding)]">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 min-h-[464px]">
          <div className="flex flex-col gap-[var(--spacing-lg)] items-start justify-end h-full max-w-[1012px]">
            <h1 className="font-heading text-h1 text-black">
              We deliver future proof scalable designs that grow with your.
            </h1>
            <p className="font-body text-body-lg text-black max-w-[800px]">
              Delivering future proof scalable designs that grow with your business
              <br />
              Delivering future proof scalable designs that grow with your business
            </p>
            <Button label="Book a call" className="w-[230px]" />
          </div>

          <div className="hidden lg:flex flex-col items-end justify-end h-full">
            <div className="shadow-[var(--shadow-button-lg)]">
              <LogoMark className="w-[188px] h-[209px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

