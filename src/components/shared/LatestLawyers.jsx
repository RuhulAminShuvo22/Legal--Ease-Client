"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight } from "lucide-react";

export default function LatestLawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/lawyers")
      .then((res) => res.json())
      .then((data) => {
        setLawyers(data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <span className="loading loading-spinner loading-lg text-[#B88746]"></span>
      </div>
    );
  }

  return (
    <section className="py-24 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-14">
          <div>
            <p className="text-[#B88746] font-semibold mb-2">
              TOP LEGAL PROFESSIONALS
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#3B2F1E]">
              Latest Lawyers
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl">
              Connect with experienced legal professionals
              ready to help you solve your legal matters.
            </p>
          </div>

          <Link
            href="/browse-lawyers"
            className="
              mt-6 md:mt-0
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#D4A95A]
              px-6
              py-3
              text-white
              font-semibold
              transition
              hover:bg-[#B88746]
            "
          >
            View All Lawyers
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Lawyers */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {lawyers.map((lawyer, index) => (
            <motion.div
              key={lawyer._id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                rounded-[30px]
                overflow-hidden
                bg-white
                border
                border-[#E9DDCC]
                shadow-sm
                hover:shadow-xl
                transition-all
              "
            >
              {/* Image */}

              <div className="relative h-64">
                <Image
                  src={
                    lawyer.image ||
                    "https://i.ibb.co/z4J1W6h/lawyer.jpg"
                  }
                  alt={lawyer.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[#3B2F1E]">
                    {lawyer.name}
                  </h3>

                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />

                    <span className="font-semibold">
                      {lawyer.rating || 5}
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-[#B88746] font-medium">
                  {lawyer.specialization ||
                    "Legal Consultant"}
                </p>

                <div className="mt-4 flex items-center gap-2 text-gray-500">
                  <MapPin size={16} />

                  <span>
                    {lawyer.location ||
                      "Bangladesh"}
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Experience
                    </p>

                    <h4 className="font-semibold">
                      {lawyer.experience ||
                        "5 Years"}
                    </h4>
                  </div>

                  <Link
                    href={`/lawyers/${lawyer._id}`}
                    className="
                      rounded-full
                      bg-[#D4A95A]
                      px-5
                      py-2.5
                      text-white
                      font-medium
                      transition
                      hover:bg-[#B88746]
                    "
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}