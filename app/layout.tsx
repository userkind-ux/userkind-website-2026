import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const nikkeiMaru = localFont({
  src: [
    {
      path: './fonts/PPNikkeiMaru-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/PPNikkeiMaru-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-nikkei-maru',
  display: 'swap',
});

const editorialNew = localFont({
  src: [
    {
      path: './fonts/PPEditorialNew-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-editorial',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Userkind | Design Studio',
  description: 'We deliver future proof scalable designs that grow with your business.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nikkeiMaru.variable} ${editorialNew.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
