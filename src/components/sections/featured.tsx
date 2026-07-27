"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolCard } from "@/components/shared/tool-card";
import { useI18n } from "@/lib/i18n";
import { TOOLS, type Tool } from "@/lib/data";

type FeaturedSectionProps = {
  onViewTool?: (tool: Tool) => void;
  onAddToCompare?: (tool: Tool) => void;
};

export function FeaturedSection({ onViewTool, onAddToCompare }: FeaturedSectionProps) {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);
  const featured = TOOLS.filter((tool) => tool.featured).slice(0, 8);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const isRTL = document.documentElement.dir === "rtl";
    const dir = isRTL ? (direction === "left" ? "right" : "left") : direction;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="featured" className="py-16 md:py-24 scroll-mt-16 relative">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-orange-500" />
              <Badge variant="outline" className="border-orange-500/30 bg-orange-500/10 text-orange-500">
                Trending
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {t("featured.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl">{t("featured.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} aria-label="Previous">
              <ChevronLeft className="w-4 h-4 rtl-flip" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} aria-label="Next">
              <ChevronRight className="w-4 h-4 rtl-flip" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => {
              const el = document.getElementById("discover");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}>
              {t("featured.viewAll")}
              <ArrowRight className="w-4 h-4 ml-2 rtl-flip" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4"
        >
          {featured.map((tool, i) => (
            <div
              key={tool.id}
              className="min-w-[300px] max-w-[300px] snap-start"
            >
              <ToolCard
                tool={tool}
                onView={onViewTool}
                onAddToCompare={onAddToCompare}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
