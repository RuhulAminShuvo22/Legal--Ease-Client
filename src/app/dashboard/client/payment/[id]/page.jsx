"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { CreditCard, Scale, CheckCircle } from "lucide-react";

const PaymentPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const [hiring, setHiring] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const fetchHiring = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/hirings/${id}`
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

    const handlePayment = async () => {
        try {
            setProcessing(true);

            const res = await fetch(
                `http://localhost:5000/hirings/payment/${id}`,
                {
                    method: "PATCH",
                }
            );

            const data = await res.json();

            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Payment Successful",
                    text: "Your payment has been completed.",
                    timer: 2000,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    router.push(
                        "/dashboard/client/hiring-history"
                    );
                }, 2000);
            }
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Payment Failed",
            });
        } finally {
            setProcessing(false);
        }
    };

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

                            <p className="opacity-90">
                                Complete your lawyer hiring payment
                            </p>
                        </div>
                    </div>

                </div>

                <div className="p-8">

                    <div className="space-y-5">

                        <div className="flex justify-between border-b pb-4">
                            <span className="text-gray-500">
                                Lawyer Name
                            </span>

                            <span className="font-bold">
                                {hiring.lawyerName}
                            </span>
                        </div>

                        <div className="flex justify-between border-b pb-4">
                            <span className="text-gray-500">
                                Lawyer Email
                            </span>

                            <span className="font-medium">
                                {hiring.lawyerEmail}
                            </span>
                        </div>

                        <div className="flex justify-between border-b pb-4">
                            <span className="text-gray-500">
                                Request Status
                            </span>

                            <span className="text-green-600 font-bold">
                                {hiring.status}
                            </span>
                        </div>

                        <div className="flex justify-between border-b pb-4">
                            <span className="text-gray-500">
                                Payment Status
                            </span>

                            <span className="font-bold">
                                {hiring.paymentStatus}
                            </span>
                        </div>

                    </div>

                    <div className="bg-[#FCF8F3] rounded-3xl mt-8 p-6 text-center">

                        <p className="text-gray-500">
                            Total Amount
                        </p>

                        <h2 className="text-5xl font-extrabold text-[#B88A44] mt-2">
                            ${hiring.fee}
                        </h2>

                    </div>

                    {hiring.paymentStatus === "paid" ? (
                        <div className="mt-8 bg-green-50 text-green-600 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold">

                            <CheckCircle size={22} />

                            Payment Already Completed

                        </div>
                    ) : (
                        <button
                            onClick={handlePayment}
                            disabled={processing}
                            className="
                            mt-8
                            w-full
                            py-5
                            rounded-2xl
                            bg-gradient-to-r
                            from-[#D4A95A]
                            to-[#B88A44]
                            text-white
                            font-bold
                            text-lg
                            flex
                            items-center
                            justify-center
                            gap-3
                            hover:scale-[1.02]
                            transition-all
                            duration-300
                            shadow-xl
                            "
                        >
                            <CreditCard size={22} />

                            {processing
                                ? "Processing..."
                                : "Confirm Payment"}
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PaymentPage;