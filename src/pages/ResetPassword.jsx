import { useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { AuthShell, Field } from "@/trash/AuthShell.jsx";
import {useResetPassword} from "@/hooks/auth/useResetPassword.js";

const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(1, "Password is required.")
            .min(6, "Password must be at least 6 characters."),

        passwordConfirm: z
            .string()
            .min(1, "Please confirm your password.")
            .min(6, "Password must be at least 6 characters."),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match.",
        path: ["passwordConfirm"],
    });

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const {token} = useParams();

    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            passwordConfirm: "",
        },
    });

    const {mutateAsync} = useResetPassword();

    const onSubmit = async (values) => {
        form.clearErrors("root");

        try {
            console.log("RESET PASSWORD:", values);
            const resetData = {
                token,
                passwordData: values,
            }

            await mutateAsync(resetData)

            form.reset();
            navigate("/");
        } catch (err) {
            console.error("RESET PASSWORD ERROR:", err);

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
        document.title = "Reset Password · Natours";
    }, []);

    return (
        <AuthShell
            title="Create a new password."
            subtitle="Choose a strong password to secure your account."
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

                {/* New password */}
                <div>
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <Field
                                label="New password"
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

                {/* Confirm password */}
                <div>
                    <Controller
                        name="passwordConfirm"
                        control={form.control}
                        render={({ field }) => (
                            <Field
                                label="Confirm new password"
                                type="password"
                                placeholder="••••••••"
                                {...field}
                            />
                        )}
                    />

                    {form.formState.errors.passwordConfirm && (
                        <p className="mt-1 text-sm text-red-500">
                            {form.formState.errors.passwordConfirm.message}
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
                        ? "Resetting password..."
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