import { getStoreData } from "@/lib/blob-store";
import { StoreProvider } from "@/lib/store-context";
import { CartProvider } from "@/components/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartDrawer } from "@/components/cart-drawer";

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { products, settings } = await getStoreData();

  return (
    <StoreProvider initialProducts={products} initialSettings={settings}>
      <CartProvider>
        <SiteHeader marqueeText={settings.marqueeText} />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <CartDrawer />
      </CartProvider>
    </StoreProvider>
  );
}
