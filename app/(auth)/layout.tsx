// app/(auth)/layout.tsx

import Link from "next/link";
import { FaBrain } from "react-icons/fa";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <FaBrain className="h-8 w-8 text-primary-600 transition-transform group-hover:scale-110" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-bold">
            MindPattern
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
