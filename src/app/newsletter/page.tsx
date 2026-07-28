import type { Metadata } from "next";
import { Mail, Check, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "AI Tools Weekly Newsletter — AIToolsHub",
  description: "Join 50,000+ AI enthusiasts. Get the 5 best new AI tools in your inbox every week.",
};

export default function NewsletterPage() {
  const benefits = ["5 new AI tools every week","In-depth reviews","Exclusive deals","Early access","Industry trends","No spam, unsubscribe anytime"];
  return (
    <main className="min-h-screen bg-background">
      <section className="relative pt-20 pb-16"><div className="absolute inset-0 -z-10 bg-grid opacity-30" /><div className="container mx-auto max-w-3xl px-4 text-center">
        <Badge variant="outline" className="mb-6 border-violet-500/30 bg-violet-500/10 text-violet-500"><Mail className="w-3 h-3 mr-1.5" />Newsletter</Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">AI Tools <span className="text-gradient">Weekly</span></h1>
        <p className="text-lg text-muted-foreground mb-8">Join 50,000+ AI enthusiasts. Get the 5 best new AI tools every week.</p>
        <Card className="p-6 max-w-md mx-auto">
          <form action="https://buttondown.email/api/emails/subscribe" method="post" className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input type="email" name="email" placeholder="you@example.com" required className="flex-1" />
              <Button type="submit">Subscribe Free</Button>
            </div>
            <input type="hidden" name="embedded" value="1" />
            <p className="text-xs text-muted-foreground text-center">50,000+ subscribers · No spam · Unsubscribe anytime</p>
          </form>
        </Card>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4 text-emerald-500" /><span>Growing 105% week-over-week</span>
        </div>
      </div></section>
      <section className="py-16 bg-card/30 border-y"><div className="container mx-auto max-w-3xl px-4">
        <h2 className="text-2xl font-bold text-center mb-8">What You Get</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((b,i)=>(<div key={i} className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-primary" /></div><span className="text-sm">{b}</span></div>))}
        </div>
      </div></section>
      <section className="py-16"><div className="container mx-auto max-w-2xl px-4 text-center">
        <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Want to Sponsor?</h2>
        <p className="text-muted-foreground mb-6">Reach 50,000+ AI enthusiasts. <a href="/advertise" className="text-primary hover:underline">View sponsorship options</a></p>
      </div></section>
    </main>
  );
}
