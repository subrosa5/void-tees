import { getSettings } from "@/lib/site-settings";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <>
      <SiteHeader marqueeText={settings.marqueeText} />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  );
}
