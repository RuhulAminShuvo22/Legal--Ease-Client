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
                