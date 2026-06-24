"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

import {
    FaBalanceScale,
    FaCalendarCheck,
    FaClipboardList,
    FaStar,
    FaCheckCircle,
    FaArrowRight,
    FaGavel,
    FaCommentDots,
} from "react-icons/fa";

const ClientDashboardPage = () => {
    const { data: session } =
        authClient.useSession();

    const user = session?.user;

    const [hirings, setHirings] =
        useState([]);

    const [consultations, setConsultations] =
        useState([]);

    const [reviews, setReviews] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchDashboardData =
            async () => {
                if (!user?.email) return;

                try {
                    const [
                        hiringsRes,
                        consultationsRes,
                        reviewsRes,
                    ] = await Promise.all([
                        axios.get(
                            `http://localhost:5000/hirings/client/${user.email}`
                        ),
                        axios.get(
                            `http://localhost:5000/consultations/client/${user.email}`
                        ),
                        axios.get(
                            `http://localhost:5000/reviews/client/${user.email}`
                        ),
                    ]);

                    setHirings(
                        hiringsRes.data
                    );

                    setConsultations(
                        consultationsRes.data
                    );

                    setReviews(
                        reviewsRes.data
                    );
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchDashboardData();
    }, [user]);

    const acceptedRequests =
        hirings.filter(
            (item) =>
                item.status ===
                "accepted"
        ).length;

    const completedConsultations =
        consultations.filter(
            (item) =>
                item.status?.toLowerCase() ===
                "completed"
        ).length;

    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce(
                    (sum, review) =>
                        sum +
                        Number(
                            review.rating
                        ),
                    0
                ) /
                reviews.length
            ).toFixed(1)
            : 0;
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#F7F3EE]">
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="
                    w-20
                    h-20
                    border-4
                    border-[#D4A95A]
                    border-t-transparent
                    rounded-full
                    "
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F3EE] p-6 md:p-10">

            {/* HERO */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: -20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="
                rounded-[35px]
                overflow-hidden
                p-8
                md:p-10
                mb-10
                bg-gradient-to-r
                from-[#D4A95A]
                via-[#C89A48]
                to-[#B88A44]
                text-white
                shadow-2xl
                "
            >
                <h1 className="text-4xl md:text-6xl font-black">
                    Welcome,
                    {" "}
                    {user?.name}
                </h1>

                <p className="mt-4 text-lg opacity-90">
                    Manage your legal services,
                    consultations and reviews.
                </p>
            </motion.div>

            {/* STATS */}

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

                {/* Total Hirings */}

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
                    <FaClipboardList
                        className="
                        text-4xl
                        text-[#B88A44]
                        mb-4
                        "
                    />

                    <h2 className="text-4xl font-black text-[#2B2118]">
                        {hirings.length}
                    </h2>

                    <p className="text-gray-500">
                        Hiring Requests
                    </p>
                </motion.div>

                {/* Accepted */}

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
                    <FaCheckCircle
                        className="
                        text-4xl
                        text-green-500
                        mb-4
                        "
                    />

                    <h2 className="text-4xl font-black text-[#2B2118]">
                        {acceptedRequests}
                    </h2>

                    <p className="text-gray-500">
                        Accepted Requests
                    </p>
                </motion.div>

                {/* Consultations */}

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
                    <FaCalendarCheck
                        className="
                        text-4xl
                        text-blue-500
                        mb-4
                        "
                    />

                    <h2 className="text-4xl font-black text-[#2B2118]">
                        {consultations.length}
                    </h2>

                    <p className="text-gray-500">
                        Consultations
                    </p>
                </motion.div>

                {/* Reviews */}

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
                    <FaStar
                        className="
                        text-4xl
                        text-yellow-500
                        mb-4
                        "
                    />

                    <h2 className="text-4xl font-black text-[#2B2118]">
                        {averageRating}
                    </h2>

                    <p className="text-gray-500">
                        Avg Rating
                    </p>
                </motion.div>

            </div>
            {/* QUICK ACTIONS */}

            <div className="grid lg:grid-cols-3 gap-6 mb-10">

                <Link
                    href="/dashboard/client/hiring-history"
                >
                    <motion.div
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                        }}
                        className="
                        bg-white
                        rounded-3xl
                        p-7
                        shadow-lg
                        hover:shadow-2xl
                        border
                        border-[#F3E3C7]
                        cursor-pointer
                        "
                    >
                        <FaGavel
                            className="
                            text-5xl
                            text-[#B88A44]
                            mb-5
                            "
                        />

                        <h3 className="text-2xl font-bold text-[#2B2118]">
                            Hiring History
                        </h3>

                        <p className="text-gray-500 mt-2">
                            View all lawyer hiring requests.
                        </p>

                        <div className="mt-5 flex items-center gap-2 text-[#B88A44] font-semibold">
                            Open
                            <FaArrowRight />
                        </div>
                    </motion.div>
                </Link>

                <Link
                    href="/dashboard/client/my-consultations"
                >
                    <motion.div
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                        }}
                        className="
                        bg-white
                        rounded-3xl
                        p-7
                        shadow-lg
                        hover:shadow-2xl
                        border
                        border-[#F3E3C7]
                        cursor-pointer
                        "
                    >
                        <FaCalendarCheck
                            className="
                            text-5xl
                            text-blue-500
                            mb-5
                            "
                        />

                        <h3 className="text-2xl font-bold text-[#2B2118]">
                            Consultations
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Manage your booked consultations.
                        </p>

                        <div className="mt-5 flex items-center gap-2 text-[#B88A44] font-semibold">
                            Open
                            <FaArrowRight />
                        </div>
                    </motion.div>
                </Link>

                <Link
                    href="/dashboard/client/comments"
                >
                    <motion.div
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                        }}
                        className="
                        bg-white
                        rounded-3xl
                        p-7
                        shadow-lg
                        hover:shadow-2xl
                        border
                        border-[#F3E3C7]
                        cursor-pointer
                        "
                    >
                        <FaCommentDots
                            className="
                            text-5xl
                            text-yellow-500
                            mb-5
                            "
                        />

                        <h3 className="text-2xl font-bold text-[#2B2118]">
                            My Reviews
                        </h3>

                        <p className="text-gray-500 mt-2">
                            View and manage your reviews.
                        </p>

                        <div className="mt-5 flex items-center gap-2 text-[#B88A44] font-semibold">
                            Open
                            <FaArrowRight />
                        </div>
                    </motion.div>
                </Link>

            </div>

            {/* RECENT OVERVIEW */}

            <div className="grid lg:grid-cols-2 gap-8 mb-10">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="
                    bg-white
                    rounded-3xl
                    p-7
                    shadow-xl
                    border
                    border-[#F3E3C7]
                    "
                >
                    <h2 className="text-2xl font-bold text-[#2B2118] mb-6">
                        Recent Consultations
                    </h2>

                    <div className="space-y-4">
                        {consultations
                            .slice(0, 3)
                            .map(
                                (
                                    item
                                ) => (
                                    <div
                                        key={
                                            item._id
                                        }
                                        className="
                                        flex
                                        justify-between
                                        items-center
                                        p-4
                                        rounded-2xl
                                        bg-[#FAF7F1]
                                        "
                                    >
                                        <div>
                                            <h4 className="font-semibold">
                                                {
                                                    item.lawyerName
                                                }
                                            </h4>

                                            <p className="text-sm text-gray-500">
                                                {
                                                    item.status
                                                }
                                            </p>
                                        </div>

                                        <FaArrowRight />
                                    </div>
                                )
                            )}
                    </div>
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="
                    bg-white
                    rounded-3xl
                    p-7
                    shadow-xl
                    border
                    border-[#F3E3C7]
                    "
                >
                    <h2 className="text-2xl font-bold text-[#2B2118] mb-6">
                        Recent Reviews
                    </h2>

                    <div className="space-y-4">
                        {reviews
                            .slice(0, 3)
                            .map(
                                (
                                    review
                                ) => (
                                    <div
                                        key={
                                            review._id
                                        }
                                        className="
                                        p-4
                                        rounded-2xl
                                        bg-[#FAF7F1]
                                        "
                                    >
                                        <div className="flex justify-between items-center">

                                            <h4 className="font-semibold">
                                                {
                                                    review.lawyerName
                                                }
                                            </h4>

                                            <div className="flex gap-1">
                                                {[...Array(
                                                    Number(
                                                        review.rating
                                                    )
                                                )].map(
                                                    (
                                                        _,
                                                        i
                                                    ) => (
                                                        <FaStar
                                                            key={
                                                                i
                                                            }
                                                            className="text-yellow-500"
                                                        />
                                                    )
                                                )}
                                            </div>

                                        </div>

                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                            {
                                                review.comment
                                            }
                                        </p>
                                    </div>
                                )
                            )}

                        {reviews.length ===
                            0 && (
                                <div
                                    className="
                                text-center
                                py-10
                                text-gray-500
                                "
                                >
                                    No reviews found
                                </div>
                            )}
                    </div>
                </motion.div>

            </div>

            {/* CLIENT ACTIVITY */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="
                bg-white
                rounded-[35px]
                p-8
                shadow-xl
                border
                border-[#F3E3C7]
                mb-10
                "
            >
                <div className="flex items-center justify-between mb-8">

                    <div>
                        <h2 className="text-3xl font-black text-[#2B2118]">
                            Activity Summary
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Overview of your legal journey
                        </p>
                    </div>

                    <FaBalanceScale
                        className="
                        text-5xl
                        text-[#D4A95A]
                        "
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-6">

                    <div
                        className="
                        bg-[#FAF7F1]
                        rounded-3xl
                        p-6
                        text-center
                        "
                    >
                        <h3 className="text-5xl font-black text-[#B88A44]">
                            {hirings.length}
                        </h3>

                        <p className="mt-3 text-gray-600">
                            Lawyers Contacted
                        </p>
                    </div>

                    <div
                        className="
                        bg-[#FAF7F1]
                        rounded-3xl
                        p-6
                        text-center
                        "
                    >
                        <h3 className="text-5xl font-black text-green-600">
                            {completedConsultations}
                        </h3>

                        <p className="mt-3 text-gray-600">
                            Cases Completed
                        </p>
                    </div>

                    <div
                        className="
                        bg-[#FAF7F1]
                        rounded-3xl
                        p-6
                        text-center
                        "
                    >
                        <h3 className="text-5xl font-black text-yellow-500">
                            {reviews.length}
                        </h3>

                        <p className="mt-3 text-gray-600">
                            Reviews Submitted
                        </p>
                    </div>

                </div>

            </motion.div>
            {/* QUICK ACTIONS */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.7,
                }}
                className="
                bg-gradient-to-r
                from-[#D4A95A]
                via-[#C89A48]
                to-[#B88A44]
                rounded-[35px]
                p-10
                shadow-2xl
                text-white
                overflow-hidden
                relative
                "
            >
                <div className="relative z-10">

                    <h2 className="text-4xl font-black mb-3">
                        Need Legal Help?
                    </h2>

                    <p className="text-white/90 text-lg mb-8">
                        Explore lawyers, schedule consultations,
                        and manage your legal services effortlessly.
                    </p>

                    <div className="flex flex-wrap gap-4">

                        <Link href="/lawyers">
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                className="
                                px-8
                                py-4
                                rounded-2xl
                                bg-white
                                text-[#B88A44]
                                font-bold
                                shadow-lg
                                "
                            >
                                Find Lawyers
                            </motion.button>
                        </Link>

                        <Link href="/dashboard/client/my-consultations">
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                className="
                                px-8
                                py-4
                                rounded-2xl
                                border-2
                                border-white
                                text-white
                                font-bold
                                "
                            >
                                My Consultations
                            </motion.button>
                        </Link>

                    </div>

                </div>

                <div
                    className="
                    absolute
                    -right-10
                    -bottom-10
                    w-52
                    h-52
                    rounded-full
                    bg-white/10
                    "
                />

                <div
                    className="
                    absolute
                    right-20
                    top-10
                    w-24
                    h-24
                    rounded-full
                    bg-white/10
                    "
                />
            </motion.div>

        </div>
    );
};

export default ClientDashboardPage;//