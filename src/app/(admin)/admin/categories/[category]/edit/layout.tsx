import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Category Edit',
  description: 'Manage your Category settings',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section >{children}</section>;
}