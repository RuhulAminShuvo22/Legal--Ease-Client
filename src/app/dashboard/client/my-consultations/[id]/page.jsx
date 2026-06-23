"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

import {
    FaUserTie,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaStickyNote,
    FaCheckCircle,
} from "react-icons/fa";

const ConsultationDetailsPage = () => {
    const { id } = useParams();

    const [consultation, setConsultation] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchConsultation =
            async () => {
                try {
                    const res =
                        await axios.get(
                            `http://localhost:5000/consultations/${id}`
                        );

                    setConsultation(
                        res.data
                    );
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        if (id) {
            fetchConsultation();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!consultation) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold">
                    Consultation Not Found
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F3EE] p-6 md:p-10">

            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="
                max-w-5xl
                mx-auto
                bg-white
                rounded-3xl
                shadow-2xl
                overflow-hidden
                "
            >
                <div className="h-2 bg-gradient-to-r from-[#D4A95A] to-[#B88A44]" />

                <div className="p-8">

                    <h1 className="text-4xl font-bold text-[#B88A44] mb-8">
                        Consultation Details
                    </h1>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div className="bg-[#FFF8EC] p-6 rounded-2xl">
                            <h3 className="text-gray-500 mb-2">
                                Lawyer
                            </h3>

                            <div className="flex items-center gap-3">
                                <FaUserTie className="text-[#B88A44]" />

                                <p className="font-bold text-xl">
                                    {consultation.lawyerName}
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#FFF8EC] p-6 rounded-2xl">
                            <h3 className="text-gray-500 mb-2">
                                Lawyer Email
                            </h3>

                            <p className="font-bold">
                                {consultation.lawyerEmail}
                            </p>
                        </div>

                        <div className="bg-[#FFF8EC] p-6 rounded-2xl">
                            <h3 className="text-gray-500 mb-2">
                                Consultation Date
                            </h3>

                            <div className="flex items-center gap-3">
                                <FaCalendarAlt className="text-[#B88A44]" />

                                <p>
                                    {new Date(
                                        consultation.consultationDate
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#FFF8EC] p-6 rounded-2xl">
                            <h3 className="text-gray-500 mb-2">
                                Consultation Fee
                            </h3>

                            <div className="flex items-center gap-3">
                                <FaMoneyBillWave className="text-[#B88A44]" />

                                <p className="font-bold text-xl">
                                    ${consultation.fee}
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#FFF8EC] p-6 rounded-2xl md:col-span-2">
                            <h3 className="text-gray-500 mb-3">
                                Notes
                            </h3>

                            <div className="flex gap-3">
                                <FaStickyNote className="text-[#B88A44] mt-1" />

                                <p>
                                    {consultation.notes ||
                                        "No notes provided"}
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="mt-8">

                        <span
                            className={`
                            px-5
                            py-3
                            rounded-full
                            text-sm
                            font-semibold
                            inline-flex
                            items-center
                            gap-2
                            ${
                                consultation.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                            }
                        `}
                        >
                            <FaCheckCircle />

                            {consultation.status}
                        </span>

                    </div>

                </div>

            </motion.div>

        </div>
    );
};

export default ConsultationDetailsPage;