'use client';

interface LogoProps {
  variant?: 'default' | 'dark';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  const color = variant === 'dark' ? '#ffffff' : '#000000';
  const bgColor = variant === 'dark' ? '#000000' : '#ffffff';
  
  return (
    <svg viewBox="0 0 175 30" fill="none" className={className} aria-label="Userkind">
      {/* U shape */}
      <path d="M0 0h27v19.5c0 5.8-4.7 10.5-10.5 10.5h-6C4.7 30 0 25.3 0 19.5V0z" fill={color} />
      <path d="M6 6h15v13.5c0 2.5-2 4.5-4.5 4.5h-6c-2.5 0-4.5-2-4.5-4.5V6z" fill={bgColor} />
      {/* Text */}
      <text x="32" y="23" fill={color} fontFamily="system-ui" fontSize="22" fontWeight="400">serkind</text>
    </svg>
  );
}

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 188 209" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="184" height="205" rx="14" fill="#cb72ff" stroke="#000" strokeWidth="4" />
      <path d="M40 40h108v95c0 30-24 54-54 54s-54-24-54-54V40z" fill="#000" />
      <path d="M58 58h72v77c0 20-16 36-36 36s-36-16-36-36V58z" fill="#cb72ff" />
    </svg>
  );
}

