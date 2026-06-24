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