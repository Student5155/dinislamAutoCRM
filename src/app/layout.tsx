import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { site, withBase } from "@/config/site";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-unbounded",
  display: "swap",
});

const title = `${site.name} — сайты, CRM-системы и автоматизация бизнеса`;
const pageUrl = `${site.url}${withBase("/")}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "создание сайтов",
    "разработка лендинга",
    "интернет-магазин",
    "внедрение CRM",
    "автоматизация бизнеса",
    "чат-бот для бизнеса",
    "AI-решения для бизнеса",
    "цифровизация бизнеса",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: pageUrl,
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: withBase("/brand/og.jpg"), width: 1200, height: 1200, alt: `${site.name} — ${site.tagline}` }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: [withBase("/brand/og.jpg")] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#06121B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: pageUrl,
  telephone: site.contacts.phone,
  image: `${site.url}${withBase("/brand/og.jpg")}`,
  areaServed: "RU",
  sameAs: [site.contacts.telegram, site.contacts.whatsapp, site.contacts.max].filter(Boolean),
  knowsAbout: ["Разработка сайтов", "CRM-системы", "Автоматизация бизнес-процессов", "Чат-боты", "AI-решения"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${unbounded.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink">
          Перейти к содержанию
        </a>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
