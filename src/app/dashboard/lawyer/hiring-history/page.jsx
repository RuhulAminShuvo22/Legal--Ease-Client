"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import {
    Clock3,
    CheckCircle2,
    XCircle,
    Users,
    Briefcase,
} from "lucide-react";

const LawyerHiringHistoryPage = () => {
    const { data: session } =
        authClient.useSession();

    const lawyerEmail =
        session?.user?.email;

    const [hirings, setHirings] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!lawyerEmail) return;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/lawyer/${lawyerEmail}`
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
    }, [lawyerEmail]);

    const handleStatusUpdate = async (
        id,
        status
    ) => {
        try {
            const endpoint =
                status === "accepted"
                    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/accept/${id}`
                    : `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/reject/${id}`;

            const res = await fetch(
                endpoint,
                {
                    method: "PATCH",
                }
            );

            const data =
                await res.json();

            if (data.success) {
                setHirings((prev) =>
                    prev.map((item) =>
                        item._id === id
                            ? {
                                ...item,
                                status,
                            }
                            : item
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const pending =
        hirings.filter(
            (item) =>
                item.status === "pending"
        ).length;

    const accepted =
        hirings.filter(
            (item) =>
                item.status === "accepted"
        ).length;

    const rejected =
        hirings.filter(
            (item) =>
                item.status === "rejected"
        ).length;

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
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="space-y-8">

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
                <h1 className="text-4xl font-bold">
                    Hiring Requests
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage all incoming client
                    requests.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">

                <div className="bg-white rounded-3xl p-6 shadow border">
                    <Users
                        size={32}
                        className="text-[#B88A44]"
                    />

                    <h2 className="text-3xl font-bold mt-3">
                        {hirings.length}
                    </h2>

                    <p className="text-gray-500">
                        Total Requests
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow border">
                    <Clock3
                        size={32}
                        className="text-amber-500"
                    />

                    <h2 className="text-3xl font-bold mt-3">
                        {pending}
                    </h2>

                    <p className="text-gray-500">
                        Pending
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow border">
                    <CheckCircle2
                        size={32}
                        className="text-green-600"
                    />

                    <h2 className="text-3xl font-bold mt-3">
                        {accepted}
                    </h2>

                    <p className="text-gray-500">
                        Accepted
                    </p>
                </div>
            </div>
            {hirings.length === 0 ? (
                <div className="bg-white rounded-3xl p-14 text-center border shadow">

                    <Briefcase
                        size={70}
                        className="mx-auto text-[#B88A44]"
                    />

                    <h2 className="text-3xl font-bold mt-6">
                        No Requests Yet
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Client hiring requests
                        will appear here.
                    </p>

                </div>
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
                                    y: -5,
                                }}
                                className="
                bg-white
                rounded-[32px]
                border
                p-6
                shadow-lg
                "
                            >
                                <div className="flex justify-between items-start">

                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {item.clientName}
                                        </h2>

                                        <p className="text-gray-500">
                                            {item.clientEmail}
                                        </p>
                                    </div>

                                    {getStatusBadge(
                                        item.status
                                    )}
                                </div>

                                <div className="mt-6 space-y-3">

                                    <div className="flex justify-between">

                                        <span className="text-gray-500">
                                            Lawyer
                                        </span>

                                        <span className="font-medium">
                                            {item.lawyerName}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-gray-500">
                                            Fee
                                        </span>

                                        <span className="font-bold text-[#B88A44]">
                                            ${item.fee}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-gray-500">
                                            Payment
                                        </span>

                                        <span>
                                            {item.paymentStatus}
                                        </span>
                                    </div>

                                </div>

                                {item.status ===
                                    "pending" && (
                                        <div className="flex gap-3 mt-8">

                                            <button
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        item._id,
                                                        "accepted"
                                                    )
                                                }
                                                className="
                      flex-1
                      py-3
                      rounded-2xl
                      bg-green-600
                      text-white
                      font-semibold
                      hover:bg-green-700
                      "
                                            >
                                                Accept
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        item._id,
                                                        "rejected"
                                                    )
                                                }
                                                className="
                      flex-1
                      py-3
                      rounded-2xl
                      bg-red-600
                      text-white
                      font-semibold
                      hover:bg-red-700
                      "
                                            >
                                                Reject
                                            </button>

                                        </div>
                                    )}

                            </motion.div>
                        )
                    )}

                </div>
            )}
        </div>
    );
};

export default LawyerHiringHistoryPage;