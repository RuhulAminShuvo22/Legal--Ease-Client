"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const statsTarget = {
    lawyers: 1200,
    cases: 8500,
    clients: 15000,
};

export default function Banner() {
    const [count, setCount] = useState({
        lawyers: 0,
        cases: 0,
        clients: 0,
    });

    useEffect(() => {
        const animateValue = (key, target) => {
            let start = 0;
            const step = Math.ceil(target / 60);

            const interval = setInterval(() => {
                start += step;
                if (start >= target) {
                    start = target;
                    clearInterval(interval);
                }
                setCount((prev) => ({ ...prev, [key]: start }));
            }, 20);
        };

        animateValue("lawyers", statsTarget.lawyers);
        animateValue("cases", statsTarget.cases);
        animateValue("clients", statsTarget.clients);
    }, []);

    return (
        <section className="relative w-full overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80"
                    alt="law background"
                    className="h-full w-full object-cover"
                />

                {/* ✅ LIGHT + PREMIUM OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A120B]/55 via-[#2A1D14]/40 to-[#3A2A1F]/35" />

                {/* warm glow layer */}
                <div className="absolute inset-0 bg-[#CBA56A]/10" />
            </div>

            {/* Content */}
            <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                            Find the Best <span className="text-[#CBA56A]">Lawyers</span> for Your Legal Needs
                        </h1>

                        <p className="mt-5 text-gray-200 text-lg">
                            Connect with verified legal experts, book consultations, and solve your legal issues faster than ever.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex gap-4">
                            <button className="rounded-full bg-gradient-to-r from-[#D4A95A] to-[#C39245] px-7 py-3 font-semibold text-white shadow-lg hover:scale-105 transition">
                                Get Started
                            </button>

                            <button className="rounded-full border border-white/40 px-7 py-3 text-white hover:bg-white/10 transition">
                                Browse Lawyers
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Stats */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="grid grid-cols-2 gap-6"
                    >

                        {/* Card 1 */}
                        <div className="backdrop-blur-md bg-white/15 border border-white/20 rounded-2xl p-6 text-center shadow-lg">
                            <h2 className="text-3xl font-bold text-white">
                                {count.lawyers}+
                            </h2>
                            <p className="text-gray-200 mt-2">Verified Lawyers</p>
                        </div>

                        {/* Card 2 */}
                        <div className="backdrop-blur-md bg-white/15 border border-white/20 rounded-2xl p-6 text-center shadow-lg">
                            <h2 className="text-3xl font-bold text-white">
                                {count.cases}+
                            </h2>
                            <p className="text-gray-200 mt-2">Cases Solved</p>
                        </div>

                        {/* Card 3 */}
                        <div className="backdrop-blur-md bg-white/15 border border-white/20 rounded-2xl p-6 text-center col-span-2 shadow-lg">
                            <h2 className="text-3xl font-bold text-white">
                                {count.clients}+
                            </h2>
                            <p className="text-gray-200 mt-2">Happy Clients</p>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}