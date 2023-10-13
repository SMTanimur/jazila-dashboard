import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ' Admin Login',
  description: 'Sign in to your account',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section >{children}</section>;
}