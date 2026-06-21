// export default function DashboardLayout({
//   children,
// }) {
//   return (
//     <div className="min-h-screen">
//       <div className="max-w-7xl mx-auto p-6">
//         {children}
//       </div>
//     </div>
//   );
// }

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
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const session =
          await authClient.getSession();


        if (!session?.data?.user) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `http://localhost:5000/users/${session.data.user.email}`
        );

        const dbUser =
          await res.json();

        setUser(dbUser);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUser();


  }, []);

  if (loading) {
    return (<div className="flex min-h-screen items-center justify-center bg-[#F7F3EE]"> <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#D4A95A] border-t-transparent"></div> </div>
    );
  }

  const links =
    sidebarLinks[user?.role] || [];

  return (<div className="min-h-screen bg-[#F7F3EE] flex">
    {/* Sidebar */}
    <motion.aside
      initial={{
        x: -60,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="w-72 bg-white border-r border-[#E8DDCF] shadow-xl"
    >
      {/* Logo */} <div className="border-b border-[#E8DDCF] p-6"> <div className="flex items-center gap-3"> <Image
        src="/newlogo.png"
        alt="LegalEase"
        width={60}
        height={60}
        priority
      />


        <div>
          <h2 className="text-2xl font-bold text-[#1E1E1E]">
            LegalEase
          </h2>

          <p className="text-xs text-[#B88A44]">
            Legal Management
          </p>
        </div>
      </div>
      </div>

      {/* Profile Card */}
      {user && (
        <div className="m-4 rounded-2xl border border-[#E8DDCF] bg-[#FCF8F3] p-4">
          <div className="flex items-center gap-3">
            <Image
              src={
                user.image ||
                "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              alt="user"
              width={55}
              height={55}
              className="rounded-full object-cover"
            />

            <div>
              <h3 className="font-semibold text-[#1E1E1E]">
                {user.name}
              </h3>

              <span className="mt-1 inline-block rounded-full bg-[#F1DFC0] px-3 py-1 text-xs text-[#B88A44]">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="px-4 pt-2">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-[#B88A44]">
          Menu
        </p>

        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition-all duration-300
              
              ${pathname.startsWith(
                  link.href
                )
                    ? "bg-[#D4A95A] text-white shadow-lg"
                    : "text-gray-700 hover:bg-[#F4ECE2] hover:text-[#B88A44]"
                  }
            `}
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.aside>

    {/* Main Content */}
    <main className="flex-1 overflow-auto p-8">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="rounded-3xl bg-white p-6 shadow-sm border border-[#E8DDCF]"
      >
        {children}
      </motion.div>
    </main>
  </div>


  );
}
