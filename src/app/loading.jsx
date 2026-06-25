"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LoadingPage = () => {
    return (
        <div
            className="
      min-h-screen
      bg-gradient-to-br
      from-[#FDFBF7]
      via-[#F8F5EF]
      to-[#F2EBDD]
      flex
      items-center
      justify-center
      relative
      overflow-hidden
    "
        >
            {/* Background Blur Effects */}

            <div
                className="
        absolute
        top-20
        left-20
        w-80
        h-80
        bg-[#D4A95A]/10
        rounded-full
        blur-3xl
        "
            />

            <div
                className="
        absolute
        bottom-20
        right-20
        w-80
        h-80
        bg-[#B88A44]/10
        rounded-full
        blur-3xl
        "
            />

            {/* Main Content */}

            <div
                className="
        relative
        z-10
        flex
        flex-col
        items-center
        justify-center
        gap-8
        "
            >
                {/* Logo */}

                <motion.div
                    animate={{
                        scale: [1, 1.06, 1],
                        y: [0, -8, 0],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative"
                >
                    <div
                        className="
            absolute
            inset-0
            bg-[#D4A95A]/20
            blur-3xl
            rounded-full
            "
                    />

                    <Image
                        src="/newlogo.png"
                        width={220}
                        height={220}
                        alt="LegalEase"
                        priority
                        className="relative object-contain"
                    />
                </motion.div>

                {/* Spinner */}

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                    className="
          w-14
          h-14
          rounded-full
          border-[4px]
          border-[#E8DDCF]
          border-t-[#D4A95A]
          "
                />

                {/* Text */}

                <div className="text-center">
                    <motion.h2
                        animate={{
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.8,
                        }}
                        className="
            text-3xl
            md:text-4xl
            font-black
            bg-gradient-to-r
            from-[#D4A95A]
            via-[#C89A48]
            to-[#B88A44]
            bg-clip-text
            text-transparent
            "
                    >
                        Loading LegalEase...
                    </motion.h2>

                    <p
                        className="
            text-[#6B5B45]
            text-sm
            md:text-base
            mt-3
            tracking-wide
            "
                    >
                        Connecting you with trusted legal professionals
                    </p>
                </div>

                {/* Animated Dots */}

                <div className="flex items-center gap-2">
                    {[0, 1, 2].map((dot) => (
                        <motion.div
                            key={dot}
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: dot * 0.2,
                            }}
                            className="
              w-3
              h-3
              rounded-full
              bg-[#D4A95A]
              "
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;