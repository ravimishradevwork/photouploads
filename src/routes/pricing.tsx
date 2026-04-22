import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — PRMorph" },
      { name: "description", content: "Simple, scalable pricing for brands of every size." },
      { property: "og:title", content: "PRMorph Pricing — Free, Pro, Agency" },
      { property: "og:description", content: "Simple, scalable pricing for brands of every size." },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Get a feel for PRMorph",
    cta: "Start free",
    features: [
      "10 AI creatives / month",
      "1 active campaign",
      "Basic templates",
      "Community support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    desc: "For ambitious creators & brands",
    cta: "Start 7-day trial",
    features: [
      "Unlimited AI creatives",
      "10 active campaigns",
      "All premium templates",
      "Influencer marketplace access",
      "Advanced analytics",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Agency",
    price: "$249",
    desc: "For teams managing multiple brands",
    cta: "Contact sales",
    features: [
      "Everything in Pro",
      "Unlimited campaigns",
      "Multi-brand workspaces",
      "White-label exports",
      "Custom integrations",
      "Dedicated account manager",
      "SLA & SSO",
    ],
    popular: false,
  },
];

function Pricing() {
  return (
    <div className="min-h-screen overflow-hidden">
      <SiteHeader />

      <section className="pt-40 pb-24 px-6 bg-hero relative">
        <div className="absolute inset-0 noise" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Pricing
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Simple pricing for <br />
            <span className="text-gradient-luxe">every stage of growth</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Start free. Upgrade when you're ready. Cancel anytime.
          </p>
        </div>
      </section>

      <section className="px-6 -mt-8 pb-24">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative glass-card rounded-3xl p-8 transition-all hover:-translate-y-1 ${
                p.popular ? "border-glow scale-[1.02]" : ""
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-luxe text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-sm text-muted-foreground">{p.desc}</div>
              <div className="mt-1 text-2xl font-semibold">{p.name}</div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">{p.price}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <Button
                asChild
                variant={p.popular ? "luxe" : "glass"}
                className="w-full mt-6"
                size="lg"
              >
                <Link to="/dashboard">{p.cta}</Link>
              </Button>
              <div className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-3xl mt-32">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently asked</h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I change my plan later?",
                a: "Yes — upgrade, downgrade, or cancel at any time from your dashboard.",
              },
              {
                q: "Do unused AI creatives roll over?",
                a: "Pro and Agency plans include unlimited generations, so there's nothing to roll over.",
              },
              {
                q: "What's included in white-label exports?",
                a: "Agency plan removes all PRMorph branding from creatives and reports.",
              },
              {
                q: "Is there a free trial for Pro?",
                a: "Yes, every Pro plan starts with a 7-day free trial. No credit card required.",
              },
            ].map((f) => (
              <div key={f.q} className="glass-card rounded-2xl p-6">
                <div className="font-medium">{f.q}</div>
                <div className="mt-2 text-sm text-muted-foreground">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
