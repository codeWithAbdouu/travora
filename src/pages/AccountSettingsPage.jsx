import { useEffect } from "react";
import { Camera, Trash2  } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import { SiteFooter } from "@/components/site-chrome";
import { AccountLayout } from "@/components/account-layout";
import { Spinner } from "@/components/ui/spinner.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { useUpdateMe } from "#src/hooks/auth/useUpdateMe.js";
import { useUpdateMyPassword } from "#src/hooks/auth/useUpdateMyPassword.js";
import {useDeleteMe} from "#src/hooks/auth/useDeleteMe.js";

const profileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name cannot exceed 50 characters.")
        .regex(/^[a-zA-Z0-9_ ]+$/, "Letters, numbers, underscores, and spaces only."),

    email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .email("Please enter a valid email address."),
});

const passwordSchema = z
    .object({
        passwordCurrent: z
            .string()
            .min(1, "Current password is required."),

        newPassword: z
            .string()
            .min(6, "Password must be at least 6 characters."),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your new password."),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    })
    .refine((data) => data.passwordCurrent !== data.newPassword, {
        message: "New password must be different from your current password.",
        path: ["newPassword"],
    });

function TextField({ label, type = "text", error, ...props }) {
    return (
        <label className="block">
            <span className="text-sm font-medium">{label}</span>

            <input
                type={type}
                placeholder={type === "password" ? "••••••••" : ""}
                {...props}
                className="mt-2 w-full rounded-2xl bg-muted/60 border border-transparent px-4 py-3 text-sm outline-none focus:border-primary focus:bg-background transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </label>
    );
}

export default function AccountSettingsPage() {
    const { user, isLoading } = useAuth();

    const navigate = useNavigate();

    const profileForm = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    const passwordForm = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            passwordCurrent: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const { mutateAsync: updateMe } = useUpdateMe();
    const { mutateAsync: updatePassword } = useUpdateMyPassword();
    const {mutateAsync: deleteMe, isPending: isDeletingMe} = useDeleteMe();

    async function handleDeleteMe() {
        try {
            await deleteMe();
            navigate("/");
        } catch (err) {
            console.error("DELETE ACCOUNT ERROR:", err);
        }
    }

    useEffect(() => {
        if (user) {
            profileForm.reset({
                name: user.name ?? "",
                email: user.email ?? "",
            });
        }
    }, [user, profileForm.reset]);

    const onProfileSubmit = async (values) => {
        profileForm.clearErrors("root");

        if (values.name === user.name) {
            toast.info("No changes to save.");
            return;
        }

        try {
            await updateMe({ name: values.name });
        } catch (err) {
            console.error("PROFILE UPDATE ERROR:", err);

            const message =
                err.response?.data?.message ||
                "Something went wrong. Please try again.";

            profileForm.setError("root.server", {
                type: "server",
                message,
            });
        }
    };

    const onPasswordSubmit = async (values) => {
        passwordForm.clearErrors("root");

        try {
            const data =  await updatePassword({
                passwordCurrent: values.passwordCurrent,
                password: values.newPassword,
                passwordConfirm: values.confirmPassword,
            });

            console.log(data);
            passwordForm.reset();
        } catch (err) {
            console.error("PASSWORD UPDATE ERROR:", err);

            const message =
                err.response?.data?.message ||
                "Something went wrong. Please try again.";

            passwordForm.setError("root.server", {
                type: "server",
                message,
            });
        }
    };

    const onInvalid = (errors) => {
        console.log("Validation errors:", errors);
        toast.error("Please fix the validation errors.");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex justify-center items-center">
                <Spinner className="size-16" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <>
            <AccountLayout title="Settings" user={user}>
                <div className="grid gap-8">
                    <section className="rounded-3xl bg-card border border-border/60 shadow-soft p-8">
                        <h2 className="font-display text-2xl mb-6">
                            Your account settings
                        </h2>

                        <form
                            className="space-y-6"
                            onSubmit={profileForm.handleSubmit(
                                onProfileSubmit,
                                onInvalid
                            )}
                        >
                            {profileForm.formState.errors.root?.server && (
                                <p className="text-sm text-red-500">
                                    {profileForm.formState.errors.root.server.message}
                                </p>
                            )}

                            <TextField
                                label="Name"
                                {...profileForm.register("name")}
                                error={profileForm.formState.errors.name?.message}
                            />

                            <TextField
                                label="Email address"
                                type="email"
                                {...profileForm.register("email")}
                                error={profileForm.formState.errors.email?.message}
                                disabled
                            />

                            <div className="flex items-center gap-4">
                                <img
                                    src={
                                        user.avatar ||
                                        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1600&q=80"
                                    }
                                    alt=""
                                    className="h-16 w-16 rounded-full object-cover ring-2 ring-gold/40"
                                />

                                <button
                                    type="button"
                                    className="text-sm text-primary underline underline-offset-4 flex items-center gap-2"
                                >
                                    <Camera className="h-4 w-4" />
                                    Choose new photo
                                </button>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={profileForm.formState.isSubmitting}
                                    className="rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-gold hover:text-gold-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {profileForm.formState.isSubmitting
                                        ? "Saving settings..."
                                        : "Save settings"}
                                </button>
                            </div>
                        </form>
                    </section>

                    <section className="rounded-3xl bg-card border border-border/60 shadow-soft p-8">
                        <h2 className="font-display text-2xl mb-6">
                            Password change
                        </h2>

                        <form
                            className="space-y-6"
                            onSubmit={passwordForm.handleSubmit(
                                onPasswordSubmit,
                                onInvalid
                            )}
                        >
                            {passwordForm.formState.errors.root?.server && (
                                <p className="text-sm text-red-500">
                                    {passwordForm.formState.errors.root.server.message}
                                </p>
                            )}

                            <TextField
                                label="Current password"
                                type="password"
                                {...passwordForm.register("passwordCurrent")}
                                error={
                                    passwordForm.formState.errors.passwordCurrent?.message
                                }
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <TextField
                                    label="New password"
                                    type="password"
                                    {...passwordForm.register("newPassword")}
                                    error={
                                        passwordForm.formState.errors.newPassword?.message
                                    }
                                />

                                <TextField
                                    label="Confirm password"
                                    type="password"
                                    {...passwordForm.register("confirmPassword")}
                                    error={
                                        passwordForm.formState.errors.confirmPassword?.message
                                    }
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={passwordForm.formState.isSubmitting}
                                    className="rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-gold hover:text-gold-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {passwordForm.formState.isSubmitting
                                        ? "Updating password..."
                                        : "Save Password"}
                                </button>
                            </div>
                        </form>
                    </section>

                    <section className="rounded-3xl bg-card border border-red-500/20 shadow-soft p-8">
                        <h2 className="font-display text-2xl mb-3 text-red-500">
                            Delete account
                        </h2>

                        <p className="text-sm text-muted-foreground mb-6">
                            Permanently delete your account and all associated data.
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleDeleteMe}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-8 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                            >
                                <Trash2 className="h-4 w-4" />
                                {isDeletingMe ? "Delete My Account..." : "Delete My Account"}
                            </button>
                        </div>
                    </section>
                </div>
            </AccountLayout>

            <SiteFooter />
        </>
    );
}