import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Персональный сайт Константина Потапова",
  description: "Пока временная заглушка",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
