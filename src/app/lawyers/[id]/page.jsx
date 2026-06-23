"use client";

import { FaGavel, FaCalendarCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaStar,
  FaBriefcase,
} from "react-icons/fa";

const LawyerDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  const [lawyer, setLawyer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/lawyers/${id}`
        );

        const data =
          await res.json();

        setLawyer(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLawyer();
    }
  }, [id]);
    const handleHireLawyer =
    async () => {
      if (!user) {
        Swal.fire({
          icon: "warning",
          title: "Please Login First",
        });

        return;
      }

      const result =
        await Swal.fire({
          title: "Hire This Lawyer?",
          text: `You are about to send a hiring request to ${lawyer.name}`,
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#B88A44",
          confirmButtonText:
            "Yes, Hire",
        });

      if (!result.isConfirmed)
        return;

      const hiringData = {
        lawyerId: lawyer._id,
        lawyerName: lawyer.name,
        lawyerEmail: lawyer.email,

        clientName: user.name,
        clientEmail: user.email,

        fee: lawyer.fee,

        status: "pending",
        paymentStatus: "unpaid",

        createdAt: new Date(),
      };

      try {
        await axios.post(
          "http://localhost:5000/hirings",
          hiringData
        );

        Swal.fire({
          icon: "success",
          title:
            "Hiring Request Sent",
          text:
            "Please wait for lawyer approval",
          timer: 2000,
          showConfirmButton: false,
        });

        router.push(
          "/dashboard/client/hiring-history"
        );
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title:
            "Failed to Send Request",
        });
      }
    };

  const handleBookConsultation =
    async () => {
      if (!user) {
        Swal.fire({
          icon: "warning",
          title: "Please Login First",
        });

        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/hirings/client/${user.email}`
        );

        const hirings = res.data;

        console.log(
          "All Hirings:",
          hirings
        );

        const approvedHiring =
          hirings.find(
            (item) =>
              String(item.lawyerId) ===
                String(lawyer._id) &&
              item.status ===
                "accepted" &&
              item.paymentStatus ===
                "paid"
          );

        console.log(
          "Approved Hiring:",
          approvedHiring
        );

        if (!approvedHiring) {
          return Swal.fire({
            icon: "warning",
            title:
              "Hire & Pay First",
            text:
              "You must hire this lawyer and complete payment before booking a consultation.",
          });
        }

        router.push(
          `/consultation/${approvedHiring._id}`
        );
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title:
            "Something went wrong",
        });
      }
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-bold">
          Lawyer Not Found
        </h2>
      </div>
    );
  }
  