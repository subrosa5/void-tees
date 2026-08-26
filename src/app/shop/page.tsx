import { Suspense } from "react";
import type { Metadata } from "next";
import { PRODUCTS, COLLECTIONS } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { FilterPills } from "@/components/filter-pills";
import { SortSelect } from "@/components/sort-select";

export const metadata: Metadata = {
  title: "Shop All Tees — VOID.",
};

const CATEGORIES = ["men", "women", "unisex"] as const;

type SearchParams = {
  category?: string;
  collection?: string;
  sort?: string;
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { category, collection, sort } = params;

  let products = PRODUCTS.filter((p) => {
    if (category && p.category !== category) return false;
    if (collection && p.collection !== collection) return false;
    return true;
  });

  products = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6">
      <div className="mb-8 border-b-2 border-fg pb-6">
        <h1 className="font-display text-5xl sm:text-6xl tracking-tight mb-2">SHOP ALL</h1>
        <p className="font-mono text-xs tracking-[0.1em] text-muted">
          {products.length} TEE{products.length === 1 ? "" : "S"}
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <FilterPills
            label="CATEGORY"
            paramKey="category"
            options={CATEGORIES}
            active={category}
            currentSearch={params}
          />
          <FilterPills
            label="COLLECTION"
            paramKey="collection"
            options={COLLECTIONS}
            active={collection}
            currentSearch={params}
          />
        </div>
        <Suspense fallback={null}>
          <SortSelect />
        </Suspense>
      </div>

      {products.length === 0 ? (
        <div className="border-2 border-fg py-20 text-center">
          <p className="font-display text-2xl mb-2">NOTHING HERE</p>
          <p className="font-mono text-xs text-muted">Try clearing a filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
