import { type SidebarNavItem } from '@/types';

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Dashboard',
      href: '/seller/dashboard',
      icon: 'dashboard',
      items: [],
    },
    {
      title: 'Profile',
      href: '/seller/profile',
      icon: 'user',
      items: [],
    },
    {
      title: 'Products',
      href: '/seller/products',
      icon: 'products',
      items: [],
    },
    {
      title: 'Change Password',
      href: '/seller/profile/change-password',
      icon: 'lock',
      items: [],
    },
    {
      title: 'Orders',
      href: '/seller/orders',
      icon: 'order',
      items: [],
    },
    {
      title: 'Payments',
      href: '/seller/payments',
      icon: 'dollarSign',
      items: [],
    },
    {
      title: 'Chat Customer',
      href: '/seller/customer-chat',
      icon: 'message',
      items: [],
    },
    {
      title: 'Chat Support',
      href: 'seller/support-chat',
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
