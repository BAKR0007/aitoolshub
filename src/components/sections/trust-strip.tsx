"use client";

import { motion } from "framer-motion";

const LOGOS = [
  "OpenAI", "Anthropic", "Google", "Meta", "Microsoft", "Stability AI",
  "Midjourney", "Hugging Face", "ElevenLabs", "Notion", "GitHub", "Adobe",
];

export function TrustStrip() {
  return (
    <section className="py-8 border-y border-border bg-card/30">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <p className="text-center text-xs text-muted-foreground mb-6 uppercase tracking-wider">
          Trusted by teams at leading AI companies
        </p>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-12 w-max">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-lg font-semibold text-muted-foreground/60 hover:text-foreground transition-colors shrink-0"
              >
                <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500/40 to-fuchsia-500/40" />
                {logo}
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
