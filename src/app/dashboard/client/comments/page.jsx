"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import {
    FaStar,
    FaCommentDots,
    FaUserTie,
    FaBalanceScale,
} from "react-icons/fa";

const ClientCommentsPage = () => {
    const { data: session } =
        authClient.useSession();

    const user = session?.user;

    const [reviews, setReviews] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchReviews =
            async () => {
                if (!user?.email) return;

                try {
                    const res =
                        await axios.get(
                            `http://localhost:5000/reviews/client/${user.email}`
                        );

                    setReviews(res.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchReviews();
    }, [user]);

    const averageRating =
        reviews.length > 0
            ? (
                  reviews.reduce(
                      (sum, review) =>
                          sum +
                          Number(
                              review.rating
                          ),
                      0
                  ) / reviews.length
              ).toFixed(1)
            : 0;

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col justify-center items-center">

                <div className="w-16 h-16 border-4 border-[#D4A95A] border-t-transparent rounded-full animate-spin"></div>

                <p className="mt-4 text-[#B88A44] font-medium">
                    Loading Reviews...
                </p>

            </div>
        );
    }