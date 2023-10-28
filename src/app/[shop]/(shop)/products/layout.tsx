import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Products',
  description: 'Manage your Products settings',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section >{children}</section>;
}