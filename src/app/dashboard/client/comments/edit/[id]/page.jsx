"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
//
const EditReviewPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const [review, setReview] =
        useState(null);

    const [rating, setRating] =
        useState(5);

    const [comment, setComment] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchReview =
            async () => {
                try {
                    const res =
                        await axios.get(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/${id}`
                        );


                    setReview(res.data);

                    setRating(
                        res.data.rating
                    );

                    setComment(
                        res.data.comment
                    );
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        if (id) {
            fetchReview();
        }


    }, [id]);

    const handleUpdate =
        async (e) => {
            e.preventDefault();


            try {
                const res =
                    await axios.patch(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/${id}`,
                        {
                            rating,
                            comment,
                        }
                    );

                if (res.data.success) {
                    Swal.fire({
                        icon: "success",
                        title:
                            "Review Updated",
                        text:
                            "Your review has been updated successfully.",
                    });

                    router.push(
                        "/dashboard/client/comments"
                    );
                }
            } catch (error) {
                console.log(error);

                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text:
                        "Failed to update review.",
                });
            }
        };


    if (loading) {
        return (<div className="min-h-screen flex justify-center items-center"> <span className="loading loading-spinner loading-lg"></span> </div>
        );
    }

    if (!review) {
        return (<div className="text-center py-20"> <h2 className="text-3xl font-bold">
            Review Not Found </h2> </div>
        );
    }
    return (<div className="min-h-screen bg-[#F7F3EE] p-6">


        <motion.div
            initial={{
                opacity: 0,
                y: 30,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8"
        >

            <h1 className="text-4xl font-bold text-[#B88A44] mb-8">
                Edit Review
            </h1>

            <div className="bg-[#FFF8EC] p-6 rounded-2xl mb-8">

                <h2 className="text-2xl font-bold">
                    {review.lawyerName}
                </h2>

                <p className="text-gray-500 mt-2">
                    Update your review and rating.
                </p>

            </div>

            <form
                onSubmit={handleUpdate}
                className="space-y-6"
            >

                <div>
                    <label className="font-semibold block mb-3">
                        Rating
                    </label>

                    <div className="flex gap-3 text-4xl">

                        {[1, 2, 3, 4, 5].map(
                            (star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() =>
                                        setRating(
                                            star
                                        )
                                    }
                                    className={`transition ${star <= rating
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                >
                                    <FaStar />
                                </button>
                            )
                        )}

                    </div>

                </div>

                <div>
                    <label className="font-semibold block mb-2">
                        Comment
                    </label>

                    <textarea
                        value={comment}
                        onChange={(e) =>
                            setComment(
                                e.target.value
                            )
                        }
                        required
                        className="textarea textarea-bordered w-full h-40"
                    />
                </div>

                <button
                    type="submit"
                    className="
        w-full
        py-4
        rounded-2xl
        bg-gradient-to-r
        from-[#D4A95A]
        via-[#C89A48]
        to-[#B88A44]
        text-white
        font-bold
        text-lg
        shadow-xl
        hover:scale-[1.02]
        transition
        "
                >
                    Update Review
                </button>

            </form>

        </motion.div>

    </div>


    );
};

export default EditReviewPage;

