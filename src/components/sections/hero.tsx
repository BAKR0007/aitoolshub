"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";

type HeroProps = {
  onSearch?: (query: string) => void;
  onNavigate?: (section: string) => void;
};

export function Hero({ onSearch, onNavigate }: HeroProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
    const el = document.getElementById("discover");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { value: "100K+", label: t("stats.tools"), icon: Sparkles },
    { value: "50+", label: t("stats.categories"), icon: TrendingUp },
    { value: "2M+", label: t("stats.users"), icon: Zap },
    { value: "150K+", label: t("stats.reviews"), icon: Shield },
  ];

  const suggestions = [
    "AI for writing marketing copy",
    "Image generation tools",
    "Code assistants",
    "Video creation AI",
    "Free AI tools",
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Aurora background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/20 blur-[120px] aurora-blob" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-fuchsia-500/15 blur-[100px] aurora-blob delay-1" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-[120px] aurora-blob delay-2" />
      </div>
      {/* Grid overlay */}
      <div className="absolute inset-0 -z-10 bg-grid pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-6 px-3 py-1 border-violet-500/30 bg-violet-500/10 text-violet-500">
              <Sparkles className="w-3 h-3 mr-1.5" />
              {t("hero.badge")}
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            {t("hero.title").split(",")[0]}
            <span className="text-gradient">
              {t("hero.title").includes(",") ? "," + t("hero.title").split(",").slice(1).join(",") : ""}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Search */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="relative max-w-2xl mx-auto mb-4"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-2xl opacity-30 group-focus-within:opacity-60 blur transition-opacity" />
              <div className="relative flex items-center bg-card rounded-2xl border border-border">
                <Search className="absolute left-5 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("hero.searchPlaceholder")}
                  className="flex-1 h-14 pl-14 pr-32 text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="mr-2 h-10 px-5 rounded-xl"
                >
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  {t("hero.searchButton")}
                </Button>
              </div>
            </div>
          </motion.form>

          {/* AI suggestions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
          >
            <span className="text-xs text-muted-foreground">{t("hero.aiSearchHint")}:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  onSearch?.(s);
                  const el = document.getElementById("discover");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-xs px-2.5 py-1 rounded-full border border-border bg-card hover:bg-muted hover:border-primary/40 transition-colors"
              >
                {s}
              </button>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-3 mb-16"
          >
            <Button size="lg" onClick={() => onNavigate?.("discover")} className="h-12 px-6">
              {t("nav.discover")}
              <ArrowRight className="w-4 h-4 ml-2 rtl-flip" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate?.("pricing")} className="h-12 px-6">
              {t("nav.pricing")}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="relative p-5 rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
              >
                <stat.icon className="w-5 h-5 text-primary mb-2 mx-auto" />
                <div className="text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
