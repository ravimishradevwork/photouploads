import { createFileRoute } from "@tanstack/react-router";
import { Search, MapPin, Users, Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/influencers")({
  head: () => ({ meta: [{ title: "Influencer Marketplace — PRMorph" }] }),
  component: Influencers,
});

const influencers = [
  { n: "Sofia Lens", h: "@sofia_lens", niche: "Fashion", city: "Paris", f: "1.2M", er: "4.8%", price: "$2,400" },
  { n: "Marcus Atlas", h: "@marcusatlas", niche: "Fitness", city: "LA", f: "840K", er: "5.2%", price: "$1,800" },
  { n: "Lila Rae", h: "@lila.rae", niche: "Beauty", city: "NYC", f: "612K", er: "6.1%", price: "$1,200" },
  { n: "Diego Vance", h: "@diegovance", niche: "Tech", city: "SF", f: "320K", er: "7.4%", price: "$900" },
  { n: "Yuki Mori", h: "@yukimori", niche: "Travel", city: "Tokyo", f: "1.8M", er: "3.9%", price: "$3,200" },
  { n: "Amara Kade", h: "@amarakade", niche: "Food", city: "London", f: "480K", er: "5.8%", price: "$1,400" },
  { n: "Reza Noor", h: "@rezanoor", niche: "Music", city: "Berlin", f: "920K", er: "4.4%", price: "$2,100" },
  { n: "Chloe Vega", h: "@chloevega", niche: "Lifestyle", city: "Miami", f: "260K", er: "8.1%", price: "$800" },
];

const niches = ["All", "Fashion", "Beauty", "Fitness", "Tech", "Travel", "Food", "Music"];

function Influencers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Influencer Marketplace</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Discover vetted creators by niche, audience, and city.
        </p>
      </div>

      {/* Search & filters */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search by name, handle, or keyword..."
              className="w-full h-11 rounded-xl bg-white/5 border border-border pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <Button variant="glass" size="lg">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {niches.map((n, i) => (
            <button
              key={n}
              className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                i === 0
                  ? "bg-gradient-luxe text-primary-foreground font-medium"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {influencers.map((i) => (
          <div
            key={i.h}
            className="group glass-card rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:bg-white/[0.06]"
          >
            <div className="relative h-32 bg-gradient-luxe/30">
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/60 backdrop-blur-md flex items-center justify-center hover:bg-background/80">
                <Heart className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="px-5 pb-5 -mt-10 relative">
              <div className="h-16 w-16 rounded-full bg-gradient-luxe border-4 border-card flex items-center justify-center text-xl font-bold text-primary-foreground">
                {i.n[0]}
              </div>
              <div className="mt-3">
                <div className="font-semibold">{i.n}</div>
                <div className="text-xs text-muted-foreground">{i.h}</div>
              </div>
              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {i.city}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/5">{i.niche}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <Users className="h-3 w-3" /> Followers
                  </div>
                  <div className="text-sm font-semibold mt-0.5">{i.f}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Engagement
                  </div>
                  <div className="text-sm font-semibold mt-0.5 text-primary">{i.er}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">From </span>
                  <span className="font-semibold">{i.price}</span>
                </div>
                <Button variant="luxe" size="sm">
                  Book
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
