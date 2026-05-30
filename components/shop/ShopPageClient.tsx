"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ShopEmptyState from "@/components/shop/ShopEmptyState";
import ShopHero from "@/components/shop/ShopHero";
import ShopMobileFilters from "@/components/shop/ShopMobileFilters";
import ShopProductCard from "@/components/shop/ShopProductCard";
import ShopStickyFilterBar from "@/components/shop/ShopStickyFilterBar";
import {
  DEFAULT_FILTERS,
  SHOP_PRODUCTS,
  buildShopPath,
  filterProducts,
  sortProducts,
  type ShopFilterState,
  type ShopSortId,
} from "@/lib/shop";

const ShopFilterDrawer = dynamic(
  () =>
    import("@/components/shop/ShopHero").then((mod) => ({
      default: mod.ShopFilterDrawer,
    })),
  { ssr: false },
);

type ShopPageProps = {
  initialCategory?: string;
  initialBrand?: string;
};

export default function ShopPageClient({
  initialCategory,
  initialBrand,
}: ShopPageProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<ShopFilterState>(() =>
    initialBrand
      ? { ...DEFAULT_FILTERS, brands: [initialBrand] }
      : DEFAULT_FILTERS,
  );
  const [sort, setSort] = useState<ShopSortId>("popular");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categorySlug = initialCategory;

  useEffect(() => {
    if (initialBrand) {
      setFilters((prev) => ({ ...prev, brands: [initialBrand] }));
    }
  }, [initialBrand]);

  const filtered = useMemo(
    () => sortProducts(filterProducts(SHOP_PRODUCTS, categorySlug, filters), sort),
    [categorySlug, filters, sort],
  );

  const handleCategoryChange = useCallback(
    (slug: string | undefined) => {
      router.push(buildShopPath(slug), { scroll: false });
      setDrawerOpen(false);
    },
    [router],
  );

  const handleClear = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSort("popular");
    handleCategoryChange(undefined);
  }, [handleCategoryChange]);

  return (
    <main className="min-h-screen bg-black text-white">
      <ShopHero productCount={SHOP_PRODUCTS.length} categoryCount={5} />

      <ShopStickyFilterBar
        activeCategory={categorySlug}
        filters={filters}
        sort={sort}
        resultCount={filtered.length}
        onCategoryChange={handleCategoryChange}
        onFiltersChange={setFilters}
        onSortChange={setSort}
        onMobileFilterOpen={() => setDrawerOpen(true)}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <p className="mb-5 hidden text-[13px] text-white/45 lg:block">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>

        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <ShopEmptyState onClear={handleClear} />
        )}
      </div>

      <ShopFilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerOpen ? (
          <ShopMobileFilters
            filters={filters}
            activeCategory={categorySlug}
            sort={sort}
            onCategoryChange={handleCategoryChange}
            onFiltersChange={setFilters}
            onSortChange={setSort}
            onClear={handleClear}
          />
        ) : null}
      </ShopFilterDrawer>
    </main>
  );
}
