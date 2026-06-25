"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    FaUser,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaStickyNote,
} from "react-icons/fa";

const LawyerConsultationsPage = () => {
    const router = useRouter();
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
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/consultations/lawyer/${user.email}`
                        );

                    setConsultations(res.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchConsultations();
    }, [user]);

    // Loading Screen
    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col justify-center items-center">

                <div className="w-16 h-16 border-4 border-[#D4A95A] border-t-transparent rounded-full animate-spin"></div>

                <p className="mt-4 text-[#B88A44] font-medium text-lg">
                    Loading consultations...
                </p>

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
                    duration: 0.5,
                }}
                className="mb-10"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1E]">
                    My Consultations
                </h1>

                <p className="text-[#6B7280] mt-3">
                    Manage and review all client
                    consultation requests.
                </p>
            </motion.div>

            {/* Empty State */}

            {consultations.length === 0 ? (
                <div className="bg-white border border-[#E8DDCF] rounded-3xl p-12 shadow-sm text-center">

                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                        }}
                        className="text-6xl mb-5"
                    >
                        ⚖️
                    </motion.div>

                    <h2 className="text-3xl font-bold text-[#1E1E1E]">
                        No Consultations Yet
                    </h2>

                    <p className="text-[#6B7280] mt-3">
                        No client has booked a
                        consultation yet.
                    </p>

                </div>
            ) : (
                // <div className="grid lg:grid-cols-2 gap-6">
                <div className="grid lg:grid-cols-2 gap-6">
                    {consultations.map(
                        (consultation, index) => (
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
                                    delay: index * 0.1,
                                }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                }}
                                className="
          group
          bg-white
          border
          border-[#E8DDCF]
          rounded-3xl
          overflow-hidden
          shadow-sm
          hover:shadow-2xl
          transition-all
          duration-300
        "
                            >
                                {/* Top Gold Line */}
                                <div className="h-1 bg-gradient-to-r from-[#D4A95A] to-[#B88A44]" />

                                <div className="p-6">

                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-6">

                                        <div className="flex items-center gap-4">

                                            <div
                                                className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-[#D4A95A]
                to-[#B88A44]
                flex
                items-center
                justify-center
                text-white
                shadow-lg
                group-hover:scale-110
                transition-all
                duration-300
              "
                                            >
                                                <FaUser size={20} />
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-xl text-[#1E1E1E]">
                                                    {consultation.clientName}
                                                </h3>

                                                <p className="text-sm text-[#6B7280]">
                                                    Client Consultation
                                                </p>
                                            </div>

                                        </div>

                                        <span
                                            className={`
              px-4
              py-2
              rounded-full
              text-xs
              font-semibold
              ${consultation.status ===
                                                    "Completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : consultation.status ===
                                                        "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-blue-100 text-blue-700"
                                                }
            `}
                                        >
                                            {consultation.status}
                                        </span>

                                    </div>

                                    {/* Info */}
                                    <div className="space-y-4">

                                        <div className="flex items-center gap-3 text-[#6B7280]">

                                            <div className="text-[#B88A44]">
                                                <FaCalendarAlt />
                                            </div>

                                            <span>
                                                {
                                                    consultation.consultationDate
                                                }
                                            </span>

                                        </div>

                                        <div className="flex items-center gap-3 text-[#6B7280]">

                                            <div className="text-[#B88A44]">
                                                <FaMoneyBillWave />
                                            </div>

                                            <span className="font-semibold text-[#1E1E1E]">
                                                $ {consultation.fee}
                                            </span>

                                        </div>

                                        <div className="flex gap-3">

                                            <div className="text-[#B88A44] mt-1">
                                                <FaStickyNote />
                                            </div>

                                            <p className="text-[#6B7280] leading-relaxed">
                                                {consultation.notes ||
                                                    "No additional notes provided."}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Footer */}
                                    <div className="mt-6 pt-5 border-t border-[#E8DDCF]">

                                        <motion.button
                                            whileHover={{
                                                scale: 1.03,
                                            }}
                                            whileTap={{
                                                scale: 0.97,
                                            }}
                                            onClick={() =>
                                                router.push(
                                                    `/dashboard/lawyer/my-consultations/${consultation._id}`
                                                )
                                            }
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
            hover:shadow-lg
            transition-all
            duration-300
        "
                                        >
                                            View Details
                                        </motion.button>

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

export default LawyerConsultationsPage;
