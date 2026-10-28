import {Link, useParams} from "react-router-dom";
import {motion} from "framer-motion";
import {
    Calendar,
    TrendingUp,
    Users,
    Star,
    MapPin,
    Clock,
    ArrowRight,
    Map
} from "lucide-react";

import {SiteFooter} from "@/components/site-chrome.jsx";
import {useTour} from "@/hooks/tours/useTour.js";
import {Spinner} from "@/components/ui/spinner.jsx"
import {useTourReviews} from "@/hooks/reviews/useTourReviews.js";

export default function TourDetailPage() {
    const {id} = useParams();
    const {data:tourData, isLoading: isTourLoading} = useTour(id);
    const {data: tourReviewsData, isLoading:  isTourReviewsLoading} = useTourReviews(id);

    const tour = tourData?.data?.data;
    const tourReviews = tourReviewsData?.data?.data;

    console.log(tourReviews)

    if (isTourLoading || isTourReviewsLoading) {
        return (
            <div className={"h-screen w-full flex justify-center items-center"}>
                <Spinner className={"size-16"} />
            </div>
        )
    }

    if (!tour) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground mb-4">
                        Tour not found.
                    </h1>

                    <Link
                        to="/"
                        className="text-primary underline underline-offset-4"
                    >
                        Back to all tours
                    </Link>
                </div>
            </div>
        );
    }

    const startDate = tour.startDates?.[0]
        ? new Date(tour.startDates[0]).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Not available";

    const startLocation = tour.startLocation?.description || "Not available";

    return (
        <>
            {/* Hero */}
            <section className="relative pt-16">
                <div className="relative h-[70vh] min-h-[520px] overflow-hidden">
                    <motion.img
                        initial={{scale: 1.08}}
                        animate={{scale: 1}}
                        transition={{
                            duration: 1.4,
                            ease: [0.2, 0.8, 0.2, 1]
                        }}
                        src={tour.imageCover}
                        alt={tour.name}
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background"/>

                    <div className="container-lux relative h-full flex flex-col justify-end pb-16 text-white">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.7}}
                        >
                            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
                                {tour.summary}
                            </p>

                            <h1 className="font-display text-5xl md:text-7xl max-w-3xl leading-[1.02]">
                                {tour.name}
                            </h1>

                            <div className="mt-6 flex flex-wrap gap-6 text-sm">
                                <span className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gold"/>
                                    {tour.duration} days
                                </span>

                                <span className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gold"/>
                                    {startLocation}
                                </span>

                                <span className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-gold fill-gold"/>
                                    {tour.ratingsAverage} ({tour.ratingsQuantity})
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Facts + About */}
            <section className="container-lux -mt-20 relative z-10">
                <div className="grid lg:grid-cols-[400px_1fr] gap-8">

                    {/* Quick Facts */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                        className="rounded-3xl bg-card border border-border/60 shadow-lift p-8"
                    >
                        <p className="text-xs uppercase tracking-[0.25em] text-gold mb-6">
                            Quick facts
                        </p>

                        <dl className="space-y-5">
                            {[
                                {
                                    icon: Calendar,
                                    label: "Next date",
                                    value: startDate
                                },
                                {
                                    icon: TrendingUp,
                                    label: "Difficulty",
                                    value: tour.difficulty
                                },
                                {
                                    icon: Users,
                                    label: "Group size",
                                    value: `${tour.maxGroupSize} people`
                                },
                                {
                                    icon: Star,
                                    label: "Rating",
                                    value: `${tour.ratingsAverage} / 5`
                                },
                            ].map((f) => (
                                <div
                                    key={f.label}
                                    className="flex items-center justify-between border-b border-border/40 pb-4 last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center"
                                        >
                                            <f.icon className="h-4 w-4"/>
                                        </span>

                                        <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                                            {f.label}
                                        </dt>
                                    </div>

                                    <dd className="text-sm font-medium">
                                        {f.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        {/* Guides */}
                        <p className="text-xs uppercase tracking-[0.25em] text-gold mt-10 mb-4">
                            Your tour guides
                        </p>

                        <ul className="space-y-3">
                            {tour.guides?.map((g) => (
                                <li
                                    key={g.name}
                                    className="flex items-center gap-3"
                                >
                                    <img
                                        src={g.photo}
                                        alt={g.name}
                                        className="h-10 w-10 rounded-full object-cover ring-2 ring-gold/30"
                                    />

                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                            {g.role}
                                        </p>

                                        <p className="text-sm font-medium">
                                            {g.name}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* About */}
                    <div className="pt-4 lg:pt-8">
                        <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
                            About the {tour.name} tour
                        </p>

                        <h2 className="font-display text-3xl md:text-4xl mb-6">
                            A journey paced for presence.
                        </h2>

                        <div className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed space-y-4">
                            <p>{tour.description}</p>

                            <p>
                                We keep groups small on purpose. Meals unfold slowly,
                                mornings begin without alarms, and every stop is a
                                place we've chosen to return to ourselves. What you'll
                                bring home is quieter than a photo album and lasts far longer.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="container-lux mt-24">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.images?.map((src, i) => (
                        <motion.div
                            key={src}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: i * 0.1}}
                            className={`overflow-hidden rounded-3xl ${
                                i === 0
                                    ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto"
                                    : "aspect-[4/5]"
                            }`}
                        >
                            <img
                                src={src}
                                alt=""
                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Itinerary */}
            <section className="container-lux mt-24">
                <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
                    Where you'll be
                </p>

                <h2 className="font-display text-3xl md:text-4xl mb-10">
                    The itinerary
                </h2>

                <div
                    className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-10 relative overflow-hidden"
                >
                    <Map className="absolute -top-8 -right-8 h-64 w-64 opacity-10"/>

                    <ol className="space-y-6 relative">
                        {tour.locations?.map((stop) => (
                            <li
                                key={stop.day}
                                className="grid grid-cols-[80px_1fr] gap-6 items-start"
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-xs uppercase tracking-widest opacity-70">
                                        Day
                                    </span>

                                    <span className="font-display text-3xl">
                                        {stop.day}
                                    </span>
                                </div>

                                <div className="border-l border-white/20 pl-6 pb-6">
                                    <h3 className="font-display text-xl">
                                        {stop.description}
                                    </h3>

                                    <p className="text-sm opacity-80 mt-1">
                                        {stop.address || ""}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Reviews */}
            <section className="container-lux mt-24">
                <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
                    Traveler reviews
                </p>

                <h2 className="font-display text-3xl md:text-4xl mb-10">
                    Some words from the trail.
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tourReviews.map((t) => (
                        <div key={t.user.name} className="card-lux p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={t.user.photo}
                                    alt=""
                                    className="h-10 w-10 rounded-full object-cover"
                                />

                                <div>
                                    <p className="text-sm font-medium">
                                        {t.user.name}
                                    </p>

                                    <div className="flex text-gold">
                                        {Array.from({length: t.rating}).map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-3 w-3 fill-current"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm italic text-muted-foreground leading-relaxed">
                                "{t.review}"
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container-lux mt-24">
                <div
                    className="rounded-4xl bg-card border border-border/60 shadow-lift p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
                >
                    <div className="flex -space-x-4">
                        {tour.images?.slice(0, 3).map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt=""
                                className="h-24 w-24 rounded-full object-cover ring-4 ring-background"
                            />
                        ))}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <p className="text-xs uppercase tracking-[0.25em] text-gold mb-2">
                            What are you waiting for?
                        </p>

                        <h3 className="font-display text-3xl">
                            {tour.duration} days. 1 adventure. Infinite memories.
                        </h3>

                        <p className="text-sm text-muted-foreground mt-2">
                            Make it yours today — small groups fill quickly.
                        </p>
                    </div>

                    <Link
                        to={`/checkout/${tour._id}`}
                        className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-sm font-medium shadow-lift hover:bg-gold hover:text-gold-foreground transition-colors"
                    >
                        Book tour now

                        <ArrowRight
                            className="h-4 w-4 group-hover:translate-x-0.5 transition-transform"
                        />
                    </Link>
                </div>
            </section>

            <SiteFooter/>
        </>
    );
}