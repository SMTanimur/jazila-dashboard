
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
    <div className='flex min-h-screen flex-col '>
      <SiteHeader
        shop={shop}
        isShopLayout={true}
      />
      <div className='bg-gray-100 dark:bg-background'>
      <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10  '>
        <DropdownMenu>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'></div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <div>hdf</div>
              <ShopSidebarMobile
      
                shop={shop as string}
                className='p-1'

              />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href='/signout'>
                <Icons.logout className='mr-2 h-4 w-4' aria-hidden='true' />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <aside className='fixed top-14 z-10 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block '>
          <ScrollArea className='py-6 pr-6 lg:py-8'>
          
            <ShopSidebarNav
              shop={shop}
              className='p-1'
            />
    
          </ScrollArea>
        </aside>
        <main className='flex w-full flex-col overflow-hidden '>{children}</main>
      </div>
      </div>
      <SiteFooter />
    </div>
  );
}
