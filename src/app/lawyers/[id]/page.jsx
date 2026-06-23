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
  