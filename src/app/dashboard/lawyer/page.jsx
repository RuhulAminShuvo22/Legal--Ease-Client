"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    BriefcaseBusiness,
    Clock3,
    CheckCircle,
    Wallet,
    Star,
    User,
} from "lucide-react";

export default function LawyerDashboard() {
    const stats = [
        {
            title: "Total Requests",
            value: 24,
            icon: BriefcaseBusiness,
        },
        {
            title: "Pending Requests",
            value: 5,
            icon: Clock3,
        },
        {
            title: "Accepted Cases",
            value: 18,
            icon: CheckCircle,
        },
        {
            title: "Total Earnings",
            value: "$3,250",
            icon: Wallet,
        },
    ];

    const recentRequests = [
        {
            client: "Rahim Ahmed",
            service: "Family Law",
            status: "Pending",
        },
        {
            client: "Karim Hasan",
            service: "Property Law",
            status: "Accepted",
        },
        {
            client: "Sakib Islam",
            service: "Corporate Law",
            status: "Accepted",
        },
        {
            client: "Nadia Akter",
            service: "Civil Law",
            status: "Pending",
        },
    ];

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.7,
            }}
            className="space-y-8 min-h-screen bg-[#F8F5F0]"
        >

            
            {/* Hero Section */}

            <motion.div
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
                className="
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-[#DCCFC0]
      bg-gradient-to-r
      from-[#F9F6F1]
      to-[#F3E9D8]
      p-8
      lg:p-10
      shadow-xl
    "
            >
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                    }}
                    className="
        absolute
        -right-10
        -top-10
        h-52
        w-52
        rounded-full
        bg-[#D4A95A]
        blur-3xl
      "
                />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div>
                        <Image
                            src="/newlogo.png"
                            alt="LegalEase"
                            width={180}
                            height={60}
                            className="mb-5 h-auto w-auto"
                        />

                        <h1 className="text-4xl lg:text-5xl font-bold text-[#3B2F1E]">
                            Welcome Back Counselor 👋
                        </h1>

                        <p className="mt-3 max-w-xl text-[#6B5B45]">
                            Manage clients, legal cases, consultations and
                            earnings from your LegalEase dashboard.
                        </p>
                    </div>

                    <motion.button
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        className="
          rounded-full
          bg-gradient-to-r
          from-[#D4A95A]
          to-[#C39245]
          px-8
          py-4
          font-semibold
          text-white
          shadow-lg
        "
                    >
                        View New Requests
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats Section Start */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <motion.div
                            key={item.title}
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: index * 0.1,
                            }}
                            whileHover={{
                                y: -10,
                                scale: 1.03,
                            }}
                            className="
            rounded-[28px]
            bg-[#F9F6F1]
            p-6
            border
            border-[#DCCFC0]
            shadow-lg
          "
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#8B6F47]">
                                        {item.title}
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-[#3B2F1E]">
                                        {item.value}
                                    </h3>
                                </div>

                                <div
                                    className="
                rounded-2xl
                bg-gradient-to-br
                from-[#F4E6C9]
                to-[#EFD7A6]
                p-4
              "
                                >
                                    <Icon
                                        size={28}
                                        className="text-[#B88A44]"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
            
            {/* Recent Requests + Profile */}

            <div className="grid gap-8 lg:grid-cols-3">

                {/* Recent Requests */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: -20,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        delay: 0.2,
                    }}
                    className="
        lg:col-span-2
        rounded-[32px]
        bg-[#F9F6F1]
        p-6
        border
        border-[#DCCFC0]
        shadow-lg
      "
                >
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-[#3B2F1E]">
                            Recent Hiring Requests
                        </h2>

                        <button className="font-medium text-[#C39245] hover:text-[#B88A44]">
                            View All →
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#DCCFC0]">
                                    <th className="py-3 text-left text-[#8B6F47]">
                                        Client
                                    </th>

                                    <th className="py-3 text-left text-[#8B6F47]">
                                        Service
                                    </th>

                                    <th className="py-3 text-left text-[#8B6F47]">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentRequests.map((item, i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-[#EFE5D6]"
                                    >
                                        <td className="py-4 font-medium text-[#3B2F1E]">
                                            {item.client}
                                        </td>

                                        <td className="py-4 text-[#6B5B45]">
                                            {item.service}
                                        </td>

                                        <td className="py-4">
                                            <span
                                                className={`rounded-full px-4 py-2 text-sm font-medium ${item.status === "Accepted"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Profile Snapshot */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: 20,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        delay: 0.3,
                    }}
                    className="
        rounded-[32px]
        bg-[#F9F6F1]
        p-6
        border
        border-[#DCCFC0]
        shadow-lg
      "
                >
                    <h2 className="mb-6 text-2xl font-bold text-[#3B2F1E]">
                        Profile Snapshot
                    </h2>

                    <div className="flex flex-col items-center text-center">

                        <div
                            className="
            h-28
            w-28
            overflow-hidden
            rounded-full
            border-4
            border-[#D4A95A]
            shadow-lg
          "
                        >
                            <Image
                                src="/newlogo.png"
                                alt="Lawyer"
                                width={120}
                                height={120}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <h3 className="mt-4 text-xl font-bold text-[#3B2F1E]">
                            John Doe
                        </h3>

                        <p className="text-[#8B6F47]">
                            Corporate Lawyer
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                            <Star
                                size={18}
                                className="fill-yellow-500 text-yellow-500"
                            />

                            <span className="font-medium">
                                4.9 Rating
                            </span>
                        </div>

                        <span
                            className="
            mt-4
            rounded-full
            bg-green-100
            px-4
            py-2
            text-sm
            font-medium
            text-green-700
          "
                        >
                            Available
                        </span>
                    </div>

                    <div className="mt-8 space-y-4">

                        <div className="flex justify-between">
                            <span className="text-[#6B5B45]">
                                Experience
                            </span>

                            <span className="font-semibold text-[#3B2F1E]">
                                8 Years
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-[#6B5B45]">
                                Cases Won
                            </span>

                            <span className="font-semibold text-[#3B2F1E]">
                                142
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-[#6B5B45]">
                                Consultation Fee
                            </span>

                            <span className="font-semibold text-[#3B2F1E]">
                                $120
                            </span>
                        </div>

                    </div>
                </motion.div>
            </div>

            {/* Earnings Overview */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.4,
                }}
                className="
      rounded-[32px]
      bg-[#F9F6F1]
      p-8
      border
      border-[#DCCFC0]
      shadow-lg
    "
            >
                <h2 className="mb-6 text-2xl font-bold text-[#3B2F1E]">
                    Earnings Overview
                </h2>

                <div className="grid gap-6 md:grid-cols-2">

                    <motion.div
                        whileHover={{
                            scale: 1.03,
                        }}
                        className="
          rounded-2xl
          bg-gradient-to-r
          from-[#F5E8CC]
          to-[#F9F6F1]
          p-6
        "
                    >
                        <p className="text-[#8B6F47]">
                            This Month
                        </p>

                        <h3 className="mt-2 text-4xl font-bold text-[#C39245]">
                            $450
                        </h3>
                    </motion.div>

                    <motion.div
                        whileHover={{
                            scale: 1.03,
                        }}
                        className="
          rounded-2xl
          bg-gradient-to-r
          from-[#F5E8CC]
          to-[#F9F6F1]
          p-6
        "
                    >
                        <p className="text-[#8B6F47]">
                            Lifetime Earnings
                        </p>

                        <h3 className="mt-2 text-4xl font-bold text-[#C39245]">
                            $3,250
                        </h3>
                    </motion.div>

                </div>
            </motion.div>

        </motion.div>


    );
}


