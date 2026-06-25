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
              `${process.env.NEXT_PUBLIC_SERVER_URL}/earnings/lawyer/${user.email}`
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
  return (
    <div className="min-h-screen bg-[#F7F3EE] p-6 md:p-10">

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
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#2B2118]">
          Earnings Dashboard
        </h1>

        <p className="text-gray-500 mt-3">
          Track your total earnings and paid legal cases.
        </p>

      </motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-8 mb-10">

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

            <FaDollarSign className="text-5xl" />

            <div>

              <h2 className="text-4xl font-bold">
                ${totalEarnings}
              </h2>

              <p className="opacity-90">
                Total Earnings
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

            <FaBalanceScale
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
                {totalCases}
              </h2>

              <p className="text-gray-500">
                Paid Cases
              </p>

            </div>

          </div>
        </motion.div>

      </div>

      {/* Summary Card */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
                bg-white
                rounded-3xl
                p-8
                shadow-xl
                border
                border-[#F3E3C7]
                mb-10
                "
      >
        <h2
          className="
                    text-2xl
                    font-bold
                    text-[#2B2118]
                    mb-4
                    "
        >
          Earnings Summary
        </h2>

        <p className="text-gray-600 leading-relaxed">

          You have successfully completed{" "}
          <span className="font-bold text-[#B88A44]">
            {totalCases}
          </span>{" "}
          paid legal cases and earned a total of{" "}
          <span className="font-bold text-[#B88A44]">
            ${totalEarnings}
          </span>.

        </p>

      </motion.div>

      {/* Earnings History */}

      {hirings.length === 0 ? (

        <div
          className="
                    bg-white
                    rounded-3xl
                    p-12
                    shadow-xl
                    text-center
                    "
        >
          <h2 className="text-3xl font-bold">
            No Earnings Yet
          </h2>

          <p className="text-gray-500 mt-3">
            No paid cases found.
          </p>

        </div>

      ) : (

        <div className="space-y-6">
          {hirings.map(
            (
              hiring,
              index
            ) => (
              <motion.div
                key={hiring._id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay:
                    index * 0.05,
                }}
                whileHover={{
                  y: -4,
                }}
                className="
                                bg-white
                                rounded-3xl
                                p-6
                                shadow-lg
                                border
                                border-[#F3E3C7]
                                "
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <h3
                      className="
                                            text-xl
                                            font-bold
                                            text-[#2B2118]
                                            "
                    >
                      {
                        hiring.clientName
                      }
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {
                        hiring.clientEmail
                      }
                    </p>

                  </div>

                  <div className="text-left md:text-right">

                    <h3
                      className="
                                            text-3xl
                                            font-bold
                                            text-[#B88A44]
                                            "
                    >
                      $
                      {Number(
                        hiring.fee || 0
                      )}
                    </h3>

                    <span
                      className="
                                            badge
                                            bg-green-100
                                            text-green-700
                                            border-green-200
                                            mt-2
                                            "
                    >
                      Paid
                    </span>

                  </div>

                </div>

                <div
                  className="
                                    mt-5
                                    pt-4
                                    border-t
                                    border-[#F3E3C7]
                                    text-sm
                                    text-gray-500
                                    "
                >
                  Payment Date:{" "}
                  {new Date(
                    hiring.createdAt
                  ).toLocaleDateString()}
                </div>

              </motion.div>
            )
          )}

        </div>

      )}

    </div>
  );
};

export default EarningsPage;