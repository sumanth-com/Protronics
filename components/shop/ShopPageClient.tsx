"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ShopEmptyState from "@/components/shop/ShopEmptyState";
import ShopProductCard from "@/components/shop/ShopProductCard";
import ShopOffersCarousel from "@/components/shop/ShopOffersCarousel";
import ShopStickyFilterBar from "@/components/shop/ShopStickyFilterBar";
import ShopToolbarShell from "@/components/shop/ShopToolbarShell";
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
  () => import("@/components/shop/ShopFilterDrawer"),
  { ssr: false },
);

const ShopMobileFilters = dynamic(
  () => import("@/components/shop/ShopMobileFilters"),
  { ssr: false },
);

type ShopPageProps = {
  initialCategory?: string;
  initialBrand?: string;
  initialQuery?: string;
};

export default function ShopPageClient({
  initialCategory,
  initialBrand,
  initialQuery,
}: ShopPageProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<ShopFilterState>(() => ({
    ...DEFAULT_FILTERS,
    ...(initialBrand ? { brands: [initialBrand] } : {}),
    ...(initialQuery ? { query: initialQuery } : {}),
  }));
  const [sort, setSort] = useState<ShopSortId>("popular");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categorySlug = initialCategory;

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

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSort("popular");
  }, []);

  const handleClear = useCallback(() => {
    handleClearFilters();
    handleCategoryChange(undefined);
  }, [handleClearFilters, handleCategoryChange]);

  return (
    <main className="shop-page theme-section-a flex-1 bg-theme-bg text-theme-fg">
      <ShopToolbarShell>
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
      </ShopToolbarShell>

      <div className="shop-products-area relative z-0 mx-auto max-w-7xl px-4 pb-3 pt-[var(--shop-header-pad,9.25rem)] sm:px-6 sm:pb-5 lg:max-w-[84rem]">
        <ShopOffersCarousel />
        {filtered.length > 0 ? (
          <div className="shop-product-list mt-3">
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
