import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Group Edit',
  description: 'Manage your Group settings',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section >{children}</section>;
}