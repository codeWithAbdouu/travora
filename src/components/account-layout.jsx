import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Settings, Briefcase, Star, CreditCard, User } from "lucide-react";

const items = [
  { to: "/account", label: "Overview", icon: User },
  { to: "/account/settings", label: "Settings", icon: Settings },
  { to: "/account/bookings", label: "My Bookings", icon: Briefcase },
  { to: "/account/reviews", label: "My Reviews", icon: Star },
  { to: "/account/billing", label: "Billing", icon: CreditCard },
];

export function AccountLayout({ title, user, children }) {
  const { pathname } = useLocation();

  return (
    <div className="container-lux pt-28 pb-20">
      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="lg:sticky lg:top-24 h-fit rounded-3xl bg-card border border-border/60 shadow-soft p-6">
          <div className="flex items-center gap-3 pb-6 border-b border-border/60">
            <img src={user.avatar ?? "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1600&q=80&utm_source=chatgpt.com"} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/40" />
            <div className="min-w-0">
              <p className="font-medium truncate">{user.name.split(" ").slice(0, 2).join(" ")}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <nav className="mt-6 space-y-1">
            {items.map((it) => {
              const active = pathname === it.to;
              const Icon = it.icon;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className="relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors hover:bg-muted"
                >
                  {active && (
                    <motion.span
                      layoutId="account-active"
                      className="absolute inset-0 rounded-2xl bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <Icon className={`relative h-4 w-4 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  <span className={`relative ${active ? "text-primary-foreground font-medium" : ""}`}>
                    {it.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Your account</p>
            <h1 className="font-display text-4xl md:text-5xl mb-10">{title}</h1>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
