import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tag Edit",
  description: "Manage your Tag settings",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section>{children}</section>;
}
