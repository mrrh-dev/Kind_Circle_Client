import type { Metadata } from 'next';
import { Suspense } from 'react';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/dm-sans';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ThemeProvider from '@/components/ThemeProvider';
import WelcomeToast from '@/components/WelcomeToast';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Community service events near you`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_TAGLINE} Discover, host and join social service events such as winter clothes drives, plantations and food distribution.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider>
          <TooltipProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Suspense fallback={null}>
              <WelcomeToast />
            </Suspense>
            <Toaster
              position="top-center"
              duration={4000}
              richColors
              closeButton
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
