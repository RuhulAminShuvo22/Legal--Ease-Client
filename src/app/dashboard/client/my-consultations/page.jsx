"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import {
    FaUserTie,
    FaCalendarAlt,
    FaClock,
    FaComments,
    FaBalanceScale,
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
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-warning"></span>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8">

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
                <h1 className="text-4xl font-bold text-[#2B2118]">
                    My Consultations
                </h1>

                <p className="text-gray-500 mt-2">
                    Track all your booked legal consultations
                </p>
            </motion.div>

            {/* Stats Card */}

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
                bg-gradient-to-r
                from-[#D4A95A]
                via-[#C89A48]
                to-[#B88A44]
                rounded-3xl
                p-6
                text-white
                shadow-xl
                mb-8
                "
            >
                <div className="flex items-center gap-4">
                    <FaBalanceScale className="text-4xl" />

                    <div>
                        <h2 className="text-3xl font-bold">
                            {consultations.length}
                        </h2>

                        <p className="opacity-90">
                            Total Consultations
                        </p>
                    </div>
                </div>
            </motion.div>
            {consultations.length === 0 ? (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    className="
                    bg-white
                    rounded-3xl
                    shadow-lg
                    p-12
                    text-center
                    "
                >
                    <h2 className="text-2xl font-bold">
                        No Consultations Found
                    </h2>

                    <p className="text-gray-500 mt-3">
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
                                key={
                                    consultation._id
                                }
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
                                        index *
                                        0.1,
                                }}
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
                                transition-all
                                duration-500
                                "
                            >
                                <div className="space-y-5">

                                    <div className="flex items-center gap-4">

                                        <div className="
                                        w-14 h-14
                                        rounded-full
                                        bg-[#FFF4DF]
                                        flex
                                        items-center
                                        justify-center
                                        ">
                                            <FaUserTie className="text-[#B88A44] text-xl" />
                                        </div>

                                        <div>
                                            <h2 className="font-bold text-xl">
                                                {
                                                    consultation.lawyerName
                                                }
                                            </h2>

                                            <p className="text-gray-500">
                                                Lawyer
                                            </p>
                                        </div>
                                    </div>

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
                                            ).toLocaleTimeString()
                                            }
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <FaComments className="text-[#B88A44] mt-1" />

                                        <p className="text-gray-700">
                                            {
                                                consultation.notes
                                            }
                                        </p>
                                    </div>

                                    <div className="pt-2">
                                        <span
                                            className="
                                            badge
                                            badge-lg
                                            bg-green-100
                                            text-green-700
                                            border-green-200
                                            "
                                        >
                                            {consultation.status ||
                                                "Scheduled"}
                                        </span>
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