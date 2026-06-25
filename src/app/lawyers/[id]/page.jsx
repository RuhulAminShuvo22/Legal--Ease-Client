"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";

import {
    FaGavel,
    FaCalendarCheck,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaStar,
    FaBriefcase,
} from "react-icons/fa";

const LawyerDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const { data: session } =
        authClient.useSession();

    const user = session?.user;

    const [lawyer, setLawyer] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchLawyer = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/${id}`
                );

                const data =
                    await res.json();

                setLawyer(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLawyer();
        }
    }, [id]);
    const handleHireLawyer =
        async () => {
            if (!user) {
                Swal.fire({
                    icon: "warning",
                    title: "Please Login First",
                });

                return;
            }

            const result =
                await Swal.fire({
                    title: "Hire This Lawyer?",
                    text: `You are about to send a hiring request to ${lawyer.name}`,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#B88A44",
                    confirmButtonText:
                        "Yes, Hire",
                });

            if (!result.isConfirmed)
                return;

            const hiringData = {
                lawyerId: lawyer._id,
                lawyerName: lawyer.name,
                lawyerEmail: lawyer.email,

                clientName: user.name,
                clientEmail: user.email,

                fee: lawyer.fee,

                status: "pending",
                paymentStatus: "unpaid",

                createdAt: new Date(),
            };

            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings`,
                    hiringData
                );

                Swal.fire({
                    icon: "success",
                    title:
                        "Hiring Request Sent",
                    text:
                        "Please wait for lawyer approval",
                    timer: 2000,
                    showConfirmButton: false,
                });

                router.push(
                    "/dashboard/client/hiring-history"
                );
            } catch (error) {
                console.log(error);

                Swal.fire({
                    icon: "error",
                    title:
                        "Failed to Send Request",
                });
            }
        };

    const handleBookConsultation =
        async () => {
            if (!user) {
                Swal.fire({
                    icon: "warning",
                    title: "Please Login First",
                });

                return;
            }

            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/client/${user.email}`
                );

                const hirings = res.data;

                console.log(
                    "All Hirings:",
                    hirings
                );

                const approvedHiring =
                    hirings.find(
                        (item) =>
                            String(item.lawyerId) ===
                            String(lawyer._id) &&
                            item.status ===
                            "accepted" &&
                            item.paymentStatus ===
                            "paid"
                    );

                console.log(
                    "Approved Hiring:",
                    approvedHiring
                );

                if (!approvedHiring) {
                    return Swal.fire({
                        icon: "warning",
                        title:
                            "Hire & Pay First",
                        text:
                            "You must hire this lawyer and complete payment before booking a consultation.",
                    });
                }

                router.push(
                    `/consultation/${approvedHiring._id}`
                );
            } catch (error) {
                console.log(error);

                Swal.fire({
                    icon: "error",
                    title:
                        "Something went wrong",
                });
            }
        };
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-warning"></span>
            </div>
        );
    }

    if (!lawyer) {
        return (
            <div className="text-center py-24">
                <h2 className="text-3xl font-bold">
                    Lawyer Not Found
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FCF8F3] via-white to-[#FFF7E8] py-16 px-4">

            <motion.div
                initial={{
                    opacity: 0,
                    y: 60,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.7,
                }}
                className="max-w-6xl mx-auto"
            >
                <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl">

                    <div className="h-56 bg-gradient-to-r from-[#D4A95A] via-[#C89A48] to-[#B88A44]" />

                    <div className="px-8 md:px-12 pb-12">

                        <div className="flex flex-col md:flex-row md:items-end gap-6">

                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src={lawyer.photo}
                                alt={lawyer.name}
                                className="w-44 h-44 rounded-full border-8 border-white object-cover -mt-24 shadow-xl"
                            />

                            <div className="flex-1">

                                <div className="flex flex-wrap items-center gap-3">

                                    <h1 className="text-4xl font-bold">
                                        {lawyer.name}
                                    </h1>

                                    <span
                                        className={`badge badge-lg ${lawyer.status === "Available"
                                                ? "badge-success"
                                                : "badge-error"
                                            }`}
                                    >
                                        {lawyer.status}
                                    </span>

                                </div>

                                <p className="text-[#B88A44] font-semibold text-lg mt-2">
                                    {lawyer.specialization}
                                </p>

                                <div className="flex flex-wrap gap-6 mt-4 text-gray-600">

                                    <div className="flex items-center gap-2">
                                        <FaMapMarkerAlt />
                                        {lawyer.location}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaStar className="text-yellow-500" />
                                        {lawyer.rating}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaBriefcase />
                                        {lawyer.experience} Years Experience
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="grid md:grid-cols-3 gap-5 mt-10">

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-[#FFF8EC] rounded-2xl p-6 text-center shadow"
                            >
                                <h3 className="text-sm text-gray-500">
                                    Consultation Fee
                                </h3>

                                <p className="text-3xl font-bold text-[#B88A44] mt-2">
                                    ${lawyer.fee}
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-[#FFF8EC] rounded-2xl p-6 text-center shadow"
                            >
                                <h3 className="text-sm text-gray-500">
                                    Experience
                                </h3>

                                <p className="text-3xl font-bold text-[#B88A44] mt-2">
                                    {lawyer.experience}+
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-[#FFF8EC] rounded-2xl p-6 text-center shadow"
                            >
                                <h3 className="text-sm text-gray-500">
                                    Rating
                                </h3>

                                <p className="text-3xl font-bold text-[#B88A44] mt-2">
                                    ⭐ {lawyer.rating}
                                </p>
                            </motion.div>

                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mt-10">

                            <div className="bg-gray-50 p-6 rounded-2xl">

                                <h3 className="font-bold text-xl mb-4">
                                    Contact Information
                                </h3>

                                <div className="space-y-3">

                                    <p className="flex items-center gap-3">
                                        <FaEnvelope />
                                        {lawyer.email}
                                    </p>

                                    <p className="flex items-center gap-3">
                                        <FaPhoneAlt />
                                        {lawyer.phone}
                                    </p>

                                    <p className="flex items-center gap-3">
                                        <FaMapMarkerAlt />
                                        {lawyer.location}
                                    </p>

                                </div>

                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">

                                <h3 className="font-bold text-xl mb-4">
                                    Professional Summary
                                </h3>

                                <p className="text-gray-600 leading-8">
                                    {lawyer.about}
                                </p>

                            </div>

                        </div>

                        <div className="flex flex-wrap gap-5 mt-10">

                            <button
                                onClick={handleHireLawyer}
                                className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4A95A] via-[#C89A48] to-[#B88A44] text-white font-bold tracking-wide shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <FaGavel />
                                    Hire Lawyer
                                </span>
                            </button>

                            <button
                                onClick={handleBookConsultation}
                                className="group px-8 py-4 rounded-2xl border-2 border-[#D4A95A] text-[#B88A44] font-bold tracking-wide bg-white transition-all duration-500 hover:bg-gradient-to-r hover:from-[#D4A95A] hover:to-[#B88A44] hover:text-white hover:border-transparent hover:-translate-y-1 hover:shadow-xl"
                            >
                                <span className="flex items-center gap-3">
                                    <FaCalendarCheck />
                                    Book Consultation
                                </span>
                            </button>

                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LawyerDetailsPage;