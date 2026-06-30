import type { Metadata } from 'next';
import '../tailwind.css';

import { siteConfig } from '@/config/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@/components/layout/Analytics';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { ThemeProvider } from '@/context/ThemeProvider';
import { PageTransition } from '@/components/layout/PageTransition';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.social.twitter,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root { --app-primary: #050505; --app-primary-hover: #27272a; --color-dark-bg: #000000; }
          .dark { --app-primary: #ffffff; --app-primary-hover: #e4e4e7; }
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { background-color: #fff; color: #111827; line-height: 1.5; -webkit-font-smoothing: antialiased; }
          a { color: inherit; text-decoration: none; }
          .text-glow { text-shadow: 0 0 20px rgba(124,58,237,0.5); }
          .bg-glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }
          .bg-glass-dark { background: rgba(15,23,42,0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); }
        `}} />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col transition-colors duration-300 dark:bg-slate-950 dark:text-gray-100 overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CurrencyProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <PageTransition>
                <main className="flex-grow w-full">{children}</main>
              </PageTransition>
              <Footer />
            </div>
            <Analytics />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
