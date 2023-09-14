import { type SidebarNavItem } from '@/types';

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Dashboard',
      href: '/',
      icon: 'dashboard',
      items: [],
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: 'user',
      items: [],
    },
    {
      title: 'Products',
      href: '/products',
      icon: 'products',
      items: [],
    },
    {
      title: 'Change Password',
      href: '/profile/change-password',
      icon: 'lock',
      items: [],
    },
    {
      title: 'Orders',
      href: '/orders',
      icon: 'order',
      items: [],
    },
    {
      title: 'Payments',
      href: '/payments',
      icon: 'dollarSign',
      items: [],
    },
    {
      title: 'Chat Customer',
      href: '/customer-chat',
      icon: 'message',
      items: [],
    },
    {
      title: 'Chat Support',
      href: '/support-chat',
      icon: 'message',
      items: [],
    },
   
  ],
};
export const adminDashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: 'dashboard',
      items: [],
    },
    {
      title: 'Shops',
      href: '/admin/shops',
      icon: 'storehouse',
      items: [],
    },
    {
      title: 'My Shops',
      href: '/admin/my-shops',
      icon: 'order',
      items: [],
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: 'products',
      items: [],
    },
    {
      title: 'Categories',
      href: '/admin/categories',
      icon: 'category',
      items: [],
    },
    {
      title: 'Chats Seller',
      href: '/admin/seller-chat',
      icon: 'message',
      items: [],
    },
    {
      title: 'Sellers',
      href: '/admin/sellers',
      icon: 'user',
      items: [],
    },
    {
      title: 'Author',
      href: '/admin/author',
      icon: 'author',
      items: [],
    },
    {
      title: 'Orders',
      href: '/admin/author',
      icon: 'author',
      items: [],
    },
    {
      title: 'Create-Order',
      href: '/admin/author',
      icon: 'author',
      items: [],
    },
  ],
};
