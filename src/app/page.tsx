"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { CategoriesSection } from "@/components/sections/categories";
import { FeaturedSection } from "@/components/sections/featured";
import { DirectorySection } from "@/components/sections/directory";
import { CompareSection } from "@/components/sections/compare";
import { PricingSection } from "@/components/sections/pricing";
import { UserDashboard } from "@/components/sections/user-dashboard";
import { AdminDashboard } from "@/components/sections/admin-dashboard";
import { BlogSection, ApiSection, TestimonialsSection, CtaSection } from "@/components/sections/extras";
import { ToolDialog } from "@/components/sections/tool-dialog";
import type { Tool } from "@/lib/data";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Force directory to re-init with new query
    const el = document.getElementById("discover");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleCategorySelect = useCallback((slug: string) => {
    setActiveCategory(slug);
    setSearchQuery("");
    const el = document.getElementById("discover");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleViewTool = useCallback((tool: Tool) => {
    setSelectedTool(tool);
    setDialogOpen(true);
  }, []);

  const handleNavigate = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onSearch={handleSearch} onNavigate={handleNavigate} />

      <main className="flex-1">
        <Hero onSearch={handleSearch} onNavigate={handleNavigate} />
        <TrustStrip />
        <CategoriesSection onCategorySelect={handleCategorySelect} />
        <FeaturedSection onViewTool={handleViewTool} />
        <DirectorySection
          onViewTool={handleViewTool}
          initialQuery={searchQuery}
          initialCategory={activeCategory}
        />
        <CompareSection onViewTool={handleViewTool} />
        <PricingSection onNavigate={handleNavigate} />
        <UserDashboard onViewTool={handleViewTool} />
        <AdminDashboard />
        <BlogSection />
        <ApiSection />
        <TestimonialsSection />
        <CtaSection onNavigate={handleNavigate} />
      </main>

      <Footer onNavigate={handleNavigate} />

      <ToolDialog
        tool={selectedTool}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onViewTool={handleViewTool}
      />
    </div>
  );
}
