"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from '../ui/icons';
import { dashboardConfig } from '@/configs/dashboard';


export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  shop:string
}

export  function ShopSidebarNav({ shop, className, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  if (!dashboardConfig.sidebarNav?.length) return null;

  return (
    <div>
    <div className={cn('flex w-full flex-col gap-2', className)} {...props}>
      {dashboardConfig.sidebarNav.map((item, index) => {
        const Icon = Icons[item.icon ?? 'chevronLeft'];
        return item.href ? (
          <Link
            aria-label={item.title}
            key={index}
            href={item.href(shop)}
            
            // disabled={me?.provider !== 'google'}
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
              <Icon
                className='mr-2 h-4 w-4 transition-transform duration-300 ease-linear group-hover:rotate-12'
                aria-hidden='true'
              />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className='flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline'
          >
            {item.title}
          </span>
        );
      })}
    </div>
    </div>
  );
}
