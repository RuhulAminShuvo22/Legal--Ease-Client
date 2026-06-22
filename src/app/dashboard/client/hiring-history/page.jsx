"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Clock3,
  CheckCircle,
  XCircle,
  CreditCard,
  Briefcase,
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

  const getStatusBadge = (
    status
  ) => {
    switch (status) {
      case "accepted":
        return (
          <span className="badge badge-success gap-1">
            <CheckCircle size={14} />
            Accepted
          </span>
        );

      case "rejected":
        return (
          <span className="badge badge-error gap-1">
            <XCircle size={14} />
            Rejected
          </span>
        );

      default:
        return (
          <span className="badge badge-warning gap-1">
            <Clock3 size={14} />
            Pending
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }