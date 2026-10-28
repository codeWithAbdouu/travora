import {Link} from "react-router-dom";
import {SiteFooter} from "@/components/site-chrome";
import {AccountLayout} from "@/components/account-layout";
import {bookings, currentUser, reviews, tours} from "@/lib/mock-data";
import {ArrowRight, Briefcase, Star, MapPin} from "lucide-react";
import {useAuth} from "@/context/AuthContext.jsx";
import {Spinner} from "@/components/ui/spinner.jsx";

function Stat({label, value, icon: Icon}) {
    return (
        <div className="rounded-3xl border border-border/60 bg-card p-6">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                <Icon className="h-4 w-4 text-gold"/>
            </div>
            <p className="font-display text-4xl mt-4">{value}</p>
        </div>
    );
}

export default function AccountOverviewPage() {
    const next = bookings.find((b) => b.status === "Confirmed");

    const nextTour = next
        ? tours.find((t) => t.slug === next.tourSlug)
        : undefined;

    const {user, isLoading} = useAuth();

    if (isLoading) return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <Spinner className={"size-16"} />
        </div>
    )

    return (
        <>
            <AccountLayout title={`Hello, ${user.name.split(" ")[0]}.`} user={user} >
                <div className="grid md:grid-cols-3 gap-5">
                    <Stat
                        label="Trips booked"
                        value={bookings.length}
                        icon={Briefcase}
                    />

                    <Stat
                        label="Reviews written"
                        value={reviews.length}
                        icon={Star}
                    />

                    <Stat
                        label="Miles wandered"
                        value="12,480"
                        icon={MapPin}
                    />
                </div>

                {nextTour && (
                    <Link
                        to={`/tours/${nextTour.slug}`}
                        className="group mt-10 block rounded-3xl overflow-hidden border border-border/60 shadow-soft hover:shadow-lift transition-all"
                    >
                        <div className="grid md:grid-cols-2">

                            {/* Tour image */}
                            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                                <img
                                    src={nextTour.imageCover}
                                    alt={nextTour.name}
                                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Tour info */}
                            <div className="p-8 md:p-10 bg-card flex flex-col justify-center">
                                <p className="text-xs uppercase tracking-[0.25em] text-gold">
                                    Your next journey
                                </p>

                                <h3 className="font-display text-3xl mt-3">
                                    {nextTour.name}
                                </h3>

                                <p className="text-sm text-muted-foreground mt-2">
                                    {nextTour.summary}
                                </p>

                                <p className="mt-6 text-sm">
                                    <span className="text-muted-foreground">
                                        Departs
                                    </span>{" "}
                                    · {next?.date}
                                </p>

                                <span className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
                                    View tour

                                    <ArrowRight
                                        className="h-4 w-4 group-hover:translate-x-0.5 transition-transform"
                                    />
                                </span>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Recent activity */}
                <div className="mt-10">
                    <h2 className="font-display text-2xl mb-4">
                        Recent activity
                    </h2>

                    <div className="rounded-3xl border border-border/60 bg-card divide-y divide-border/60">
                        {bookings.slice(0, 3).map((b) => (
                            <div
                                key={b.id}
                                className="p-5 flex items-center justify-between"
                            >
                                <div>
                                    <p className="font-medium">
                                        {b.tourName}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {b.date} · {b.participants} traveler(s)
                                    </p>
                                </div>

                                <span
                                    className={`text-xs px-3 py-1 rounded-full ${
                                        b.status === "Confirmed"
                                            ? "bg-primary/10 text-primary"
                                            : "bg-muted text-muted-foreground"
                                    }`}
                                >
                                    {b.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </AccountLayout>

            <SiteFooter/>
        </>
    );
}