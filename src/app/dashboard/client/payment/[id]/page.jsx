"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Scale, CheckCircle } from "lucide-react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "@/components/shared/CheckoutForm";

// DEBUG
console.log(
  "Stripe Key:",
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PaymentPage = () => {
  const { id } = useParams();

  const [hiring, setHiring] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHiring = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/hirings/${id}`
        );

        const data = await res.json();

        setHiring(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHiring();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!hiring) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          Hiring Request Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-[#D4A95A] to-[#B88A44] p-8 text-white">
          <div className="flex items-center gap-4">
            <Scale size={42} />

            <div>
              <h1 className="text-3xl font-bold">
                Secure Payment
              </h1>

              <p>
                Complete your lawyer hiring payment
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">

          <div className="space-y-5">

            <div className="flex justify-between border-b pb-4">
              <span>Lawyer Name</span>

              <span className="font-bold">
                {hiring.lawyerName}
              </span>
            </div>

            <div className="flex justify-between border-b pb-4">
              <span>Lawyer Email</span>

              <span className="font-bold">
                {hiring.lawyerEmail}
              </span>
            </div>

            <div className="flex justify-between border-b pb-4">
              <span>Status</span>

              <span className="text-green-600 font-bold">
                {hiring.status}
              </span>
            </div>

            <div className="flex justify-between border-b pb-4">
              <span>Payment Status</span>

              <span className="font-bold">
                {hiring.paymentStatus}
              </span>
            </div>

          </div>

          <div className="bg-[#FCF8F3] rounded-3xl mt-8 p-6 text-center">

            <p>Total Amount</p>

            <h2 className="text-5xl font-bold text-[#B88A44] mt-2">
              ${hiring.fee}
            </h2>

          </div>

          {hiring.paymentStatus === "paid" ? (
            <div className="mt-8 bg-green-50 text-green-600 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold">

              <CheckCircle size={22} />

              Payment Already Completed

            </div>
          ) : (
            <div className="mt-8">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  hiring={hiring}
                  id={id}
                />
              </Elements>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PaymentPage;