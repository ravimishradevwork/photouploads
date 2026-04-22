import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered PR & social media transformations for modern brands.
            </p>
          </div>
          {[
            {
              title: "Product",
              links: ["Features", "AI Photo Lab", "Campaigns", "Marketplace", "Pricing"],
            },
            { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
            { title: "Resources", links: ["Blog", "Docs", "Help center", "Changelog"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-sm font-semibold mb-4">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2025 PRMorph Labs Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Terms
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
