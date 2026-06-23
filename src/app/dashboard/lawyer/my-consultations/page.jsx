"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import {
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaStickyNote,
} from "react-icons/fa";

const LawyerConsultationsPage = () => {
  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  const [consultations, setConsultations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchConsultations =
      async () => {
        if (!user?.email) return;

        try {
          const res =
            await axios.get(
              `http://localhost:5000/consultations/lawyer/${user.email}`
            );

          setConsultations(res.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchConsultations();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        My Consultations
      </h1>

      {consultations.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow text-center">
          <h2 className="text-2xl font-bold">
            No Consultations Yet
          </h2>

          <p className="text-gray-500 mt-3">
            No client has booked a consultation.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {consultations.map(
            (consultation) => (
              <div
                key={consultation._id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="space-y-4">

                  <div className="flex items-center gap-3">
                    <FaUser className="text-[#B88A44]" />

                    <div>
                      <h3 className="font-bold text-lg">
                        {
                          consultation.clientName
                        }
                      </h3>

                      <p className="text-sm text-gray-500">
                        Client
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-[#B88A44]" />

                    <span>
                      {
                        consultation.consultationDate
                      }
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaMoneyBillWave className="text-[#B88A44]" />

                    <span>
                      ${consultation.fee}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <FaStickyNote className="text-[#B88A44] mt-1" />

                    <p className="text-gray-600">
                      {consultation.notes}
                    </p>
                  </div>

                  <div>
                    <span className="badge badge-success">
                      {consultation.status}
                    </span>
                  </div>

                </div>
              </div>
            )
          )}

        </div>
      )}
    </div>
  );
};

export default LawyerConsultationsPage;