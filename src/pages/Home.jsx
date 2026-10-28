
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    MapPin,
    Clock,
    Users,
    Flag,
    Star,
    ArrowUpRight,
    Search,
    Navigation,
} from "lucide-react";
import { useState } from "react";
import { SiteFooter } from "@/components/site-chrome.jsx";
import { useTours } from "@/hooks/tours/useTours.js";
import { Spinner } from "@/components/ui/spinner.jsx";
import { useReviews } from "@/hooks/reviews/useReviews.js";
import { useDistances } from "@/hooks/tours/useDistances.js";
import { useToursWithin } from "@/hooks/tours/useToursWithin.js";

const difficulties = ["All", "Easy", "Medium", "Difficult"];
const distanceOptions = [1000, 3000, 5000, 6000, 7000, 8000, 9000, 10000, 13000, 15000];

const LATITUDE = 36.245585;
const LONGITUDE = 6.575835;
const LATLNG = `${LATITUDE},${LONGITUDE}`;
const UNIT = "km";

export default function HomePage() {
    const [difficulty, setDifficulty] = useState("All");
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [distance, setDistance] = useState("50");

    const {
        data: dataTours,
        isLoading: isTourLoading,
        isError: isToursError,
    } = useTours();

    const {
        data: dataReviews,
        isLoading: isReviewsLoading,
    } = useReviews({ sort: "-rating", limit: 4 });

    const {
        data: dataDistances,
        isLoading: isDistancesLoading,
        isError: isDistancesError,
    } = useDistances(LATLNG, UNIT);

    const {
        data: dataToursWithin,
        isLoading: isToursWithinLoading,
        isError: isToursWithinError,
    } = useToursWithin(
        distance,
        activeTab === "within" ? LATLNG : "",
        UNIT
    );

    const tours = dataTours?.data?.data || [];
    const reviews = dataReviews?.data?.data || [];
    const distances = dataDistances?.data?.data || [];
    const toursWithin = dataToursWithin?.data?.data || [];

    console.log(distances);
    console.log(dataToursWithin);

    const distancesByTourId = new Map(
        distances.map((item) => [item._id, item.distance])
    );

    const displayedTours =
        activeTab === "within" ? toursWithin : tours;

    const filtered = displayedTours.filter((tour) => {
        const difficultyMatches =
            difficulty === "All" ||
            tour.difficulty?.toLowerCase() === difficulty.toLowerCase();

        const search = query.trim().toLowerCase();

        const searchMatches =
            !search ||
            tour.name?.toLowerCase().includes(search) ||
            tour.startLocation?.description?.toLowerCase().includes(search) ||
            tour.summary?.toLowerCase().includes(search) ||
            tour.description?.toLowerCase().includes(search);

        return difficultyMatches && searchMatches;
    });

    const isGridLoading =
        activeTab === "within" ? isToursWithinLoading : isTourLoading;

    const isGridError =
        activeTab === "within" ? isToursWithinError : isToursError;

    return (
        <>
            {/* Hero */}
            <section className="relative pt-28 pb-16 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,oklch(0.72_0.13_75/0.15),transparent_50%),radial-gradient(circle_at_80%_40%,oklch(0.34_0.055_158/0.15),transparent_50%)]" />

                <div className="container-lux">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className="max-w-3xl"
                    >
                        <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
                            Winter / Spring 2026
                        </p>

                        <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">
                            Journeys, quietly
                            <br />
                            <span className="italic text-primary">
                                designed.
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                            Small-group tours through the world's most
                            memorable landscapes — paced for presence,
                            not itinerary.
                        </p>
                    </motion.div>

                    {/* Search and Difficulty Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl sm:rounded-full bg-card border border-border/60 p-2 shadow-soft max-w-2xl"
                    >
                        <div className="flex items-center gap-2 flex-1 px-4">
                            <Search className="h-4 w-4 text-muted-foreground" />

                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search destinations, moods, moments…"
                                className="bg-transparent outline-none text-sm py-2 w-full"
                            />
                        </div>

                        <div className="flex items-center gap-1 bg-muted rounded-full p-1 w-fit">
                            {difficulties.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setDifficulty(item)}
                                    className={`relative px-3 py-1.5 text-xs rounded-full transition-colors ${
                                        difficulty === item
                                            ? "text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {difficulty === item && (
                                        <motion.span
                                            layoutId="filter-active"
                                            className="absolute inset-0 bg-primary rounded-full"
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 30,
                                            }}
                                        />
                                    )}

                                    <span className="relative">{item}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Geographic Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        className="mt-6 max-w-2xl"
                    >
                        <div className="flex items-center gap-1 bg-muted rounded-full p-1 w-fit">
                            {[
                                { value: "all", label: "All Tours" },
                                { value: "within", label: "Nearby Tours" },
                            ].map((tab) => (
                                <button
                                    key={tab.value}
                                    type="button"
                                    onClick={() => setActiveTab(tab.value)}
                                    className={`px-5 py-2 text-xs rounded-full transition-colors ${
                                        activeTab === tab.value
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Maximum Distance */}
                        {activeTab === "within" && (
                            <div className="mt-5 rounded-2xl bg-card border border-border/60 p-5 shadow-soft">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Navigation className="h-4 w-4 text-primary" />
                                        </div>

                                        <div>
                                            <h3 className="font-display text-lg">
                                                Explore Nearby
                                            </h3>

                                            <p className="text-xs text-muted-foreground">
                                                Find tours within your preferred
                                                distance.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-48">
                                        <label
                                            htmlFor="distance"
                                            className="block text-xs text-muted-foreground mb-2"
                                        >
                                            Maximum distance
                                        </label>

                                        <select
                                            id="distance"
                                            value={distance}
                                            onChange={(e) =>
                                                setDistance(e.target.value)
                                            }
                                            className="w-full rounded-xl bg-background border border-border px-3 py-3 text-sm outline-none focus:border-primary transition-colors"
                                        >
                                            {distanceOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option} km
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Tours Grid */}
            <section className="container-lux pb-20">
                {isGridLoading ? (
                    <div className="py-16 w-full flex justify-center items-center">
                        <Spinner className="size-16" />
                    </div>
                ) : isGridError ? (
                    <div className="py-16 text-center">
                        <p className="text-sm text-destructive">
                            Unable to load tours. Please try again.
                        </p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-16 text-center">
                        <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />

                        <h3 className="font-display text-2xl">
                            No tours found
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Try changing your search, difficulty, or distance.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((tour, i) => {
                            const tourDistance = distancesByTourId.get(tour._id);

                            return (
                                <motion.div
                                    key={tour._id || tour.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: i * 0.05,
                                        duration: 0.5,
                                        ease: [0.2, 0.8, 0.2, 1],
                                    }}
                                >
                                    <Link
                                        to={`/tours/${tour._id}`}
                                        className="group card-lux card-lux-hover block overflow-hidden"
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            <img
                                                src={tour.imageCover}
                                                alt={tour.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                                <span className="rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-medium capitalize">
                                                    {tour.difficulty}
                                                </span>

                                                <span className="rounded-full bg-gold/95 text-gold-foreground px-3 py-1 text-xs font-medium flex items-center gap-1">
                                                    <Star className="h-3 w-3 fill-current" />
                                                    {tour.ratingsAverage}
                                                </span>
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <p className="text-xs uppercase tracking-widest opacity-80">
                                                    {tour.startLocation?.description}
                                                </p>

                                                <h3 className="font-display text-2xl mt-1">
                                                    {tour.name}
                                                </h3>
                                            </div>

                                            <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowUpRight className="h-4 w-4" />
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                                                {tour.description}
                                            </p>

                                            <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                                                    <span>{tour.duration}-day tour</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                                                    <span className="truncate">
                                                        {tour.startLocation?.description}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Flag className="h-3.5 w-3.5 text-primary shrink-0" />
                                                    <span>{tour.locations?.length || 0} stops</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Users className="h-3.5 w-3.5 text-primary shrink-0" />
                                                    <span>{tour.maxGroupSize} people</span>
                                                </div>

                                                <div className="flex items-center gap-2 col-span-2">
                                                    <Navigation className="h-3.5 w-3.5 text-primary shrink-0" />

                                                    {isDistancesLoading ? (
                                                        <span>Loading distance...</span>
                                                    ) : typeof tourDistance === "number" ? (
                                                        <span>
                                                            {tourDistance.toFixed(1)} km away
                                                        </span>
                                                    ) : isDistancesError ? (
                                                        <span>Distance unavailable</span>
                                                    ) : (
                                                        <span>Distance unavailable</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-5 border-t border-border/60 flex items-end justify-between">
                                                <div>
                                                    <p className="font-display text-2xl">
                                                        ${tour.price}
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        per person · {tour.ratingsQuantity} reviews
                                                    </p>
                                                </div>

                                                <span className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-medium group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
                                                    Details
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Testimonials */}
            <section className="container-lux pb-8">
                <div className="rounded-4xl bg-primary text-primary-foreground p-10 md:p-16 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />

                    <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4 relative">
                        Travelers, in their words
                    </p>

                    {!isReviewsLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 relative">
                            {reviews.map((review) => (
                                <div
                                    key={review._id || review.user?._id || review.user?.name}
                                    className="rounded-3xl bg-background/5 border border-white/10 p-6 backdrop-blur"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src={review.user?.photo}
                                            alt={review.user?.name || ""}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />

                                        <div>
                                            <p className="text-sm font-medium">
                                                {review.user?.name}
                                            </p>

                                            <div className="flex text-gold">
                                                {Array.from({
                                                    length: review.rating,
                                                }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="h-3 w-3 fill-current"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm italic opacity-90 leading-relaxed">
                                        "{review.review}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 w-full flex justify-center items-center mt-8 relative">
                            <Spinner className="size-8" />
                        </div>
                    )}
                </div>
            </section>

            <SiteFooter />
        </>
    );
}
