"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import {
  Clock3,
  CheckCircle2,
  XCircle,
  Users,
  Briefcase,
} from "lucide-react";

const LawyerHiringHistoryPage = () => {
  const { data: session } =
    authClient.useSession();

  const lawyerEmail =
    session?.user?.email;

  const [hirings, setHirings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!lawyerEmail) return;

      try {
        const res = await fetch(
          `http://localhost:5000/hirings/lawyer/${lawyerEmail}`
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
  }, [lawyerEmail]);

  const handleStatusUpdate = async (
    id,
    status
  ) => {
    try {
      await fetch(
        `http://localhost:5000/hirings/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      setHirings((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const pending =
    hirings.filter(
      (item) =>
        item.status === "pending"
    ).length;

  const accepted =
    hirings.filter(
      (item) =>
        item.status === "accepted"
    ).length;

  const rejected =
    hirings.filter(
      (item) =>
        item.status === "rejected"
    ).length;

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
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">

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
        <h1 className="text-4xl font-bold">
          Hiring Requests
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all incoming client
          requests.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white rounded-3xl p-6 shadow border">
          <Users
            size={32}
            className="text-[#B88A44]"
          />

          <h2 className="text-3xl font-bold mt-3">
            {hirings.length}
          </h2>

          <p className="text-gray-500">
            Total Requests
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow border">
          <Clock3
            size={32}
            className="text-amber-500"
          />

          <h2 className="text-3xl font-bold mt-3">
            {pending}
          </h2>

          <p className="text-gray-500">
            Pending
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow border">
          <CheckCircle2
            size={32}
            className="text-green-600"
          />

          <h2 className="text-3xl font-bold mt-3">
            {accepted}
          </h2>

          <p className="text-gray-500">
            Accepted
          </p>
        </div>
      </div>