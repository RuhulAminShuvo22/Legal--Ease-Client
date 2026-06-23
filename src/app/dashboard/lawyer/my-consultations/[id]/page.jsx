"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

const ConsultationDetailsPage = () => {
  const { id } = useParams();

  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8"
      >

        <h1 className="text-4xl font-bold mb-8 text-[#B88A44]">
          Consultation Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-[#FFF8EC] p-5 rounded-2xl">
            <h3 className="font-semibold text-gray-500">
              Client Name
            </h3>
            <p className="text-xl font-bold mt-2">
              {consultation.clientName}
            </p>
          </div>

          <div className="bg-[#FFF8EC] p-5 rounded-2xl">
            <h3 className="font-semibold text-gray-500">
              Client Email
            </h3>
            <p className="text-xl font-bold mt-2">
              {consultation.clientEmail}
            </p>
          </div>

          <div className="bg-[#FFF8EC] p-5 rounded-2xl">
            <h3 className="font-semibold text-gray-500">
              Lawyer Name
            </h3>
            <p className="text-xl font-bold mt-2">
              {consultation.lawyerName}
            </p>
          </div>

          <div className="bg-[#FFF8EC] p-5 rounded-2xl">
            <h3 className="font-semibold text-gray-500">
              Consultation Fee
            </h3>
            <p className="text-xl font-bold mt-2">
              ${consultation.fee}
            </p>
          </div>

          <div className="bg-[#FFF8EC] p-5 rounded-2xl">
            <h3 className="font-semibold text-gray-500">
              Consultation Date
            </h3>
            <p className="text-xl font-bold mt-2">
              {new Date(
                consultation.consultationDate
              ).toLocaleString()}
            </p>
          </div>

          <div className="bg-[#FFF8EC] p-5 rounded-2xl">
            <h3 className="font-semibold text-gray-500">
              Status
            </h3>
            <p className="text-xl font-bold mt-2 text-green-600">
              {consultation.status}
            </p>
          </div>

        </div>

        <div className="mt-8 bg-[#FFF8EC] p-6 rounded-2xl">
          <h3 className="font-semibold text-gray-500 mb-3">
            Client Notes
          </h3>

          <p className="text-lg">
            {consultation.notes ||
              "No notes provided"}
          </p>
        </div>

      </motion.div>

    </div>
  );
};

export default ConsultationDetailsPage;