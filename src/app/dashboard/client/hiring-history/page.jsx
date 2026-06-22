"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import {
  Clock3,
  CheckCircle2,
  XCircle,
  CreditCard,
  Briefcase,
  Wallet,
  Scale,
  TrendingUp,
} from "lucide-react";

const HiringHistoryPage = () => {
  const { data: session } =
    authClient.useSession();

  const email =
    session?.user?.email;

  const [hirings, setHirings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!email) return;

      try {
        const res = await fetch(
          `http://localhost:5000/hirings/client/${email}`
        );

        const data =
          await res.json();

        setHirings(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const pending =
    hirings.filter(
      (item) => item.status === "pending"
    ).length;

  const accepted =
    hirings.filter(
      (item) => item.status === "accepted"
    ).length;

  const rejected =
    hirings.filter(
      (item) => item.status === "rejected"
    ).length;

  const totalSpent = hirings
    .filter(
      (item) =>
        item.paymentStatus === "paid"
    )
    .reduce(
      (sum, item) =>
        sum + Number(item.fee || 0),
      0
    );

  const getStatusBadge = (
    status
  ) => {
    switch (status) {
      case "accepted":
        return (
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700 font-medium">
            <CheckCircle2 size={16} />
            Accepted
          </div>
        );

      case "rejected":
        return (
          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-red-700 font-medium">
            <XCircle size={16} />
            Rejected
          </div>
        );

      default:
        return (
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-amber-700 font-medium">
            <Clock3 size={16} />
            Pending
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="h-14 w-14 rounded-full border-4 border-[#D4A95A] border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">

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
      >
        <h1 className="text-4xl font-bold text-[#1E1E1E]">
          Hiring History
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Track and manage all your
          lawyer hiring requests.
        </p>
      </motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-5">

        <motion.div
          whileHover={{
            y: -6,
          }}
          className="rounded-3xl bg-white p-6 shadow-lg border"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Total Requests
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {hirings.length}
              </h2>
            </div>

            <Scale
              className="text-[#B88A44]"
              size={34}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -6,
          }}
          className="rounded-3xl bg-white p-6 shadow-lg border"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Accepted
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {accepted}
              </h2>
            </div>

            <CheckCircle2
              className="text-green-600"
              size={34}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -6,
          }}
          className="rounded-3xl bg-white p-6 shadow-lg border"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-amber-600 mt-2">
                {pending}
              </h2>
            </div>

            <TrendingUp
              className="text-amber-600"
              size={34}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -6,
          }}
          className="rounded-3xl bg-white p-6 shadow-lg border"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Total Paid
              </p>

              <h2 className="text-3xl font-bold text-[#B88A44] mt-2">
                ${totalSpent}
              </h2>
            </div>

            <Wallet
              className="text-[#B88A44]"
              size={34}
            />
          </div>
        </motion.div>

      </div>
      