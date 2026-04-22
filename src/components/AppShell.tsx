import { Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wand2,
  Megaphone,
  Users,
  Bell,
  Search,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import type { ComponentType } from "react";
import { Logo } from "./Logo";

type NavItem = {
  label: string;
  to: "/dashboard" | "/dashboard/ai-lab" | "/dashboard/campaigns" | "/dashboard/influencers";
  icon: ComponentType<{ className?: string }>;
};

const nav: NavItem[] = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "AI Photo Lab", to: "/dashboard/ai-lab", icon: Wand2 },
  { label: "Campaigns", to: "/dashboard/campaigns", icon: Megaphone },
  { label: "Influencers", to: "/dashboard/influencers", icon: Users },
];

export function AppShell() {
  const loc = useLocation();
  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar">
        <div className="px-6 h-16 flex items-center border-b border-border">
          <Logo />
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">
          <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace
          </div>
          {nav.map((item) => {
            const active =
              item.to === "/dashboard"
                ? loc.pathname === "/dashboard"
                : loc.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                  active
                    ? "bg-gradient-luxe text-primary-foreground font-medium shadow-[0_4px_20px_-6px_oklch(0.82_0.14_85_/_0.5)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors">
            <Settings className="h-4 w-4" /> Settings
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors">
            <HelpCircle className="h-4 w-4" /> Help
          </button>
          <div className="mt-4 glass-card rounded-xl p-3 flex items-center gap-3">
            <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-luxe flex items-center justify-center font-semibold text-primary-foreground">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Aria Chen</div>
              <div className="text-xs text-muted-foreground truncate"></div>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border flex items-center gap-4 px-6 bg-background/60 backdrop-blur-xl sticky top-0 z-40">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search campaigns, creatives, influencers..."
                className="w-full h-10 rounded-xl bg-white/5 border border-border pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:bg-white/[0.07] transition-all"
              />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative h-10 w-10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-glow" />
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-luxe flex items-center justify-center font-semibold text-primary-foreground text-sm">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
