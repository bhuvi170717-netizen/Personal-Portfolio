import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bhuvanesh — Computer Science Student & Developer",
  description:
    "Portfolio of Bhuvanesh — computer science student, developer and problem solver.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}