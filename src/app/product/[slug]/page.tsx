import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, getProduct } from "@/lib/products";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — VOID.`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.collection === product.collection
  ).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6">
      <nav className="mb-8 font-mono text-[11px] tracking-[0.1em] text-muted">
        <Link href="/" className="hover:text-fg">ГЛАВНАЯ</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-fg">КАТАЛОГ</Link>
        <span className="mx-2">/</span>
        <span className="text-fg">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mt-20 border-t-2 border-fg pt-10">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-6">
            ЕЩЁ ИЗ {product.collection}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
