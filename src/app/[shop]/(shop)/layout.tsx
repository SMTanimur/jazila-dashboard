
import { ShopSidebarMobile } from '@/components/layout/shop-mobile-sidebar';
import { ShopSidebarNav } from '@/components/layout/shop-sidebar';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/ui/icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    shop: string;
  };
}

export default async function DashboardLayout({
  children,
  params: { shop },
}: DashboardLayoutProps) {


  return (
    <div className='flex min-h-screen flex-col bg-gray-100 dark:bg-background'>
      <SiteHeader
        shop={shop}
        isShopLayout={true}
      />
      <div className=' flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 bg'>
        <aside className='fixed top-14  -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0  border-r md:sticky md:block'>
          <ScrollArea className='py-6 bg-white  pr-6 lg:py-8 px-8  h-screen'>
          <ShopSidebarNav
              shop={shop}
              className='p-1'
            />
          </ScrollArea>
        </aside>
        
        <main className='container flex w-full flex-col overflow-hidden'>{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}
