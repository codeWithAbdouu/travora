import {Link} from "react-router-dom";
import {SiteFooter} from "@/components/site-chrome";
import {AccountLayout} from "@/components/account-layout";
import {bookings, tours} from "@/lib/mock-data";
import {Calendar, Users, ArrowRight} from "lucide-react";
import {useAuth} from "@/context/AuthContext.jsx";
import {Spinner} from "@/components/ui/spinner.jsx";

export default function AccountBookingsPage() {
    const {user, isLoading} = useAuth();

    if (isLoading) return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <Spinner className={"size-16"} />
        </div>
    )
    return (
        <>
            <AccountLayout title="My Bookings" user={user}>
                <div className="grid gap-5">
                    {bookings.map((b) => {
                        const tour = tours.find(
                            (t) => t.slug === b.tourSlug
                        );

                        return (
                            <div
                                key={b.id}
                                className="rounded-3xl bg-card border border-border/60 shadow-soft overflow-hidden group hover:shadow-lift transition-all"
                            >
                                <div className="grid md:grid-cols-[220px_1fr_auto] gap-0">

                                    {/* Tour image */}
                                    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                                        {tour && (
                                            <img
                                                src={tour.imageCover}
                                                alt={tour.name}
                                                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        )}
                                    </div>

                                    {/* Booking info */}
                                    <div className="p-6 md:p-8">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`text-xs px-3 py-1 rounded-full ${
                                                    b.status === "Confirmed"
                                                        ? "bg-primary/10 text-primary"
                                                        : "bg-gold/20 text-gold-foreground"
                                                }`}
                                            >
                                                {b.status}
                                            </span>

                                            <span className="text-xs text-muted-foreground">
                                                Booking #{b.id.toUpperCase()}
                                            </span>
                                        </div>

                                        <h3 className="font-display text-2xl mt-3">
                                            {b.tourName}
                                        </h3>

                                        <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-primary"/>
                                                {b.date}
                                            </span>

                                            <span className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-primary"/>
                                                {b.participants} traveler(s)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price + link */}
                                    <div
                                        className="p-6 md:p-8 md:border-l border-t md:border-t-0 border-border/60 flex md:flex-col items-center md:items-end justify-between gap-4"
                                    >
                                        <div className="md:text-right">
                                            <p className="text-xs text-muted-foreground">
                                                Total
                                            </p>

                                            <p className="font-display text-2xl">
                                                ${b.price * b.participants}
                                            </p>
                                        </div>

                                        {tour && (
                                            <Link
                                                to={`/tours/${tour.slug}`}
                                                className="inline-flex items-center gap-2 text-sm text-primary hover:text-gold transition-colors"
                                            >
                                                View tour
                                                <ArrowRight className="h-4 w-4"/>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </AccountLayout>

            <SiteFooter/>
        </>
    );
}