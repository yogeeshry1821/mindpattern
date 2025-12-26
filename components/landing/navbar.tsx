// components/landing/navbar.tsx

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <FaBrain className="h-8 w-8 text-primary-600 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-bold">
            MindPattern
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
