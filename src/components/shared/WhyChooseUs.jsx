"use client";

import { motion } from "framer-motion";
import { FaUserTie, FaShieldAlt, FaSearch, FaStar } from "react-icons/fa";

const features = [
    {
        icon: <FaUserTie />,
        title: "Verified Lawyers",
        desc: "All lawyers are verified with proper license & professional background check.",
    },
    {
        icon: <FaShieldAlt />,
        title: "Secure & Trusted",
        desc: "Your data and consultations are fully secure with end-to-end protection.",
    },
    {
        icon: <FaSearch />,
        title: "Smart Search",
        desc: "Find lawyers instantly by specialization, location, or experience level.",
    },
    {
        icon: <FaStar />,
        title: "Top Rated Experts",
        desc: "Choose from highly rated professionals trusted by thousands of clients.",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WhyChooseUs() {
    return (
        <section className="bg-[#F8F5F0] py-20">
            <div className="mx-auto max-w-7xl px-4">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#3B2F1E]">
                        Why Choose <span className="text-[#C39245]">Us</span>
                    </h2>

                    <p className="mt-3 text-[#6B5B45] max-w-2xl mx-auto">
                        We connect you with trusted legal experts through a fast, secure and intelligent platform.
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            whileHover={{ scale: 1.05 }}
                            className="group rounded-2xl border border-[#DCCFC0] bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E7D3] text-[#C39245] text-xl group-hover:scale-110 transition">
                                {f.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-[#3B2F1E]">
                                {f.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-2 text-sm text-[#6B5B45] leading-relaxed">
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}