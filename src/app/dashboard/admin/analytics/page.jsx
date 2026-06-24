"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
    FaUsers,
    FaUserTie,
    FaBalanceScale,
    FaMoneyBillWave,
} from "react-icons/fa";

const AdminAnalyticsPage = () => {

    const [loading, setLoading] =
        useState(true);

    const [analytics, setAnalytics] =
        useState(null);

    useEffect(() => {

        const fetchAnalytics =
            async () => {

                try {

                    const res =
                        await axios.get(
                            "http://localhost:5000/admin/analytics"
                        );

                    setAnalytics(
                        res.data
                    );

                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }

            };

        fetchAnalytics();

    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">

                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                    className="
                    w-20
                    h-20
                    rounded-full
                    border-4
                    border-[#D4A95A]
                    border-t-transparent
                    "
                />

            </div>
        );
    }

    const {
        totalUsers,
        totalLawyers,
        totalHires,
        totalRevenue,
    } = analytics || {};
    return (
        <div className="min-h-screen bg-[#F7F3EE] p-4 md:p-6 lg:p-10">

            {/* Header */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: -30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="mb-10"
            >

                <h1
                    className="
                    text-3xl
                    md:text-4xl
                    lg:text-5xl
                    font-black
                    text-[#2B2118]
                    "
                >
                    Analytics Overview
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Complete platform performance and statistics.
                </p>

            </motion.div>

            {/* Hero Banner */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.95,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="
                mb-10
                rounded-[32px]
                overflow-hidden
                bg-gradient-to-r
                from-[#D4A95A]
                via-[#C89A48]
                to-[#B88A44]
                shadow-2xl
                relative
                "
            >

                <div className="absolute inset-0 bg-white/5" />

                <div className="relative z-10 p-8 md:p-10">

                    <h2
                        className="
                        text-white
                        text-3xl
                        md:text-5xl
                        font-black
                        "
                    >
                        Admin Analytics Dashboard
                    </h2>

                    <p
                        className="
                        text-white/90
                        mt-4
                        text-lg
                        max-w-2xl
                        "
                    >
                        Monitor users, lawyers, hires and revenue
                        with real-time platform insights.
                    </p>

                </div>

            </motion.div>

            {/* Stats Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Total Users */}

                <motion.div
                    whileHover={{
                        y: -8,
                        scale: 1.03,
                    }}
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    rounded-[28px]
                    p-7
                    shadow-xl
                    border
                    border-white/40
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">
                                Total Users
                            </p>

                            <h2
                                className="
                                text-4xl
                                font-black
                                text-[#2B2118]
                                mt-2
                                "
                            >
                                {totalUsers}
                            </h2>

                        </div>

                        <div
                            className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            "
                        >
                            <FaUsers
                                className="
                                text-3xl
                                text-blue-600
                                "
                            />
                        </div>

                    </div>

                </motion.div>

                {/* Total Lawyers */}

                <motion.div
                    whileHover={{
                        y: -8,
                        scale: 1.03,
                    }}
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    rounded-[28px]
                    p-7
                    shadow-xl
                    border
                    border-white/40
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">
                                Total Lawyers
                            </p>

                            <h2
                                className="
                                text-4xl
                                font-black
                                text-[#2B2118]
                                mt-2
                                "
                            >
                                {totalLawyers}
                            </h2>

                        </div>

                        <div
                            className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-amber-100
                            flex
                            items-center
                            justify-center
                            "
                        >
                            <FaUserTie
                                className="
                                text-3xl
                                text-[#B88A44]
                                "
                            />
                        </div>

                    </div>

                </motion.div>

                {/* Total Hires */}

                <motion.div
                    whileHover={{
                        y: -8,
                        scale: 1.03,
                    }}
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    rounded-[28px]
                    p-7
                    shadow-xl
                    border
                    border-white/40
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">
                                Total Hires
                            </p>

                            <h2
                                className="
                                text-4xl
                                font-black
                                text-[#2B2118]
                                mt-2
                                "
                            >
                                {totalHires}
                            </h2>

                        </div>

                        <div
                            className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-green-100
                            flex
                            items-center
                            justify-center
                            "
                        >
                            <FaBalanceScale
                                className="
                                text-3xl
                                text-green-600
                                "
                            />
                        </div>

                    </div>

                </motion.div>

                {/* Total Revenue */}

                <motion.div
                    whileHover={{
                        y: -8,
                        scale: 1.03,
                    }}
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    rounded-[28px]
                    p-7
                    shadow-xl
                    border
                    border-white/40
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">
                                Total Revenue
                            </p>

                            <h2
                                className="
                                text-4xl
                                font-black
                                text-[#2B2118]
                                mt-2
                                "
                            >
                                ${totalRevenue}
                            </h2>

                        </div>

                        <div
                            className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-purple-100
                            flex
                            items-center
                            justify-center
                            "
                        >
                            <FaMoneyBillWave
                                className="
                                text-3xl
                                text-purple-600
                                "
                            />
                        </div>

                    </div>

                </motion.div>

            </div>

            {/* Analytics Sections */}

            <div className="grid lg:grid-cols-2 gap-8 mt-10">
                {/* Recent Activity */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    rounded-[32px]
                    p-8
                    shadow-xl
                    border
                    border-white/40
                    "
                >

                    <h2
                        className="
                        text-2xl
                        font-black
                        text-[#2B2118]
                        mb-6
                        "
                    >
                        Recent Activity
                    </h2>

                    <div className="space-y-5">

                        <div
                            className="
                            flex
                            items-center
                            gap-4
                            p-4
                            rounded-2xl
                            bg-[#FFF8EC]
                            "
                        >
                            <div
                                className="
                                w-12
                                h-12
                                rounded-xl
                                bg-green-100
                                flex
                                items-center
                                justify-center
                                "
                            >
                                <FaUsers className="text-green-600" />
                            </div>

                            <div>

                                <h4 className="font-bold">
                                    User Registrations
                                </h4>

                                <p className="text-gray-500 text-sm">
                                    {totalUsers} users are currently registered.
                                </p>

                            </div>

                        </div>

                        <div
                            className="
                            flex
                            items-center
                            gap-4
                            p-4
                            rounded-2xl
                            bg-[#FFF8EC]
                            "
                        >
                            <div
                                className="
                                w-12
                                h-12
                                rounded-xl
                                bg-amber-100
                                flex
                                items-center
                                justify-center
                                "
                            >
                                <FaUserTie className="text-[#B88A44]" />
                            </div>

                            <div>

                                <h4 className="font-bold">
                                    Lawyer Growth
                                </h4>

                                <p className="text-gray-500 text-sm">
                                    {totalLawyers} lawyers joined the platform.
                                </p>

                            </div>

                        </div>

                        <div
                            className="
                            flex
                            items-center
                            gap-4
                            p-4
                            rounded-2xl
                            bg-[#FFF8EC]
                            "
                        >
                            <div
                                className="
                                w-12
                                h-12
                                rounded-xl
                                bg-blue-100
                                flex
                                items-center
                                justify-center
                                "
                            >
                                <FaBalanceScale className="text-blue-600" />
                            </div>

                            <div>

                                <h4 className="font-bold">
                                    Legal Services
                                </h4>

                                <p className="text-gray-500 text-sm">
                                    {totalHires} total legal hiring requests.
                                </p>

                            </div>

                        </div>

                    </div>

                </motion.div>

                {/* Platform Summary */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="
                    bg-gradient-to-br
                    from-[#D4A95A]
                    via-[#C89A48]
                    to-[#B88A44]
                    rounded-[32px]
                    p-8
                    shadow-2xl
                    text-white
                    "
                >

                    <h2
                        className="
                        text-2xl
                        font-black
                        mb-6
                        "
                    >
                        Platform Summary
                    </h2>

                    <div className="space-y-6">

                        <div>

                            <p className="opacity-80">
                                Total Revenue
                            </p>

                            <h3 className="text-4xl font-black">
                                ${totalRevenue}
                            </h3>

                        </div>

                        <div>

                            <p className="opacity-80">
                                Active Lawyers
                            </p>

                            <h3 className="text-3xl font-bold">
                                {totalLawyers}
                            </h3>

                        </div>

                        <div>

                            <p className="opacity-80">
                                Registered Users
                            </p>

                            <h3 className="text-3xl font-bold">
                                {totalUsers}
                            </h3>

                        </div>

                        <div>

                            <p className="opacity-80">
                                Total Hires
                            </p>

                            <h3 className="text-3xl font-bold">
                                {totalHires}
                            </h3>

                        </div>

                    </div>

                </motion.div>

            </div>
        </div>
    );
};

export default AdminAnalyticsPage;