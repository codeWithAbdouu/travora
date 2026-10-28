import {Link, useLocation} from "react-router-dom";
import {motion} from "framer-motion";
import {LogOut, Sparkles, User} from "lucide-react";
import {currentUser} from "@/lib/mock-data";
import {useAuth} from "@/context/AuthContext.jsx";
import {useLogout} from "@/hooks/auth/useLogout.js";
import {useNavigate} from "react-router-dom";

export function SiteNav() {
    const {pathname} = useLocation();
    const onDark = pathname === "/" || pathname.startsWith("/tours/");
    const navigate = useNavigate();

    const {user} = useAuth()
    const {mutate: logout} = useLogout();


    async function handleLogout() {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            console.error("LOGOUT ERROR:", err);
        }
    };

    return (
        <motion.header
            initial={{y: -20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.6, ease: [0.2, 0.8, 0.2, 1]}}
            className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-colors ${
                onDark
                    ? "bg-background/60 border-b border-border/40"
                    : "bg-background/80 border-b border-border/60"
            }`}
        >
            <div className="container-lux flex h-16 items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <span
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Sparkles className="h-4 w-4"/>
                    </span>
                    <span className="font-display text-lg tracking-tight">Travora</span>
                </Link>


                <nav className="hidden md:flex items-center gap-8 text-sm">
                    <Link to="/" className="hover:text-primary transition-colors">All Tours</Link>
                    {user && <Link to="/account/bookings" className="hover:text-primary transition-colors">My
                        Bookings</Link>}
                    {user &&
                        <Link to="/account/reviews" className="hover:text-primary transition-colors">Reviews</Link>}
                </nav>

                <div className="flex items-center gap-3">
                    {
                        user ? (
                            <>
                                <Link
                                    to="/account"
                                    className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-sm shadow-soft hover:shadow-lift transition-all">
                                    <img src={user.photo} alt="" className="h-6 w-6 rounded-full object-cover"/>
                                    <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
                                    <User className="h-3.5 w-3.5 sm:hidden"/>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                                >
                                    <LogOut className="h-3.5 w-3.5"/>
                                    <span className="hidden sm:inline">Log out</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium hover:bg-gold hover:text-gold-foreground transition-colors"
                                >
                                    Sign up
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </motion.header>
    );
}

export function SiteFooter() {
    return (
        <footer className="mt-32 border-t border-border/60">
            <div className="container-lux py-12 grid gap-8 md:grid-cols-3">
                <div>
                    <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4"/>
            </span>
                        <span className="font-display text-lg">Natours</span>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                        Considered journeys through the world's quietest places, since 2011.
                    </p>
                </div>
                <div className="text-sm space-y-2">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Explore</p>
                    <Link to="/" className="block hover:text-primary">All Tours</Link>
                    <Link to="/account" className="block hover:text-primary">Account</Link>
                    <Link to="/login" className="block hover:text-primary">Log in</Link>
                </div>
                <div className="text-sm text-muted-foreground">
                    <p className="text-xs uppercase tracking-widest text-foreground/70 mb-3">Newsletter</p>
                    <p>New trips, four times a year. Never anything else.</p>
                </div>
            </div>
            <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
                © 2026 Natours. Crafted with care.
            </div>
        </footer>
    );
}
