"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import {
    FaUserTie,
    FaCalendarAlt,
    FaClock,
    FaComments,
    FaBalanceScale,
    FaArrowRight,
    FaCheckCircle,
    FaStar,
} from "react-icons/fa";

const MyConsultationsPage = () => {
    const { data: session } =
        authClient.useSession();

    const user = session?.user;

    const [consultations, setConsultations] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchConsultations =
            async () => {
                if (!user?.email) return;

                try {
                    const res =
                        await axios.get(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/consultations/client/${user.email}`
                        );

                    setConsultations(
                        res.data
                    );
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchConsultations();
    }, [user]);

    const completedCount =
        consultations.filter(
            (item) =>
                item.status?.toLowerCase() ===
                "completed"
        ).length;

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col justify-center items-center">
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

                <motion.p
                    animate={{
                        opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                    }}
                    className="mt-5 text-[#B88A44] font-medium text-lg"
                >
                    Loading Consultations...
                </motion.p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F3EE] p-6 md:p-10">
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
          text-4xl
          md:text-5xl
          font-black
          text-[#2B2118]
          "
                >
                    My Consultations
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Track, manage and review your legal consultation bookings.
                </p>
            </motion.div>

            {/* Stats Section */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.9,
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
        "
            >
                <div className="p-8 grid md:grid-cols-2 gap-8 text-white">

                    <div className="flex items-center gap-5">

                        <FaBalanceScale className="text-5xl" />

                        <div>
                            <h2 className="text-4xl font-black">
                                {consultations.length}
                            </h2>

                            <p className="text-lg">
                                Total Consultations
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-5">

                        <FaCheckCircle className="text-5xl" />

                        <div>
                            <h2 className="text-4xl font-black">
                                {completedCount}
                            </h2>

                            <p className="text-lg">
                                Completed Consultations
                            </p>
                        </div>

                    </div>

                </div>
            </motion.div>

            {/* Empty State */}
            {consultations.length === 0 ? (

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    className="
          bg-white
          rounded-[32px]
          p-12
          shadow-xl
          text-center
          border
          border-[#F3E3C7]
          "
                >

                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                        }}
                        className="text-7xl mb-5"
                    >
                        ⚖️
                    </motion.div>

                    <h2 className="text-3xl font-bold text-[#2B2118]">
                        No Consultations Found
                    </h2>

                    <p className="text-gray-500 mt-3 text-lg">
                        You have not booked any consultation yet.
                    </p>

                </motion.div>

            ) : (

                <div className="grid lg:grid-cols-2 gap-8">

                    {consultations.map(
                        (
                            consultation,
                            index
                        ) => (

                            <motion.div
                                key={consultation._id}
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                }}
                                className="
                bg-white
                rounded-[32px]
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                border
                border-[#F3E3C7]
                transition-all
                duration-500
                group
                "
                            >

                                <div
                                    className="
                  h-1.5
                  bg-gradient-to-r
                  from-[#D4A95A]
                  via-[#C89A48]
                  to-[#B88A44]
                  "
                                />

                                <div className="p-7">

                                    {/* Lawyer Info */}

                                    <div className="flex items-center gap-4 mb-6">

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
                      shadow-lg
                      group-hover:rotate-6
                      transition-all
                      duration-300
                      "
                                        >
                                            <FaUserTie size={22} />
                                        </div>

                                        <div>
                                            <h2
                                                className="
                        text-2xl
                        font-bold
                        text-[#2B2118]
                        "
                                            >
                                                {consultation.lawyerName}
                                            </h2>

                                            <p className="text-gray-500">
                                                Legal Consultant
                                            </p>
                                        </div>

                                    </div>
                                    {/* Consultation Info */}

                                    <div className="space-y-5">

                                        <div className="flex items-center gap-3">

                                            <FaCalendarAlt
                                                className="
                        text-[#B88A44]
                        text-lg
                        "
                                            />

                                            <span className="font-medium">
                                                {new Date(
                                                    consultation.consultationDate
                                                ).toLocaleDateString()}
                                            </span>

                                        </div>

                                        <div className="flex items-center gap-3">

                                            <FaClock
                                                className="
                        text-[#B88A44]
                        text-lg
                        "
                                            />

                                            <span className="font-medium">
                                                {new Date(
                                                    consultation.consultationDate
                                                ).toLocaleTimeString()}
                                            </span>

                                        </div>

                                        <div className="flex items-start gap-3">

                                            <FaComments
                                                className="
                        text-[#B88A44]
                        mt-1
                        text-lg
                        "
                                            />

                                            <p className="text-gray-700 leading-relaxed">
                                                {consultation.notes ||
                                                    "No notes provided"}
                                            </p>

                                        </div>

                                        {/* Status */}

                                        <div>

                                            <span
                                                className={`
                        badge
                        badge-lg
                        font-semibold
                        px-5
                        py-4
                        ${consultation.status?.toLowerCase() ===
                                                        "completed"
                                                        ? "bg-green-100 text-green-700 border-green-200"
                                                        : consultation.status?.toLowerCase() ===
                                                            "cancelled"
                                                            ? "bg-red-100 text-red-700 border-red-200"
                                                            : consultation.status?.toLowerCase() ===
                                                                "scheduled"
                                                                ? "bg-blue-100 text-blue-700 border-blue-200"
                                                                : "bg-yellow-100 text-yellow-700 border-yellow-200"
                                                    }
                      `}
                                            >
                                                {consultation.status}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Buttons */}

                                    <div className="mt-6 pt-5 border-t border-[#F3E3C7] flex flex-col gap-3">
                                        <Link
                                            href={`/dashboard/client/my-consultations/${consultation._id}`}
                                            className="block"
                                        >
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="
                w-full
                py-3
                rounded-xl
                bg-gradient-to-r
                from-[#D4A95A]
                to-[#B88A44]
                text-white
                font-semibold
                shadow-md
                hover:shadow-xl
                flex
                justify-center
                items-center
                gap-2
            "
                                            >
                                                View Details
                                                <FaArrowRight />
                                            </motion.button>
                                        </Link>

                                        {consultation.status?.toLowerCase() === "completed" && (
                                            <Link
                                                href={`/dashboard/client/comments/${consultation._id}`}
                                                className="block"
                                            >
                                                <motion.button
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="
                    w-full
                    py-3
                    rounded-xl
                    border-2
                    border-[#B88A44]
                    text-[#B88A44]
                    font-semibold
                    hover:bg-[#B88A44]
                    hover:text-white
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                    gap-2
                "
                                                >
                                                    <FaStar />
                                                    Write Review
                                                </motion.button>
                                            </Link>
                                        )}
                                    </div>

                                </div>

                            </motion.div>
                        )
                    )}

                </div>

            )}

        </div>
    );
};

export default MyConsultationsPage;