"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Star,
  CircleDollarSign,
} from "lucide-react";

export default function LawyerCard({ lawyer }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="bg-[#FFFFFF] border border-[#E8DDCF] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={lawyer.photo}
          alt={lawyer.name}
          className="w-full h-72 object-cover"
        />

        {/* Status */}
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
            lawyer.status === "Available"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {lawyer.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Name */}
        <h2 className="text-2xl font-bold text-[#1E1E1E]">
          {lawyer.name}
        </h2>

        {/* Specialization */}
        <div className="flex items-center gap-2 mt-3 text-[#6B7280]">
          <Briefcase size={18} />
          <span>{lawyer.specialization}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mt-2 text-[#6B7280]">
          <MapPin size={18} />
          <span>{lawyer.location}</span>
        </div>

        {/* Experience */}
        <div className="mt-2 text-[#6B7280]">
          💼 {lawyer.experience} Years Experience
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <Star
            size={18}
            className="fill-[#D4A95A] text-[#D4A95A]"
          />

          <span className="font-semibold text-[#1E1E1E]">
            {lawyer.rating}
          </span>
        </div>

        {/* Fee */}
        <div className="flex items-center gap-2 mt-4">
          <CircleDollarSign
            size={20}
            className="text-[#B88A44]"
          />

          <span className="text-xl font-bold text-[#B88A44]">
            ৳ {lawyer.fee}
          </span>

          <span className="text-[#6B7280] text-sm">
            / Consultation
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">

          <Link
            href={`/lawyers/${lawyer._id}`}
            className="text-center border border-[#D4A95A] text-[#B88A44] py-3 rounded-xl font-semibold hover:bg-[#FCF8F3] transition"
          >
            View Profile
          </Link>

          <button
            className="bg-gradient-to-r from-[#D4A95A] to-[#B88A44] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Hire Now
          </button>

        </div>

      </div>
    </motion.div>
  );
}