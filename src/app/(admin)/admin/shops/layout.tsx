import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Shops',
  description: 'Manage your Shops settings',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section >{children}</section>;
}