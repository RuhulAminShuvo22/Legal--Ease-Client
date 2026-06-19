"use client";

import { motion } from "framer-motion";
import {
    FaUserTie,
    FaSearch,
    FaBalanceScale,
    FaShieldAlt,
    FaCalendarCheck,
    FaChartLine,
} from "react-icons/fa";

const features = [
    {
        icon: FaUserTie,
        title: "Expert Lawyers",
        desc: "Connect with verified and experienced legal professionals instantly.",
    },
    {
        icon: FaSearch,
        title: "Smart Search",
        desc: "Find lawyers by specialization, location, or experience in seconds.",
    },
    {
        icon: FaBalanceScale,
        title: "Fair Legal Match",
        desc: "We match you with the right lawyer based on your legal needs.",
    },
    {
        icon: FaShieldAlt,
        title: "Secure Platform",
        desc: "Your data and consultations are fully encrypted and safe.",
    },
    {
        icon: FaCalendarCheck,
        title: "Easy Booking",
        desc: "Book consultations with lawyers in just a few clicks.",
    },
    {
        icon: FaChartLine,
        title: "Trusted Growth",
        desc: "Helping thousands of clients solve legal issues efficiently.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function FeaturesSection() {
    return (
        <section className="relative py-20 bg-[#F8F5F0]">
            {/* Background Glow */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-[#D4A95A] blur-[120px]" />
                <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-[#C39245] blur-[140px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-4xl font-bold text-[#3B2F1E]">
                        Powerful Features for Legal Ease
                    </h2>
                    <p className="mt-3 text-[#6B5B45]">
                        Everything you need to connect with trusted lawyers faster and smarter.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0px 10px 40px rgba(0,0,0,0.08)",
                                }}
                                className="group rounded-2xl border border-[#E6D8C8] bg-white p-7 transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4A95A] to-[#C39245] text-white shadow-md group-hover:scale-110 transition">
                                    <Icon size={22} />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-[#3B2F1E]">
                                    {feature.title}
                                </h3>

                                {/* Desc */}
                                <p className="mt-2 text-sm leading-relaxed text-[#6B5B45]">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}