"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    MapPin,
    Briefcase,
    Filter,
} from "lucide-react";

export default function BrowseLawyersPage() {
    const [lawyers, setLawyers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [specialization, setSpecialization] =
        useState("");
    const [availability, setAvailability] =
        useState("");

    useEffect(() => {
        fetch("http://localhost:5000/lawyers")
            .then((res) => res.json())
            .then((data) => {
                setLawyers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredLawyers = lawyers.filter(
        (lawyer) => {
            const matchSearch =
                lawyer.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                lawyer.specialization
                    ?.toLowerCase()
                    .includes(search.toLowerCase());


            const matchCategory =
                specialization
                    ? lawyer.specialization ===
                    specialization
                    : true;

            const matchAvailability =
                availability
                    ? lawyer.status === availability
                    : true;

            return (
                matchSearch &&
                matchCategory &&
                matchAvailability
            );
        }


    );

    return (<div className="min-h-screen bg-[#F7F3EE]">


        {/* Hero */}
        <section className="relative overflow-hidden">

            <div className="absolute w-[350px] h-[350px] rounded-full bg-[#D4A95A]/20 blur-[120px] -top-20 -left-20" />

            <div className="absolute w-[300px] h-[300px] rounded-full bg-[#B88A44]/20 blur-[120px] bottom-0 right-0" />

            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: .6,
                    }}
                    className="text-5xl md:text-6xl font-bold text-center text-[#1E1E1E]"
                >
                    Browse{" "}
                    <span className="text-[#D4A95A]">
                        Lawyers
                    </span>
                </motion.h1>

                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: .3,
                    }}
                    className="text-center text-gray-600 mt-5 max-w-2xl mx-auto"
                >
                    Find experienced lawyers based on
                    specialization, location and
                    availability.
                </motion.p>

            </div>

        </section>

        {/* Search */}
        <section className="max-w-7xl mx-auto px-6">

            <div className="bg-white border border-[#E8DDCF] rounded-3xl p-6 shadow-sm">

                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

                    <div className="relative">

                        <Search
                            className="absolute left-4 top-3.5 text-gray-500"
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder="Search Lawyer..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="w-full bg-[#FCF8F3] border border-[#E8DDCF] rounded-xl py-3 pl-11 pr-3 text-[#1E1E1E] focus:border-[#D4A95A] outline-none"
                        />

                    </div>

                    <select
                        value={specialization}
                        onChange={(e) =>
                            setSpecialization(
                                e.target.value
                            )
                        }
                        className="bg-[#FCF8F3] border border-[#E8DDCF] rounded-xl px-4 text-[#1E1E1E]"
                    >
                        <option value="">
                            All Categories
                        </option>

                        <option>
                            Criminal Lawyer
                        </option>

                        <option>
                            Family Lawyer
                        </option>

                        <option>
                            Corporate Lawyer
                        </option>

                        <option>
                            Business Lawyer
                        </option>

                        <option>
                            Property Lawyer
                        </option>
                    </select>

                    <select
                        value={availability}
                        onChange={(e) =>
                            setAvailability(
                                e.target.value
                            )
                        }
                        className="bg-[#FCF8F3] border border-[#E8DDCF] rounded-xl px-4 text-[#1E1E1E]"
                    >
                        <option value="">
                            Availability
                        </option>

                        <option>
                            Available
                        </option>

                        <option>
                            Busy
                        </option>
                    </select>

                    <button className="rounded-xl bg-[#D4A95A] hover:bg-[#B88A44] text-white font-semibold flex justify-center items-center gap-2 transition-all duration-300">
                        <Filter size={18} />
                        Filter
                    </button>

                </div>

            </div>

        </section>

        {/* Cards */}
        <section className="max-w-7xl mx-auto px-6 py-14">

            {loading ? (

                <div className="flex justify-center py-20">

                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#D4A95A] border-t-transparent"></div>

                </div>

            ) : filteredLawyers.length === 0 ? (

                <div className="text-center text-[#B88A44] text-xl font-semibold">
                    No Lawyers Found
                </div>

            ) : (

                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-7">

                    {filteredLawyers.map(
                        (lawyer) => (

                            <motion.div
                                key={lawyer._id}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                }}
                                transition={{
                                    duration: .3,
                                }}
                                className="bg-white rounded-3xl border border-[#E8DDCF] overflow-hidden shadow-sm hover:shadow-xl"
                            >

                                <div className="relative">

                                    <img
                                        src={lawyer.photo}
                                        alt={lawyer.name}
                                        className="h-64 w-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                                    <span
                                        className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-medium ${lawyer.status ===
                                                "Available"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {lawyer.status}
                                    </span>

                                </div>

                                <div className="p-5">

                                    <h2 className="text-[#1E1E1E] text-xl font-bold">
                                        {lawyer.name}
                                    </h2>

                                    <div className="flex items-center gap-2 text-gray-600 mt-3">
                                        <Briefcase size={16} />
                                        {
                                            lawyer.specialization
                                        }
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                                        <MapPin size={16} />
                                        {lawyer.location}
                                    </div>

                                    <div className="mt-5 flex justify-between items-center">

                                        <p className="text-[#D4A95A] font-bold text-lg">
                                            ৳ {lawyer.fee}
                                        </p>

                                        <Link
                                            href={`/lawyers/${lawyer._id}`}
                                            className="bg-[#D4A95A] hover:bg-[#B88A44] text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300"
                                        >
                                            View Profile
                                        </Link>

                                    </div>

                                </div>

                            </motion.div>

                        )
                    )}

                </div>

            )}

        </section>

    </div>


    );
}
