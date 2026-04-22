import { createFileRoute } from "@tanstack/react-router";
import { Plus, Calendar, Users, DollarSign, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/campaigns")({
  head: () => ({ meta: [{ title: "Campaigns — PRMorph" }] }),
  component: Campaigns,
});

const campaigns = [
  {
    name: "Spring Drop 2025",
    status: "Live",
    statusColor: "text-primary bg-primary/10",
    budget: "$12,000",
    spent: 78,
    influencers: 8,
    end: "Apr 30",
    reach: "420K",
  },
  {
    name: "Summer Festival",
    status: "Scheduled",
    statusColor: "text-purple bg-purple/10",
    budget: "$24,000",
    spent: 12,
    influencers: 14,
    end: "Jun 15",
    reach: "—",
  },
  {
    name: "Brand Refresh",
    status: "Live",
    statusColor: "text-primary bg-primary/10",
    budget: "$8,500",
    spent: 92,
    influencers: 5,
    end: "May 02",
    reach: "182K",
  },
  {
    name: "Founder Story Series",
    status: "Draft",
    statusColor: "text-muted-foreground bg-white/5",
    budget: "$5,000",
    spent: 0,
    influencers: 3,
    end: "TBD",
    reach: "—",
  },
  {
    name: "Holiday Push",
    status: "Completed",
    statusColor: "text-muted-foreground bg-white/5",
    budget: "$18,000",
    spent: 100,
    influencers: 12,
    end: "Dec 25",
    reach: "1.2M",
  },
  {
    name: "Product Launch — V2",
    status: "Live",
    statusColor: "text-primary bg-primary/10",
    budget: "$32,000",
    spent: 45,
    influencers: 22,
    end: "Jul 10",
    reach: "680K",
  },
];

function Campaigns() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track all your PR campaigns in one place.
          </p>
        </div>
        <Button variant="luxe" size="lg">
          <Plus className="h-4 w-4" /> Create Campaign
        </Button>
      </div>

      {/* Budget overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { l: "Total Budget", v: "$99,500", s: "across 6 campaigns" },
          { l: "Spent", v: "$54,210", s: "54% of budget" },
          { l: "Remaining", v: "$45,290", s: "Available to allocate" },
        ].map((s) => (
          <div key={s.l} className="glass-card rounded-2xl p-5">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
            <div className="text-2xl font-bold mt-2">{s.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.s}</div>
          </div>
        ))}
      </div>

      {/* Campaign cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {campaigns.map((c) => (
          <div
            key={c.name}
            className="group glass-card rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:bg-white/[0.06]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span
                  className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${c.statusColor}`}
                >
                  {c.status}
                </span>
                <h3 className="mt-3 font-semibold text-lg truncate">{c.name}</h3>
              </div>
              <button className="text-muted-foreground hover:text-foreground p-1">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Budget used</span>
                <span className="text-foreground font-medium">
                  {c.spent}% of {c.budget}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-luxe rounded-full transition-all"
                  style={{ width: `${c.spent}%` }}
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 pt-5 border-t border-border">
              <Stat icon={Users} label="Creators" value={String(c.influencers)} />
              <Stat icon={DollarSign} label="Reach" value={c.reach} />
              <Stat icon={Calendar} label="Ends" value={c.end} />
            </div>
          </div>
        ))}
      </div>

      {/* Influencer list */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Active influencers</h3>
        <div className="divide-y divide-border">
          {[
            { n: "Sofia Lens", h: "@sofia_lens", f: "1.2M", c: "Spring Drop", p: "$2,400" },
            { n: "Marcus Atlas", h: "@marcusatlas", f: "840K", c: "Summer Festival", p: "$1,800" },
            { n: "Lila Rae", h: "@lila.rae", f: "612K", c: "Brand Refresh", p: "$1,200" },
            { n: "Diego Vance", h: "@diegovance", f: "320K", c: "Product Launch", p: "$900" },
          ].map((i) => (
            <div key={i.h} className="flex items-center gap-4 py-3">
              <div className="h-10 w-10 rounded-full bg-gradient-luxe flex items-center justify-center font-semibold text-primary-foreground">
                {i.n[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{i.n}</div>
                <div className="text-xs text-muted-foreground">
                  {i.h} · {i.f} followers
                </div>
              </div>
              <div className="hidden sm:block text-xs text-muted-foreground">{i.c}</div>
              <div className="text-sm font-semibold">{i.p}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="text-sm font-semibold mt-1">{value}</div>
    </div>
  );
}
