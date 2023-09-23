import type { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Seller Dashboard',
  description: 'Seller Dashboard',
};
export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section >{children}</section>;
}