import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-luxe shadow-[0_0_20px_-4px_oklch(0.82_0.14_85_/_0.6)] transition-transform duration-300 group-hover:scale-105">
        <span className="font-bold text-primary-foreground text-sm tracking-tight">P</span>
        <span className="absolute -inset-px rounded-xl border border-white/20" />
      </div>
      <span className="font-semibold text-lg tracking-tight">
        PR<span className="text-gradient-luxe">Morph</span>
      </span>
    </Link>
  );
}
