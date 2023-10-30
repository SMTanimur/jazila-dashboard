
import SellerSideBar from '@/components/layout/SellerSideBar';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader
        
      />
      <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-10'>
      
        <aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block  '>
          <ScrollArea className='py-6 pr-6 lg:py-8'>
            <Card className='p-2 py-4'>
            <SellerSideBar/>
            </Card>
          </ScrollArea>
        </aside>
        <main className='flex w-full flex-col overflow-hidden'>{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}
