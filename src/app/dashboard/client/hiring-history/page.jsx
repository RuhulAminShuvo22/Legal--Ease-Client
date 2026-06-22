"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
    Clock3,
    CheckCircle,
    XCircle,
    CreditCard,
    Briefcase,
} from "lucide-react";

const HiringHistoryPage = () => {
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
                    `http://localhost:5000/hirings/client/${email}`
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

    const getStatusBadge = (
        status
    ) => {
        switch (status) {
            case "accepted":
                return (
                    <span className="badge badge-success gap-1">
                        <CheckCircle size={14} />
                        Accepted
                    </span>
                );

            case "rejected":
                return (
                    <span className="badge badge-error gap-1">
                        <XCircle size={14} />
                        Rejected
                    </span>
                );

            default:
                return (
                    <span className="badge badge-warning gap-1">
                        <Clock3 size={14} />
                        Pending
                    </span>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    return (
        <div>

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Hiring History
                </h1>

                <p className="text-gray-500 mt-2">
                    Track all your lawyer hiring
                    requests.
                </p>
            </div>

            {hirings.length === 0 ? (
                <div className="rounded-3xl bg-white p-12 text-center border">

                    <Briefcase
                        size={60}
                        className="mx-auto text-[#B88A44]"
                    />

                    <h2 className="text-2xl font-bold mt-5">
                        No Hiring Requests Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Hire a lawyer to see
                        your requests here.
                    </p>

                </div>
            ) : (
                <div className="overflow-x-auto rounded-3xl border bg-white">

                    <table className="table">

                        <thead>
                            <tr>
                                <th>Lawyer</th>
                                <th>Fee</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {hirings.map((item) => (
                                <tr key={item._id}>

                                    <td>
                                        <div>
                                            <p className="font-semibold">
                                                {item.lawyerName}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {item.lawyerEmail}
                                            </p>
                                        </div>
                                    </td>

                                    <td>
                                        ${item.fee}
                                    </td>

                                    <td>
                                        {getStatusBadge(
                                            item.status
                                        )}
                                    </td>

                                    <td>

                                        {item.paymentStatus ===
                                            "paid" ? (
                                            <span className="badge badge-success">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="badge badge-outline">
                                                Unpaid
                                            </span>
                                        )}

                                    </td>

                                    <td>

                                        {item.status ===
                                            "accepted" &&
                                            item.paymentStatus ===
                                            "unpaid" ? (
                                            <button
                                                className="
                        btn
                        btn-sm
                        bg-[#B88A44]
                        text-white
                        border-none
                        hover:bg-[#9b7534]
                        "
                                            >
                                                <CreditCard
                                                    size={16}
                                                />
                                                Pay Now
                                            </button>
                                        ) : item.status ===
                                            "pending" ? (
                                            <span className="text-amber-500 text-sm font-medium">
                                                Waiting...
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">
                                                —
                                            </span>
                                        )}

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            )}
        </div>
    );
};

export default HiringHistoryPage;