"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import {
    FaUser,
    FaEnvelope,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaStickyNote,
    FaCheckCircle,
} from "react-icons/fa";

const ConsultationDetailsPage = () => {
    const { id } = useParams();

    const [consultation, setConsultation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConsultation = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/consultations/${id}`
                );

                setConsultation(res.data);
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

    const fetchConsultation = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/consultations/${id}`
            );

            setConsultation(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        try {
            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/consultations/complete/${id}`
            );

            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Consultation Completed",
                });

                fetchConsultation();
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!consultation) {
        return (
            <div className="text-center py-24">
                <h2 className="text-3xl font-bold">
                    Consultation Not Found
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F3EE] p-6 md:p-10">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto"
            >

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                    <div className="bg-gradient-to-r from-[#D4A95A] to-[#B88A44] p-8 text-white">
                        <h1 className="text-4xl font-bold">
                            Consultation Details
                        </h1>

                        <p className="mt-2 text-white/90">
                            Review consultation information
                        </p>
                    </div>
                    <div className="p-8">

                        <div className="grid md:grid-cols-2 gap-6">

                            <div className="bg-[#FFF8EC] rounded-2xl p-5">
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-[#B88A44]" />
                                    <h3 className="font-semibold">
                                        Client Name
                                    </h3>
                                </div>

                                <p className="mt-3 text-xl font-bold">
                                    {consultation.clientName}
                                </p>
                            </div>

                            <div className="bg-[#FFF8EC] rounded-2xl p-5">
                                <div className="flex items-center gap-3">
                                    <FaEnvelope className="text-[#B88A44]" />
                                    <h3 className="font-semibold">
                                        Client Email
                                    </h3>
                                </div>

                                <p className="mt-3 text-xl font-bold break-all">
                                    {consultation.clientEmail}
                                </p>
                            </div>

                            <div className="bg-[#FFF8EC] rounded-2xl p-5">
                                <div className="flex items-center gap-3">
                                    <FaCalendarAlt className="text-[#B88A44]" />
                                    <h3 className="font-semibold">
                                        Consultation Date
                                    </h3>
                                </div>

                                <p className="mt-3 text-xl font-bold">
                                    {new Date(
                                        consultation.consultationDate
                                    ).toLocaleString()}
                                </p>
                            </div>

                            <div className="bg-[#FFF8EC] rounded-2xl p-5">
                                <div className="flex items-center gap-3">
                                    <FaMoneyBillWave className="text-[#B88A44]" />
                                    <h3 className="font-semibold">
                                        Fee
                                    </h3>
                                </div>

                                <p className="mt-3 text-xl font-bold">
                                    ${consultation.fee}
                                </p>
                            </div>

                        </div>

                        <div className="bg-[#FFF8EC] rounded-2xl p-6 mt-6">

                            <div className="flex items-center gap-3 mb-3">
                                <FaStickyNote className="text-[#B88A44]" />
                                <h3 className="font-semibold">
                                    Client Notes
                                </h3>
                            </div>

                            <p className="text-gray-700 leading-relaxed">
                                {consultation.notes ||
                                    "No notes provided"}
                            </p>

                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">

                            <span
                                className={`
                  px-5 py-3 rounded-xl font-semibold
                  ${consultation.status === "completed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-blue-100 text-blue-700"
                                    }
                `}
                            >
                                {consultation.status}
                            </span>

                            {consultation.status !==
                                "completed" && (
                                    <button
                                        onClick={handleComplete}
                                        className="
                    flex items-center gap-2
                    px-6 py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-green-500
                    to-green-600
                    text-white
                    font-semibold
                    shadow-lg
                    hover:scale-105
                    transition
                  "
                                    >
                                        <FaCheckCircle />
                                        Mark as Completed
                                    </button>
                                )}

                        </div>

                    </div>

                </div>

            </motion.div>

        </div>
    );
};

export default ConsultationDetailsPage;