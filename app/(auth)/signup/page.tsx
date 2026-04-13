// app/(auth)/signup/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupSchema, type SignupInput } from "@/lib/validations/auth";
import { FaGoogle, FaSpinner } from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [router, status]);

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (signInResult?.error || !signInResult?.url) {
        throw new Error(
          "Account created but login failed. Please login manually.",
        );
      }

      router.replace(signInResult.url);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "A system error occurred.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[440px] z-10">
      <div className="bg-white border border-black/[0.03] rounded-[40px] p-8 md:p-12 shadow-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold tracking-tighter text-[#1a1a1a] mb-2">
            Begin Evolution
          </h1>
          <p className="text-[#8a8a8a] text-sm italic font-serif">
            Start decoding your invisible architecture.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 bg-red-50/50 border border-red-100 rounded-2xl">
            <p className="text-[10px] font-bold text-red-600 text-center uppercase tracking-widest">
              {error}
            </p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] font-bold ml-1">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register("name")}
              className="h-12 rounded-2xl border-black/[0.05] bg-[#f9f9fb]/50 focus:bg-white transition-all px-5"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] font-bold ml-1">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className="h-12 rounded-2xl border-black/[0.05] bg-[#f9f9fb]/50 focus:bg-white transition-all px-5"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] font-bold ml-1">
              Security Key
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="h-12 rounded-2xl border-black/[0.05] bg-[#f9f9fb]/50 focus:bg-white transition-all px-5"
              disabled={isLoading}
            />
            {errors.password ? (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">
                {errors.password.message}
              </p>
            ) : (
              <p className="text-[9px] text-ink-tertiary ml-1 italic font-serif">
                8+ chars: Case sensitive & alphanumeric.
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 mt-4 bg-[#1a1a1a] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-black/5 active:scale-[0.98]"
            disabled={isLoading}>
            {isLoading ? (
              <FaSpinner className="animate-spin text-lg" />
            ) : (
              "Initiate Access"
            )}
          </Button>
        </form>

        {/* Social Divider */}
        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/[0.03]" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em]">
              <span className="px-4 bg-white text-[#8a8a8a]">Quick Start</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 mt-6 rounded-2xl border-black/[0.05] text-[#4a4a4a] text-xs font-bold uppercase tracking-widest hover:bg-[#f9f9fb] transition-all"
            disabled
            type="button">
            <FaGoogle className="mr-3 opacity-60" />
            Google Authentication
          </Button>
        </div>

        <p className="text-center text-[11px] uppercase tracking-[0.1em] text-[#8a8a8a] mt-10">
          Already have a pattern?{" "}
          <Link
            href="/login"
            className="text-[#1a1a1a] font-bold hover:underline underline-offset-4">
            Return to session
          </Link>
        </p>
      </div>

      {/* Metadata */}
      <div className="mt-8 mb-12 flex justify-center space-x-6 text-[9px] font-mono uppercase tracking-[0.2em] text-[#8a8a8a] opacity-40 text-center px-4">
        <span>By initiating, you agree to our Ethics Protocol.</span>
      </div>
    </motion.div>
  );
}
