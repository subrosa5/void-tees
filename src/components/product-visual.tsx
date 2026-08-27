import { TeeGraphic } from "@/components/tee-graphic";
import type { Product } from "@/lib/products";

/**
 * Shows the admin-uploaded product photo when one exists, otherwise falls
 * back to the illustrated TeeGraphic placeholder.
 */
export function ProductVisual({ product, className }: { product: Product; className?: string }) {
  if (product.image) {
    return (
      // Blob URLs are arbitrary per-upload hosts, so next/image would need
      // per-domain config for each one — a plain <img> is simpler here.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={product.image} alt={product.name} className={`object-cover ${className ?? ""}`} />
    );
  }
  return (
    <TeeGraphic color={product.color} print={product.print} name={product.name} className={className} />
  );
}
