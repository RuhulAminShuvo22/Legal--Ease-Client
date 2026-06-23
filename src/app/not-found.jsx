"use client";

// import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FaArrowLeft, FaScaleBalanced } from "react-icons/fa6";

const floatingVariants = {
  animate: (i) => ({
    y: [0, -25, 0],
    x: [0, i * 12, 0],
    transition: {
      duration: 6 + i,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

export default function NotFoundPage() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F3EE] px-4">

      {/* Background Blobs */}
      <motion.div
        custom={1}
        animate="animate"
        variants={floatingVariants}
        className="absolute left-10 top-16 h-56 w-56 rounded-full bg-[#D4A95A]/20 blur-3xl"
      />

      <motion.div
        custom={-1}
        animate="animate"
        variants={floatingVariants}
        className="absolute bottom-16 right-10 h-72 w-72 rounded-full bg-[#B88A44]/15 blur-3xl"
      />

      <motion.div
        custom={2}
        animate="animate"
        variants={floatingVariants}
        className="absolute left-1/2 top-1/3 h-40 w-40 rounded-full bg-[#D4A95A]/10 blur-2xl"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1E1E1E 1px, transparent 1px), linear-gradient(to right, #1E1E1E 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-5xl rounded-[36px] border border-[#E8DDCF] bg-white/85 p-8 md:p-14 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
      >
        {/* Icon */}
        <motion.div
          initial={false}
          animate={{ scale: 1 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-[#D4A95A]/20 to-[#B88A44]/20"
        >
          <FaScaleBalanced className="text-4xl text-[#B88A44]" />
        </motion.div>

        {/* 404 */}
        <div className="flex items-center justify-center gap-2 md:gap-8">

          <span className="text-[90px] md:text-[180px] font-black text-[#1E1E1E]">
            4
          </span>

          <div className="relative flex h-[110px] w-[110px] items-center justify-center md:h-[180px] md:w-[180px]">

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4A95A]/30"
            />

            <div className="absolute inset-0 rounded-full bg-[#D4A95A]/10 blur-2xl" />

            <div className="relative z-10 flex h-[82%] w-[82%] items-center justify-center overflow-hidden rounded-full bg-white p-3 shadow-lg">
              <Image
                src="/newlogo.png"
                alt="Legal-Ease"
                width={150}
                height={150}
                className="object-contain"
                priority
              />
            </div>

          </div>

          <span className="text-[90px] md:text-[180px] font-black text-[#1E1E1E]">
            4
          </span>

        </div>

        {/* Heading */}
        <h1 className="mt-8 text-center text-3xl md:text-5xl font-bold text-[#1E1E1E]">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl text-center text-base md:text-lg text-[#6B7280] leading-relaxed">
          The page you are looking for may have been removed,
          renamed or temporarily unavailable.
          <br />
          Browse trusted lawyers and legal services through Legal-Ease.
        </p>

        {/* Divider */}
        <div className="mx-auto my-10 h-px w-60 bg-gradient-to-r from-transparent via-[#D4A95A] to-transparent" />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#D4A95A] to-[#B88A44] text-white font-semibold px-8 rounded-xl"
            >
              <FaArrowLeft />
              Back To Home
            </Button>
          </Link>

          <Link href="/lawyers">
            <Button
              size="lg"
              variant="bordered"
              className="border-[#D4A95A] text-[#B88A44] font-semibold px-8"
            >
              Browse Lawyers
            </Button>
          </Link>

        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-sm font-medium tracking-[0.2em] text-[#B88A44]">
          LEGAL-EASE • TRUSTED LEGAL SOLUTIONS
        </p>

      </motion.div>
    </div>
  );
}