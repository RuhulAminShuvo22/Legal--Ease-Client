"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
    Clock3,
    CheckCircle2,
    XCircle,
    CreditCard,
    Briefcase,
    Wallet,
    Scale,
    TrendingUp,
} from "lucide-react";

const HiringHistoryPage = () => {
    const router = useRouter();
    const { data: session } =
        authClient.useSession();

    const email =
        session?.user?.email;

    const [hirings, setHirings] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!email) return;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/client/${email}`
                );

                const data =
                    await res.json();

                setHirings(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [email]);

    const pending =
        hirings.filter(
            (item) => item.status === "pending"
        ).length;

    const accepted =
        hirings.filter(
            (item) => item.status === "accepted"
        ).length;

    const rejected =
        hirings.filter(
            (item) => item.status === "rejected"
        ).length;

    const totalSpent = hirings
        .filter(
            (item) =>
                item.paymentStatus === "paid"
        )
        .reduce(
            (sum, item) =>
                sum + Number(item.fee || 0),
            0
        );

    const getStatusBadge = (
        status
    ) => {
        switch (status) {
            case "accepted":
                return (
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700 font-medium">
                        <CheckCircle2 size={16} />
                        Accepted
                    </div>
                );

            case "rejected":
                return (
                    <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-red-700 font-medium">
                        <XCircle size={16} />
                        Rejected
                    </div>
                );

            default:
                return (
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-amber-700 font-medium">
                        <Clock3 size={16} />
                        Pending
                    </div>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                    className="h-14 w-14 rounded-full border-4 border-[#D4A95A] border-t-transparent"
                />
            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* Header */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: -20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
            >
                <h1 className="text-4xl font-bold text-[#1E1E1E]">
                    Hiring History
                </h1>

                <p className="text-gray-500 mt-2 text-lg">
                    Track and manage all your
                    lawyer hiring requests.
                </p>
            </motion.div>

            {/* Stats */}

            <div className="grid md:grid-cols-4 gap-5">

                <motion.div
                    whileHover={{
                        y: -6,
                    }}
                    className="rounded-3xl bg-white p-6 shadow-lg border"
                >
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-500">
                                Total Requests
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {hirings.length}
                            </h2>
                        </div>

                        <Scale
                            className="text-[#B88A44]"
                            size={34}
                        />
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{
                        y: -6,
                    }}
                    className="rounded-3xl bg-white p-6 shadow-lg border"
                >
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-500">
                                Accepted
                            </p>

                            <h2 className="text-3xl font-bold text-green-600 mt-2">
                                {accepted}
                            </h2>
                        </div>

                        <CheckCircle2
                            className="text-green-600"
                            size={34}
                        />
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{
                        y: -6,
                    }}
                    className="rounded-3xl bg-white p-6 shadow-lg border"
                >
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-500">
                                Pending
                            </p>

                            <h2 className="text-3xl font-bold text-amber-600 mt-2">
                                {pending}
                            </h2>
                        </div>

                        <TrendingUp
                            className="text-amber-600"
                            size={34}
                        />
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{
                        y: -6,
                    }}
                    className="rounded-3xl bg-white p-6 shadow-lg border"
                >
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-500">
                                Total Paid
                            </p>

                            <h2 className="text-3xl font-bold text-[#B88A44] mt-2">
                                ${totalSpent}
                            </h2>
                        </div>

                        <Wallet
                            className="text-[#B88A44]"
                            size={34}
                        />
                    </div>
                </motion.div>

            </div>
            {hirings.length === 0 ? (
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    className="
          bg-white
          rounded-[32px]
          border
          p-16
          text-center
          shadow-xl
          "
                >
                    <Briefcase
                        size={80}
                        className="mx-auto text-[#D4A95A]"
                    />

                    <h2 className="text-3xl font-bold mt-6">
                        No Hiring Requests Yet
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Start hiring lawyers and
                        your request history will
                        appear here.
                    </p>
                </motion.div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-6">

                    {hirings.map(
                        (item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay:
                                        index * 0.08,
                                }}
                                whileHover={{
                                    y: -8,
                                }}
                                className="
                relative
                overflow-hidden
                rounded-[32px]
                bg-white
                border
                p-7
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-500
                "
                            >
                                <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-[#D4A95A] to-[#B88A44]" />

                                <div className="flex justify-between items-start">

                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {item.lawyerName}
                                        </h2>

                                        <p className="text-gray-500 mt-1">
                                            {item.lawyerEmail}
                                        </p>
                                    </div>

                                    {getStatusBadge(
                                        item.status
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-8">

                                    <div className="bg-[#FCF8F3] rounded-2xl p-4">

                                        <p className="text-sm text-gray-500">
                                            Consultation Fee
                                        </p>

                                        <h3 className="text-2xl font-bold text-[#B88A44] mt-2">
                                            ${item.fee}
                                        </h3>

                                    </div>

                                    <div className="bg-[#FCF8F3] rounded-2xl p-4">

                                        <p className="text-sm text-gray-500">
                                            Payment Status
                                        </p>

                                        <h3 className="font-bold mt-2">
                                            {item.paymentStatus ===
                                                "paid"
                                                ? "Paid"
                                                : "Unpaid"}
                                        </h3>

                                    </div>

                                </div>

                                <div className="mt-8">

                                    {item.status ===
                                        "accepted" &&
                                        item.paymentStatus ===
                                        "unpaid" ? (
                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `/dashboard/client/payment/${item._id}`
                                                )
                                            }
                                            className="
    w-full
    py-4
    rounded-2xl
    bg-gradient-to-r
    from-[#D4A95A]
    via-[#C99A4A]
    to-[#B88A44]
    text-white
    font-bold
    flex
    items-center
    justify-center
    gap-3
    hover:scale-[1.03]
    hover:shadow-2xl
    transition-all
    duration-300
    "
                                        >
                                            <CreditCard size={18} />
                                            Pay Now
                                        </button>
                                    ) : item.status ===
                                        "pending" ? (
                                        <div className="w-full py-4 rounded-2xl bg-amber-50 text-center text-amber-600 font-semibold">
                                            Waiting For Lawyer
                                            Response...
                                        </div>
                                    ) : item.status ===
                                        "accepted" &&
                                        item.paymentStatus ===
                                        "paid" ? (
                                        <div className="w-full py-4 rounded-2xl bg-green-50 text-center text-green-600 font-semibold">
                                            Payment Completed
                                        </div>
                                    ) : (
                                        <div className="w-full py-4 rounded-2xl bg-red-50 text-center text-red-600 font-semibold">
                                            Request Rejected
                                        </div>
                                    )}
                                </div>

                            </motion.div>
                        )
                    )}

                </div>
            )}
        </div>
    );
};

export default HiringHistoryPage;