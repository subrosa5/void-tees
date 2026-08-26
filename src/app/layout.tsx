import type { Metadata } from "next";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartDrawer } from "@/components/cart-drawer";

// Display/body/mono all need Cyrillic glyphs for the Russian copy — Anton
// and Epilogue (the original picks) only ship Latin, so headlines and body
// text would silently fall back to a system font on every Russian string.
const display = Unbounded({
  variable: "--font-anton",
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-epilogue",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VOID. — Стритвир-футболки",
  description:
    "VOID. — монохромный стритвир-бренд, построенный вокруг одного продукта: футболки. Плотный хлопок, оверсайз-крой, лимитированные дропы.",
  metadataBase: new URL("https://void-tees.vercel.app"),
  openGraph: {
    title: "VOID. — Стритвир-футболки",
    description:
      "Плотные футболки. Лимитированные дропы. Никакого шума — только VOID.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${display.variable} ${body.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <CartProvider>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
