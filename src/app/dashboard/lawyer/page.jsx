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
                        {/* Recent Activity */}

            <div className="grid xl:grid-cols-2 gap-8 mb-10">

                {/* Recent Consultations */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    rounded-3xl
                    p-8
                    shadow-xl
                    border
                    border-white/50
                    "
                >
                    <div className="flex items-center justify-between mb-6">

                        <h2
                            className="
                            text-2xl
                            font-black
                            text-[#2B2118]
                            "
                        >
                            Recent Consultations
                        </h2>

                        <Link
                            href="/dashboard/lawyer/my-consultations"
                            className="
                            text-[#B88A44]
                            font-semibold
                            hover:underline
                            "
                        >
                            View All
                        </Link>

                    </div>

                    <div className="space-y-4">

                        {consultations
                            .slice(0, 5)
                            .map((consultation) => (

                                <div
                                    key={consultation._id}
                                    className="
                                    flex
                                    items-center
                                    justify-between
                                    p-4
                                    rounded-2xl
                                    bg-[#F8F5F0]
                                    "
                                >
                                    <div>

                                        <h3 className="font-bold text-[#2B2118]">
                                            {consultation.clientName}
                                        </h3>

                                        <p className="text-gray-500 text-sm">
                                            {new Date(
                                                consultation.consultationDate
                                            ).toLocaleDateString()}
                                        </p>

                                    </div>

                                    <span
                                        className={`
                                        px-4
                                        py-2
                                        rounded-full
                                        text-xs
                                        font-semibold
                                        ${
                                            consultation.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : consultation.status === "cancelled"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-blue-100 text-blue-700"
                                        }
                                    `}
                                    >
                                        {consultation.status}
                                    </span>

                                </div>

                            ))}

                        {consultations.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-gray-500">
                                    No consultations found.
                                </p>
                            </div>
                        )}

                    </div>
                </motion.div>

                {/* Recent Reviews */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                    bg-white/80
                    backdrop-blur-xl
                    rounded-3xl
                    p-8
                    shadow-xl
                    border
                    border-white/50
                    "
                >
                    <div className="flex items-center justify-between mb-6">

                        <h2
                            className="
                            text-2xl
                            font-black
                            text-[#2B2118]
                            "
                        >
                            Recent Reviews
                        </h2>

                        <Link
                            href="/dashboard/lawyer/reviews"
                            className="
                            text-[#B88A44]
                            font-semibold
                            hover:underline
                            "
                        >
                            View All
                        </Link>

                    </div>

                    <div className="space-y-5">

                        {reviews
                            .slice(0, 4)
                            .map((review) => (

                                <div
                                    key={review._id}
                                    className="
                                    p-4
                                    rounded-2xl
                                    bg-[#F8F5F0]
                                    "
                                >
                                    <div className="flex justify-between items-center">

                                        <h3 className="font-bold text-[#2B2118]">
                                            {review.clientName}
                                        </h3>

                                        <div className="flex gap-1">

                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={
                                                        i < review.rating
                                                            ? "text-yellow-500"
                                                            : "text-gray-300"
                                                    }
                                                />
                                            ))}

                                        </div>

                                    </div>

                                    <p className="text-gray-600 mt-3 line-clamp-2">
                                        {review.comment}
                                    </p>

                                </div>

                            ))}

                        {reviews.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-gray-500">
                                    No reviews found.
                                </p>
                            </div>
                        )}

                    </div>

                </motion.div>

            </div>