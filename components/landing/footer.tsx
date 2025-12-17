// components/landing/footer.tsx

import Link from "next/link";
import { FaBrain, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <FaBrain className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-slate-900">
                MindPattern
              </span>
            </Link>
            <p className="text-slate-600 text-sm">
              AI-powered mental health journaling platform helping you
              understand your mind better.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/features"
                  className="text-slate-600 hover:text-primary-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-slate-600 hover:text-primary-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-slate-600 hover:text-primary-600 transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-primary-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-600 hover:text-primary-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-primary-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-600 hover:text-primary-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © 2025 MindPattern. Your mental health matters.
          </p>

          <div className="flex gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary-600 transition-colors">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary-600 transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary-600 transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
