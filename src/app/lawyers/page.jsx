"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
} from "lucide-react";

// Part 2 এ LawyerCard component হবে
// এখন temporary card ব্যবহার করছি

export default function BrowseLawyersPage() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] =useState(true);

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/lawyers")
      .then((res) => res.json())
      .then((data) => {
        setLawyers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchSearch =
      lawyer.name?.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.specialization
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchCategory = specialization
      ? lawyer.specialization === specialization
      : true;

    const matchAvailability = availability
      ? lawyer.status === availability
      : true;

    return matchSearch && matchCategory && matchAvailability;
  });

  return (
    <div className="min-h-screen bg-[#090909]">

      {/* Hero */}
      <section className="relative overflow-hidden">

        <div className="absolute w-[350px] h-[350px] rounded-full bg-yellow-500/20 blur-[120px] -top-20 -left-20" />

        <div className="absolute w-[300px] h-[300px] rounded-full bg-yellow-700/20 blur-[120px] bottom-0 right-0" />

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

          <motion.h1
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:.6}}
            className="text-5xl font-bold text-center text-white"
          >
            Browse{" "}
            <span className="text-[#D4AF37]">
              Lawyers
            </span>
          </motion.h1>

          <motion.p
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:.3}}
            className="text-center text-gray-400 mt-5 max-w-2xl mx-auto"
          >
            Find experienced lawyers based on specialization,
            location and availability.
          </motion.p>

        </div>
      </section>

      {/* Search + Filter */}

      <section className="max-w-7xl mx-auto px-6">

        <div className="bg-[#111] border border-[#D4AF37]/20 rounded-3xl p-6">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

            {/* Search */}

            <div className="relative">

              <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search Lawyer..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl py-3 pl-11 pr-3 text-white focus:border-[#D4AF37] outline-none"
              />

            </div>

            {/* Specialization */}

            <select
              value={specialization}
              onChange={(e)=>setSpecialization(e.target.value)}
              className="bg-[#1A1A1A] border border-[#333] rounded-xl px-4 text-white"
            >

              <option value="">
                All Categories
              </option>

              <option>Criminal Lawyer</option>
              <option>Family Lawyer</option>
              <option>Corporate Lawyer</option>
              <option>Business Lawyer</option>
              <option>Property Lawyer</option>

            </select>

            {/* Availability */}

            <select
              value={availability}
              onChange={(e)=>setAvailability(e.target.value)}
              className="bg-[#1A1A1A] border border-[#333] rounded-xl px-4 text-white"
            >

              <option value="">
                Availability
              </option>

              <option>Available</option>
              <option>Busy</option>

            </select>

            {/* Filter */}

            <button className="rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-semibold flex justify-center items-center gap-2">

              <Filter size={18}/>

              Filter

            </button>

          </div>

        </div>

      </section>

      {/* Cards */}

      <section className="max-w-7xl mx-auto px-6 py-14">

        {
          loading ?

          (

            <div className="text-center text-gray-400">
              Loading Lawyers...
            </div>

          )

          :

          filteredLawyers.length===0 ?

          (

            <div className="text-center text-gray-500 text-xl">

              No Lawyers Found

            </div>

          )

          :

          (

            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-7">

              {
                filteredLawyers.map((lawyer)=>(

                  <motion.div
                    key={lawyer._id}
                    whileHover={{y:-8}}
                    className="bg-[#111] rounded-3xl border border-[#D4AF37]/20 overflow-hidden"
                  >

                    <img
                      src={lawyer.photo}
                      alt={lawyer.name}
                      className="h-64 w-full object-cover"
                    />

                    <div className="p-5">

                      <span className={`text-xs px-3 py-1 rounded-full ${
                        lawyer.status==="Available"
                        ?
                        "bg-green-600/20 text-green-400"
                        :
                        "bg-red-600/20 text-red-400"
                      }`}>

                        {lawyer.status}

                      </span>

                      <h2 className="text-white text-xl font-bold mt-4">

                        {lawyer.name}

                      </h2>

                      <div className="flex items-center gap-2 text-gray-400 mt-2">

                        <Briefcase size={16}/>

                        {lawyer.specialization}

                      </div>

                      <div className="flex items-center gap-2 text-gray-400 mt-2">

                        <MapPin size={16}/>

                        {lawyer.location}

                      </div>

                      <div className="mt-4 flex justify-between items-center">

                        <p className="text-[#D4AF37] font-bold">

                          ৳ {lawyer.fee}

                        </p>

                        <button
                          className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black px-4 py-2 rounded-xl font-semibold"
                        >

                          View Profile

                        </button>

                      </div>

                    </div>

                  </motion.div>

                ))
              }

            </div>

          )

        }

      </section>

    </div>
  );
}