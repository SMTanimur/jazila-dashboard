'use client';
import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { MainNav } from './main-nav';
import { IUser } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Icons } from '../ui/icons';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import { MobileNav } from './mobile-nav';

interface SiteHeaderProps {
  user: IUser | null;
  isAdmin: boolean;
  shop?: string;
  isSellerStoreLayout?: boolean;
}

export function SiteHeader({
  user,
  isAdmin,
  shop,
  isSellerStoreLayout,
}: SiteHeaderProps) {


  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-16 items-center'>
        <MainNav />
        <MobileNav
          isAdmin={isAdmin}
          shop={shop}
          isSellerStoreLayout={isSellerStoreLayout}
        />
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            <Button className='mx-1 rounded-lg'>
              <Link href={ user && user.role =='admin' ? '/admin' :'/seller/shop/create'}>
                Create-shop
              </Link>
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='secondary'
                    className='relative h-8 w-8 rounded-full'
                  >
                    <Avatar className='h-8 w-8'>
                      <AvatarImage src={user?.avatar} alt={user.lastName} />
                      <AvatarFallback>{user.lastName}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56 mt-3' align='end' forceMount>
                  <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium leading-none'>
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className='text-xs leading-none text-muted-foreground'>
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          user?.role == 'admin'
                            ? '/admin/profile'
                            : '/seller/profile'
                        }
                      >
                        <Icons.user
                          className='mr-2 h-4 w-4'
                          aria-hidden='true'
                        />
                        Profile
                        <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          user?.role == 'admin'
                            ? '/admin/dashboard'
                            : '/seller/dashboard'
                        }
                      >
                        <Icons.terminal
                          className='mr-2 h-4 w-4'
                          aria-hidden='true'
                        />
                        Dashboard
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href='/signout'>
                      <Icons.logout
                        className='mr-2 h-4 w-4'
                        aria-hidden='true'
                      />
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href='/signin'
                className={buttonVariants({
                  size: 'sm',
                })}
              >
                Sign In
                <span className='sr-only'>Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
