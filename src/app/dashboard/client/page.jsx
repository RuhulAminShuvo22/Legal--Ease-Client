"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

import {
    FaBalanceScale,
    FaCalendarCheck,
    FaClipboardList,
    FaStar,
    FaCheckCircle,
    FaArrowRight,
    FaGavel,
    FaCommentDots,
} from "react-icons/fa";

const ClientDashboardPage = () => {
    const { data: session } =
        authClient.useSession();

    const user = session?.user;

    const [hirings, setHirings] =
        useState([]);

    const [consultations, setConsultations] =
        useState([]);

    const [reviews, setReviews] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchDashboardData =
            async () => {
                if (!user?.email) return;

                try {
                    const [
                        hiringsRes,
                        consultationsRes,
                        reviewsRes,
                    ] = await Promise.all([
                        axios.get(
                            `http://localhost:5000/hirings/client/${user.email}`
                        ),
                        axios.get(
                            `http://localhost:5000/consultations/client/${user.email}`
                        ),
                        axios.get(
                            `http://localhost:5000/reviews/client/${user.email}`
                        ),
                    ]);

                    setHirings(
                        hiringsRes.data
                    );

                    setConsultations(
                        consultationsRes.data
                    );

                    setReviews(
                        reviewsRes.data
                    );
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchDashboardData();
    }, [user]);

    const acceptedRequests =
        hirings.filter(
            (item) =>
                item.status ===
                "accepted"
        ).length;

    const completedConsultations =
        consultations.filter(
            (item) =>
                item.status?.toLowerCase() ===
                "completed"
        ).length;

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
                  ) /
                  reviews.length
              ).toFixed(1)
            : 0;