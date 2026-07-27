"use client";

import { motion } from "framer-motion";
import {
  GitCompare,
  X,
  Plus,
  Check,
  Minus,
  Star,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/shared/star-rating";
import { useI18n } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { TOOLS, CATEGORIES, type Tool } from "@/lib/data";
import { pricingLabel } from "@/components/shared/tool-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type CompareSectionProps = {
  onViewTool?: (tool: Tool) => void;
};

export function CompareSection({ onViewTool }: CompareSectionProps) {
  const { t } = useI18n();
  const { compareToolIds, removeFromCompare, clearCompare, addToCompare } = useAppStore();

  const compareTools = compareToolIds
    .map((id) => TOOLS.find((tool) => tool.id === id))
    .filter((t): t is Tool => Boolean(t));

  const availableTools = TOOLS.filter((tool) => !compareToolIds.includes(tool.id));

  const allFeatures = Array.from(
    new Set(compareTools.flatMap((tool) => tool.features))
  ).slice(0, 8);

  const comparisonRows: { label: string; render: (tool: Tool) => React.ReactNode }[] = [
    {
      label: t("common.pricing"),
      render: (tool) => <span className="font-semibold text-primary">{pricingLabel(tool, t)}</span>,
    },
    {
      label: t("compare.rating"),
      render: (tool) => <StarRating rating={tool.rating} size={12} reviewCount={tool.reviewCount} />,
    },
    {
      label: t("compare.category"),
      render: (tool) => {
        const cat = CATEGORIES.find((c) => c.slug === tool.categorySlug);
        return <span className="text-sm">{cat?.name ?? "—"}</span>;
      },
    },
    {
      label: "Free Trial",
      render: (tool) =>
        tool.freeTrial ? (
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
            <Check className="w-3 h-3 mr-0.5" />
            {tool.freeTrialDays ? `${tool.freeTrialDays} days` : "Yes"}
          </Badge>
        ) : (
          <Minus className="w-4 h-4 text-muted-foreground" />
        ),
    },
    {
      label: "Verified",
      render: (tool) =>
        tool.verified ? (
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
            <Check className="w-3 h-3 mr-0.5" />
            {t("common.verified")}
          </Badge>
        ) : (
          <Minus className="w-4 h-4 text-muted-foreground" />
        ),
    },
    {
      label: "Views",
      render: (tool) => <span className="text-sm">{(tool.viewCount / 1000).toFixed(0)}K</span>,
    },
    {
      label: "Bookmarks",
      render: (tool) => <span className="text-sm">{(tool.bookmarkCount / 1000).toFixed(0)}K</span>,
    },
    {
      label: "Tags",
      render: (tool) => (
        <div className="flex flex-wrap gap-1 justify-center">
          {tool.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Website",
      render: (tool) => (
        <a
          href={tool.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline inline-flex items-center gap-1 text-xs"
        >
          Visit <ExternalLink className="w-3 h-3" />
        </a>
      ),
    },
  ];

  return (
    <section id="compare" className="py-16 md:py-24 scroll-mt-16">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <GitCompare className="w-5 h-5 text-primary" />
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
              Side-by-side
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {t("compare.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("compare.subtitle")}</p>
        </div>

        {compareTools.length === 0 ? (
          <Card className="p-12 text-center">
            <GitCompare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">{t("compare.empty")}</p>
            <Button onClick={() => {
              const el = document.getElementById("discover");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}>
              <Plus className="w-4 h-4 mr-1.5" />
              {t("compare.addButton")}
            </Button>
          </Card>
        ) : (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                {compareTools.length < 4 && (
                  <Select onValueChange={(id) => {
                    const tool = TOOLS.find((t) => t.id === id);
                    if (tool) addToCompare(tool.id);
                  }}>
                    <SelectTrigger className="w-[200px] h-9">
                      <Plus className="w-4 h-4 mr-1" />
                      <SelectValue placeholder={t("compare.addButton")} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTools.map((tool) => (
                        <SelectItem key={tool.id} value={tool.id}>
                          {tool.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <span className="text-xs text-muted-foreground">
                  {compareTools.length}/4 tools
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={clearCompare}>
                <X className="w-4 h-4 mr-1.5" />
                {t("compare.clearAll")}
              </Button>
            </div>

            {/* Comparison grid */}
            <Card className="overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 w-40 sticky left-0 bg-card z-10">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {t("compare.feature")}
                        </span>
                      </th>
                      {compareTools.map((tool) => (
                        <th key={tool.id} className="p-4 min-w-[200px] text-left align-top">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <button
                                onClick={() => onViewTool?.(tool)}
                                className="flex items-center gap-2 text-left"
                              >
                                <div
                                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0"
                                  style={{
                                    backgroundImage: tool.logoUrl ? `url(${tool.logoUrl})` : undefined,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                >
                                  {!tool.logoUrl && (
                                    <span className="text-sm font-bold text-muted-foreground">
                                      {tool.name.charAt(0)}
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <div className="font-semibold text-sm hover:text-primary transition-colors">
                                    {tool.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground line-clamp-1">
                                    {tool.tagline}
                                  </div>
                                </div>
                              </button>
                              <button
                                onClick={() => removeFromCompare(tool.id)}
                                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                                aria-label={t("compare.remove")}
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, idx) => (
                      <tr
                        key={row.label}
                        className={cn("border-b border-border/50", idx % 2 === 0 && "bg-muted/20")}
                      >
                        <td className="p-4 sticky left-0 bg-inherit z-10">
                          <span className="text-sm font-medium text-muted-foreground">
                            {row.label}
                          </span>
                        </td>
                        {compareTools.map((tool) => (
                          <td key={tool.id} className="p-4 text-center">
                            <div className="flex justify-center">
                              {row.render(tool)}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* Features rows */}
                    {allFeatures.map((feature, idx) => (
                      <tr
                        key={feature}
                        className={cn("border-b border-border/50", idx % 2 === 0 && "bg-muted/20")}
                      >
                        <td className="p-4 sticky left-0 bg-inherit z-10">
                          <span className="text-sm font-medium text-muted-foreground line-clamp-1">
                            {feature}
                          </span>
                        </td>
                        {compareTools.map((tool) => (
                          <td key={tool.id} className="p-4 text-center">
                            {tool.features.includes(feature) ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* CTA row */}
                    <tr>
                      <td className="p-4 sticky left-0 bg-card z-10"></td>
                      {compareTools.map((tool) => (
                        <td key={tool.id} className="p-4">
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              className="w-full"
                              asChild
                            >
                              <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3.5 h-3.5 mr-1" />
                                {t("common.visit")}
                              </a>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onClick={() => onViewTool?.(tool)}
                            >
                              {t("common.viewDetails")}
                            </Button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* AI insight card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <Card className="p-5 border-primary/30 bg-primary/5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">AI Recommendation</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your comparison, <span className="font-medium text-foreground">{compareTools[0]?.name}</span> offers the best value for money with the highest feature-to-price ratio. Consider {compareTools[0]?.name}&apos;s {compareTools[0]?.pricingType.toLowerCase()} model for flexibility.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
