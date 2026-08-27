import Link from "next/link";
import { ProductVisual } from "@/components/product-visual";
import { formatPrice, TAG_LABELS, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block border-2 border-fg bg-surface"
    >
      <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-fg bg-hairline/30">
        {product.tag && (
          <span className="absolute left-2 top-2 z-10 border border-fg bg-bg px-2 py-1 font-mono text-[10px] tracking-[0.1em]">
            {TAG_LABELS[product.tag]}
          </span>
        )}
        <ProductVisual
          product={product}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3 sm:p-4">
        <div className="font-mono text-[10px] tracking-[0.15em] text-muted mb-1">
          {product.collection}
        </div>
        <h3 className="font-display text-lg sm:text-xl leading-tight tracking-tight">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-2 font-mono text-sm">
          <span>{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="text-muted line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
