"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Filter, X, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToolCard } from "@/components/shared/tool-card";
import { useI18n } from "@/lib/i18n";
import { TOOLS, CATEGORIES, type Tool, type PricingType } from "@/lib/data";
import { cn } from "@/lib/utils";

type DirectorySectionProps = {
  onViewTool?: (tool: Tool) => void;
  onAddToCompare?: (tool: Tool) => void;
  initialQuery?: string;
  initialCategory?: string;
};

type SortOption = "popular" | "rated" | "newest" | "priceLow" | "priceHigh";

type FiltersProps = {
  category: string;
  setCategory: (v: string) => void;
  pricingTypes: Set<PricingType>;
  togglePricing: (type: PricingType) => void;
  minRating: number;
  setMinRating: (v: number) => void;
  hasActiveFilters: boolean;
  onClear: () => void;
};

function FiltersContent({
  category,
  setCategory,
  pricingTypes,
  togglePricing,
  minRating,
  setMinRating,
  hasActiveFilters,
  onClear,
}: FiltersProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          {t("directory.category")}
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => setCategory("all")}
            className={cn(
              "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
              category === "all"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            {t("common.all")} ({TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((tool) => tool.categorySlug === cat.slug).length;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.slug)}
                className={cn(
                  "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between",
                  category === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                <span className="truncate">{cat.name}</span>
                <span className="text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pricing */}
      <div>
        <h4 className="font-medium text-sm mb-3">{t("directory.pricing")}</h4>
        <div className="space-y-1.5">
          {(["FREE", "FREEMIUM", "PAID", "FREE_TRIAL"] as PricingType[]).map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer text-sm px-2 py-1.5 rounded-md hover:bg-muted"
            >
              <input
                type="checkbox"
                checked={pricingTypes.has(type)}
                onChange={() => togglePricing(type)}
                className="w-4 h-4 rounded border-border accent-primary"
              />
              <span className="capitalize">{t(`pricing.${type.toLowerCase()}`)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-medium text-sm mb-3">{t("directory.rating")}</h4>
        <div className="space-y-1.5">
          {[0, 4.5, 4.0, 3.5, 3.0].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={cn(
                "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2",
                minRating === rating
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              {rating === 0 ? (
                <span>{t("common.all")}</span>
              ) : (
                <>
                  <span className="text-amber-400">★</span>
                  <span>{rating}+ stars</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" size="sm" className="w-full" onClick={onClear}>
          <X className="w-4 h-4 mr-1.5" />
          {t("directory.clearFilters")}
        </Button>
      )}
    </div>
  );
}

export function DirectorySection({
  onViewTool,
  onAddToCompare,
  initialQuery = "",
  initialCategory = "all",
}: DirectorySectionProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>(initialCategory);
  const [pricingTypes, setPricingTypes] = useState<Set<PricingType>>(new Set());
  const [minRating, setMinRating] = useState<number>(0);
  const [sort, setSort] = useState<SortOption>("popular");
  const [visibleCount, setVisibleCount] = useState(9);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const togglePricing = (type: PricingType) => {
    setPricingTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setPricingTypes(new Set());
    setMinRating(0);
    setSort("popular");
    setVisibleCount(9);
  };

  const filtered = useMemo(() => {
    let result = [...TOOLS];

    // Search
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(q) ||
          tool.tagline.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter((tool) => tool.categorySlug === category);
    }

    // Pricing
    if (pricingTypes.size > 0) {
      result = result.filter((tool) => pricingTypes.has(tool.pricingType));
    }

    // Rating
    if (minRating > 0) {
      result = result.filter((tool) => tool.rating >= minRating);
    }

    // Sort
    switch (sort) {
      case "popular":
        result.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "rated":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.launchedAt).getTime() - new Date(a.launchedAt).getTime());
        break;
      case "priceLow":
        result.sort((a, b) => (a.startingPrice ?? 0) - (b.startingPrice ?? 0));
        break;
      case "priceHigh":
        result.sort((a, b) => (b.startingPrice ?? 0) - (a.startingPrice ?? 0));
        break;
    }

    return result;
  }, [query, category, pricingTypes, minRating, sort]);

  const visibleTools = filtered.slice(0, visibleCount);
  const hasActiveFilters = !!(query || category !== "all" || pricingTypes.size > 0 || minRating > 0);

  const filtersProps: FiltersProps = {
    category,
    setCategory: (v) => { setCategory(v); setVisibleCount(9); },
    pricingTypes,
    togglePricing,
    minRating,
    setMinRating,
    hasActiveFilters,
    onClear: clearFilters,
  };

  return (
    <section id="discover" className="py-16 md:py-24 scroll-mt-16 bg-card/30">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {t("directory.title")}
          </h2>
          <p className="text-muted-foreground">{t("directory.subtitle")}</p>
        </div>

        {/* Search + sort bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(9);
              }}
              placeholder={t("common.search")}
              className="pl-9 h-10"
            />
          </div>

          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-[180px] h-10 hidden md:flex">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t("directory.sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">{t("directory.sort.popular")}</SelectItem>
              <SelectItem value="rated">{t("directory.sort.rated")}</SelectItem>
              <SelectItem value="newest">{t("directory.sort.newest")}</SelectItem>
              <SelectItem value="priceLow">{t("directory.sort.priceLow")}</SelectItem>
              <SelectItem value="priceHigh">{t("directory.sort.priceHigh")}</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile filters trigger */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden h-10 w-10">
                <Filter className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{t("directory.filters")}</SheetTitle>
              </SheetHeader>
              <div className="px-4 py-4">
                <FiltersContent {...filtersProps} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-6">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <Card className="p-4 sticky top-20">
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {t("directory.filters")}
              </h3>
              <FiltersContent {...filtersProps} />
            </Card>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                {t("directory.results")}
              </p>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                  <X className="w-3 h-3 mr-1" />
                  {t("directory.clearFilters")}
                </Button>
              )}
            </div>

            {visibleTools.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">{t("directory.empty")}</p>
                <Button variant="outline" onClick={clearFilters}>
                  {t("directory.clearFilters")}
                </Button>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {visibleTools.map((tool, i) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onView={onViewTool}
                      onAddToCompare={onAddToCompare}
                      index={i}
                    />
                  ))}
                </div>

                {visibleCount < filtered.length && (
                  <div className="mt-8 flex justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setVisibleCount((c) => c + 9)}
                    >
                      {t("directory.loadMore")} ({filtered.length - visibleCount} more)
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
