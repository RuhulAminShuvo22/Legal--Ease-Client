"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";

const AddCommentPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/consultations/${id}`
        );

        setConsultation(res.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reviewData = {
        consultationId: consultation._id,

        lawyerId: consultation.lawyerId,
        lawyerName: consultation.lawyerName,
        lawyerEmail: consultation.lawyerEmail,

        clientName: user?.name,
        clientEmail: user?.email,

        rating,
        comment,

        createdAt: new Date(),
      };

      const res = await axios.post(
        "http://localhost:5000/reviews",
        reviewData
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted",
          text: "Thank you for your feedback.",
        });

        router.push("/dashboard/client/comments");
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          Consultation Not Found
        </h2>
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-[#F7F3EE] p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

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
            <label className="font-semibold block mb-2">
              Rating
            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(Number(e.target.value))
              }
              className="select select-bordered w-full"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Your Comment
            </label>

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              required
              placeholder="Write your experience..."
              className="textarea textarea-bordered w-full h-40"
            />
          </div>