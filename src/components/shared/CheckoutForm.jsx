"use client";

import { useState } from "react";

import {
    CardElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";

import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

const CheckoutForm = ({
    hiring,
    id,
}) => {
    const stripe = useStripe();

    const elements =
        useElements();

    const router =
        useRouter();

    const [loading, setLoading] =
        useState(false);

    const handleSubmit = async (
        e
    ) => {
        e.preventDefault();

        if (
            !stripe ||
            !elements
        ) {
            return;
        }

        try {
            setLoading(true);

            const intentRes =
                await fetch(
                    "http://localhost:5000/create-payment-intent",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            fee: hiring.fee,
                        }),
                    }
                );

            const {
                clientSecret,
            } =
                await intentRes.json();

            const card =
                elements.getElement(
                    CardElement
                );

            const result =
                await stripe.confirmCardPayment(
                    clientSecret,
                    {
                        payment_method:
                            {
                                card,
                            },
                    }
                );

            if (
                result.error
            ) {
                Swal.fire({
                    icon: "error",
                    title:
                        result.error
                            .message,
                });

                return;
            }

            if (
                result
                    .paymentIntent
                    ?.status ===
                "succeeded"
            ) {
                await fetch(
                    `http://localhost:5000/hirings/payment/${id}`,
                    {
                        method: "PATCH",
                    }
                );

                Swal.fire({
                    icon: "success",
                    title:
                        "Payment Successful",
                    text: "Your payment has been completed.",
                });

                router.push(
                    "/dashboard/client/hiring-history"
                );
            }
        } catch (
            error
        ) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={
                handleSubmit
            }
            className="mt-8"
        >
            <div className="border rounded-xl p-4">
                <CardElement />
            </div>

            <button
                type="submit"
                disabled={
                    loading
                }
                className="
                mt-6
                w-full
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-[#D4A95A]
                to-[#B88A44]
                text-white
                font-bold
                "
            >
                {loading
                    ? "Processing..."
                    : `Pay $${hiring.fee}`}
            </button>
        </form>
    );
};

export default CheckoutForm;