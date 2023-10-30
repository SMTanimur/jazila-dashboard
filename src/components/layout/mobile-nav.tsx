'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MainNavItem, SidebarNavItem } from '@/types';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Icons } from '../ui/icons';
import GradientLogo from '../common/shared/gradient-logo';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { adminDashboardConfig, dashboardConfig } from '@/configs/dashboard';
import { useCurrentUser } from '@/hooks/user/useCurrentUser';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type MobileNavProps = {
  isAdminLayout?: boolean;
  shop?: string;
  isShopLayout?:boolean;
};
export function MobileNav({
  isAdminLayout=false,
  isShopLayout= false,
  shop,
}: MobileNavProps) {
  const { currentUser } = useCurrentUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden'
        >
          <Icons.menu className='h-8 w-8' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='pl-1 pr-0'>
        <div className='px-7'>
          <Link
            aria-label='Home'
            href='/'
            className='flex items-center'
            onClick={() => setIsOpen(false)}
          >
            <GradientLogo />
          </Link>
        </div>
        <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10 pl-6'>
          <div className='pl-1 pr-7'>
            {isAdminLayout ? (
              <div className={cn('flex w-full flex-col gap-2')}>
                {adminDashboardConfig.sidebarNav.map((item, index) => {
                  const Icon = Icons[item.icon ?? 'chevronLeft'];

                  return item.href ? (
                    <Link
                      aria-label={item.title}
                      key={index}
                      href={item.href}
                      // disabled={me?.provider !== 'google'}
                      target={item.external ? '_blank' : ''}
                      rel={item.external ? 'noreferrer' : ''}
                    >
                      <span
                        className={cn(
                          'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground',
                          pathname === item.href
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
            ) : (
              <React.Fragment>
                {isShopLayout ? (
                  <React.Fragment>
                    <div className={cn('flex w-full flex-col gap-2')}>
                      {dashboardConfig.sidebarNav.map((item, index) => {
                        const Icon = Icons[item.icon ?? 'chevronLeft'];

                        return item.href ? (
                          <Link
                            aria-label={item.title}
                            key={index}
                            href={item.href(shop as string)}
                            // disabled={me?.provider !== 'google'}
                            target={item.external ? '_blank' : ''}
                            rel={item.external ? 'noreferrer' : ''}
                          >
                            <span
                              className={cn(
                                'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground',
                                pathname === item.href(shop as string)
                                  ? 'bg-muted font-medium text-foreground'
                                  : 'text-muted-foreground',
                                item.disabled &&
                                  'pointer-events-none opacity-60'
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
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className='flex flex-col justify-center'>
                      <div className='flex flex-col justify-center items-center gap-3'>
                        <Avatar className='w-[100px] h-[100px]'>
                          <AvatarImage
                            src={currentUser?.avatar}
                            alt={currentUser?.lastName}
                          />
                          <AvatarFallback>
                            {currentUser?.lastName}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col items-center gap-1'>
                          <p className='text-2xl font-semibold leading-none tracking-tight'>
                            {currentUser?.firstName} {currentUser?.lastName}
                          </p>
                          <h6 className='text-sm text-muted-foreground'>
                            {currentUser?.email}
                          </h6>
                        </div>

                        <Button variant={'secondary'}>
                          <Link href={'/seller/profile/edit'}>
                            Edit Profile
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string;
  disabled?: boolean;
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-foreground/70 transition-colors hover:text-foreground',
        pathname === href && 'text-foreground',
        disabled && 'pointer-events-none opacity-60'
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
