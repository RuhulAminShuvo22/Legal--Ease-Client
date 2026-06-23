"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

const ConsultationPage = () => {
    const { id } = useParams();

    const [hiring, setHiring] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [date, setDate] =
        useState("");

    const [notes, setNotes] =
        useState("");

    useEffect(() => {
        const fetchHiring =
            async () => {
                try {
                    const res =
                        await axios.get(
                            `http://localhost:5000/hirings/${id}`
                        );

                    setHiring(res.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        if (id) {
            fetchHiring();
        }
    }, [id]);

    const handleBook =
        async (e) => {
            e.preventDefault();

            Swal.fire({
                icon: "success",
                title:
                    "Consultation Booked",
                text:
                    "Your consultation request has been submitted.",
            });
        };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!hiring) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-3xl font-bold">
                    Consultation Not Found
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FCF8F3] via-white to-[#FFF7E8] py-16 px-4">

            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-[#B88A44]">
                        Book Consultation
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Schedule your legal consultation session
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">

                    <div className="bg-[#FFF8EC] p-5 rounded-2xl">
                        <h3 className="font-semibold text-gray-500">
                            Lawyer
                        </h3>

                        <p className="text-xl font-bold mt-2">
                            {hiring.lawyerName}
                        </p>
                    </div>

                    <div className="bg-[#FFF8EC] p-5 rounded-2xl">
                        <h3 className="font-semibold text-gray-500">
                            Client
                        </h3>

                        <p className="text-xl font-bold mt-2">
                            {hiring.clientName}
                        </p>
                    </div>

                    <div className="bg-[#FFF8EC] p-5 rounded-2xl">
                        <h3 className="font-semibold text-gray-500">
                            Status
                        </h3>

                        <p className="text-xl font-bold mt-2 text-green-600">
                            {hiring.status}
                        </p>
                    </div>

                    <div className="bg-[#FFF8EC] p-5 rounded-2xl">
                        <h3 className="font-semibold text-gray-500">
                            Consultation Fee
                        </h3>

                        <p className="text-xl font-bold mt-2 text-[#B88A44]">
                            ${hiring.fee}
                        </p>
                    </div>

                </div>

                <form
                    onSubmit={handleBook}
                    className="space-y-6"
                >
                    <div>
                        <label className="font-semibold block mb-2">
                            Preferred Date & Time
                        </label>

                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) =>
                                setDate(
                                    e.target.value
                                )
                            }
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-semibold block mb-2">
                            Notes
                        </label>

                        <textarea
                            value={notes}
                            onChange={(e) =>
                                setNotes(
                                    e.target.value
                                )
                            }
                            className="textarea textarea-bordered w-full h-32"
                            placeholder="Describe your legal issue..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="
                        w-full
                        py-4
                        rounded-2xl
                        bg-gradient-to-r
                        from-[#D4A95A]
                        via-[#C89A48]
                        to-[#B88A44]
                        text-white
                        font-bold
                        text-lg
                        shadow-xl
                        hover:scale-[1.02]
                        transition
                        "
                    >
                        Confirm Consultation
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ConsultationPage;