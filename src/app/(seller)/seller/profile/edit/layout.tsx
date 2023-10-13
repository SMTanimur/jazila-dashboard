import type { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Profile Edit',
  description: 'Manage your account Information',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section >{children}</section>;
}