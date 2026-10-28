import {Link, /*useNavigate,*/ useParams} from "react-router-dom";
import {motion} from "framer-motion";
import {ArrowLeft, CreditCard, ShieldCheck, Lock} from "lucide-react";
import {useTour} from "@/hooks/tours/useTour.js";
import {Spinner} from "@/components/ui/spinner.jsx";

export default function CheckoutPage() {
    const {id} = useParams();
    // const navigate = useNavigate();

    const {data:tourData, isLoading} = useTour(id);

    const tour = tourData?.data?.data;

    if (!tour) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Tour not found.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={"w-full h-full flex justify-center items-center"}>
                <Spinner className={"size-16"} />
            </div>
        )
    }

    const nextDate = tour.startDates?.[0]
        ? new Date(tour.startDates[0]).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Not available";

    const startLocation =
        tour.startLocation?.description || "Not available";

    return (
        <div className="min-h-screen bg-background">
            {/* Top bar */}
            <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    <Link
                        to={`/tours/${tour.slug}`}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4"/>
                        Back to tour
                    </Link>

                    <div className="flex items-center gap-2">
                        <span
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    d="M3 13.5 9 7l5 5 7-7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>

                        <span className="font-display text-base tracking-tight">
                            Natours
                        </span>

                        <span
                            className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-primary"
                        >
                            Sandbox
                        </span>
                    </div>

                    <div className="w-24"/>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-10">
                <div className="grid gap-10 lg:grid-cols-[1fr_440px]">

                    {/* Order summary */}
                    <motion.section
                        initial={{opacity: 0, y: 16}}
                        animate={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.5,
                            ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className="order-2 lg:order-1"
                    >
                        <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
                            Order summary
                        </p>

                        <div className="rounded-3xl bg-card border border-border/60 shadow-soft p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h1 className="font-display text-3xl leading-tight">
                                        {tour.name} Tour
                                    </h1>

                                    <p className="text-2xl font-semibold mt-1">
                                        ${tour.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                                {tour.description}
                            </p>

                            <div className="mt-6 overflow-hidden rounded-2xl">
                                <img
                                    src={tour.imageCover}
                                    alt={tour.name}
                                    className="h-56 w-full object-cover"
                                />
                            </div>

                            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Duration
                                    </dt>

                                    <dd className="font-medium">
                                        {tour.duration} days
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Starts
                                    </dt>

                                    <dd className="font-medium">
                                        {startLocation}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Next date
                                    </dt>

                                    <dd className="font-medium">
                                        {nextDate}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Difficulty
                                    </dt>

                                    <dd className="font-medium">
                                        {tour.difficulty}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Total due today
                                </span>

                                <span className="font-display text-2xl">
                                    ${tour.price.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                            <Lock className="h-3.5 w-3.5"/>
                            Payments are secure and encrypted. This is a demo
                            page — no real charge is made.
                        </p>
                    </motion.section>

                    {/* Payment form */}
                    <motion.section
                        initial={{opacity: 0, y: 16}}
                        animate={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                            ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className="order-1 lg:order-2"
                    >
                        <div className="rounded-3xl bg-card border border-border/60 shadow-lift p-6 sm:p-8">

                            {/* Express checkout */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="flex h-12 items-center justify-center rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                                >
                                    Pay
                                </button>

                                <button
                                    type="button"
                                    className="flex h-12 items-center justify-center rounded-xl bg-[#00d66f] text-black text-sm font-semibold hover:opacity-90 transition-opacity"
                                >
                                    Link
                                </button>
                            </div>

                            {/* Separator */}
                            <div className="my-6 flex items-center gap-4">
                                <div className="h-px flex-1 bg-border/60"/>

                                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                                    Or
                                </span>

                                <div className="h-px flex-1 bg-border/60"/>
                            </div>

                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="space-y-6"
                            >
                                {/* Contact */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                                        Contact information
                                    </label>

                                    <div className="flex items-center rounded-xl border border-border/60 bg-muted/40 px-4">
                                        <span className="text-xs uppercase tracking-widest text-muted-foreground mr-3">
                                            Email
                                        </span>

                                        <input
                                            type="email"
                                            defaultValue="abdoulaouar@gmail.com"
                                            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Payment method */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                                        Payment method
                                    </label>

                                    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                                        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60">
                                            <CreditCard className="h-4 w-4 text-primary"/>

                                            <span className="text-sm font-medium">
                                                Card
                                            </span>
                                        </div>

                                        <div className="p-4 space-y-4">

                                            {/* Card information */}
                                            <div>
                                                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                                                    Card information
                                                </p>

                                                <div className="flex items-center rounded-lg border border-border/60 bg-muted/40 px-3">
                                                    <input
                                                        inputMode="numeric"
                                                        placeholder="1234 1234 1234 1234"
                                                        className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                                                    />

                                                    <div className="flex items-center gap-1.5 pl-2">
                                                        <span
                                                            className="h-5 w-8 rounded bg-[#1a1f71]"
                                                            aria-label="Visa"
                                                        />

                                                        <span
                                                            className="h-5 w-8 rounded bg-[#eb001b]"
                                                            aria-label="Mastercard"
                                                        />

                                                        <span
                                                            className="h-5 w-8 rounded bg-[#006fcf]"
                                                            aria-label="Amex"
                                                        />

                                                        <span
                                                            className="h-5 w-8 rounded bg-[#ff6000]"
                                                            aria-label="Discover"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-2 grid grid-cols-2 gap-2">
                                                    <input
                                                        inputMode="numeric"
                                                        placeholder="MM / YY"
                                                        className="h-11 rounded-lg border border-border/60 bg-muted/40 px-3 text-sm outline-none placeholder:text-muted-foreground/70"
                                                    />

                                                    <input
                                                        inputMode="numeric"
                                                        placeholder="CVC"
                                                        className="h-11 rounded-lg border border-border/60 bg-muted/40 px-3 text-sm outline-none placeholder:text-muted-foreground/70"
                                                    />
                                                </div>
                                            </div>

                                            {/* Cardholder name */}
                                            <div>
                                                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                                                    Cardholder name
                                                </p>

                                                <input
                                                    placeholder="Full name on card"
                                                    className="h-11 w-full rounded-lg border border-border/60 bg-muted/40 px-3 text-sm outline-none placeholder:text-muted-foreground/70"
                                                />
                                            </div>

                                            {/* Country */}
                                            <div>
                                                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                                                    Country or region
                                                </p>

                                                <select
                                                    defaultValue="Algeria"
                                                    className="h-11 w-full rounded-lg border border-border/60 bg-muted/40 px-3 text-sm outline-none"
                                                >
                                                    <option>Algeria</option>
                                                    <option>United States</option>
                                                    <option>United Kingdom</option>
                                                    <option>France</option>
                                                    <option>Germany</option>
                                                    <option>Canada</option>
                                                    <option>Spain</option>
                                                    <option>Italy</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Save info */}
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="mt-0.5 h-4 w-4 rounded border-border"
                                    />

                                    <span className="text-xs text-muted-foreground leading-relaxed">
                                        Save my information for faster checkout.
                                        Payment is secured at{" "}
                                        <span className="font-medium text-foreground">
                                            Jonas Schmedtmann, Unipessoal Lda.
                                        </span>{" "}
                                        and where Link is accepted.
                                    </span>
                                </label>

                                {/* Pay button */}
                                <button
                                    type="submit"
                                    className="h-12 w-full rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lift hover:bg-primary/90 transition-colors"
                                >
                                    Pay
                                </button>

                                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                                    <ShieldCheck className="h-3.5 w-3.5"/>
                                    Secured by Stripe · 256-bit encryption
                                </p>
                            </form>
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
                            <span>Powered by Stripe</span>

                            <span className="hover:text-foreground cursor-default">
                                Terms
                            </span>

                            <span className="hover:text-foreground cursor-default">
                                Privacy
                            </span>
                        </div>
                    </motion.section>
                </div>
            </main>
        </div>
    );
}