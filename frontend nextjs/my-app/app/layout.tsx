import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const robotoFlex = localFont({
  src: "../public/assets/fonts/RobotoFlex.ttf",
  variable: "--font-sans",
  display: "swap",
});

const robotoMono = localFont({
  src: "../public/assets/fonts/roboto-mono/RobotoMono-VariableFont_wght.ttf",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrealWay — Digital Brands, Apps & Loyalty Systems",
  description:
    "We create Digital Brands, Apps, and Loyalty systems for real business growth. Website design, mobile app development, AI products, and SaaS solutions.",
  icons: {
    icon: "/Logo (2).svg",
  },
  openGraph: {
    title: "TrealWay — Built to Grow, Designed to Last",
    description:
      "Digital agency specializing in mobile apps, web platforms, AI products, and SaaS solutions.",
    type: "website",
    locale: "en_US",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${robotoFlex.variable} ${robotoMono.variable}`}>
      <body>
        {children}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
