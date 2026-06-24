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