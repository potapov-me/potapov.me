import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Как связаться с Константином Потаповым: email, Telegram и другие каналы.",
  alternates: { canonical: "/contact" },
};

import ContactPageClient from "./ContactPageClient";

export default function ContactPage() {
  return <ContactPageClient />;
}
