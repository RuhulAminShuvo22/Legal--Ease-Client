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
                            `http://localhost:5000/consultations/client/${user.email}`
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

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col justify-center items-center">

                <div className="w-16 h-16 border-4 border-[#D4A95A] border-t-transparent rounded-full animate-spin"></div>

                <p className="mt-4 text-[#B88A44] font-medium">
                    Loading Consultations...
                </p>

            </div>
        );
    }
    return (
        <div className="min-h-screen bg-[#F7F3EE] p-6 md:p-10">

            <motion.div
                initial={{
                    opacity: 0,
                    y: -20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="mb-10"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-[#2B2118]">
                    My Consultations
                </h1>

                <p className="text-gray-500 mt-3">
                    Track and manage all your legal consultation bookings.
                </p>
            </motion.div>

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.95,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                className="
                mb-10
                bg-gradient-to-r
                from-[#D4A95A]
                via-[#C89A48]
                to-[#B88A44]
                rounded-3xl
                p-8
                text-white
                shadow-2xl
                "
            >
                <div className="flex items-center gap-5">

                    <FaBalanceScale className="text-5xl" />

                    <div>
                        <h2 className="text-4xl font-bold">
                            {consultations.length}
                        </h2>

                        <p className="text-lg opacity-90">
                            Total Consultations
                        </p>
                    </div>

                </div>
            </motion.div>

            {consultations.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 shadow-lg text-center">

                    <h2 className="text-3xl font-bold">
                        No Consultations Found
                    </h2>

                    <p className="text-gray-500 mt-3">
                        You have not booked any consultation yet.
                    </p>

                </div>
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
                                    y: 40,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay:
                                        index * 0.1,
                                }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                }}
                                className="
                                bg-white
                                rounded-3xl
                                overflow-hidden
                                shadow-lg
                                hover:shadow-2xl
                                border
                                border-[#F3E3C7]
                                transition-all
                                duration-500
                                "
                            >
                                <div className="h-1 bg-gradient-to-r from-[#D4A95A] to-[#B88A44]" />

                                <div className="p-7">

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
                                            "
                                        >
                                            <FaUserTie size={22} />
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-bold text-[#2B2118]">
                                                {
                                                    consultation.lawyerName
                                                }
                                            </h2>

                                            <p className="text-gray-500">
                                                Lawyer
                                            </p>
                                        </div>

                                    </div>

                                    <div className="space-y-4">

                                        <div className="flex items-center gap-3">
                                            <FaCalendarAlt className="text-[#B88A44]" />

                                            <span>
                                                {new Date(
                                                    consultation.consultationDate
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <FaClock className="text-[#B88A44]" />

                                            <span>
                                                {new Date(
                                                    consultation.consultationDate
                                                ).toLocaleTimeString()}
                                            </span>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <FaComments className="text-[#B88A44] mt-1" />

                                            <p className="text-gray-700 leading-relaxed">
                                                {consultation.notes ||
                                                    "No notes provided"}
                                            </p>
                                        </div>

                                        <div>
                                            <span
                                                className={`
                                                badge
                                                badge-lg
                                                font-semibold
                                                ${consultation.status?.toLowerCase() ===
                                                        "completed"
                                                        ? "bg-green-100 text-green-700 border-green-200"
                                                        : consultation.status?.toLowerCase() ===
                                                            "cancelled"
                                                            ? "bg-red-100 text-red-700 border-red-200"
                                                            : "bg-blue-100 text-blue-700 border-blue-200"
                                                    }
                                            `}
                                            >
                                                {consultation.status}
                                            </span>
                                        </div>

                                    </div>

                                    <div className="mt-6 pt-5 border-t border-[#F3E3C7]">

                                        <Link
                                            href={`/dashboard/client/my-consultations/${consultation._id}`}
                                        >
                                            <motion.button
                                                whileHover={{
                                                    scale: 1.03,
                                                }}
                                                whileTap={{
                                                    scale: 0.97,
                                                }}
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