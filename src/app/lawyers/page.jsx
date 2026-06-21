"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import SearchBar from "@/components/lawyers/SearchBar";
import LawyerFilter from "@/components/lawyers/LawyerFilter";
import LawyerCard from "@/components/lawyers/LawyerCard";
import LawyerSkeleton from "@/components/lawyers/LawyerSkeleton";

export default function BrowseLawyersPage() {
    const [lawyers, setLawyers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [availability, setAvailability] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const res = await fetch(
                    "http://localhost:5000/lawyers"
                );

                const data = await res.json();

                setLawyers(data);
            } catch (error) {
                console.error(
                    "Failed to fetch lawyers:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchLawyers();
    }, []);

    const filteredLawyers = useMemo(() => {
        let result = [...lawyers];

        // Search
        if (search) {
            result = result.filter(
                (lawyer) =>
                    lawyer.name
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                    lawyer.specialization
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
            );
        }

        // Category
        if (specialization) {
            result = result.filter(
                (lawyer) =>
                    lawyer.specialization ===
                    specialization
            );
        }

        // Availability
        if (availability) {
            result = result.filter(
                (lawyer) =>
                    lawyer.status === availability
            );
        }

        // Sort
        if (sort === "rating") {
            result.sort(
                (a, b) => b.rating - a.rating
            );
        }

        if (sort === "feeLow") {
            result.sort(
                (a, b) => a.fee - b.fee
            );
        }

        if (sort === "feeHigh") {
            result.sort(
                (a, b) => b.fee - a.fee
            );
        }

        if (sort === "experience") {
            result.sort(
                (a, b) =>
                    b.experience - a.experience
            );
        }

        return result;
    }, [
        lawyers,
        search,
        specialization,
        availability,
        sort,
    ]);

    return (
        <div className="min-h-screen bg-[#F7F3EE]">

            {/* Hero Section */}

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
                            duration: 0.6,
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
                            delay: 0.2,
                        }}
                        className="text-center text-[#6B7280] mt-5 max-w-2xl mx-auto"
                    >
                        Find experienced legal
                        professionals based on
                        specialization, location and
                        availability.
                    </motion.p>

                </div>
            </section>

            {/* Search + Filter */}

            <section className="max-w-7xl mx-auto px-6">

                <div className="bg-white border border-[#E8DDCF] rounded-3xl p-6 shadow-sm">

                    <div className="space-y-5">

                        <SearchBar
                            search={search}
                            setSearch={setSearch}
                        />

                        <LawyerFilter
                            specialization={
                                specialization
                            }
                            setSpecialization={
                                setSpecialization
                            }
                            availability={
                                availability
                            }
                            setAvailability={
                                setAvailability
                            }
                            sort={sort}
                            setSort={setSort}
                        />

                    </div>

                </div>

            </section>

            {/* Lawyers Grid */}

            <section className="max-w-7xl mx-auto px-6 py-14">

                {loading ? (
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">

                        {[...Array(8)].map(
                            (_, index) => (
                                <LawyerSkeleton
                                    key={index}
                                />
                            )
                        )}

                    </div>
                ) : filteredLawyers.length === 0 ? (
                    <div className="text-center py-20">

                        <h2 className="text-3xl font-bold text-[#B88A44]">

                            No Lawyers Found

                        </h2>

                        <p className="text-[#6B7280] mt-3">

                            Try changing your search
                            or filters.

                        </p>

                    </div>
                ) : (
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
                        {filteredLawyers.map((lawyer, index) => (
                            <motion.div
                                key={lawyer._id}
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.08,
                                }}
                            >
                                <LawyerCard lawyer={lawyer} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* Statistics */}

            <section className="max-w-7xl mx-auto px-6 pb-20">

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white border border-[#E8DDCF] rounded-3xl p-8 text-center shadow-sm">

                        <h2 className="text-4xl font-bold text-[#D4A95A]">
                            {lawyers.length}
                        </h2>

                        <p className="mt-3 text-[#6B7280]">
                            Verified Lawyers
                        </p>

                    </div>

                    <div className="bg-white border border-[#E8DDCF] rounded-3xl p-8 text-center shadow-sm">

                        <h2 className="text-4xl font-bold text-[#D4A95A]">
                            {
                                lawyers.filter(
                                    (item) =>
                                        item.status === "Available"
                                ).length
                            }
                        </h2>

                        <p className="mt-3 text-[#6B7280]">
                            Available Now
                        </p>

                    </div>

                    <div className="bg-white border border-[#E8DDCF] rounded-3xl p-8 text-center shadow-sm">

                        <h2 className="text-4xl font-bold text-[#D4A95A]">
                            {
                                new Set(
                                    lawyers.map(
                                        (item) =>
                                            item.specialization
                                    )
                                ).size
                            }
                        </h2>

                        <p className="mt-3 text-[#6B7280]">
                            Practice Areas
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}