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
import RouterProvider from '@/shared/providers/router-provider';
import GlobalAlerts from '@/shared/providers/GlobalAlerts';
import GlobalModals from '@/shared/providers/GlobalModals';
import { StyledComponentsRegistry } from './registry';

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
        <StyledComponentsRegistry>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <GoogleProvider>
            <QueryProvider>
            <RouterProvider>
              <GlobalAlerts/>
              <GlobalModals/>
              {children}
             </RouterProvider>
              <TailwindIndicator />
              <Analytics />
            </QueryProvider>
          </GoogleProvider>
        </ThemeProvider>
        <Toaster />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}