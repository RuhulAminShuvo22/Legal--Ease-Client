"use client";

import { useEffect, useState } from "react";

const LawyerDetailsPage = ({ params }) => {
    const [lawyer, setLawyer] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchLawyer = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/lawyers/${params.id}`
                );

                const data = await res.json();

                setLawyer(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLawyer();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!lawyer) {
        return (
            <div className="text-center py-20">
                Lawyer Not Found
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                <div className="bg-gradient-to-r from-[#D4A95A] to-[#B88A44] h-40"></div>

                <div className="px-8 pb-10">

                    <div className="-mt-20">
                        <img
                            src={lawyer.photo}
                            alt={lawyer.name}
                            className="w-40 h-40 rounded-full border-8 border-white object-cover"
                        />
                    </div>

                    <h1 className="text-4xl font-bold mt-5">
                        {lawyer.name}
                    </h1>

                    <p className="text-lg text-[#B88A44] mt-2">
                        {lawyer.specialization}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">

                        <div className="bg-gray-50 p-5 rounded-2xl">
                            <h3 className="font-bold mb-3">
                                Contact Information
                            </h3>

                            <p>Email: {lawyer.email}</p>
                            <p>Phone: {lawyer.phone}</p>
                            <p>Location: {lawyer.location}</p>
                        </div>

                        <div className="bg-gray-50 p-5 rounded-2xl">
                            <h3 className="font-bold mb-3">
                                Professional Info
                            </h3>

                            <p>Experience: {lawyer.experience} Years</p>
                            <p>Consultation Fee: ৳{lawyer.fee}</p>
                            <p>Rating: ⭐ {lawyer.rating}</p>
                            <p>Status: {lawyer.status}</p>
                        </div>

                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-3">
                            About Lawyer
                        </h3>

                        <p className="text-gray-600 leading-8">
                            {lawyer.about}
                        </p>
                    </div>

                    <div className="mt-10">
                        <button className="btn bg-[#D4A95A] text-white border-none">
                            Hire This Lawyer
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );


};

export default LawyerDetailsPage;
