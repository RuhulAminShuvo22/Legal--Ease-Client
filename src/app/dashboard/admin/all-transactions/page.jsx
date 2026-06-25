"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
    FaMoneyBillWave,
    FaReceipt,
} from "react-icons/fa";

const AllTransactionsPage = () => {

    const [transactions, setTransactions] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const fetchTransactions =
            async () => {

                try {

                    const res =
                        await axios.get(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/transactions`
                        );

                    setTransactions(
                        res.data
                    );

                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }

            };

        fetchTransactions();

    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">

                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                    className="
                    w-16
                    h-16
                    rounded-full
                    border-4
                    border-[#D4A95A]
                    border-t-transparent
                    "
                />

            </div>
        );
    }

    const totalRevenue =
        transactions.reduce(
            (sum, item) =>
                sum +
                Number(
                    item.fee || 0
                ),
            0
        );

    const totalTransactions =
        transactions.length;
    return (
        <div className="min-h-screen bg-[#F7F3EE] p-4 md:p-6 lg:p-10">

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
                transition={{
                    duration: 0.5,
                }}
                className="mb-10"
            >
                <h1
                    className="
                    text-3xl
                    md:text-4xl
                    lg:text-5xl
                    font-bold
                    text-[#2B2118]
                    "
                >
                    All Transactions
                </h1>

                <p className="text-gray-500 mt-3">
                    Monitor all successful payments across the platform.
                </p>

            </motion.div>

            {/* Stats Cards */}

            <div className="grid md:grid-cols-2 gap-6 mb-10">

                <motion.div
                    whileHover={{
                        y: -5,
                    }}
                    className="
                    bg-gradient-to-r
                    from-[#D4A95A]
                    via-[#C89A48]
                    to-[#B88A44]
                    rounded-3xl
                    p-8
                    text-white
                    shadow-2xl
                    "
                >
                    <div className="flex items-center gap-5">

                        <FaMoneyBillWave className="text-5xl" />

                        <div>

                            <h2 className="text-4xl font-bold">
                                ${totalRevenue}
                            </h2>

                            <p className="opacity-90">
                                Total Revenue
                            </p>

                        </div>

                    </div>
                </motion.div>

                <motion.div
                    whileHover={{
                        y: -5,
                    }}
                    className="
                    bg-white
                    rounded-3xl
                    p-8
                    shadow-xl
                    border
                    border-[#F3E3C7]
                    "
                >
                    <div className="flex items-center gap-5">

                        <FaReceipt
                            className="
                            text-5xl
                            text-[#B88A44]
                            "
                        />

                        <div>

                            <h2
                                className="
                                text-4xl
                                font-bold
                                text-[#2B2118]
                                "
                            >
                                {totalTransactions}
                            </h2>

                            <p className="text-gray-500">
                                Transactions
                            </p>

                        </div>

                    </div>
                </motion.div>

            </div>

            {/* Transactions Container */}

            <div
                className="
                bg-white/80
                backdrop-blur-lg
                rounded-3xl
                shadow-xl
                border
                border-[#F3E3C7]
                overflow-hidden
                "
            >
                {/* Desktop Table */}

                <div className="hidden lg:block overflow-x-auto">

                    <table className="table w-full">

                        <thead>

                            <tr
                                className="
                                bg-[#FFF8EC]
                                text-[#2B2118]
                                "
                            >
                                <th>Transaction ID</th>
                                <th>Client Email</th>
                                <th>Lawyer Email</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>

                        </thead>

                        <tbody>

                            {transactions.map(
                                (transaction) => (

                                    <tr
                                        key={
                                            transaction._id
                                        }
                                        className="hover"
                                    >

                                        <td
                                            className="
                                            font-medium
                                            max-w-[200px]
                                            truncate
                                            "
                                        >
                                            {
                                                transaction._id
                                            }
                                        </td>

                                        <td>
                                            {
                                                transaction.clientEmail
                                            }
                                        </td>

                                        <td>
                                            {
                                                transaction.lawyerEmail
                                            }
                                        </td>

                                        <td>

                                            <span
                                                className="
                                                badge
                                                badge-success
                                                text-white
                                                "
                                            >
                                                $
                                                {Number(
                                                    transaction.fee || 0
                                                )}
                                            </span>

                                        </td>

                                        <td>
                                            {new Date(
                                                transaction.createdAt
                                            ).toLocaleDateString()}
                                        </td>

                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </div>

                {/* Mobile & Tablet Cards */}

                <div className="lg:hidden p-5 space-y-5">

                    {transactions.map(
                        (
                            transaction,
                            index
                        ) => (

                            <motion.div
                                key={
                                    transaction._id
                                }
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay:
                                        index *
                                        0.05,
                                }}
                                whileHover={{
                                    scale: 1.01,
                                }}
                                className="
                                border
                                border-[#F3E3C7]
                                rounded-2xl
                                p-5
                                bg-[#FFFDF8]
                                "
                            >

                                <div className="space-y-3">

                                    <div>

                                        <p
                                            className="
                                            text-xs
                                            text-gray-500
                                            "
                                        >
                                            Transaction ID
                                        </p>

                                        <p
                                            className="
                                            font-semibold
                                            break-all
                                            "
                                        >
                                            {
                                                transaction._id
                                            }
                                        </p>

                                    </div>

                                    <div>

                                        <p
                                            className="
                                            text-xs
                                            text-gray-500
                                            "
                                        >
                                            Client
                                        </p>

                                        <p>
                                            {
                                                transaction.clientEmail
                                            }
                                        </p>

                                    </div>

                                    <div>

                                        <p
                                            className="
                                            text-xs
                                            text-gray-500
                                            "
                                        >
                                            Lawyer
                                        </p>

                                        <p>
                                            {
                                                transaction.lawyerEmail
                                            }
                                        </p>

                                    </div>

                                    <div className="flex justify-between items-center">

                                        <span
                                            className="
                                            badge
                                            badge-success
                                            text-white
                                            "
                                        >
                                            $
                                            {Number(
                                                transaction.fee || 0
                                            )}
                                        </span>

                                        <span
                                            className="
                                            text-sm
                                            text-gray-500
                                            "
                                        >
                                            {new Date(
                                                transaction.createdAt
                                            ).toLocaleDateString()}
                                        </span>

                                    </div>

                                </div>

                            </motion.div>

                        )
                    )}

                </div>
            </div>

        </div>
    );
};

export default AllTransactionsPage;