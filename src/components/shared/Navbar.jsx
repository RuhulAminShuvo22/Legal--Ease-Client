"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Lawyers", href: "/browse-lawyers" },
  { name: "Admin", href: "/admin" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F8F5F0] py-4">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-7xl px-4"
      >
        <div className="rounded-[24px] border border-[#DCCFC0] bg-[#F9F6F1] px-5 lg:px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/newlogo.png"
                alt="LegalEase"
                width={240}
                height={60}
                priority
                className="h-[60px] w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-medium text-[#6B5B45] transition-all duration-300 hover:text-[#C39245]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Search */}
            <div className="hidden lg:block">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B88746]" />

                <input
                  type="text"
                  placeholder="Search lawyers..."
                  className="w-[260px] xl:w-[340px] rounded-full border border-[#DCCFC0] bg-white py-3 pl-11 pr-4 text-sm text-[#6B5B45] outline-none transition-all focus:border-[#CBA56A] focus:ring-2 focus:ring-[#E9D7B8]"
                />
              </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/signin"
                className="font-medium text-[#6B5B45] transition hover:text-[#C39245]"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-gradient-to-r from-[#D4A95A] to-[#C39245] px-7 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#6B5B45]"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-5 border-t border-[#E4D8CA] pt-5">
                  {/* Mobile Search */}
                  <div className="relative mb-5">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B88746]" />

                    <input
                      type="text"
                      placeholder="Search lawyers..."
                      className="w-full rounded-full border border-[#DCCFC0] bg-white py-3 pl-11 pr-4 outline-none"
                    />
                  </div>

                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="font-medium text-[#6B5B45] hover:text-[#C39245]"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Buttons */}
                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href="/signin"
                      className="rounded-xl border border-[#DCCFC0] px-4 py-3 text-center font-medium text-[#6B5B45]"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/register"
                      className="rounded-xl bg-gradient-to-r from-[#D4A95A] to-[#C39245] px-4 py-3 text-center font-semibold text-white"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
}