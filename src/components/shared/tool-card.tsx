"use client";

import { useMemo } from "react";
import { Check, Eye, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/shared/star-rating";
import { useI18n } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Tool } from "@/lib/data";

type ToolCardProps = {
  tool: Tool;
  onView?: (tool: Tool) => void;
  onAddToCompare?: (tool: Tool) => void;
  className?: string;
  index?: number;
};

const CATEGORY_COLORS: Record<string, string> = {
  violet: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  pink: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  rose: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  green: "bg-green-500/10 text-green-500 border-green-500/20",
  purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  cyan: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  teal: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  slate: "bg-slate-500/10 text-slate-500 border-slate-500/20",
};

export function pricingLabel(tool: Tool, t: (k: string) => string): string {
  if (tool.startingPrice === 0 || tool.pricingType === "FREE") return t("pricing.free");
  if (tool.pricingType === "FREEMIUM") return t("pricing.freemium");
  if (tool.pricingType === "FREE_TRIAL") return t("pricing.freeTrial");
  if (tool.pricingType === "CONTACT_PRICING") return t("pricing.contactPricing");
  return `$${tool.startingPrice}${t("pricing.perMonth")}`;
}

export function ToolCard({ tool, onView, onAddToCompare, className, index = 0 }: ToolCardProps) {
  const { t } = useI18n();
  const { toast } = useToast();
  const { bookmarkedToolIds, compareToolIds, toggleBookmark, addToCompare, removeFromCompare } = useAppStore();

  const isBookmarked = bookmarkedToolIds.includes(tool.id);
  const isComparing = compareToolIds.includes(tool.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(tool.id);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: tool.name,
    });
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isComparing) {
      removeFromCompare(tool.id);
      toast({ title: "Removed from comparison", description: tool.name });
    } else {
      addToCompare(tool.id);
      toast({ title: "Added to comparison", description: tool.name });
    }
    onAddToCompare?.(tool);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
      className={cn("h-full", className)}
    >
      <Card
        onClick={() => onView?.(tool)}
        className="group relative h-full overflow-hidden p-5 cursor-pointer transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
      >
        {/* Top badges */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {tool.sponsored && (
              <Badge variant="outline" className="text-[10px] py-0.5 px-1.5 border-amber-500/30 bg-amber-500/10 text-amber-500">
                {t("common.sponsored")}
              </Badge>
            )}
            {tool.featured && !tool.sponsored && (
              <Badge variant="outline" className="text-[10px] py-0.5 px-1.5 border-violet-500/30 bg-violet-500/10 text-violet-500">
                {t("common.featured")}
              </Badge>
            )}
            {tool.verified && (
              <Badge variant="outline" className="text-[10px] py-0.5 px-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                <Check className="w-2.5 h-2.5 mr-0.5" />
                {t("common.verified")}
              </Badge>
            )}
          </div>
          <button
            onClick={handleBookmark}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-muted"
            aria-label={t("common.bookmark")}
          >
            <Bookmark
              className={cn(
                "w-4 h-4",
                isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"
              )}
            />
          </button>
        </div>

        {/* Logo + name */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center overflow-hidden shrink-0 ring-1 ring-border"
            style={{
              backgroundImage: tool.logoUrl ? `url(${tool.logoUrl})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!tool.logoUrl && (
              <span className="text-lg font-bold text-muted-foreground">
                {tool.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base leading-tight truncate group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{tool.tagline}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4 min-h-[1.5rem]">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex flex-col gap-1">
            <StarRating rating={tool.rating} reviewCount={tool.reviewCount} size={12} />
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-0.5">
                <Eye className="w-3 h-3" />
                {formatNumber(tool.viewCount)}
              </span>
              <span className="inline-flex items-center gap-0.5">
                <Bookmark className="w-3 h-3" />
                {formatNumber(tool.bookmarkCount)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-sm font-semibold text-primary">
              {pricingLabel(tool, t)}
            </span>
            <Button
              size="sm"
              variant={isComparing ? "secondary" : "outline"}
              onClick={handleCompare}
              className="h-7 text-xs px-2.5"
            >
              {isComparing ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  {t("common.added")}
                </>
              ) : (
                t("common.compare")
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
