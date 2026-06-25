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
    FaUserTie,
    FaBriefcase,
    FaCalendarCheck,
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
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer-dashboard/${user.email}`
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
        totalClients = 0,
        totalConsultations = 0,
        completedConsultations = 0,
        totalReviews = 0,
        averageRating = 0,
        totalEarnings = 0,
        consultations = [],
        reviews = [],
        hirings = [],
        clientCount = 0,
    } = dashboardData || {};
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
                <h1 className="text-4xl md:text-5xl font-bold text-[#2B2118]">
                    Lawyer Dashboard
                </h1>

                <p className="text-gray-500 mt-3">
                    Welcome back, manage your legal services and clients.
                </p>
            </motion.div>

            {/* Stats Cards */}

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                <motion.div
                    whileHover={{
                        y: -8,
                    }}
                    className="
                    bg-white/70
                    backdrop-blur-xl
                    rounded-3xl
                    p-6
                    shadow-xl
                    border
                    border-white/30
                    "
                >
                    <div className="flex justify-between items-center">

                        <div>
                            <p className="text-gray-500">
                                Clients
                            </p>

                            <h2 className="text-4xl font-bold text-[#2B2118] mt-2">
                                {clientCount}
                            </h2>
                        </div>

                        <FaUsers className="text-5xl text-[#D4A95A]" />

                    </div>
                </motion.div>

                <motion.div
                    whileHover={{
                        y: -8,
                    }}
                    className="
                    bg-white/70
                    backdrop-blur-xl
                    rounded-3xl
                    p-6
                    shadow-xl
                    border
                    border-white/30
                    "
                >
                    <div className="flex justify-between items-center">

                        <div>
                            <p className="text-gray-500">
                                Consultations
                            </p>

                            <h2 className="text-4xl font-bold text-[#2B2118] mt-2">
                                {totalConsultations}
                            </h2>
                        </div>

                        <FaCalendarAlt className="text-5xl text-[#D4A95A]" />

                    </div>
                </motion.div>

                <motion.div
                    whileHover={{
                        y: -8,
                    }}
                    className="
                    bg-white/70
                    backdrop-blur-xl
                    rounded-3xl
                    p-6
                    shadow-xl
                    border
                    border-white/30
                    "
                >
                    <div className="flex justify-between items-center">

                        <div>
                            <p className="text-gray-500">
                                Completed
                            </p>

                            <h2 className="text-4xl font-bold text-[#2B2118] mt-2">
                                {completedConsultations}
                            </h2>
                        </div>

                        <FaCalendarCheck className="text-5xl text-[#D4A95A]" />

                    </div>
                </motion.div>

                <motion.div
                    whileHover={{
                        y: -8,
                    }}
                    className="
                    bg-white/70
                    backdrop-blur-xl
                    rounded-3xl
                    p-6
                    shadow-xl
                    border
                    border-white/30
                    "
                >
                    <div className="flex justify-between items-center">

                        <div>
                            <p className="text-gray-500">
                                Earnings
                            </p>

                            <h2 className="text-4xl font-bold text-[#2B2118] mt-2">
                                ${totalEarnings}
                            </h2>
                        </div>

                        <FaDollarSign className="text-5xl text-[#D4A95A]" />

                    </div>
                </motion.div>

            </div>
            {/* Quick Actions */}

            <div className="grid lg:grid-cols-3 gap-6 mb-10">

                <Link href="/dashboard/lawyer/manage-legal-profile">

                    <motion.div
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                        }}
                        className="
                        bg-gradient-to-r
                        from-[#D4A95A]
                        to-[#B88A44]
                        text-white
                        rounded-3xl
                        p-8
                        shadow-xl
                        cursor-pointer
                        "
                    >
                        <FaBriefcase className="text-4xl mb-4" />

                        <h2 className="text-2xl font-bold">
                            Manage Services
                        </h2>

                        <p className="mt-2 text-white/90">
                            Update your legal profile and services.
                        </p>

                    </motion.div>

                </Link>

                <Link href="/dashboard/lawyer/my-consultations">

                    <motion.div
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                        }}
                        className="
                        bg-white/70
                        backdrop-blur-xl
                        rounded-3xl
                        p-8
                        shadow-xl
                        border
                        border-white/30
                        cursor-pointer
                        "
                    >
                        <FaBalanceScale
                            className="
                            text-4xl
                            text-[#D4A95A]
                            mb-4
                            "
                        />

                        <h2 className="text-2xl font-bold text-[#2B2118]">
                            Consultations
                        </h2>

                        <p className="mt-2 text-gray-500">
                            View all consultation schedules.
                        </p>

                    </motion.div>

                </Link>

                <Link href="/dashboard/lawyer/reviews">

                    <motion.div
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                        }}
                        className="
                        bg-white/70
                        backdrop-blur-xl
                        rounded-3xl
                        p-8
                        shadow-xl
                        border
                        border-white/30
                        cursor-pointer
                        "
                    >
                        <FaStar
                            className="
                            text-4xl
                            text-[#D4A95A]
                            mb-4
                            "
                        />

                        <h2 className="text-2xl font-bold text-[#2B2118]">
                            Reviews
                        </h2>

                        <p className="mt-2 text-gray-500">
                            See client feedback and ratings.
                        </p>

                    </motion.div>

                </Link>

            </div>

            {/* Performance Overview */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                }}
                className="
                bg-white/70
                backdrop-blur-xl
                rounded-3xl
                p-8
                shadow-xl
                border
                border-white/30
                mb-10
                "
            >
                <h2
                    className="
                    text-3xl
                    font-bold
                    text-[#2B2118]
                    mb-8
                    "
                >
                    Performance Overview
                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                    <div
                        className="
                        bg-[#FFF8EC]
                        rounded-2xl
                        p-6
                        text-center
                        "
                    >
                        <FaUserTie
                            className="
                            text-4xl
                            text-[#D4A95A]
                            mx-auto
                            mb-3
                            "
                        />

                        <h3 className="text-3xl font-bold">
                            {totalClients}
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Active Clients
                        </p>

                    </div>

                    <div
                        className="
                        bg-[#FFF8EC]
                        rounded-2xl
                        p-6
                        text-center
                        "
                    >
                        <FaStar
                            className="
                            text-4xl
                            text-[#D4A95A]
                            mx-auto
                            mb-3
                            "
                        />

                        <h3 className="text-3xl font-bold">
                            {averageRating}
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Average Rating
                        </p>

                    </div>

                    <div
                        className="
                        bg-[#FFF8EC]
                        rounded-2xl
                        p-6
                        text-center
                        "
                    >
                        <FaCalendarCheck
                            className="
                            text-4xl
                            text-[#D4A95A]
                            mx-auto
                            mb-3
                            "
                        />

                        <h3 className="text-3xl font-bold">
                            {totalReviews}
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Total Reviews
                        </p>

                    </div>

                </div>

            </motion.div>
            {/* Recent Consultations */}

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
                transition={{
                    duration: 0.5,
                }}
                className="
                bg-white/70
                backdrop-blur-xl
                rounded-3xl
                p-8
                shadow-xl
                border
                border-white/30
                mb-10
                "
            >
                <div className="flex items-center justify-between mb-6">

                    <h2
                        className="
                        text-2xl
                        font-bold
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

                {consultations.length === 0 ? (

                    <div
                        className="
                        py-10
                        text-center
                        text-gray-500
                        "
                    >
                        No consultations found.
                    </div>

                ) : (

                    <div className="space-y-5">

                        {consultations
                            .slice(0, 5)
                            .map((consultation) => (

                                <motion.div
                                    key={consultation._id}
                                    whileHover={{
                                        scale: 1.02,
                                    }}
                                    className="
                                    p-5
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-white
                                    to-[#FFF8EC]
                                    border
                                    border-[#F3E3C7]
                                    "
                                >
                                    <div className="flex justify-between items-center flex-wrap gap-4">

                                        <div>

                                            <h3
                                                className="
                                                text-lg
                                                font-bold
                                                text-[#2B2118]
                                                "
                                            >
                                                {
                                                    consultation.clientName
                                                }
                                            </h3>

                                            <p className="text-gray-500 mt-1">
                                                {
                                                    consultation.clientEmail
                                                }
                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <span
                                                className={`
                                                badge
                                                badge-lg
                                                ${consultation.status ===
                                                        "completed"
                                                        ? "badge-success"
                                                        : consultation.status ===
                                                            "cancelled"
                                                            ? "badge-error"
                                                            : "badge-warning"
                                                    }
                                            `}
                                            >
                                                {
                                                    consultation.status
                                                }
                                            </span>

                                            <p className="text-gray-500 mt-2">

                                                {new Date(
                                                    consultation.consultationDate
                                                ).toLocaleDateString()}

                                            </p>

                                        </div>

                                    </div>
                                </motion.div>

                            ))}

                    </div>

                )}

            </motion.div>
            {/* Recent Reviews */}

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
                transition={{
                    duration: 0.5,
                }}
                className="
                bg-white/70
                backdrop-blur-xl
                rounded-3xl
                p-8
                shadow-xl
                border
                border-white/30
                "
            >
                <div className="flex items-center justify-between mb-6">

                    <h2
                        className="
                        text-2xl
                        font-bold
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

                {reviews.length === 0 ? (

                    <div
                        className="
                        py-10
                        text-center
                        text-gray-500
                        "
                    >
                        No reviews found.
                    </div>

                ) : (

                    <div className="space-y-5">

                        {reviews
                            .slice(0, 5)
                            .map((review) => (

                                <motion.div
                                    key={review._id}
                                    whileHover={{
                                        scale: 1.02,
                                    }}
                                    className="
                                    p-5
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-white
                                    to-[#FFF8EC]
                                    border
                                    border-[#F3E3C7]
                                    "
                                >
                                    <div className="flex justify-between items-start">

                                        <div>

                                            <h3
                                                className="
                                                font-bold
                                                text-lg
                                                text-[#2B2118]
                                                "
                                            >
                                                {
                                                    review.clientName
                                                }
                                            </h3>

                                            <div className="flex mt-2">

                                                {[...Array(5)].map(
                                                    (_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={
                                                                i <
                                                                    review.rating
                                                                    ? "text-yellow-400"
                                                                    : "text-gray-300"
                                                            }
                                                        />
                                                    )
                                                )}

                                            </div>

                                        </div>

                                        <span
                                            className="
                                            text-sm
                                            text-gray-500
                                            "
                                        >
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleDateString()}
                                        </span>

                                    </div>

                                    <p
                                        className="
                                        mt-4
                                        text-gray-600
                                        leading-relaxed
                                        "
                                    >
                                        {review.comment}
                                    </p>

                                </motion.div>

                            ))}

                    </div>

                )}

            </motion.div>

        </div>
    );
};

export default LawyerDashboardPage;