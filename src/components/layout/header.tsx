"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Sparkles,
  Bookmark,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useAppStore } from "@/lib/store";
import { LOCALES, type Locale } from "@/lib/data";
import { cn } from "@/lib/utils";

type HeaderProps = {
  onSearch?: (query: string) => void;
  onNavigate?: (section: string) => void;
};

export function Header({ onSearch, onNavigate }: HeaderProps) {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { bookmarkedToolIds, compareToolIds } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { key: "nav.discover", href: "discover" },
    { key: "nav.categories", href: "categories" },
    { key: "nav.compare", href: "compare" },
    { key: "nav.pricing", href: "pricing" },
    { key: "nav.blog", href: "blog" },
    { key: "nav.api", href: "api" },
  ];

  const handleNav = (href: string) => {
    onNavigate?.(href);
    setMobileOpen(false);
    const el = document.getElementById(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    const el = document.getElementById("discover");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass border-b border-border/60 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:inline">
              AI<span className="text-gradient">ToolsHub</span>
            </span>
          </button>

          {/* Center nav (desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
              >
                {t(item.key)}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search (desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("common.search")}
                className="w-48 lg:w-64 pl-9 h-9 bg-muted/50 border-transparent focus-visible:bg-background"
              />
            </form>

            {/* Bookmarks */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9"
              onClick={() => handleNav("user-dashboard")}
              aria-label="Bookmarks"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkedToolIds.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] py-0">
                  {bookmarkedToolIds.length}
                </Badge>
              )}
            </Button>

            {/* Compare badge */}
            {compareToolIds.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:inline-flex relative"
                onClick={() => handleNav("compare")}
              >
                {t("nav.compare")}
                <Badge className="ml-1.5 h-4 min-w-4 px-1 text-[10px] py-0">
                  {compareToolIds.length}
                </Badge>
              </Button>
            )}

            {/* Language switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Language">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[180px]">
                {LOCALES.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLocale(l.code as Locale)}
                    className={cn("flex items-center gap-2 cursor-pointer", locale === l.code && "bg-accent")}
                  >
                    <span className="text-base">{l.flag}</span>
                    <span className="flex-1">{l.nativeName}</span>
                    {locale === l.code && <span className="text-primary">●</span>}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-[10px] text-muted-foreground">
                  Full RTL support for Arabic
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Sign in (desktop) */}
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              {t("nav.signIn")}
            </Button>
            <Button size="sm" className="hidden md:inline-flex" onClick={() => handleNav("user-dashboard")}>
              {t("nav.signUp")}
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    AI<span className="text-gradient">ToolsHub</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="px-4 py-2 space-y-1">
                  {/* Mobile search */}
                  <form onSubmit={handleSearchSubmit} className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t("common.search")}
                      className="pl-9"
                    />
                  </form>
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNav(item.href)}
                      className="w-full text-left px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md"
                    >
                      {t(item.key)}
                    </button>
                  ))}
                  <div className="h-px bg-border my-3" />
                  <Button variant="outline" className="w-full mb-2" onClick={() => handleNav("user-dashboard")}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    {t("nav.dashboard")}
                  </Button>
                  <Button className="w-full">{t("nav.signUp")}</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
