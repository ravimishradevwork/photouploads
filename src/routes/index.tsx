import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Wand2,
  TrendingUp,
  Users,
  Zap,
  Star,
  Check,
  ArrowRight,
  ImageIcon,
  Megaphone,
  BarChart3,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import showcase from "@/assets/showcase-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PRMorph — Grow Your Brand with AI-Powered PR" },
      {
        name: "description",
        content:
          "AI-powered PR & social media platform for brands, influencers and creators. Generate viral creatives, manage campaigns, and discover influencers.",
      },
      { property: "og:title", content: "PRMorph — Grow Your Brand with AI-Powered PR" },
      {
        property: "og:description",
        content: "AI-powered PR & social media transformations for modern brands.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <SiteHeader />
      <Hero />
      <LogoStrip />
      <Features />
      <Showcase />
      <Stats />
      <Testimonials />
      <PricingTeaser />
      <CTA />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-40 pb-32 bg-hero overflow-hidden">
      <div className="absolute inset-0 noise" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-purple/20 blur-3xl animate-glow" />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Introducing PRMorph 2.0 — AI Photo Lab
        </div>
        <h1 className="mt-8 text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] animate-fade-up">
          Grow Your Brand with
          <br />
          <span className="text-gradient-luxe">AI-Powered PR</span>
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-up delay-100">
          The all-in-one platform to launch viral campaigns, generate stunning AI creatives,
          and connect with influencers — built for ambitious brands.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-200">
          <Button asChild variant="luxe" size="xl" className="min-w-[180px]">
            <Link to="/dashboard">
              Start Free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="glass" size="xl" className="min-w-[200px]">
            <Link to="/dashboard/ai-lab">
              <Wand2 className="h-4 w-4" /> Generate AI Creative
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground animate-fade-up delay-300">
          No credit card required · 7-day pro trial · Cancel anytime
        </p>

        {/* Floating preview */}
        <div className="relative mt-20 animate-fade-up delay-500">
          <div className="absolute inset-x-10 -inset-y-4 bg-gradient-luxe opacity-30 blur-3xl rounded-full" />
          <div className="relative glass-card rounded-3xl p-2 mx-auto max-w-5xl">
            <div className="rounded-2xl bg-card overflow-hidden border border-border">
              <div className="flex items-center gap-2 border-b border-border bg-background/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-purple/60" />
                </div>
                <div className="ml-3 text-xs text-muted-foreground">app.prmorph.io/dashboard</div>
              </div>
              <DashPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashPreview() {
  const cards = [
    { label: "Active Campaigns", value: "24", trend: "+12%" },
    { label: "Total Reach", value: "2.4M", trend: "+38%" },
    { label: "AI Creatives", value: "1,284", trend: "+212%" },
    { label: "Revenue", value: "$48K", trend: "+24%" },
  ];
  return (
    <div className="p-6 md:p-8 grid gap-4 md:grid-cols-4 bg-card">
      {cards.map((c, i) => (
        <div
          key={c.label}
          className="rounded-xl border border-border bg-background/40 p-4 text-left"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="text-xs text-muted-foreground">{c.label}</div>
          <div className="mt-2 text-2xl font-semibold">{c.value}</div>
          <div className="text-xs text-primary mt-1">{c.trend}</div>
        </div>
      ))}
    </div>
  );
}

function LogoStrip() {
  const brands = ["VOGUE", "FORBES", "TECHCRUNCH", "WIRED", "BLOOMBERG", "FAST CO."];
  return (
    <section className="border-y border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
          Trusted by 12,000+ brands worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
          {brands.map((b) => (
            <div key={b} className="text-lg font-bold tracking-widest text-muted-foreground">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Wand2,
      title: "AI Photo Lab",
      desc: "Transform any image into a viral creative with luxury templates, festival promos, influencer styles and more.",
    },
    {
      icon: Megaphone,
      title: "Smart Campaigns",
      desc: "Launch, track and scale PR campaigns across every social platform from one elegant workspace.",
    },
    {
      icon: Users,
      title: "Influencer Marketplace",
      desc: "Discover and book vetted creators by niche, audience size, and city — no spreadsheets required.",
    },
    {
      icon: BarChart3,
      title: "Live Analytics",
      desc: "Real-time reach, engagement and ROI dashboards beautifully designed for decision-makers.",
    },
    {
      icon: Zap,
      title: "1-Click Publishing",
      desc: "Schedule and publish to Instagram, TikTok, X and LinkedIn with smart caption suggestions.",
    },
    {
      icon: TrendingUp,
      title: "Viral Predictor",
      desc: "Our AI scores every creative for virality potential before you ever hit publish.",
    },
  ];
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Features</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything you need to <span className="text-gradient-luxe">go viral</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Beautifully crafted tools for the modern PR team.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative glass-card rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06]"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-luxe blur-xl -z-10" />
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-luxe shadow-[0_0_20px_-4px_oklch(0.82_0.14_85_/_0.5)]">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">AI Photo Lab</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            From snapshot to <span className="text-gradient-luxe">scroll-stopper</span> in seconds
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Drop in any image and our AI transforms it into a stunning luxury poster, festival promo,
            influencer-grade portrait or ad creative — instantly.
          </p>
          <div className="mt-8 space-y-3">
            {[
              "30+ premium template categories",
              "Photo-realistic AI rendering",
              "1-click brand kit application",
              "4K downloads with no watermark",
            ].map((p) => (
              <div key={p} className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">{p}</span>
              </div>
            ))}
          </div>
          <Button asChild variant="luxe" size="lg" className="mt-10">
            <Link to="/dashboard/ai-lab">
              Try AI Photo Lab <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-luxe opacity-30 blur-3xl rounded-full" />
          <div className="relative glass-card rounded-3xl p-3 animate-float">
            <img
              src={showcase}
              alt="AI generated luxury creative"
              width={800}
              height={1000}
              loading="lazy"
              className="rounded-2xl w-full h-auto"
            />
            <div className="absolute top-6 left-6 glass rounded-full px-3 py-1.5 text-xs">
              <Sparkles className="h-3 w-3 inline mr-1 text-primary" /> AI Generated
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "12K+", l: "Active brands" },
    { v: "2.8M", l: "AI creatives generated" },
    { v: "$420M", l: "Campaign value managed" },
    { v: "98%", l: "Customer satisfaction" },
  ];
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl glass-card rounded-3xl p-12 md:p-16 grid gap-10 md:grid-cols-4 text-center">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="text-4xl md:text-5xl font-bold text-gradient-luxe">{s.v}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "PRMorph took our launch from 0 to 4M impressions in a week. The AI Photo Lab alone replaced our entire creative agency.",
      name: "Aria Chen",
      role: "CMO, Lumen Cosmetics",
    },
    {
      quote:
        "We manage 30+ influencer campaigns from one dashboard. It's like Notion and Canva had a beautiful baby.",
      name: "Marcus Vega",
      role: "Founder, NorthStar Studio",
    },
    {
      quote:
        "The viral predictor is uncanny. Every creative we ship hits — our engagement is up 312% since switching.",
      name: "Priya Anand",
      role: "Head of Growth, Verde",
    },
  ];
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Loved by founders</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Brands ship faster with PRMorph
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <div key={t.name} className="glass-card rounded-2xl p-8">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-base leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3 pt-6 border-t border-border">
                <div className="h-10 w-10 rounded-full bg-gradient-luxe flex items-center justify-center font-semibold text-primary-foreground">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingTeaser() {
  const plans = [
    { name: "Free", price: "$0", desc: "For exploring", popular: false },
    { name: "Pro", price: "$49", desc: "For creators", popular: true },
    { name: "Agency", price: "$249", desc: "For teams", popular: false },
  ];
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple, scalable pricing
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative glass-card rounded-2xl p-8 transition-all hover:-translate-y-1 ${
                p.popular ? "border-glow" : ""
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-luxe text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-sm text-muted-foreground">{p.desc}</div>
              <div className="mt-2 text-2xl font-semibold">{p.name}</div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <Button asChild variant={p.popular ? "luxe" : "glass"} className="w-full mt-8">
                <Link to="/pricing">Choose {p.name}</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/pricing"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            See full pricing comparison <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-32 px-6">
      <div className="relative mx-auto max-w-5xl glass-card rounded-3xl p-12 md:p-20 text-center overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-80 w-[600px] bg-gradient-luxe opacity-30 blur-3xl rounded-full" />
        <div className="relative">
          <ImageIcon className="h-10 w-10 mx-auto text-primary" />
          <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
            Ready to morph your <span className="text-gradient-luxe">PR game</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Join 12,000+ brands using PRMorph to grow faster, smarter, and more beautifully.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild variant="luxe" size="xl">
              <Link to="/dashboard">Start Free Trial</Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
