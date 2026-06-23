"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

import {
  LayoutDashboard,
  Users,
  ReceiptText,
  BarChart3,
  BriefcaseBusiness,
  MessageSquareText,
  UserCog,
  History,
  Wallet,
  CalendarCheck,
} from "lucide-react";

const sidebarLinks = {
  admin: [
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: Users,
    },
    {
      name: "All Transactions",
      href: "/dashboard/admin/all-transactions",
      icon: ReceiptText,
    },
    {
      name: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: BarChart3,
    },
  ],

  lawyer: [
    {
      name: "Dashboard",
      href: "/dashboard/lawyer",
      icon: LayoutDashboard,
    },
    {
      name: "Hiring Requests",
      href: "/dashboard/lawyer/hiring-history",
      icon: History,
    },
    {
      name: "Manage Services",
      href: "/dashboard/lawyer/manage-legal-profile",
      icon: BriefcaseBusiness,
    },
    {
      name: "My Clients",
      href: "/dashboard/lawyer/my-clients",
      icon: Users,
    },
    {
      name: "Earnings",
      href: "/dashboard/lawyer/earnings",
      icon: Wallet,
    },
  ],

  client: [
    {
      name: "Dashboard",
      href: "/dashboard/client",
      icon: LayoutDashboard,
    },
    {
      name: "Hiring History",
      href: "/dashboard/client/hiring-history",
      icon: History,
    },
    {
      name: "My Consultations",
      href: "/dashboard/client/my-consultations",
      icon: CalendarCheck,
    },
    {
      name: "Comments",
      href: "/dashboard/client/comments",
      icon: MessageSquareText,
    },
    {
      name: "Update Profile",
      href: "/dashboard/client/update-profile",
      icon: UserCog,
    },
  ],
};

export default function DashboardLayout({
  children,
}) {
  const pathname = usePathname() || "";

  const [user, setUser] = useState(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      try {
        const session =
          await authClient.getSession();

        if (!mounted) return;

        if (!session?.data?.user) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `http://localhost:5000/users/${session.data.user.email}`
        );

        const dbUser =
          await res.json();

        if (mounted) {
          setUser(dbUser);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getUser();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FDFBF7] via-[#F8F5EF] to-[#F2EBDD]">
        <motion.div
          animate={{ rotate: 360 }}
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

  const links =
    sidebarLinks[user?.role] || [];

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-gradient-to-br from-[#FDFBF7] via-[#F8F5EF] to-[#F2EBDD]">

      <div className="absolute top-20 right-20 w-72 h-72 bg-[#D4A95A]/10 rounded-full blur-3xl" />

      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#B88A44]/10 rounded-full blur-3xl" />

      <motion.aside
        initial={{
          x: -80,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
        }}
        className="
        w-72
        m-4
        flex
        flex-col
        shrink-0
        rounded-[36px]
        bg-white/90
        backdrop-blur-xl
        border
        border-white/60
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        overflow-hidden
        "
      >
        <div className="border-b border-[#E8DDCF] p-6">

          <div className="flex items-center gap-3">
            <Image
              src="/newlogo.png"
              alt="LegalEase"
              width={65}
              height={65}
              priority
            />

            <div>
              <h2 className="text-3xl font-bold text-[#1E1E1E]">
                LegalEase
              </h2>

              <p className="text-xs text-[#B88A44] tracking-wider">
                Legal Management
              </p>
            </div>
          </div>

          <div className="mt-5">
            <motion.div
              animate={{
                width: [
                  "20%",
                  "100%",
                  "20%",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="h-[3px] rounded-full bg-gradient-to-r from-[#D4A95A] to-[#B88A44]"
            />
          </div>
        </div>

        {user && (
          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
            m-4
            rounded-[28px]
            bg-gradient-to-br
            from-[#FFFDF9]
            to-[#FCF8F3]
            border
            border-[#E8DDCF]
            p-5
            shadow-lg
            "
          >
            <div className="flex items-center gap-4">

              <Image
                src={
                  user.image ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt="user"
                width={60}
                height={60}
                className="rounded-full object-cover ring-4 ring-[#D4A95A]/20"
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {user.name}
                </h3>

                <span className="mt-2 inline-block rounded-full bg-[#F1DFC0] px-3 py-1 text-xs font-medium text-[#B88A44]">
                  {user.role}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="px-4 pt-2">

          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[3px] text-[#B88A44]">
            Menu
          </p>

          <nav className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;

              const active =
                pathname === link.href ||
                pathname.startsWith(
                  `${link.href}/`
                );

              return (
                <motion.div
                  key={link.href}
                  whileHover={{
                    x: 8,
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  <Link
                    href={link.href}
                    className={`
                    group flex items-center gap-3
                    rounded-2xl px-4 py-3
                    font-medium transition-all duration-300

                    ${active
                        ? `
                        bg-gradient-to-r
                        from-[#D4A95A]
                        to-[#B88A44]
                        text-white
                        shadow-[0_12px_30px_rgba(212,169,90,0.4)]
                        `
                        : `
                        text-gray-700
                        hover:bg-[#F4ECE2]
                        hover:text-[#B88A44]
                        `
                      }
                  `}
                  >
                    <Icon size={20} />
                    <span>{link.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-5">

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
            rounded-3xl
            bg-gradient-to-r
            from-[#D4A95A]/10
            to-[#B88A44]/10
            p-5
            text-center
            border
            border-[#E8DDCF]
            "
          >
            <p className="text-xs text-gray-500">
              LegalEase Dashboard
            </p>

            <h4 className="mt-1 font-semibold text-[#B88A44]">
              Premium Workspace
            </h4>
          </motion.div>
        </div>

      </motion.aside>

      <main className="flex-1 p-4 md:p-6 overflow-auto">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
          relative
          min-h-[calc(100vh-32px)]
          rounded-[40px]
          bg-white/90
          backdrop-blur-xl
          border
          border-white
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          overflow-hidden
          "
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D4A95A]/10 rounded-full blur-3xl" />

          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#B88A44]/10 rounded-full blur-3xl" />

          <div className="relative z-10 border-b border-[#F0E6D9] px-8 py-6">

            <div className="flex items-center justify-between">

              <div>
                <h1 className="text-3xl font-bold text-[#1E1E1E]">
                  Welcome Back
                </h1>

                <p className="mt-1 text-gray-500">
                  Manage your legal workspace efficiently
                </p>
              </div>

              {user && (
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="
                  hidden md:flex
                  items-center gap-3
                  rounded-2xl
                  bg-[#FCF8F3]
                  px-4 py-2
                  border border-[#E8DDCF]
                  "
                >
                  <Image
                    src={
                      user.image ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="profile"
                    width={45}
                    height={45}
                    className="rounded-full"
                  />

                  <div>
                    <p className="font-semibold text-sm">
                      {user.name}
                    </p>

                    <p className="text-xs text-[#B88A44] capitalize">
                      {user.role}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="relative z-10 p-8">
            {children}
          </div>

        </motion.div>
      </main>
    </div>
  );
}