"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Counter = ({ from = 0, to = 1000, duration = 2 }) => {
    const [count, setCount] = useState(from);

    useEffect(() => {
        let start = from;
        const end = to;
        const total = duration * 60;
        const increment = (end - from) / total;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                clearInterval(timer);
                start = end;
            }
            setCount(Math.floor(start));
        }, 1000 / 60);

        return () => clearInterval(timer);
    }, [from, to, duration]);

    return <span>{count.toLocaleString()}</span>;
};

export default function CTASection() {
    return (
        <section className="relative overflow-hidden py-24 bg-[#F8F5F0]">

            {/* background glow */}
            <div className="absolute -top-40 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#CBA56A]/20 blur-3xl"></div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mx-auto max-w-6xl px-6 text-center"
            >

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-[#3B2F1E]">
                    Find the Best <span className="text-[#C39245]">Lawyers</span> in Seconds
                </h2>

                <p className="mt-4 text-[#6B5B45] text-lg">
                    Trusted legal experts ready to help you anytime, anywhere.
                </p>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="rounded-2xl bg-white border border-[#E4D8CA] p-6 shadow-sm"
                    >
                        <h3 className="text-3xl font-bold text-[#C39245]">
                            <Counter to={5000} />
                            +
                        </h3>
                        <p className="text-[#6B5B45] mt-2">Verified Lawyers</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="rounded-2xl bg-white border border-[#E4D8CA] p-6 shadow-sm"
                    >
                        <h3 className="text-3xl font-bold text-[#C39245]">
                            <Counter to={12000} />
                            +
                        </h3>
                        <p className="text-[#6B5B45] mt-2">Cases Solved</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="rounded-2xl bg-white border border-[#E4D8CA] p-6 shadow-sm"
                    >
                        <h3 className="text-3xl font-bold text-[#C39245]">
                            <Counter to={98} />
                            %
                        </h3>
                        <p className="text-[#6B5B45] mt-2">Client Satisfaction</p>
                    </motion.div>

                </div>

                {/* CTA Buttons */}
                <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        href="/browse-lawyers"
                        className="rounded-full bg-gradient-to-r from-[#D4A95A] to-[#C39245] px-8 py-4 font-semibold text-white shadow-lg"
                    >
                        Find Lawyers
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        href="/register"
                        className="rounded-full border border-[#DCCFC0] px-8 py-4 font-semibold text-[#6B5B45] bg-white"
                    >
                        Join as Lawyer
                    </motion.a>
                </div>

            </motion.div>
        </section>
    );
}