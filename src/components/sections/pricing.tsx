"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Building2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { PLATFORM_PRICING_TIERS } from "@/lib/data";
import { cn } from "@/lib/utils";

type PricingSectionProps = {
  onNavigate?: (section: string) => void;
};

const ICONS = [Sparkles, Zap, Building2, Rocket];

export function PricingSection({ onNavigate }: PricingSectionProps) {
  const { t } = useI18n();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-16 md:py-24 scroll-mt-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/5 blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10 text-primary">
            <Sparkles className="w-3 h-3 mr-1" />
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {t("pricing.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">{t("pricing.subtitle")}</p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full border bg-card">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "px-5 py-2 text-sm font-medium rounded-full transition-colors",
                billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("pricing.monthly")}
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={cn(
                "px-5 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-2",
                billing === "yearly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("pricing.yearly")}
              <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                {t("pricing.save")}
              </Badge>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {PLATFORM_PRICING_TIERS.map((tier, i) => {
            const Icon = ICONS[i];
            const price = billing === "monthly" ? tier.monthly : tier.yearly;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="h-full"
              >
                <Card
                  className={cn(
                    "relative h-full p-6 flex flex-col transition-all",
                    tier.highlight
                      ? "border-primary shadow-lg shadow-primary/10 lg:scale-105"
                      : "hover:border-primary/40 hover:shadow-md"
                  )}
                >
                  {tier.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="px-3 py-1 shadow-md">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {t("pricing.popular")}
                      </Badge>
                    </div>
                  )}
                  <div className="mb-5">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                        tier.highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 min-h-[2.5rem]">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">${price}</span>
                      <span className="text-sm text-muted-foreground">
                        {price === 0 ? "" : t("pricing.perMonth")}
                      </span>
                    </div>
                    {billing === "yearly" && price > 0 && (
                      <p className="text-xs text-emerald-500 mt-1">
                        Billed annually (${price * 12}/yr)
                      </p>
                    )}
                  </div>

                  <Button
                    variant={tier.highlight ? "default" : "outline"}
                    className="w-full mb-5"
                    onClick={() => onNavigate?.("user-dashboard")}
                  >
                    {tier.cta}
                  </Button>

                  <ul className="space-y-2.5 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Payment providers */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
            Supported payment providers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["Stripe", "PayPal", "Paddle", "LemonSqueezy"].map((provider) => (
              <div
                key={provider}
                className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                {provider}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
