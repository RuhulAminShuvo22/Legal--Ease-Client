"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import {
    FaUsers,
    FaBalanceScale,
    FaCalendarAlt,
    FaDollarSign,
    FaStar,
    FaArrowRight,
    FaUserTie,
} from "react-icons/fa";

const LawyerDashboardPage = () => {
    const { data: session } =
        authClient.useSession();

    const user = session?.user;

    const [loading, setLoading] =
        useState(true);

    const [dashboardData, setDashboardData] =
        useState(null);

    useEffect(() => {
        const fetchDashboard =
            async () => {
                if (!user?.email) return;

                try {
                    const res =
                        await axios.get(
                            `http://localhost:5000/lawyer-dashboard/${user.email}`
                        );

                    setDashboardData(
                        res.data
                    );
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchDashboard();
    }, [user]);

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
        totalClients,
        totalConsultations,
        completedConsultations,
        totalReviews,
        averageRating,
        totalEarnings,
        recentReviews,
        upcomingConsultations,
    } = dashboardData;

    return (
        <div className="min-h-screen bg-[#F7F3EE] p-6 md:p-10">

            {/* Header */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: -20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="mb-10"
            >
                <h1 className="text-5xl font-black text-[#2B2118]">

                    Welcome Back 👋

                </h1>

                <p className="text-gray-500 mt-3 text-lg">

                    Manage your clients, consultations,
                    reviews and earnings.

                </p>
            </motion.div>
            {/* Stats Cards */}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

                {/* Total Clients */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                        y: -8,
                        scale: 1.02,
                    }}
                    className="
          bg-white/70
          backdrop-blur-xl
          rounded-3xl
          p-6
          border
          border-white
          shadow-xl
          "
                >
                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">
                                Total Clients
                            </p>

                            <h2 className="text-4xl font-black text-[#2B2118] mt-2">
                                {totalClients}
                            </h2>

                        </div>

                        <div
                            className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-r
              from-[#D4A95A]
              to-[#B88A44]
              flex
              items-center
              justify-center
              text-white
              "
                        >
                            <FaUsers size={26} />
                        </div>

                    </div>
                </motion.div>

                {/* Total Consultations */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                        y: -8,
                        scale: 1.02,
                    }}
                    className="
          bg-white/70
          backdrop-blur-xl
          rounded-3xl
          p-6
          border
          border-white
          shadow-xl
          "
                >
                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">
                                Consultations
                            </p>

                            <h2 className="text-4xl font-black text-[#2B2118] mt-2">
                                {totalConsultations}
                            </h2>

                        </div>

                        <div
                            className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-r
              from-[#D4A95A]
              to-[#B88A44]
              flex
              items-center
              justify-center
              text-white
              "
                        >
                            <FaBalanceScale size={26} />
                        </div>

                    </div>
                </motion.div>

                {/* Completed Cases */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                        y: -8,
                        scale: 1.02,
                    }}
                    className="
          bg-white/70
          backdrop-blur-xl
          rounded-3xl
          p-6
          border
          border-white
          shadow-xl
          "
                >
                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">
                                Completed Cases
                            </p>

                            <h2 className="text-4xl font-black text-[#2B2118] mt-2">
                                {completedConsultations}
                            </h2>

                        </div>

                        <div
                            className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-r
              from-green-500
              to-green-600
              flex
              items-center
              justify-center
              text-white
              "
                        >
                            <FaCalendarAlt size={26} />
                        </div>

                    </div>
                </motion.div>

            </div>
            {/* Quick Stats */}

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                <motion.div
                    whileHover={{ y: -5 }}
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    rounded-3xl
                    p-6
                    shadow-xl
                    border
                    border-white/50
                    "
                >
                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">
                                Hiring Requests
                            </p>

                            <h2 className="text-4xl font-black text-[#2B2118] mt-2">
                                {hirings.length}
                            </h2>

                        </div>

                        <div
                            className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-[#D4A95A]/20
                            flex
                            items-center
                            justify-center
                            "
                        >
                            <FaBriefcase className="text-2xl text-[#B88A44]" />
                        </div>

                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    rounded-3xl
                    p-6
                    shadow-xl
                    border
                    border-white/50
                    "
                >
                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">
                                Consultations
                            </p>

                            <h2 className="text-4xl font-black text-[#2B2118] mt-2">
                                {consultations.length}
                            </h2>

                        </div>

                        <div
                            className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            "
                        >
                            <FaCalendarCheck className="text-2xl text-blue-600" />
                        </div>

                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    rounded-3xl
                    p-6
                    shadow-xl
                    border
                    border-white/50
                    "
                >
                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">
                                Reviews
                            </p>

                            <h2 className="text-4xl font-black text-[#2B2118] mt-2">
                                {reviews.length}
                            </h2>

                        </div>

                        <div
                            className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-yellow-100
                            flex
                            items-center
                            justify-center
                            "
                        >
                            <FaStar className="text-2xl text-yellow-500" />
                        </div>

                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    rounded-3xl
                    p-6
                    shadow-xl
                    border
                    border-white/50
                    "
                >
                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">
                                Clients
                            </p>

                            <h2 className="text-4xl font-black text-[#2B2118] mt-2">
                                {clientCount}
                            </h2>

                        </div>

                        <div
                            className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-green-100
                            flex
                            items-center
                            justify-center
                            "
                        >
                            <FaUsers className="text-2xl text-green-600" />
                        </div>

                    </div>
                </motion.div>

            </div>

            {/* Earnings + Rating */}

            <div className="grid lg:grid-cols-2 gap-8 mb-10">

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="
                    bg-gradient-to-r
                    from-green-500
                    to-emerald-600
                    rounded-3xl
                    p-8
                    text-white
                    shadow-2xl
                    "
                >
                    <p className="text-white/80">
                        Total Earnings
                    </p>

                    <h2 className="text-5xl font-black mt-3">
                        ${totalEarnings}
                    </h2>

                    <p className="mt-3 text-white/80">
                        From accepted & paid clients
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="
                    bg-gradient-to-r
                    from-[#D4A95A]
                    to-[#B88A44]
                    rounded-3xl
                    p-8
                    text-white
                    shadow-2xl
                    "
                >
                    <p className="text-white/80">
                        Average Rating
                    </p>

                    <h2 className="text-5xl font-black mt-3">
                        {averageRating}
                    </h2>

                    <div className="flex gap-1 mt-4">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={
                                    i < Math.round(averageRating)
                                        ? "text-yellow-300"
                                        : "text-white/30"
                                }
                            />
                        ))}
                    </div>
                </motion.div>

            </div>