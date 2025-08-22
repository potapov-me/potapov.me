import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_URL || "https://potapov.me";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Константин Потапов — инженер, предприниматель, Software Architect",
        template: "%s — Константин Потапов",
    },
    description: "Персональный сайт: проекты, опыт, технологии и контакты. Инженерный подход к продуктам и разработке.",
    keywords: [
        "Константин Потапов",
        "Potapov",
        "разработчик",
        "software architect",
        "инженер",
        "Next.js",
        "React",
        "TypeScript",
        "Python",
        "Django",
        "FastAPI",
        "Feature-Sliced Design",
    ],
    authors: [{ name: "Константин Потапов", url: siteUrl }],
    creator: "Константин Потапов",
    publisher: "Константин Потапов",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        url: siteUrl,
        title: "Константин Потапов — инженер, предприниматель, Software Architect",
        description: "Проекты, опыт, технологии и контакты.",
        siteName: "potapov.me",
        locale: "ru_RU",
        images: [
            {
                url: "/photo.jpg",
                width: 1200,
                height: 630,
                alt: "Фото Константина Потапова",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Константин Потапов — инженер, предприниматель, Software Architect",
        description: "Проекты, опыт, технологии и контакты.",
        images: ["/photo.jpg"],
        creator: "@potapov_me",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
        <body
            className={`antialiased font-sans`}
        >
            {children}
        </body>
        </html>
    );
}
