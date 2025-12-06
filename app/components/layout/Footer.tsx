'use client';

import { Logo } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="bg-black text-white py-[var(--spacing-2xl)] pb-[var(--spacing-lg)]">
      <div className="container-uk flex flex-col gap-[var(--spacing-2xl)]">
        <Logo variant="dark" className="w-full max-w-[1013px] h-auto" />
        
        <div className="flex flex-col lg:flex-row gap-4 text-body-lg font-body">
          <p className="flex-1">© Userkind 2025. All rights reserved</p>
          <p className="flex-1 opacity-80">
            Userkind acknowledges the Traditional Custodians of the land on which our Sydney team work, the Bidjigal, Birrabirragal and Gadigal people. We recognise their continued connection to the land and waters of this beautiful place, and acknowledge that they never ceded sovereignty. We pay our respects to their Elders past and present and extend that respect to all First Nations people.
          </p>
        </div>
      </div>
    </footer>
  );
}

