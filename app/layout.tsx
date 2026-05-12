import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Otrosí Talento Humano",
  description: "Gestión y generación de otrosís laborales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
