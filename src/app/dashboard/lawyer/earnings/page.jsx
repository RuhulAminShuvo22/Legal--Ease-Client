"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  DollarSign,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

export default function EarningsPage() {
  const transactions = [
    {
      id: 1,
      client: "Rahim Ahmed",
      service: "Family Law Consultation",
      amount: "$120",
      date: "20 Jun 2026",
    },
    {
      id: 2,
      client: "Karim Hasan",
      service: "Property Case",
      amount: "$250",
      date: "18 Jun 2026",
    },
    {
      id: 3,
      client: "Nadia Akter",
      service: "Civil Law Consultation",
      amount: "$90",
      date: "15 Jun 2026",
    },
    {
      id: 4,
      client: "Sakib Islam",
      service: "Corporate Legal Advice",
      amount: "$180",
      date: "12 Jun 2026",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          rounded-[32px]
          bg-gradient-to-r
          from-[#D4A95A]
          via-[#C89A4D]
          to-[#B88746]
          p-8
          text-white
          shadow-xl
        "
      >
        <div className="flex items-center gap-5">
          <div className="rounded-3xl bg-white/20 p-4">
            <Wallet size={38} />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Earnings Dashboard
            </h1>

            <p className="mt-2 text-white/90">
              Track your income, transactions,
              and growth performance.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total Earnings",
            value: "$3,250",
            icon: Wallet,
          },
          {
            title: "This Month",
            value: "$850",
            icon: DollarSign,
          },
          {
            title: "Completed Payments",
            value: "42",
            icon: CreditCard,
          },
          {
            title: "Growth Rate",
            value: "+18%",
            icon: TrendingUp,
          },
        ].map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -5,
              }}
              className="
                rounded-[28px]
                border
                border-[#E8DDCD]
                bg-white
                p-6
                shadow-sm
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-[#3B2F1E]">
                    {item.value}
                  </h3>
                </div>

                <div className="rounded-2xl bg-[#FCF5EA] p-4">
                  <Icon
                    size={28}
                    className="text-[#B88746]"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Earnings Overview */}

      <div className="grid gap-8 lg:grid-cols-3">
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
            border
            border-[#E8DDCD]
            bg-white
            p-6
            shadow-sm
          "
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#3B2F1E]">
              Earnings Overview
            </h2>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              +18% This Month
            </span>
          </div>

          <div className="flex h-[300px] items-end justify-between gap-4">
            {[40, 60, 55, 75, 90, 80, 100].map(
              (height, i) => (
                <motion.div
                  key={i}
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height: `${height}%`,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                  }}
                  className="
                    flex-1
                    rounded-t-3xl
                    bg-gradient-to-t
                    from-[#B88746]
                    to-[#E0B46A]
                  "
                />
              )
            )}
          </div>
        </motion.div>

        {/* Balance Card */}

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
            border
            border-[#E8DDCD]
            bg-white
            p-6
            shadow-sm
          "
        >
          <h2 className="mb-6 text-2xl font-bold text-[#3B2F1E]">
            Available Balance
          </h2>

          <div className="rounded-3xl bg-[#FCF8F3] p-6">
            <p className="text-gray-500">
              Current Balance
            </p>

            <h3 className="mt-3 text-5xl font-bold text-[#B88746]">
              $1,250
            </h3>

            <button
              className="
                mt-6
                flex
                items-center
                gap-2
                rounded-2xl
                bg-[#D4A95A]
                px-5
                py-3
                font-semibold
                text-white
                transition
                hover:bg-[#B88746]
              "
            >
              Withdraw
              <ArrowUpRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Transactions */}

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
          border
          border-[#E8DDCD]
          bg-white
          p-6
          shadow-sm
        "
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#3B2F1E]">
            Recent Transactions
          </h2>

          <button className="font-semibold text-[#B88746]">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item) => (
                <tr key={item.id}>
                  <td>{item.client}</td>

                  <td>{item.service}</td>

                  <td>{item.date}</td>

                  <td>
                    <span className="font-bold text-green-600">
                      {item.amount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}