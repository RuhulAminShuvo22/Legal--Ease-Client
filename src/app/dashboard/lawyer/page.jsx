"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Clock3,
  CheckCircle,
  Wallet,
  Star,
  User,
} from "lucide-react";

export default function LawyerDashboard() {
  const stats = [
    {
      title: "Total Requests",
      value: 24,
      icon: BriefcaseBusiness,
    },
    {
      title: "Pending Requests",
      value: 5,
      icon: Clock3,
    },
    {
      title: "Accepted Cases",
      value: 18,
      icon: CheckCircle,
    },
    {
      title: "Total Earnings",
      value: "$3,250",
      icon: Wallet,
    },
  ];

  const recentRequests = [
    {
      client: "Rahim Ahmed",
      service: "Family Law",
      status: "Pending",
    },
    {
      client: "Karim Hasan",
      service: "Property Law",
      status: "Accepted",
    },
    {
      client: "Sakib Islam",
      service: "Corporate Law",
      status: "Accepted",
    },
    {
      client: "Nadia Akter",
      service: "Civil Law",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] bg-gradient-to-r from-[#D4A95A] to-[#B88A44] p-8 text-white shadow-xl"
      >
        <h1 className="text-4xl font-bold">
          Welcome Back, Counselor 👋
        </h1>

        <p className="mt-2 text-white/90">
          Manage your clients, requests, and earnings from
          one place.
        </p>
      </motion.div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                rounded-[28px]
                bg-white
                p-6
                border
                border-[#EFE5D6]
                shadow-lg
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    {item.value}
                  </h3>
                </div>

                <div className="rounded-2xl bg-[#FCF4E6] p-4">
                  <Icon
                    size={28}
                    className="text-[#B88A44]"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Requests */}

        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="
            lg:col-span-2
            rounded-[32px]
            bg-white
            p-6
            border
            border-[#EFE5D6]
            shadow-lg
          "
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Recent Hiring Requests
            </h2>

            <button className="text-[#B88A44] font-medium">
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentRequests.map((item, i) => (
                  <tr key={i}>
                    <td>{item.client}</td>

                    <td>{item.service}</td>

                    <td>
                      <span
                        className={`badge ${
                          item.status === "Accepted"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Profile Snapshot */}

        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="
            rounded-[32px]
            bg-white
            p-6
            border
            border-[#EFE5D6]
            shadow-lg
          "
        >
          <h2 className="text-2xl font-bold mb-6">
            Profile Snapshot
          </h2>

          <div className="flex flex-col items-center text-center">
            <div
              className="
              h-24
              w-24
              rounded-full
              bg-[#FCF4E6]
              flex
              items-center
              justify-center
            "
            >
              <User
                size={40}
                className="text-[#B88A44]"
              />
            </div>

            <h3 className="mt-4 text-xl font-bold">
              John Doe
            </h3>

            <p className="text-gray-500">
              Corporate Lawyer
            </p>

            <div className="mt-3 flex items-center gap-2">
              <Star
                className="text-yellow-500"
                size={18}
              />

              <span>4.9 Rating</span>
            </div>

            <span className="badge badge-success mt-4">
              Available
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span>Experience</span>

              <span className="font-semibold">
                8 Years
              </span>
            </div>

            <div className="flex justify-between">
              <span>Cases Won</span>

              <span className="font-semibold">
                142
              </span>
            </div>

            <div className="flex justify-between">
              <span>Consultation Fee</span>

              <span className="font-semibold">
                $120
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Earnings Section */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          rounded-[32px]
          bg-white
          p-8
          border
          border-[#EFE5D6]
          shadow-lg
        "
      >
        <h2 className="text-2xl font-bold mb-6">
          Earnings Overview
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-[#FCF8F3] p-6">
            <p className="text-gray-500">
              This Month
            </p>

            <h3 className="mt-2 text-4xl font-bold text-[#B88A44]">
              $450
            </h3>
          </div>

          <div className="rounded-2xl bg-[#FCF8F3] p-6">
            <p className="text-gray-500">
              Lifetime Earnings
            </p>

            <h3 className="mt-2 text-4xl font-bold text-[#B88A44]">
              $3,250
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
}