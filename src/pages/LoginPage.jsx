import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ArrowRight} from "lucide-react";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "sonner";

import {AuthShell, Field} from "@/trash/AuthShell.jsx";
import {useLogin} from "@/hooks/auth/useLogin.js";

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .email("Please enter a valid email address."),

    password: z
        .string()
        .min(1, "Password is required.")
        .min(6, "Password must be at least 6 characters."),
});

export default function LoginPage() {
    const navigate = useNavigate();

    const {
        mutateAsync: login,
        isPending,
    } = useLogin();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values) => {
        form.clearErrors("root");

        try {
            const data = await login({
                email: values.email,
                password: values.password,
            });

            console.log("LOGIN RESPONSE:", data);

            form.reset();
            navigate("/");
        } catch (err) {
            console.error("LOGIN ERROR:", err);

            const message =
                err.response?.data?.message ||
                "Something went wrong. Please try again.";

            form.setError("root.server", {
                type: "server",
                message,
            });
        }
    };

    const onInvalid = (errors) => {
        console.log("Validation errors:", errors);
        toast.error("Please fix the validation errors.");
    };

    useEffect(() => {
        document.title = "Log in · natours";
    }, []);

    return (
        <AuthShell
            title="Welcome back."
            subtitle="Log in to continue your journey."
            image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
        >
            <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            >
                {/* Form error */}
                {form.formState.errors.root?.server && (
                    <p className="text-sm text-red-500">
                        {form.formState.errors.root.server.message}
                    </p>
                )}

                {/* Email */}
                <div>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({field}) => (
                            <Field
                                label="Email address"
                                type="email"
                                placeholder="you@example.com"
                                {...field}
                            />
                        )}
                    />

                    {form.formState.errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <Controller
                        name="password"
                        control={form.control}
                        render={({field}) => (
                            <Field
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                {...field}
                            />
                        )}
                    />

                    {form.formState.errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending || form.formState.isSubmitting}
                    className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3.5 text-sm font-medium hover:bg-gold hover:text-gold-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending || form.formState.isSubmitting
                        ? "Logging in..."
                        : "Log in"}

                    {!isPending && !form.formState.isSubmitting && (
                        <ArrowRight
                            className="h-4 w-4 group-hover:translate-x-0.5 transition-transform"
                        />
                    )}
                </button>

                <p className="text-center text-sm text-muted-foreground">
                    New to Natours?{" "}
                    <Link
                        to="/signup"
                        className="text-primary underline underline-offset-4"
                    >
                        Create an account
                    </Link>
                </p>
            </form>
        </AuthShell>
    );
}
