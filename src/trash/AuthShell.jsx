import {motion} from "framer-motion";

export function AuthShell({title, subtitle, image, children}) {
    return (
        <section className="container-lux pt-24 pb-16">
            <div
                className="grid lg:grid-cols-2 rounded-4xl overflow-hidden border border-border/60 shadow-lift bg-card min-h-[640px]">
                <div className="relative hidden lg:block">
                    <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/70 via-primary/30 to-transparent"/>
                    <div className="absolute bottom-10 left-10 right-10 text-primary-foreground">
                        <p className="text-xs uppercase tracking-[0.25em] text-gold">Natours</p>
                        <p className="font-display text-3xl mt-3 leading-tight">
                            "The world is quieter than we're told. We designed Natours to remind us."
                        </p>
                    </div>
                </div>
                <motion.div
                    initial={{opacity: 0, x: 20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.6}}
                    className="p-8 md:p-14 flex flex-col justify-center"
                >
                    <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">Account</p>
                    <h1 className="font-display text-4xl mb-2">{title}</h1>
                    <p className="text-muted-foreground mb-8">{subtitle}</p>
                    {children}
                </motion.div>
            </div>
        </section>
    );
}

export function Field({
                          label,
                          type = "text",
                          placeholder,
                          value,
                          onChange,
                      }) {
    return (
        <label className="block">
            <span className="text-sm font-medium">
                {label}
            </span>

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="mt-2 w-full rounded-2xl bg-muted/60 border border-transparent px-4 py-3 text-sm outline-none focus:border-primary focus:bg-background transition-colors"
            />
        </label>
    );
}