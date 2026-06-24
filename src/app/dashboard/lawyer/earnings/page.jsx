"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import {
    FaDollarSign,
    FaBalanceScale,
} from "react-icons/fa";

const EarningsPage = () => {
    const { data: session } =
        authClient.useSession();

    const user = session?.user;

    const [loading, setLoading] =
        useState(true);

    const [earningsData, setEarningsData] =
        useState({
            totalEarnings: 0,
            totalCases: 0,
            hirings: [],
        });

    useEffect(() => {
        const fetchEarnings =
            async () => {
                if (!user?.email) return;

                try {
                    const res =
                        await axios.get(
                            `http://localhost:5000/earnings/lawyer/${user.email}`
                        );

                    setEarningsData(
                        res.data
                    );
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchEarnings();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">

                <div
                    className="
                    w-16
                    h-16
                    border-4
                    border-[#D4A95A]
                    border-t-transparent
                    rounded-full
                    animate-spin
                    "
                />

            </div>
        );
    }

    const {
        totalEarnings,
        totalCases,
        hirings,
    } = earningsData;
    