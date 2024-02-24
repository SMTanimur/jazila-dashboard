import './globals.css';
import type { Metadata } from 'next';
import { TailwindIndicator } from '@/components/common/shared/tailwind-indicator';
import { ThemeProvider } from '@/shared/providers/theme-provider';
import GoogleProvider from '@/shared/providers/google.provider';
import { QueryProvider } from '@/shared/providers/query.provider';
import { Analytics } from '@/components/common/shared/analytics';
import { Toaster } from '@/components/ui/toaster';
import { defaultMetadata } from '@/lib/seo';
import { fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import GlobalAlerts from '@/shared/providers/GlobalAlerts';
import GlobalModals from '@/shared/providers/GlobalModals';
import NextTopLoader from "nextjs-toploader";
export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background  antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
    
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <NextTopLoader color="#ff3366" />
          <GoogleProvider>
            <QueryProvider>

              <GlobalAlerts/>
              <GlobalModals/>
              {children}
         
              <TailwindIndicator />
              <Analytics />
            </QueryProvider>
          </GoogleProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}