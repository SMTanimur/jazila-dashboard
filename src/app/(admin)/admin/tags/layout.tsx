import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "tags",
  description: "Manage your tags settings",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section>{children}</section>;
}
