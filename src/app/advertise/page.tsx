"use client";

import type { Metadata } from "next";
import { Megaphone, Check, Star, TrendingUp, Mail, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Promote Your AI Tool - AIToolsHub",
  description: "Get your AI tool in front of 2M+ monthly users.",
};

export default function AdvertisePage() {
  const stats = [
    { v: "2M+", l: "Users" },
    { v: "150K+", l: "Subscribers" },
    { v: "4.8", l: "Rating" },
    { v: "190+", l: "Countries" },
  ];

  const plans = [
    {
      n: "Featured",
      p: "$199",
      per: "/mo",
      d: "Featured in category",
      f: ["Featured badge", "Top in 1 category", "Search top", "Carousel", "Analytics"],
      pop: false,
      cta: "Get Featured",
      stripe: "https://buy.stripe.com/14A6oG4Pe5YP3q04NU6Zy0q",
    },
    {
      n: "Sponsored",
      p: "$499",
      per: "/mo",
      d: "Max visibility",
      f: ["Everything in Featured", "Sponsored badge", "Homepage banner", "Trending", "Account manager"],
      pop: true,
      cta: "Get Sponsored",
      stripe: "https://buy.stripe.com/dRmbJ04PegDtaSs0xE6Zy0r",
    },
    {
      n: "Newsletter",
      p: "$299",
      per: "/edition",
      d: "Reach 50K+",
      f: ["Featured in newsletter", "250 words", "Logo + CTA", "50K reach"],
      pop: false,
      cta: "Sponsor",
      stripe: "https://buy.stripe.com/8x25kC3La2MDgcM2FM6Zy0s",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="relative pt-20 pb-16">
        <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Badge variant="outline" className="mb-6 border-violet-500/30 bg-violet-500/10 text-violet-500">
            <Megaphone className="w-3 h-3 mr-1.5" />Promote
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in front of <span className="text-gradient">2M+ users</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Promote your AI tool to active buyers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg"><a href="#plans">Pricing</a></Button>
            <Button asChild size="lg" variant="outline"><a href="#contact">Talk to Sales</a></Button>
          </div>
        </div>
      </section>

      <section className="py-12 border-y bg-card/30">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-gradient">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="py-16 bg-card/30 border-y">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pricing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((p, i) => (
              <Card
                key={i}
                className={`p-6 flex flex-col ${p.pop ? "border-primary shadow-lg shadow-primary/10 md:scale-105" : ""}`}
              >
                {p.pop && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="px-3 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />Popular
                    </Badge>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-semibold text-lg">{p.n}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.d}</p>
                </div>
                <div className="mb-5">
                  <span className="text-3xl font-bold">{p.p}</span>
                  <span className="text-sm text-muted-foreground">{p.per}</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.f.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={p.pop ? "default" : "outline"}
                  className="w-full"
                  onClick={() => { window.location.href = p.stripe; }}
                >
                  {p.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 border-violet-500/30 bg-violet-500/10 text-violet-500">
              <Mail className="w-3 h-3 mr-1.5" />Talk to Sales
            </Badge>
            <h2 className="text-3xl font-bold mb-3">Ready?</h2>
            <p className="text-muted-foreground">We respond within 24 hours.</p>
          </div>
          <Card className="p-6">
            <form className="space-y-4" action="mailto:admin@bakrr.net" method="post" encType="text/plain">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Name</Label><Input name="name" required /></div>
                <div><Label>Company</Label><Input name="company" required /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Email</Label><Input name="email" type="email" required /></div>
                <div><Label>Plan</Label><Input name="plan" /></div>
              </div>
              <div><Label>Website</Label><Input name="website" type="url" required /></div>
              <div><Label>Message</Label><Textarea name="message" className="min-h-[120px]" /></div>
              <Button type="submit" className="w-full" size="lg">Send</Button>
            </form>
          </Card>
        </div>
      </section>
    </main>
  );
}
