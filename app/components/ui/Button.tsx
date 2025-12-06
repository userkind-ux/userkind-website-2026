'use client';

import { type ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  label?: string;
}

export function Button({
  label = 'Book a call',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 h-14 px-8
        bg-[var(--color-yellow)] text-black
        border-2 border-black rounded-lg
        font-heading text-subheading whitespace-nowrap
        shadow-[var(--shadow-button)]
        hover:translate-x-[-1px] hover:translate-y-[2px]
        hover:shadow-[-2px_2px_0px_0px_#000000]
        active:translate-x-[-3px] active:translate-y-[4px]
        active:shadow-none
        transition-all duration-150
        ${className}
      `}
      {...props}
    >
      {children || label}
    </button>
  );
}

