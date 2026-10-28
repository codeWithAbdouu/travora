import {SiteFooter} from "@/components/site-chrome";
import {AccountLayout} from "@/components/account-layout";
import {billing} from "@/lib/mock-data";
import {CreditCard, Download} from "lucide-react";
import {useAuth} from "@/context/AuthContext.jsx";
import {Spinner} from "@/components/ui/spinner.jsx";

export default function AccountBillingPage() {
    const total = billing.reduce((s, i) => s + i.amount, 0);

    const {user, isLoading} = useAuth();

    if (isLoading) return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <Spinner className={"size-16"} />
        </div>
    )
    return (
        <>
            <AccountLayout title="Billing" user={user}>
                <div className="grid md:grid-cols-[1fr_320px] gap-8">
                    <section className="rounded-3xl bg-card border border-border/60 shadow-soft overflow-hidden">
                        <div className="p-6 border-b border-border/60 flex items-center justify-between">
                            <h2 className="font-display text-xl">Invoices</h2>
                            <span className="text-xs text-muted-foreground">{billing.length} entries</span>
                        </div>
                        <ul className="divide-y divide-border/60">
                            {billing.map((i) => (
                                <li key={i.id} className="p-6 flex items-center gap-4">
                                    <div
                                        className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                        <CreditCard className="h-4 w-4"/>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{i.tour}</p>
                                        <p className="text-xs text-muted-foreground">{i.date} · {i.method}</p>
                                    </div>
                                    <span
                                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">{i.status}</span>
                                    <p className="font-display text-lg w-20 text-right">${i.amount}</p>
                                    <button
                                        className="ml-2 h-9 w-9 rounded-full border border-border/60 flex items-center justify-center hover:bg-muted transition-colors">
                                        <Download className="h-4 w-4"/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <aside className="space-y-5">
                        <div className="rounded-3xl bg-primary text-primary-foreground p-8 relative overflow-hidden">
                            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gold/30 blur-3xl"/>
                            <p className="text-xs uppercase tracking-[0.25em] text-gold relative">Lifetime spend</p>
                            <p className="font-display text-5xl mt-3 relative">${total.toLocaleString()}</p>
                            <p className="text-xs opacity-70 mt-2 relative">Across {billing.length} bookings</p>
                        </div>

                        <div className="rounded-3xl bg-card border border-border/60 shadow-soft p-6">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">Default payment</p>
                            <div
                                className="mt-4 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground p-5 aspect-[1.6/1] flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs opacity-80">Natours Card</span>
                                    <CreditCard className="h-5 w-5"/>
                                </div>
                                <p className="font-mono tracking-widest text-lg">•••• •••• •••• 4242</p>
                                <div className="flex justify-between text-xs opacity-80">
                                    <span>A. Laouar</span>
                                    <span>12 / 29</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </AccountLayout>
            <SiteFooter/>
        </>
    );
}
