'use client';

import Link from 'next/link';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'About', href: '/about' },
];

export function Header() {
  return (
    <header className="bg-[var(--color-lilac)] border-b-2 border-black">
      <div className="w-full px-[var(--spacing-xs)] md:px-[var(--spacing-sm)] lg:px-[var(--container-padding)]">
        <div className="flex items-center justify-between py-8">
          <Link
            href="/"
            className="flex items-center justify-center bg-white border-2 border-black rounded-full px-8 py-4 h-[62px] w-[223px]"
          >
            <Logo className="h-[30px] w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-8 py-4 border-2 border-black rounded-full font-heading text-subheading hover:bg-black/5 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button className="hidden sm:flex whitespace-nowrap" label="Book a call" />

          <button className="lg:hidden flex items-center justify-center w-12 h-12 border-2 border-black rounded-lg" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

