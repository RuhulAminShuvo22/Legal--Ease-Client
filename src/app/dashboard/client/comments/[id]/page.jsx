"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const AddCommentPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const { data: session } =
        authClient.useSession();

    const user = session?.user;

    const [consultation, setConsultation] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [rating, setRating] =
        useState(5);

    const [comment, setComment] =
        useState("");

    useEffect(() => {
        const fetchConsultation =
            async () => {
                try {
                    const res =
                        await axios.get(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/consultations/${id}`
                        );


                    setConsultation(
                        res.data
                    );
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        if (id) {
            fetchConsultation();
        }


    }, [id]);

    const handleSubmit =
        async (e) => {
            e.preventDefault();


            try {
                const reviewData = {
                    consultationId:
                        consultation._id,

                    lawyerId:
                        consultation.lawyerId,

                    lawyerName:
                        consultation.lawyerName,

                    lawyerEmail:
                        consultation.lawyerEmail,

                    clientName:
                        user?.name,

                    clientEmail:
                        user?.email,

                    rating,
                    comment,

                    createdAt:
                        new Date(),
                };

                const res =
                    await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews`,
                        reviewData
                    );

                if (res.data.success) {
                    await axios.patch(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/consultations/${consultation._id}`,
                        {
                            reviewSubmitted:
                                true,
                        }
                    );

                    Swal.fire({
                        icon: "success",
                        title:
                            "Review Submitted",
                        text:
                            "Thank you for your feedback.",
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
                        error?.response?.data
                            ?.message ||
                        "Something went wrong.",
                });
            }
        };


    if (loading) {
        return (<div className="min-h-screen flex justify-center items-center"> <span className="loading loading-spinner loading-lg"></span> </div>
        );
    }

    if (!consultation) {
        return (<div className="text-center py-20"> <h2 className="text-3xl font-bold">
            Consultation Not Found </h2> </div>
        );
    }

    if (
        consultation.status?.toLowerCase() !==
        "completed"
    ) {
        return (<div className="min-h-screen flex items-center justify-center"> <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg"> <h2 className="text-3xl font-bold text-red-600">
            Review Not Allowed </h2>


            <p className="mt-4 text-gray-500">
                Consultation must be completed before submitting a review.
            </p>
        </div>
        </div>
        );
    }
    return (<div className="min-h-screen bg-[#F7F3EE] p-6">

        ```
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
                Leave A Review
            </h1>

            <div className="bg-[#FFF8EC] p-6 rounded-2xl mb-8">

                <h2 className="text-2xl font-bold">
                    {consultation.lawyerName}
                </h2>

                <p className="text-gray-500 mt-2">
                    Share your experience with this lawyer
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
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
                                    className={`transition ${star <=
                                        rating
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
                        Your Comment
                    </label>

                    <textarea
                        value={comment}
                        onChange={(e) =>
                            setComment(
                                e.target.value
                            )
                        }
                        required
                        placeholder="Write your experience..."
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
                    Submit Review
                </button>

            </form>

        </motion.div>

    </div>
    );
};
export default AddCommentPage;

