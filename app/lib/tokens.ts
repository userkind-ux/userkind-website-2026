/**
 * Design Tokens - Userkind Website 2026
 * Extracted from Figma design
 */

export const colors = {
  lilac: { DEFAULT: '#cb72ff', light: '#da9aff', lighter: '#eac7ff' },
  yellow: { DEFAULT: '#fffd83', light: '#fffeab' },
  black: '#000000',
  white: '#ffffff',
  grey: '#f1f1f1',
} as const;

export const spacing = {
  '3xs': '8px',
  '2xs': '12px',
  xs: '16px',
  sm: '24px',
  md: '32px',
  lg: '48px',
  xl: '80px',
  '2xl': '120px',
} as const;

export const fontSize = {
  h1: '96px',
  h2: '64px',
  h3: '48px',
  h4: '32px',
  h5: '24px',
  subheading: '18px',
  'body-lg': '20px',
  'body-md': '16px',
  'special-lg': '40px',
  ticker: '66px',
} as const;

export const lineHeight = {
  h1: '80px',
  h2: '64px',
  h3: '48px',
  h4: '32px',
  h5: '24px',
  'body-lg': '28px',
  'body-md': '22px',
} as const;

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '36px',
  full: '9999px',
} as const;

export const shadows = {
  button: '-3px 4px 0px 0px #000000',
  'button-lg': '-6px 4px 0px 0px #000000',
} as const;

