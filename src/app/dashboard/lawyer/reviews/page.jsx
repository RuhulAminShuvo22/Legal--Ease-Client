"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import {
    FaStar,
    FaUser,
    FaCommentDots,
    FaBalanceScale,
} from "react-icons/fa";

const LawyerReviewsPage = () => {
    const { data: session } = authClient.useSession();

    const user = session?.user;

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!user?.email) return;
            try {
                const res = await axios.get(
                    `http://localhost:5000/reviews/lawyer/${user.email}`
                );

                setReviews(res.data || []);
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
                        sum + Number(review.rating || 0),
                    0
                ) / reviews.length
            ).toFixed(1)
            : 0;

    if (loading) {
        return (<div className="min-h-[70vh] flex flex-col justify-center items-center"> <div className="w-16 h-16 border-4 border-[#D4A95A] border-t-transparent rounded-full animate-spin"></div>


            <p className="mt-4 text-[#B88A44] font-medium">
                Loading Reviews...
            </p>
        </div>
        );


    }

    return (<div className="min-h-screen bg-[#F7F3EE] p-6 md:p-10">

        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
        >
            <h1 className="text-4xl md:text-5xl font-bold text-[#2B2118]">
                Client Reviews
            </h1>

            <p className="text-gray-500 mt-3">
                Reviews and ratings submitted by your clients.
            </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="
      bg-gradient-to-r
      from-[#D4A95A]
      via-[#C89A48]
      to-[#B88A44]
      rounded-3xl
      p-8
      text-white
      shadow-2xl
      mb-10
    "
        >
            <div className="flex flex-wrap items-center gap-6 justify-between">

                <div className="flex items-center gap-4">
                    <FaBalanceScale className="text-5xl" />

                    <div>
                        <h2 className="text-4xl font-bold">
                            {reviews.length}
                        </h2>

                        <p>Total Reviews</p>
                    </div>
                </div>

                <div className="text-right">
                    <h2 className="text-4xl font-bold">
                        {averageRating}
                    </h2>

                    <p>Average Rating</p>
                </div>

            </div>
        </motion.div>

        {reviews.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 shadow-lg text-center">

                <h2 className="text-3xl font-bold">
                    No Reviews Yet
                </h2>

                <p className="text-gray-500 mt-3">
                    No clients have submitted reviews yet.
                </p>

            </div>
        ) : (
            <div className="grid lg:grid-cols-2 gap-8">

                {reviews.map((review, index) => (
                    <motion.div
                        key={review._id}
                        initial={{
                            opacity: 0,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                        }}
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                        }}
                        className="
            bg-white
            rounded-3xl
            overflow-hidden
            shadow-lg
            hover:shadow-2xl
            border
            border-[#F3E3C7]
            transition-all
            duration-500
          "
                    >
                        <div className="h-1 bg-gradient-to-r from-[#D4A95A] to-[#B88A44]" />

                        <div className="p-7">

                            <div className="flex items-center gap-4 mb-5">

                                <div
                                    className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#D4A95A]
                  to-[#B88A44]
                  flex
                  items-center
                  justify-center
                  text-white
                "
                                >
                                    <FaUser />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-[#2B2118]">
                                        {review.clientName || "Client"}
                                    </h2>

                                    <p className="text-gray-500">
                                        {review.clientEmail}
                                    </p>
                                </div>

                            </div>

                            <div className="flex gap-1 mb-5">

                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={
                                            i < Number(review.rating)
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}

                            </div>

                            <div className="flex gap-3">

                                <FaCommentDots className="text-[#B88A44] mt-1" />

                                <p className="text-gray-700 leading-relaxed">
                                    {review.comment}
                                </p>

                            </div>

                            <div className="mt-6 pt-4 border-t border-[#F3E3C7] text-sm text-gray-500">

                                {new Date(
                                    review.createdAt
                                ).toLocaleDateString()}

                            </div>

                        </div>
                    </motion.div>
                ))}

            </div>
        )}
    </div>


    );
};

export default LawyerReviewsPage;
