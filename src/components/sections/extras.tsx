"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, FileText, Code2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { BLOG_POSTS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function BlogSection() {
  const { t } = useI18n();

  return (
    <section id="blog" className="py-16 md:py-24 scroll-mt-16">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                Latest from the Blog
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              AI Tools Insights & Guides
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Stay ahead of the curve with our expert analysis, comparisons, and tutorials.
            </p>
          </div>
          <Button variant="outline">
            View all articles
            <ArrowRight className="w-4 h-4 ml-2 rtl-flip" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className={cn("h-40 bg-gradient-to-br relative", post.coverGradient)}>
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    {post.category}
                  </Badge>
                  <FileText className="absolute bottom-3 right-3 w-8 h-8 text-white/40" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>·</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <h3 className="font-semibold text-base mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 pt-3 border-t border-border">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-[10px] font-semibold">
                      {post.authorAvatar}
                    </div>
                    <span className="text-xs font-medium">{post.author}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ApiSection() {
  const endpoints = [
    { method: "GET", path: "/api/v1/tools", description: "List all AI tools with filtering & pagination" },
    { method: "GET", path: "/api/v1/tools/:slug", description: "Get detailed information about a specific tool" },
    { method: "GET", path: "/api/v1/categories", description: "List all tool categories" },
    { method: "POST", path: "/api/v1/tools/:id/bookmark", description: "Bookmark a tool (auth required)" },
    { method: "POST", path: "/api/v1/tools/:id/reviews", description: "Submit a review for a tool" },
    { method: "GET", path: "/api/v1/search", description: "AI-powered semantic search across tools" },
    { method: "GET", path: "/api/v1/analytics", description: "Get analytics for your account" },
  ];

  const methodColors = {
    GET: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
    POST: "border-blue-500/30 bg-blue-500/10 text-blue-500",
    PUT: "border-amber-500/30 bg-amber-500/10 text-amber-500",
    DELETE: "border-rose-500/30 bg-rose-500/10 text-rose-500",
  };

  return (
    <section id="api" className="py-16 md:py-24 scroll-mt-16 bg-card/30">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                Developer Portal
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Build with our REST API
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Access our entire directory programmatically. With comprehensive endpoints, generous rate limits, and detailed documentation, integrating AI tool data into your application has never been easier.
            </p>

            <div className="space-y-3 mb-6">
              {[
                "RESTful API with predictable URLs",
                "10,000 requests/month on Pro plan",
                "Webhook support for real-time updates",
                "OAuth 2.0 & API key authentication",
                "Comprehensive OpenAPI 3.0 spec",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Code2 className="w-3 h-3 text-primary" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button>
                <Code2 className="w-4 h-4 mr-1.5" />
                View API Docs
              </Button>
              <Button variant="outline">
                Get API Key
              </Button>
            </div>
          </div>

          {/* API endpoints preview */}
          <Card className="overflow-hidden p-0">
            <div className="bg-card border-b border-border px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2">api.aitoolshub.com</span>
            </div>
            <div className="p-4 space-y-2">
              <div className="text-xs text-muted-foreground font-mono mb-3">
                # Authentication
              </div>
              <div className="bg-muted rounded-md p-3 text-xs font-mono">
                <div className="text-muted-foreground">curl -X GET \</div>
                <div>
                  <span className="text-muted-foreground">  -H</span>{" "}
                  <span className="text-emerald-500">&quot;Authorization: Bearer YOUR_API_KEY&quot;</span>{" "}
                  <span className="text-muted-foreground">\</span>
                </div>
                <div>
                  <span className="text-muted-foreground">  </span>
                  <span className="text-blue-500">https://api.aitoolshub.com/v1/tools</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground font-mono mt-4 mb-3">
                # Available endpoints
              </div>
              {endpoints.map((ep) => (
                <div
                  key={ep.path}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer group"
                >
                  <Badge variant="outline" className={cn("text-[10px] font-mono py-0 px-1.5 w-12 justify-center", methodColors[ep.method as keyof typeof methodColors])}>
                    {ep.method}
                  </Badge>
                  <code className="text-xs text-foreground flex-1">{ep.path}</code>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Jennifer Hayes",
      role: "Product Manager",
      company: "TechFlow",
      avatar: "JH",
      content: "AIToolsHub has become our team's go-to resource for discovering new AI tools. The comparison feature alone saves us hours of research every week.",
      rating: 5,
    },
    {
      name: "Raj Patel",
      role: "CTO",
      company: "StartupX",
      avatar: "RP",
      content: "The directory is incredibly comprehensive. We've found 3 tools through AIToolsHub that have transformed our development workflow.",
      rating: 5,
    },
    {
      name: "Maria Garcia",
      role: "Marketing Director",
      company: "GrowthLabs",
      avatar: "MG",
      content: "As a marketer, I love how easy it is to find and compare AI tools for different use cases. The sponsored listings are actually relevant.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3 border-primary/30 bg-primary/10 text-primary">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Loved by creators worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join millions of users who trust AIToolsHub to find their perfect AI stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((tm, i) => (
            <motion.div
              key={tm.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-sm text-foreground leading-relaxed mb-4">
                  &ldquo;{tm.content}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-semibold">
                    {tm.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{tm.name}</div>
                    <div className="text-xs text-muted-foreground">{tm.role} · {tm.company}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { t } = useI18n();
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border p-8 md:p-16 text-center"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-pink-500/10" />
          <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-500/20 blur-[100px]" />

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 max-w-3xl mx-auto">
            {t("cta.title")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="h-12 px-6" onClick={() => onNavigate?.("pricing")}>
              {t("cta.button")}
              <ArrowRight className="w-4 h-4 ml-2 rtl-flip" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6" onClick={() => onNavigate?.("discover")}>
              {t("nav.discover")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
