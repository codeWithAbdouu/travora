
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ArrowRight} from "lucide-react";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "sonner";

import {AuthShell, Field} from "@/trash/AuthShell.jsx";
import {useSignup} from "@/hooks/auth/useSignup.js";

const signupSchema = z.object({
    username: z
        .string()
        .trim()
        .min(2, "Username must be between 2 and 30 characters.")
        .max(30, "Username must be between 2 and 30 characters.")
        .regex(/^[a-zA-Z0-9_ ]+$/, "Letters, numbers, underscores only."),

    email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .email("Please enter a valid email address."),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters."),

    passwordConfirm: z
        .string()
        .min(6, "Password must be at least 6 characters."),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"],
});

export default function SignupPage() {
    const navigate = useNavigate();

    const {
        mutateAsync: signup,
        isPending,
    } = useSignup();

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit = async (values) => {
        form.clearErrors("root");

        try {
            const data = await signup({
                name: values.username,
                email: values.email,
                password: values.password,
                passwordConfirm: values.passwordConfirm,
            });

            console.log("SIGNUP RESPONSE:", data);
            console.log("submited");

            form.reset();
            navigate("/");
        } catch (err) {
            console.error("SIGNUP ERROR:", err);

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
        document.title = "Sign up · natours";
    }, []);

    return (
        <AuthShell
            title="Create your account."
            subtitle="A few details and you're on the list."
            image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80"
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

                {/* Username */}
                <div>
                    <Controller
                        name="username"
                        control={form.control}
                        render={({field}) => (
                            <Field
                                label="Your name"
                                placeholder="Full name"
                                {...field}
                            />
                        )}
                    />

                    {form.formState.errors.username && (
                        <p className="mt-1 text-sm text-red-500">
                            {form.formState.errors.username.message}
                        </p>
                    )}
                </div>

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

                {/* Passwords */}
                <div className="grid sm:grid-cols-2 gap-4">
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

                    <div>
                        <Controller
                            name="passwordConfirm"
                            control={form.control}
                            render={({field}) => (
                                <Field
                                    label="Confirm password"
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
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending || form.formState.isSubmitting}
                    className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3.5 text-sm font-medium hover:bg-gold hover:text-gold-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending || form.formState.isSubmitting
                        ? "Creating account..."
                        : "Create account"}

                    {!isPending && !form.formState.isSubmitting && (
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform"/>
                    )}
                </button>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-primary underline underline-offset-4"
                    >
                        Log in
                    </Link>
                </p>
            </form>
        </AuthShell>
    );
}
