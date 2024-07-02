import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE_URL, siteConfig } from '@/config/site';
import Nav from '@/components/layout/nav';
import NextAuthProvider from '@/lib/auth/Provider';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    apple: '/icons/apple-touch-icon.png',
    shortcut: '/icons/favicon.ico',
    icon: '/icons/favicon-32x32.png',
  },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.ogDescription,
    locale: 'en_US',
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.twitterTitle,
    description: siteConfig.twitterDescription,
    images: [siteConfig.ogImage],
    creator: '@kunalvermax',
  },
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'Kunal Verma',
    },
  ],
  creator: 'Kunal Verma',
};

export const runtime = 'edge';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
          <NextAuthProvider>
            <Nav />
            <Suspense fallback={'Loading'}>{children}</Suspense>
          </NextAuthProvider>
      </body>
    </html>
  );
}