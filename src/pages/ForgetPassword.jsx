import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { AuthShell, Field } from "@/trash/AuthShell.jsx";
import {useForgotPassword} from "@/hooks/auth/useForgotPassword.js";

const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .email("Please enter a valid email address."),
});

export default function ForgotPasswordPage() {
    const form = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const {mutateAsync} = useForgotPassword();

    const onSubmit = async (values) => {
        form.clearErrors("root");

        try {
            console.log("FORGOT PASSWORD:", values);

            await mutateAsync(values.email);

            form.reset();
        } catch (err) {
            console.error("FORGOT PASSWORD ERROR:", err);

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
        document.title = "Forgot Password · Natours";
    }, []);

    return (
        <AuthShell
            title="Forgot your password?"
            subtitle="Enter your email address and we'll help you get back into your account."
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
                        render={({ field }) => (
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

                {/* Submit */}
                <button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3.5 text-sm font-medium hover:bg-gold hover:text-gold-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {form.formState.isSubmitting
                        ? "Sending..."
                        : "Reset password"}

                    {!form.formState.isSubmitting && (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                </button>

                {/* Back to login */}
                <p className="text-center text-sm text-muted-foreground">
                    Remember your password?{" "}
                    <Link
                        to="/login"
                        className="text-primary underline underline-offset-4 hover:text-gold transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthShell>
    );
}
