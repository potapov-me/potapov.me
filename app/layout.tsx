import type { Metadata } from "next";
import "./globals.css";
import { Manrope, IBM_Plex_Serif } from "next/font/google";

export const metadata: Metadata = {
    title: "Персональный сайт Константина Потапова",
    description: "Пока временная заглушка",
};

const manrope = Manrope({ subsets: ["cyrillic", "latin"], variable: "--font-sans" });
const playfair = IBM_Plex_Serif({ subsets: ["cyrillic", "latin"], weight: ["400", "600", "700"], variable: "--font-heading" });

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={`${manrope.variable} ${playfair.variable}`}>
        <body
            className={`antialiased`}
        >
            {children}
        </body>
        </html>
    );
}
