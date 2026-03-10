// app/(dashboard)/dashboard/page.tsx

"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-slate-600 mb-4">
          Welcome back, {session.user.name}!
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Email: {session.user.email}
        </p>
        <Button onClick={() => signOut({ callbackUrl: "/" })} variant="outline">
          Logout
        </Button>
      </Card>
    </div>
  );
}
