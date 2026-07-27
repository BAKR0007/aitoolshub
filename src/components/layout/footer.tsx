"use client";

import { Sparkles, Twitter, Github, Linkedin, Youtube, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type FooterProps = {
  onNavigate?: (section: string) => void;
};

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useI18n();

  const sections: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: t("footer.product"),
      links: [
        { label: t("nav.discover"), href: "discover" },
        { label: t("nav.categories"), href: "categories" },
        { label: t("nav.compare"), href: "compare" },
        { label: t("nav.pricing"), href: "pricing" },
        { label: t("nav.api"), href: "api" },
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        { label: t("nav.blog"), href: "blog" },
        { label: "Documentation", href: "api" },
        { label: "API Reference", href: "api" },
        { label: "Tutorials", href: "blog" },
        { label: "Newsletter", href: "newsletter" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.about"), href: "about" },
        { label: "Careers", href: "careers" },
        { label: "Press Kit", href: "press" },
        { label: "Partners", href: "partners" },
        { label: "Contact", href: "contact" },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { label: "Privacy Policy", href: "privacy" },
        { label: "Terms of Service", href: "terms" },
        { label: "Cookie Policy", href: "cookies" },
        { label: "GDPR", href: "gdpr" },
        { label: "Security", href: "security" },
      ],
    },
  ];

  const socials = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const handleNav = (href: string) => {
    onNavigate?.(href);
    const el = document.getElementById(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="mt-auto border-t border-border bg-card/30">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                AI<span className="text-gradient">ToolsHub</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              The world&apos;s largest curated directory of AI tools. Discover, compare, and choose the perfect AI solution for your workflow.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-md border border-border flex items-center justify-center hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AIToolsHub. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </span>
            <span>v2.4.1</span>
            <span className="hidden sm:inline">
              {t("footer.madeWith")} <span className="text-rose-500">♥</span> {t("footer.forCreators")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
