"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import {
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaUserTie,
} from "react-icons/fa";

const MyClientsPage = () => {
  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  const [clients, setClients] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchClients =
      async () => {
        if (!user?.email) return;

        try {
          const res =
            await axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/lawyer/${user.email}`
            );

          setClients(res.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchClients();
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
          My Clients
        </h1>

        <p className="text-gray-500 mt-3">
          View and manage all your active clients.
        </p>

      </motion.div>

      {/* Stats Card */}

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
                bg-gradient-to-r
                from-[#D4A95A]
                via-[#C89A48]
                to-[#B88A44]
                rounded-3xl
                p-8
                text-white
                shadow-2xl
                mb-10
                "
      >
        <div className="flex items-center gap-5">

          <FaUsers className="text-5xl" />

          <div>

            <h2 className="text-4xl font-bold">
              {clients.length}
            </h2>

            <p className="opacity-90">
              Total Active Clients
            </p>

          </div>

        </div>

      </motion.div>

      {/* Empty State */}

      {clients.length === 0 ? (

        <div
          className="
                    bg-white
                    rounded-3xl
                    p-12
                    shadow-lg
                    text-center
                    "
        >

          <FaUserTie
            className="
                        text-6xl
                        text-[#D4A95A]
                        mx-auto
                        mb-5
                        "
          />

          <h2 className="text-3xl font-bold">
            No Clients Found
          </h2>

          <p className="text-gray-500 mt-3">
            You do not have any active clients yet.
          </p>

        </div>

      ) : (

        <div className="grid lg:grid-cols-2 gap-8">
          {clients.map(
            (
              client,
              index
            ) => (

              <motion.div
                key={client._id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay:
                    index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="
                                bg-white
                                rounded-3xl
                                overflow-hidden
                                shadow-lg
                                hover:shadow-2xl
                                border
                                border-[#F3E3C7]
                                transition-all
                                duration-500
                                "
              >

                <div
                  className="
                                    h-1
                                    bg-gradient-to-r
                                    from-[#D4A95A]
                                    to-[#B88A44]
                                    "
                />

                <div className="p-7">

                  <div className="flex items-center gap-4 mb-6">

                    <div
                      className="
                                            w-16
                                            h-16
                                            rounded-2xl
                                            bg-gradient-to-r
                                            from-[#D4A95A]
                                            to-[#B88A44]
                                            flex
                                            items-center
                                            justify-center
                                            text-white
                                            shadow-lg
                                            "
                    >
                      <FaUserTie size={22} />
                    </div>

                    <div>

                      <h2
                        className="
                                                text-2xl
                                                font-bold
                                                text-[#2B2118]
                                                "
                      >
                        {
                          client.clientName
                        }
                      </h2>

                      <p className="text-gray-500">
                        Client
                      </p>

                    </div>

                  </div>

                  <div className="space-y-4">

                    <div className="flex items-center gap-3">

                      <FaEnvelope className="text-[#B88A44]" />

                      <span>
                        {
                          client.clientEmail
                        }
                      </span>

                    </div>

                    {client.clientPhone && (

                      <div className="flex items-center gap-3">

                        <FaPhone className="text-[#B88A44]" />

                        <span>
                          {
                            client.clientPhone
                          }
                        </span>

                      </div>

                    )}

                  </div>

                  <div
                    className="
                                        mt-6
                                        pt-4
                                        border-t
                                        border-[#F3E3C7]
                                        text-sm
                                        text-gray-500
                                        "
                  >
                    Client Since:{" "}
                    {new Date(
                      client.createdAt
                    ).toLocaleDateString()}
                  </div>

                </div>

              </motion.div>

            )
          )}

        </div>

      )}

    </div>
  );
};

export default MyClientsPage;