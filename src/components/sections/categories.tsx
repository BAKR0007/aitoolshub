"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";

type CategoriesSectionProps = {
  onCategorySelect?: (slug: string) => void;
};

const COLOR_CLASSES: Record<string, string> = {
  violet: "from-violet-500/20 to-violet-500/5 text-violet-500 group-hover:border-violet-500/40",
  pink: "from-pink-500/20 to-pink-500/5 text-pink-500 group-hover:border-pink-500/40",
  rose: "from-rose-500/20 to-rose-500/5 text-rose-500 group-hover:border-rose-500/40",
  emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-500 group-hover:border-emerald-500/40",
  blue: "from-blue-500/20 to-blue-500/5 text-blue-500 group-hover:border-blue-500/40",
  amber: "from-amber-500/20 to-amber-500/5 text-amber-500 group-hover:border-amber-500/40",
  orange: "from-orange-500/20 to-orange-500/5 text-orange-500 group-hover:border-orange-500/40",
  green: "from-green-500/20 to-green-500/5 text-green-500 group-hover:border-green-500/40",
  purple: "from-purple-500/20 to-purple-500/5 text-purple-500 group-hover:border-purple-500/40",
  cyan: "from-cyan-500/20 to-cyan-500/5 text-cyan-500 group-hover:border-cyan-500/40",
  teal: "from-teal-500/20 to-teal-500/5 text-teal-500 group-hover:border-teal-500/40",
  slate: "from-slate-500/20 to-slate-500/5 text-slate-500 group-hover:border-slate-500/40",
};

export function CategoriesSection({ onCategorySelect }: CategoriesSectionProps) {
  const { t } = useI18n();
  const featuredCategories = CATEGORIES.filter((c) => c.isFeatured).slice(0, 10);

  return (
    <section id="categories" className="py-16 md:py-24 scroll-mt-16">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {t("categories.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl">{t("categories.subtitle")}</p>
          </div>
          <Button variant="outline" onClick={() => onCategorySelect?.("all")}>
            {t("categories.viewAll")}
            <ArrowRight className="w-4 h-4 ml-2 rtl-flip" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredCategories.map((cat, i) => {
            const IconComponent = (Icons as any)[cat.icon] ?? Icons.Sparkles;
            const colorClass = COLOR_CLASSES[cat.color] ?? COLOR_CLASSES.violet;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.5) }}
                onClick={() => onCategorySelect?.(cat.slug)}
                className="text-left"
              >
                <Card className={cn(
                  "group relative overflow-hidden p-5 h-full transition-all hover:-translate-y-1 hover:shadow-lg border bg-gradient-to-br",
                  colorClass
                )}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-card/80 backdrop-blur flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1 text-foreground">{cat.name}</h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3 min-h-[2rem]">
                      {cat.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground/80">
                        {cat.toolCount.toLocaleString()} tools
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all rtl-flip" />
                    </div>
                  </div>
                </Card>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
