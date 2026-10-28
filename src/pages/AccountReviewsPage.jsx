import {SiteFooter} from "@/components/site-chrome";
import {AccountLayout} from "@/components/account-layout";
import {reviews} from "@/lib/mock-data";
import {Star} from "lucide-react";
import {useAuth} from "@/context/AuthContext.jsx";
import {Spinner} from "@/components/ui/spinner.jsx";

export default function AccountReviewsPage() {
    const {user, isLoading} = useAuth();

    if (isLoading) return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <Spinner className={"size-16"} />
        </div>
    )
    return (
        <>
            <AccountLayout title="My Reviews" user={user}>
                <div className="grid md:grid-cols-2 gap-5">
                    {reviews.map((r) => (
                        <div key={r.id}
                             className="rounded-3xl bg-card border border-border/60 shadow-soft p-8 group hover:shadow-lift transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-xs uppercase tracking-[0.25em] text-gold">{r.date}</p>
                                <div className="flex text-gold">
                                    {Array.from({length: 5}).map((_, i) => (
                                        <Star key={i}
                                              className={`h-4 w-4 ${i < r.rating ? "fill-current" : "opacity-30"}`}/>
                                    ))}
                                </div>
                            </div>
                            <h3 className="font-display text-2xl mb-3">{r.tourName}</h3>
                            <p className="text-muted-foreground italic leading-relaxed">"{r.body}"</p>
                        </div>
                    ))}
                </div>
            </AccountLayout>
            <SiteFooter/>
        </>
    );
}
