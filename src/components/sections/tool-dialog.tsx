"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Bookmark,
  Share2,
  GitCompare,
  Check,
  Star,
  Eye,
  ThumbsUp,
  X,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StarRating } from "@/components/shared/star-rating";
import { useI18n } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { TOOLS, REVIEWS, CATEGORIES, type Tool } from "@/lib/data";
import { ToolCard, pricingLabel } from "@/components/shared/tool-card";
import { cn } from "@/lib/utils";

type ToolDialogProps = {
  tool: Tool | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewTool?: (tool: Tool) => void;
};

export function ToolDialog({ tool, open, onOpenChange, onViewTool }: ToolDialogProps) {
  const { t } = useI18n();
  const { toast } = useToast();
  const { bookmarkedToolIds, compareToolIds, toggleBookmark, addToCompare, removeFromCompare } = useAppStore();
  const [activeTab, setActiveTab] = useState("overview");

  if (!tool) return null;

  const isBookmarked = bookmarkedToolIds.includes(tool.id);
  const isComparing = compareToolIds.includes(tool.id);
  const reviews = REVIEWS.filter((r) => r.toolId === tool.id);
  const category = CATEGORIES.find((c) => c.slug === tool.categorySlug);
  const alternatives = TOOLS.filter(
    (t2) => t2.categorySlug === tool.categorySlug && t2.id !== tool.id
  ).slice(0, 3);

  const handleBookmark = () => {
    toggleBookmark(tool.id);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: tool.name,
    });
  };

  const handleCompare = () => {
    if (isComparing) {
      removeFromCompare(tool.id);
      toast({ title: "Removed from comparison", description: tool.name });
    } else {
      addToCompare(tool.id);
      toast({ title: "Added to comparison", description: tool.name });
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: tool.name, text: tool.tagline, url: tool.websiteUrl });
      } catch {}
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(tool.websiteUrl);
      toast({ title: "Link copied to clipboard", description: tool.name });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{tool.name}</DialogTitle>
        </DialogHeader>

        {/* Banner */}
        <div className="relative h-32 md:h-40 bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-pink-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 z-10 h-8 w-8 bg-background/40 backdrop-blur"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start gap-4 -mt-16 mb-6">
              <div
                className="w-20 h-20 rounded-2xl bg-card border-4 border-background shadow-lg flex items-center justify-center shrink-0 overflow-hidden"
                style={{
                  backgroundImage: tool.logoUrl ? `url(${tool.logoUrl})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!tool.logoUrl && (
                  <span className="text-3xl font-bold text-muted-foreground">
                    {tool.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0 mt-16">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-2xl font-bold">{tool.name}</h2>
                  {tool.verified && (
                    <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                      <Check className="w-3 h-3 mr-1" />
                      {t("common.verified")}
                    </Badge>
                  )}
                  {tool.sponsored && (
                    <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-500">
                      {t("common.sponsored")}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{tool.tagline}</p>
              </div>
            </div>

            {/* Action bar */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Button asChild size="sm">
                <a href={tool.affiliateUrl || tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1.5" />
                  {t("common.visit")}
                </a>
              </Button>
              <Button variant={isBookmarked ? "secondary" : "outline"} size="sm" onClick={handleBookmark}>
                <Bookmark className={cn("w-4 h-4 mr-1.5", isBookmarked && "fill-primary")} />
                {isBookmarked ? t("common.bookmarked") : t("common.bookmark")}
              </Button>
              <Button variant={isComparing ? "secondary" : "outline"} size="sm" onClick={handleCompare}>
                <GitCompare className="w-4 h-4 mr-1.5" />
                {isComparing ? t("common.added") : t("common.compare")}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-1.5" />
                {t("common.share")}
              </Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="rounded-lg border bg-card p-3">
                <div className="text-xs text-muted-foreground mb-1">{t("common.pricing")}</div>
                <div className="font-semibold text-primary">{pricingLabel(tool, t)}</div>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <div className="text-xs text-muted-foreground mb-1">{t("compare.rating")}</div>
                <div className="font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {tool.rating.toFixed(1)}
                  <span className="text-xs text-muted-foreground font-normal">
                    ({tool.reviewCount.toLocaleString()})
                  </span>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <div className="text-xs text-muted-foreground mb-1">{t("compare.category")}</div>
                <div className="font-semibold text-sm truncate">{category?.name ?? "â€”"}</div>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <div className="text-xs text-muted-foreground mb-1">Views</div>
                <div className="font-semibold flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                  {(tool.viewCount / 1000).toFixed(0)}K
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start overflow-x-auto no-scrollbar">
                <TabsTrigger value="overview">{t("common.features")}</TabsTrigger>
                <TabsTrigger value="pricing">{t("common.pricing")}</TabsTrigger>
                <TabsTrigger value="reviews">
                  {t("common.reviews")} ({reviews.length})
                </TabsTrigger>
                <TabsTrigger value="alternatives">{t("common.alternatives")}</TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-sm mb-2">About {tool.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tool.longDescription}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-3">{t("common.features")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tool.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2">{t("compare.tags")}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Pricing */}
              <TabsContent value="pricing" className="mt-4">
                {tool.pricingPlans.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("pricing.contactPricing")}</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {tool.pricingPlans.map((plan) => (
                      <div
                        key={plan.name}
                        className={cn(
                          "rounded-xl border p-4 relative",
                          plan.isPopular && "border-primary shadow-md shadow-primary/10"
                        )}
                      >
                        {plan.isPopular && (
                          <Badge className="absolute -top-2 right-3 text-[10px] py-0">
                            <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                            Popular
                          </Badge>
                        )}
                        <div className="font-semibold mb-1">{plan.name}</div>
                        <div className="text-2xl font-bold mb-3">
                          ${plan.price}
                          <span className="text-sm font-normal text-muted-foreground">
                            {plan.period === "MONTHLY" ? t("pricing.perMonth") : t("pricing.perYear")}
                          </span>
                        </div>
                        <ul className="space-y-1.5">
                          {plan.features.map((f) => (
                            <li key={f} className="text-xs flex items-start gap-1.5">
                              <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                              <span className="text-muted-foreground">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews" className="mt-4 space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No reviews yet. Be the first to review {tool.name}!
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="rounded-lg border bg-card p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                          {review.userAvatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{review.userName}</span>
                              {review.verified && (
                                <Badge variant="outline" className="text-[10px] py-0 border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                                  <Check className="w-2.5 h-2.5 mr-0.5" />
                                  {t("common.verified")}
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.createdAt}</span>
                          </div>
                          <StarRating rating={review.rating} size={12} showValue={false} />
                          <h4 className="font-medium text-sm mt-2">{review.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {review.content}
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              Helpful ({review.helpfulCount})
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              {/* Alternatives */}
              <TabsContent value="alternatives" className="mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Similar tools in the {category?.name} category:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {alternatives.map((alt) => (
                    <ToolCard
                      key={alt.id}
                      tool={alt}
                      onView={(t2) => {
                        onViewTool?.(t2);
                      }}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
