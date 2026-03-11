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
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { FaGoogle, FaSpinner } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [router, status]);

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        setError("Identity could not be verified.");
        setIsLoading(false);
        return;
      }

      if (result?.url) {
        router.replace(result.url);
        router.refresh();
        return;
      }

      setError("Login succeeded, but redirect failed.");
      setIsLoading(false);
    } catch {
      setError("A system error occurred.");
      setIsLoading(false);
    }
  };

return (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
    <div className="bg-white border border-black/[0.03] rounded-[40px] p-8 md:p-10 shadow-sm">
      {/* REMOVED the redundant logo Link here */}
      <div className="text-center mb-10 pt-4">
        <h1 className="text-3xl font-semibold tracking-tighter text-[#1a1a1a] mb-2">
          Welcome Back
        </h1>
        <p className="text-[#8a8a8a] text-sm italic font-serif">
          Resume your journey into self-clarity.
        </p>
      </div>
      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 p-4 bg-red-50/50 border border-red-100 rounded-2xl">
          <p className="text-xs font-medium text-red-600 text-center uppercase tracking-widest">
            {error}
          </p>
        </motion.div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-[10px] uppercase tracking-[0.2em] text-ink-tertiary font-bold ml-1">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className="h-12 rounded-2xl border-black/[0.05] bg-surface-soft/50 focus:bg-white transition-all px-5 placeholder:text-ink-tertiary/40"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <Label
              htmlFor="password"
              className="text-[10px] uppercase tracking-[0.2em] text-ink-tertiary font-bold">
              Security Key
            </Label>
            <Link
              href="#"
              className="text-[10px] uppercase tracking-[0.2em] text-ink-tertiary/60 hover:text-ink-primary">
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="h-12 rounded-2xl border-black/[0.05] bg-surface-soft/50 focus:bg-white transition-all px-5 placeholder:text-ink-tertiary/40"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-ink-primary text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-black/5 active:scale-[0.98]"
          disabled={isLoading}>
          {isLoading ? (
            <FaSpinner className="animate-spin text-lg" />
          ) : (
            "Verify Identity"
          )}
        </Button>
      </form>

      {/* Social Auth Separator */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/[0.03]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em]">
            <span className="px-4 bg-white text-ink-tertiary">Third Party</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full h-12 mt-6 rounded-2xl border-black/[0.05] text-ink-secondary text-xs font-bold uppercase tracking-widest hover:bg-surface-soft transition-all"
          disabled
          type="button">
          <FaGoogle className="mr-3 opacity-60" />
          Google Authentication
        </Button>
      </div>

      {/* Redirect to Signup */}
      <p className="text-center text-[11px] uppercase tracking-[0.1em] text-ink-tertiary mt-8">
        New to the pattern?{" "}
        <Link
          href="/signup"
          className="text-ink-primary font-bold hover:underline underline-offset-4">
          Join the evolution
        </Link>
      </p>
    </div>

    {/* Footer Metadata (Visible on long screens) */}
    <div className="mt-8 mb-12 flex justify-center space-x-6 text-[9px] font-mono uppercase tracking-[0.2em] text-ink-tertiary opacity-40">
      <span>Encrypted: AES-256</span>
      <span>Status: Secure</span>
    </div>
  </motion.div>
);
}
