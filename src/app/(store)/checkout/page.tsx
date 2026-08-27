import { getStoreData } from "@/lib/blob-store";
import { CheckoutClient } from "@/app/(store)/checkout/checkout-client";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const { settings } = await getStoreData();
  return (
    <CheckoutClient
      freeShippingThreshold={settings.freeShippingThreshold}
      flatShippingRate={settings.flatShippingRate}
    />
  );
}
