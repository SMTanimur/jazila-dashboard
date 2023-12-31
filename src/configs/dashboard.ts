import { type ShopSidebarNavItem, type SidebarNavItem } from "@/types";
import { ROUTES } from "./routes";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}
export interface ShopDashboardConfig {
  sidebarNav: ShopSidebarNavItem[];
}

export const dashboardConfig: ShopDashboardConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: (shop: string) => `${ROUTES.DASHBOARD}${shop}`,
      icon: "dashboard",
      items: [],
    },
    {
      title: "Attributes",
      href: (shop: string) => `/${shop}${ROUTES.ATTRIBUTES}`,
      icon: "attribute",
      items: [],
    },
    {
      title: "Products",
      href: (shop: string) => `/${shop}${ROUTES.PRODUCTS}`,
      icon: "products",
      items: [],
    },

    {
      title: "Orders",
      href: (shop: string) => `/${shop}${ROUTES.ORDERS}`,
      icon: "order",
      items: [],
    },
    {
      title: "Reviews",
      href: (shop: string) => `/${shop}${ROUTES.REVIEWS}`,
      icon: "review",
      items: [],
    },
    {
      title: "Withdrawals",
      href: (shop: string) => `/${shop}${ROUTES.WITHDRAWS}`,
      icon: "gem",
      items: [],
    },
    {
      title: "Questions",
      href: (shop: string) => `/${shop}/questions`,
      icon: "question",
      items: [],
    },
  ],
};
export const sellerAccountConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Profile",
      href: "/seller/profile",
      icon: "user",
      items: [],
    },

    {
      title: "Chat Customer",
      href: "/seller/customer-chat",
      icon: "message",
      items: [],
    },
    {
      title: "Chat Support",
      href: "seller/support-chat",
      icon: "message",
      items: [],
    },

  
  ],
};
export const adminDashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: "dashboard",
      items: [],
    },
    {
      title: "Shops",
      href: "/admin/shops",
      icon: "storehouse",
      items: [],
    },
    {
      title: "My Shops",
      href: "/admin/my-shops",
      icon: "order",
      items: [],
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: "products",
      items: [],
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: "category",
      items: [],
    },
    {
      title: "Groups",
      href: "/admin/groups",
      icon: "group",
      items: [],
    },
    {
      title: "Attributes",
      href: "/admin/attributes",
      icon: "attribute",
      items: [],
    },
    {
      title: "Tags",
      href: "/admin/tags",
      icon: "tag",
      items: [],
    },
    {
      title: "Chats Seller",
      href: "/admin/seller-chat",
      icon: "message",
      items: [],
    },
    {
      title: "Sellers",
      href: "/admin/sellers",
      icon: "user",
      items: [],
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: "user",
      items: [],
    },
    {
      title: "Orders",
      href: "/admin/author",
      icon: "author",
      items: [],
    },
    {
      title: "Create-Order",
      href: "/admin/author",
      icon: "author",
      items: [],
    },
  ],
};
