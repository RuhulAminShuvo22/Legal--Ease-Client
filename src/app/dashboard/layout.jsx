
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";

import {
  LayoutDashboard,
  Users,
  Star,
  ReceiptText,
  BarChart3,
  BriefcaseBusiness,
  MessageSquareText,
  UserCog,
  History,
  Wallet,
  CalendarCheck,
  CalendarDays,
  Menu,
  X,
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
      name: "My Consultations",
      href: "/dashboard/lawyer/my-consultations",
      icon: CalendarDays,
    },
    {
      name: "Client Reviews",
      href: "/dashboard/lawyer/reviews",
      icon: Star,
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

  const [sidebarOpen, setSidebarOpen] = useState(false);
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

        const email =
          session?.data?.user?.email;

        if (!email) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${email}`
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch user"
          );
        }

        const dbUser =
          await res.json();

        if (mounted) {
          setUser(dbUser);
        }
      } catch (error) {
        console.error(
          "User fetch error:",
          error
        );
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
      <div
        className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gradient-to-br
        from-[#FDFBF7]
        via-[#F8F5EF]
        to-[#F2EBDD]
      "
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="
          h-14
          w-14
          rounded-full
          border-4
          border-[#D4A95A]
          border-t-transparent
        "
        />
      </div>
    );
  }

  if (!user) {
    return null;
  }
  const roleRoutes = {
    admin: "/dashboard/admin",
    lawyer: "/dashboard/lawyer",
    client: "/dashboard/client",
  };

  const allowedRoute =
    roleRoutes[user?.role];

  if (
    allowedRoute &&
    pathname.startsWith("/dashboard") &&
    !pathname.startsWith(allowedRoute)
  ) {
    return (
      <div
        className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gradient-to-br
        from-[#FDFBF7]
        via-[#F8F5EF]
        to-[#F2EBDD]
      "
      >
        <div
          className="
          mx-4
          rounded-3xl
          bg-white
          p-6
          md:p-10
          shadow-xl
          text-center
          max-w-md
          w-full
        "
        >
          <h2
            className="
            text-2xl
            md:text-3xl
            font-bold
            text-red-500
            mb-3
          "
          >
            Access Denied
          </h2>

          <p className="text-gray-600">
            You do not have permission
            to access this page.
          </p>
        </div>
      </div>
    );
  }

  const links =
    sidebarLinks[user?.role] || [];

  return (
    <div
      className="
      relative
      min-h-screen
      flex
      overflow-x-hidden
      bg-gradient-to-br
      from-[#FDFBF7]
      via-[#F8F5EF]
      to-[#F2EBDD]
    "
    >
      <div
        className="
        absolute
        top-20
        right-20
        h-72
        w-72
        rounded-full
        bg-[#D4A95A]/10
        blur-3xl
      "
      />

      <div
        className="
        absolute
        bottom-20
        left-20
        h-96
        w-96
        rounded-full
        bg-[#B88A44]/10
        blur-3xl
      "
      />

      {/* MOBILE HEADER */}

      <div
        className="
        fixed
        top-0
        left-0
        right-0
        z-50
        flex
        items-center
        justify-between
        border-b
        border-[#E8DDCF]
        bg-white/95
        px-4
        py-3
        backdrop-blur-xl
        lg:hidden
      "
      >
        <div className="flex items-center gap-2">
          <Image
            src="/newlogo.png"
            alt="logo"
            width={40}
            height={40}
          />

          <h2
            className="
            text-lg
            font-bold
            text-[#1E1E1E]
          "
          >
            LegalEase
          </h2>
        </div>

        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="
          rounded-xl
          p-2
          transition
          hover:bg-gray-100
        "
        >
          <Menu size={24} />
        </button>
      </div>

      {/* MOBILE SIDEBAR BACKDROP */}

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setSidebarOpen(false)
            }
            className="
            fixed
            inset-0
            z-40
            bg-black/40
            lg:hidden
          "
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {(sidebarOpen || true) && (
          <motion.aside
            initial={{
              x: -100,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: -100,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className={`
              fixed lg:relative
              top-0 left-0
              z-50 lg:z-auto

              h-screen lg:h-auto

              w-[85%]
              max-w-[320px]
              lg:max-w-none
              lg:w-72
              xl:w-80

              m-0 lg:m-4

              flex flex-col
              shrink-0

              rounded-none
              lg:rounded-[36px]

              bg-white/95
              lg:bg-white/90

              backdrop-blur-xl

              border-r lg:border
              border-[#E8DDCF]

              shadow-2xl
              lg:shadow-[0_20px_60px_rgba(0,0,0,0.08)]

              overflow-y-auto

              ${sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
              }
            `}
          >
            {/* MOBILE CLOSE BUTTON */}

            <div className="flex items-center justify-between p-5 lg:hidden">
              <div className="flex items-center gap-2">
                <Image
                  src="/newlogo.png"
                  alt="logo"
                  width={42}
                  height={42}
                />

                <h2 className="font-bold text-lg">
                  LegalEase
                </h2>
              </div>

              <button
                onClick={() =>
                  setSidebarOpen(false)
                }
                className="
                  rounded-xl
                  p-2
                  hover:bg-gray-100
                "
              >
                <X size={22} />
              </button>
            </div>

            {/* DESKTOP HEADER */}

            <div className="hidden lg:block border-b border-[#E8DDCF] p-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/newlogo.png"
                  alt="LegalEase"
                  width={65}
                  height={65}
                  priority
                />

                <div>
                  <h2
                    className="
                    text-2xl
                    xl:text-3xl
                    font-bold
                    text-[#1E1E1E]
                  "
                  >
                    LegalEase
                  </h2>

                  <p
                    className="
                    text-xs
                    text-[#B88A44]
                    tracking-wider
                  "
                  >
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
                  className="
                  h-[3px]
                  rounded-full
                  bg-gradient-to-r
                  from-[#D4A95A]
                  to-[#B88A44]
                "
                />
              </div>
            </div>

            {/* USER CARD */}

            <div
              className="
              m-4
              rounded-[24px]
              border
              border-[#E8DDCF]
              bg-gradient-to-br
              from-[#FFFDF9]
              to-[#FCF8F3]
              p-4
              shadow-lg
            "
            >
              <div className="flex items-center gap-3">
                <Image
                  src={
                    user?.image ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="user"
                  width={58}
                  height={58}
                  unoptimized
                  className="
                  rounded-full
                  object-cover
                  ring-4
                  ring-[#D4A95A]/20
                "
                />

                <div className="min-w-0 flex-1">
                  <h3
                    className="
                    truncate
                    font-semibold
                    text-base
                    md:text-lg
                  "
                  >
                    {user?.name}
                  </h3>

                  <span
                    className="
                    mt-2
                    inline-block
                    rounded-full
                    bg-[#F1DFC0]
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-[#B88A44]
                    capitalize
                  "
                  >
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>

            {/* MENU */}

            <div className="px-4 pt-1">
              <p
                className="
                mb-4
                px-3
                text-xs
                font-semibold
                uppercase
                tracking-[3px]
                text-[#B88A44]
              "
              >
                Menu
              </p>

              <nav className="space-y-2">
                {links.map((link) => {
                  const Icon =
                    link.icon;

                  const active =
                    pathname ===
                    link.href ||
                    pathname.startsWith(
                      `${link.href}/`
                    );

                  return (
                    <motion.div
                      key={link.href}
                      whileHover={{
                        x: 5,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() =>
                          setSidebarOpen(
                            false
                          )
                        }
                        className={`
                        flex
                        items-center
                        gap-3

                        rounded-2xl

                        px-4
                        py-3

                        font-medium

                        transition-all
                        duration-300

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
                        <Icon
                          size={20}
                        />

                        <span>
                          {link.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
            {/* SIDEBAR FOOTER */}

            <div className="mt-auto p-4 lg:p-5">
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                className="
                rounded-3xl
                border
                border-[#E8DDCF]
                bg-gradient-to-r
                from-[#D4A95A]/10
                to-[#B88A44]/10
                p-5
                text-center
              "
              >
                <p className="text-xs text-gray-500">
                  LegalEase Dashboard
                </p>

                <h4
                  className="
                  mt-1
                  font-semibold
                  text-[#B88A44]
                "
                >
                  Premium Workspace
                </h4>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}

      <main
        className="
        flex-1

        pt-[78px]
        lg:pt-4

        p-3
        md:p-5
        lg:p-4
        xl:p-6

        overflow-x-hidden
        overflow-y-auto
      "
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
          relative

          min-h-[calc(100vh-110px)]
          lg:min-h-[calc(100vh-32px)]

          overflow-hidden

          rounded-[24px]
          md:rounded-[32px]
          lg:rounded-[40px]

          border
          border-white

          bg-white/90
          backdrop-blur-xl

          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        "
        >
          {/* DECORATION */}

          <div
            className="
            absolute
            -top-24
            -right-24
            h-72
            w-72
            rounded-full
            bg-[#D4A95A]/10
            blur-3xl
          "
          />

          <div
            className="
            absolute
            -bottom-24
            -left-24
            h-72
            w-72
            rounded-full
            bg-[#B88A44]/10
            blur-3xl
          "
          />

          {/* HEADER */}

          <div
            className="
            relative
            z-10

            border-b
            border-[#F0E6D9]

            px-4
            py-5

            md:px-6
            md:py-6

            lg:px-8
            lg:py-6
          "
          >
            <div
              className="
              flex
              flex-col
              gap-4

              md:flex-row
              md:items-center
              md:justify-between
            "
            >
              {/* LEFT */}

              <div>
                <h1
                  className="
                  text-2xl
                  md:text-3xl
                  lg:text-4xl

                  font-bold
                  text-[#1E1E1E]
                "
                >
                  Welcome Back
                </h1>

                <p
                  className="
                  mt-1

                  text-sm
                  md:text-base

                  text-gray-500
                "
                >
                  Manage your legal
                  workspace efficiently
                </p>
              </div>

              {/* RIGHT PROFILE */}

              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                className="
                flex

                items-center
                gap-3

                self-start
                md:self-auto

                rounded-2xl

                border
                border-[#E8DDCF]

                bg-[#FCF8F3]

                px-3
                py-2

                md:px-4
              "
              >
                <Image
                  src={
                    user?.image ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="profile"
                  width={45}
                  height={45}
                  unoptimized
                  className="
                  rounded-full
                  object-cover
                "
                />

                <div className="min-w-0">
                  <p
                    className="
                    truncate
                    font-semibold
                    text-sm
                  "
                  >
                    {user?.name}
                  </p>

                  <p
                    className="
                    text-xs
                    capitalize
                    text-[#B88A44]
                  "
                  >
                    {user?.role}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          {/* PAGE CONTENT */}

          <div
            className="
            relative
            z-10

            p-4
            md:p-6
            lg:p-8

            overflow-x-hidden
          "
          >
            {children}
          </div>
        </motion.div>
      </main>
    </div>
  );
}