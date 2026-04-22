import { createFileRoute } from "@tanstack/react-router";
import {
  TrendingUp,
  Users,
  Wand2,
  DollarSign,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Overview — PRMorph" }] }),
  component: DashboardOverview,
});

const reachData = [
  { name: "Mon", v: 24000 },
  { name: "Tue", v: 32000 },
  { name: "Wed", v: 28000 },
  { name: "Thu", v: 48000 },
  { name: "Fri", v: 62000 },
  { name: "Sat", v: 78000 },
  { name: "Sun", v: 91000 },
];

const channelData = [
  { name: "IG", v: 42 },
  { name: "TikTok", v: 38 },
  { name: "X", v: 24 },
  { name: "LinkedIn", v: 18 },
  { name: "YouTube", v: 12 },
];

function DashboardOverview() {
  const kpis = [
    { label: "Active Campaigns", value: "24", change: "+12%", icon: TrendingUp },
    { label: "Total Reach", value: "2.4M", change: "+38%", icon: Users },
    { label: "AI Creatives", value: "1,284", change: "+212%", icon: Wand2 },
    { label: "Revenue", value: "$48,290", change: "+24%", icon: DollarSign },
  ];

  const activity = [
    { who: "Aria", what: "launched", obj: "Spring Drop campaign", when: "2m ago" },
    { who: "AI Lab", what: "generated", obj: "12 luxury posters", when: "1h ago" },
    { who: "Marcus", what: "booked", obj: "@sofia_lens for promo", when: "3h ago" },
    { who: "Priya", what: "completed", obj: "Festival Promo brief", when: "5h ago" },
    { who: "AI Lab", what: "transformed", obj: "Influencer-style shoot", when: "Yesterday" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Aria 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here's what's happening with your brand today.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="glass-card rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:bg-white/[0.06]"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-gradient-luxe flex items-center justify-center shadow-[0_0_20px_-6px_oklch(0.82_0.14_85_/_0.5)]">
                <k.icon className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {k.change}
              </span>
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight">{k.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">Audience Reach</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Last 7 days</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground p-1">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reachData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.14 85)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.82 0.14 85)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
                <XAxis dataKey="name" stroke="oklch(0.65 0.02 280)" fontSize={12} />
                <YAxis stroke="oklch(0.65 0.02 280)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.16 0.015 280)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                    color: "oklch(0.97 0.01 90)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="oklch(0.82 0.14 85)"
                  strokeWidth={2}
                  fill="url(#g1)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold mb-1">By Channel</h3>
          <p className="text-xs text-muted-foreground mb-6">Engagement %</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
                <XAxis dataKey="name" stroke="oklch(0.65 0.02 280)" fontSize={12} />
                <YAxis stroke="oklch(0.65 0.02 280)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.16 0.015 280)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="v" fill="oklch(0.55 0.22 295)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activity</h3>
            <a href="#" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <div className="divide-y divide-border">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-4 py-3">
                <div className="h-9 w-9 rounded-full bg-gradient-luxe flex items-center justify-center text-sm font-semibold text-primary-foreground">
                  {a.who[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm">
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>{" "}
                    <span className="font-medium">{a.obj}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">{a.when}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Top Campaigns</h3>
          <div className="space-y-4">
            {[
              { n: "Spring Drop", p: 92 },
              { n: "Summer Festival", p: 78 },
              { n: "Brand Refresh", p: 65 },
              { n: "Founder Story", p: 51 },
            ].map((c) => (
              <div key={c.n}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{c.n}</span>
                  <span className="text-muted-foreground">{c.p}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-luxe rounded-full"
                    style={{ width: `${c.p}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
