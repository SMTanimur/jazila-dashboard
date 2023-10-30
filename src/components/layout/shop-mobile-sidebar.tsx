'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ShopSidebarNavItem, SidebarNavItem } from '@/types';

import { cn } from '@/lib/utils';
import { Icons } from '../ui/icons';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { dashboardConfig } from '@/configs/dashboard';

export interface SidebarMobileProps
  extends React.HTMLAttributes<HTMLDivElement> {
  shop:string
}

export function ShopSidebarMobile({
  shop,
  className,
  ...props
}: SidebarMobileProps) {
  const pathname = usePathname();
  console.log(shop)

  if (!dashboardConfig.sidebarNav?.length) return null;

  return (
    <div className={cn('flex w-full flex-col gap-2', className)} {...props}>
      {dashboardConfig.sidebarNav.map((item, index) => {
        const Icon = Icons[item.icon ?? 'chevronLeft'];

        return item.href ? (
          <DropdownMenuItem asChild>
            <Link
              aria-label={item.title}
              key={index}
              href={item.href(shop)}
              target={item.external ? '_blank' : ''}
              rel={item.external ? 'noreferrer' : ''}
            >
              <span
                className={cn(
                  'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground',
                  pathname === item.href(shop)
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground',
                  item.disabled && 'pointer-events-none opacity-60'
                )}
              >
                <Icon className='mr-2 h-4 w-4' aria-hidden='true' />
                <span>{item.title}</span>
              </span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
          <span
            key={index}
            className='flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline'
          >
            {item.title}
          </span>
          </DropdownMenuItem>
        );
      })}
    </div>
  );
}
