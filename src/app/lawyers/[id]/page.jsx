"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaStar,
    FaBriefcase,
} from "react-icons/fa";

const LawyerDetailsPage = () => {
    const { id } = useParams();

    const [lawyer, setLawyer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLawyer = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/lawyers/${id}`
                );

                const data = await res.json();

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
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-6xl mx-auto"
            >

                <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl">

                    {/* Cover */}
                    <div className="h-56 bg-gradient-to-r from-[#D4A95A] via-[#C89A48] to-[#B88A44]" />

                    <div className="px-8 md:px-12 pb-12">

                        {/* Image */}
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
                                        className={`badge badge-lg ${
                                            lawyer.status === "Available"
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

                        {/* Stats */}
                        <div className="grid md:grid-cols-3 gap-5 mt-10">

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-[#FFF8EC] rounded-2xl p-6 text-center shadow"
                            >
                                <h3 className="text-sm text-gray-500">
                                    Consultation Fee
                                </h3>

                                <p className="text-3xl font-bold text-[#B88A44] mt-2">
                                    ৳{lawyer.fee}
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

                        {/* Contact */}
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

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 mt-10">

                            <button className="btn bg-[#D4A95A] hover:bg-[#B88A44] text-white border-none px-8">
                                Hire Lawyer
                            </button>

                            <button className="btn btn-outline border-[#D4A95A] text-[#B88A44]">
                                Book Consultation
                            </button>

                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LawyerDetailsPage;