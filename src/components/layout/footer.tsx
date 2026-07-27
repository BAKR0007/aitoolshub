"use client";
import Link from "next/link";
import { Sparkles, Twitter, Github, Linkedin, Youtube, Mail, Megaphone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type FooterProps = { onNavigate?: (s: string) => void };

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useI18n();
  const il = [
    { l: t("nav.discover"), h: "discover" },
    { l: t("nav.categories"), h: "categories" },
    { l: t("nav.compare"), h: "compare" },
    { l: t("nav.pricing"), h: "pricing" },
    { l: t("nav.api"), h: "api" },
    { l: t("nav.blog"), h: "blog" },
  ];
  const cl = [
    { l: t("footer.about"), h: "/about" },
    { l: "Contact", h: "/contact" },
    { l: "Promote", h: "/advertise" },
  ];
  const ll = [
    { l: "Privacy", h: "/privacy" },
    { l: "Terms", h: "/terms" },
    { l: "Disclosure", h: "/disclosure" },
  ];
  const sc = [
    { i: Twitter, h: "https://twitter.com" },
    { i: Github, h: "https://github.com" },
    { i: Linkedin, h: "https://linkedin.com" },
    { i: Youtube, h: "https://youtube.com" },
    { i: Mail, h: "mailto:hello@bakrr.net" },
  ];
  const hn = (h: string) => {
    onNavigate?.(h);
    document.getElementById(h)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="mt-auto border-t border-border bg-card/30">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">AI<span className="text-gradient">ToolsHub</span></span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">The world&apos;s largest curated AI tools directory.</p>
            <div className="flex gap-2 mb-4">
              {sc.map((s, i) => (
                <a key={i} href={s.h} className="w-9 h-9 rounded-md border flex items-center justify-center hover:border-primary hover:text-primary">
                  <s.i className="w-4 h-4" />
                </a>
              ))}
            </div>
            <Link href="/advertise" className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline">
              <Megaphone className="w-3 h-3" />Promote Your AI Tool
            </Link>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Explore</h4>
            <ul className="space-y-2">
              {il.map((l) => (<li key={l.l}><button onClick={() => hn(l.h)} className="text-sm text-muted-foreground hover:text-foreground">{l.l}</button></li>))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              {cl.map((l) => (<li key={l.l}><Link href={l.h} className="text-sm text-muted-foreground hover:text-foreground">{l.l}</Link></li>))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2">
              {ll.map((l) => (<li key={l.l}><Link href={l.h} className="text-sm text-muted-foreground hover:text-foreground">{l.l}</Link></li>))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Contact</h4>
            <ul className="space-y-2">
              <li><a href="mailto:hello@bakrr.net" className="text-sm text-muted-foreground hover:text-foreground">hello@bakrr.net</a></li>
              <li><a href="mailto:support@bakrr.net" className="text-sm text-muted-foreground hover:text-foreground">support@bakrr.net</a></li>
              <li><a href="mailto:admin@bakrr.net" className="text-sm text-muted-foreground hover:text-foreground">admin@bakrr.net</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center mb-4">
            <strong className="text-foreground">Affiliate Disclosure:</strong> We may earn commissions when you sign up via our links, at no extra cost to you. <Link href="/disclosure" className="text-primary hover:underline">Learn more</Link>
          </p>
        </div>
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} AIToolsHub. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />All systems operational
            </span>
            <span>v2.5.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
