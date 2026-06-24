"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";

import {
    FaUsers,
    FaUserTie,
    FaBalanceScale,
    FaMoneyBillWave,
    FaArrowRight,
    FaChartLine,
} from "react-icons/fa";

const AdminDashboardPage = () => {

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

            {/* Hero Section */}

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
                className="
                rounded-[36px]
                overflow-hidden
                bg-gradient-to-r
                from-[#D4A95A]
                via-[#C89A48]
                to-[#B88A44]
                shadow-2xl
                mb-10
                "
            >

                <div className="p-8 md:p-12">

                    <h1
                        className="
                        text-4xl
                        md:text-6xl
                        font-black
                        text-white
                        "
                    >
                        Admin Dashboard
                    </h1>

                    <p
                        className="
                        text-white/90
                        mt-4
                        text-lg
                        md:text-xl
                        "
                    >
                        Manage users, transactions,
                        analytics and platform growth.
                    </p>

                </div>

            </motion.div>

            {/* Stats Grid */}

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

                    <div className="flex justify-between items-center">

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

                    <div className="flex justify-between items-center">

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

                    <div className="flex justify-between items-center">

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

                {/* Revenue */}

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

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">
                                Revenue
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

            {/* Quick Actions */}

            <div className="grid lg:grid-cols-3 gap-8 mt-10">
                