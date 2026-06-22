"use client";

import { motion } from "framer-motion";
import {
  Users,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function MyClientsPage() {
  const clients = [
    {
      id: 1,
      name: "Rahim Ahmed",
      email: "rahim@gmail.com",
      phone: "+8801712345678",
      caseType: "Family Law",
      status: "Active",
    },
    {
      id: 2,
      name: "Karim Hasan",
      email: "karim@gmail.com",
      phone: "+8801812345678",
      caseType: "Property Law",
      status: "Active",
    },
    {
      id: 3,
      name: "Nadia Akter",
      email: "nadia@gmail.com",
      phone: "+8801912345678",
      caseType: "Civil Law",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[30px] bg-gradient-to-r from-[#D4A95A] to-[#B88746] p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <Users size={35} />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              My Clients
            </h1>

            <p className="mt-2 text-white/90">
              Manage all your active and pending clients.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-[#EADCC7] bg-white p-6 shadow-sm">
          <h3 className="text-gray-500">
            Total Clients
          </h3>

          <p className="mt-2 text-4xl font-bold text-[#B88746]">
            24
          </p>
        </div>

        <div className="rounded-3xl border border-[#EADCC7] bg-white p-6 shadow-sm">
          <h3 className="text-gray-500">
            Active Clients
          </h3>

          <p className="mt-2 text-4xl font-bold text-green-600">
            18
          </p>
        </div>

        <div className="rounded-3xl border border-[#EADCC7] bg-white p-6 shadow-sm">
          <h3 className="text-gray-500">
            Pending Clients
          </h3>

          <p className="mt-2 text-4xl font-bold text-orange-500">
            6
          </p>
        </div>
      </div>

      {/* Clients List */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[30px] border border-[#EADCC7] bg-white p-6 shadow-sm"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#3B2F1E]">
            Client List
          </h2>

          <button className="font-semibold text-[#B88746]">
            View All
          </button>
        </div>

        <div className="space-y-5">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -3,
              }}
              className="rounded-3xl border border-[#F1E7D8] bg-[#FCFAF7] p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#3B2F1E]">
                    {client.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {client.caseType}
                  </p>
                </div>

                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail size={15} />
                    {client.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={15} />
                    {client.phone}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      client.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {client.status}
                  </span>

                  <button
                    className="
                      flex items-center gap-2
                      rounded-xl
                      bg-[#D4A95A]
                      px-4
                      py-2
                      text-white
                      transition
                      hover:bg-[#B88746]
                    "
                  >
                    Details
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}