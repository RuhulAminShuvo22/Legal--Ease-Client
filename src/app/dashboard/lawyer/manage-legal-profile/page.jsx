
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import {
    FaUserTie,
    FaMoneyBillWave,
    FaStar,
    FaBriefcase,
} from "react-icons/fa";

const ManageLegalProfile = () => {
    const { data: session, isPending } =
        authClient.useSession();

    const user = session?.user;

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    `http://localhost:5000/lawyers/email/${user.email}`
                );

                if (res.data) {
                    setProfile(res.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user?.email]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const lawyerData = {
            name: form.name.value,
            email: user?.email,
            phone: form.phone.value,
            photo: form.photo.value,
            specialization:
                form.specialization.value,
            experience: Number(
                form.experience.value
            ),
            location: form.location.value,
            fee: Number(form.fee.value),
            rating: Number(form.rating.value),
            status: form.status.value,
            about: form.about.value,
        };

        try {
            if (profile?._id) {
                await axios.put(
                    `http://localhost:5000/lawyers/${profile._id}`,
                    lawyerData
                );

                Swal.fire({
                    icon: "success",
                    title:
                        "Profile Updated Successfully",
                    timer: 1500,
                    showConfirmButton: false,
                });

                setProfile({
                    ...profile,
                    ...lawyerData,
                });
            } else {
                const res = await axios.post(
                    "http://localhost:5000/lawyers",
                    lawyerData
                );

                setProfile({
                    ...lawyerData,
                    _id: res.data.insertedId,
                });

                Swal.fire({
                    icon: "success",
                    title:
                        "Profile Created Successfully",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Something went wrong",
            });
        }
    };

    if (isPending || loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#FCF8F3] via-white to-[#FFF7E8]">
                <span className="loading loading-spinner loading-lg text-warning"></span>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FCF8F3] via-white to-[#FFF7E8] py-12 px-4">

            <div className="absolute top-0 left-0 w-72 h-72 bg-[#D4A95A]/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B88A44]/20 rounded-full blur-3xl"></div>

            <motion.div
                initial={{
                    opacity: 0,
                    y: 40,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.7,
                }}
                className="max-w-6xl mx-auto"
            >
                <div className="bg-white/80 backdrop-blur-lg rounded-[32px] shadow-2xl border border-white/50 overflow-hidden">

                    <div className="h-44 bg-gradient-to-r from-[#D4A95A] via-[#C89A48] to-[#B88A44]" />

                    <div className="px-8 md:px-12 pb-12">

                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">

                            <div className="w-36 h-36 rounded-full border-8 border-white bg-white shadow-xl overflow-hidden -mt-16">

                                <img
                                    src={
                                        profile?.photo ||
                                        "https://i.ibb.co/7k0Y4vB/user.png"
                                    }
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div>
                                <h2 className="text-4xl font-bold text-gray-800">
                                    {profile?.name ||
                                        "Your Legal Profile"}
                                </h2>

                                <p className="text-[#B88A44] font-medium mt-2">
                                    {profile?.specialization ||
                                        "Create your professional profile"}
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mt-10">

                            <div className="bg-[#FFF8EC] rounded-3xl p-5 text-center shadow hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                                <FaBriefcase className="mx-auto text-3xl text-[#B88A44]" />
                                <h3 className="mt-3 text-gray-500">
                                    Experience
                                </h3>
                                <p className="font-bold text-xl">
                                    {profile?.experience || 0}+
                                </p>
                            </div>

                            <div className="bg-[#FFF8EC] rounded-3xl p-5 text-center shadow hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                                <FaMoneyBillWave className="mx-auto text-3xl text-[#B88A44]" />
                                <h3 className="mt-3 text-gray-500">
                                    Fee
                                </h3>
                                <p className="font-bold text-xl">
                                    ${profile?.fee || 0}
                                </p>
                            </div>

                            <div className="bg-[#FFF8EC] rounded-3xl p-5 text-center shadow hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                                <FaStar className="mx-auto text-3xl text-yellow-500" />
                                <h3 className="mt-3 text-gray-500">
                                    Rating
                                </h3>
                                <p className="font-bold text-xl">
                                    {profile?.rating || 0}
                                </p>
                            </div>

                            <div className="bg-[#FFF8EC] rounded-3xl p-5 text-center shadow hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                                <FaUserTie className="mx-auto text-3xl text-[#B88A44]" />
                                <h3 className="mt-3 text-gray-500">
                                    Status
                                </h3>
                                <p className="font-bold text-xl">
                                    {profile?.status ||
                                        "Available"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12">

                            <h3 className="text-3xl font-bold text-gray-800 mb-8">
                                Profile Information
                            </h3>

                            <form
                                onSubmit={handleSubmit}
                                className="grid md:grid-cols-2 gap-5"
                            >


                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={
                                        profile?.name || ""
                                    }
                                    placeholder="Full Name"
                                    className="input input-bordered w-full rounded-xl focus:border-[#B88A44]"
                                    required
                                />

                                <input
                                    type="text"
                                    name="phone"
                                    defaultValue={
                                        profile?.phone || ""
                                    }
                                    placeholder="Phone Number"
                                    className="input input-bordered w-full rounded-xl focus:border-[#B88A44]"
                                    required
                                />

                                <input
                                    type="text"
                                    name="photo"
                                    defaultValue={
                                        profile?.photo || ""
                                    }
                                    placeholder="Photo URL"
                                    className="input input-bordered w-full rounded-xl focus:border-[#B88A44]"
                                    required
                                />

                                <select
                                    name="specialization"
                                    defaultValue={
                                        profile?.specialization || ""
                                    }
                                    className="select select-bordered w-full rounded-xl"
                                    required
                                >
                                    <option value="">
                                        Select Specialization
                                    </option>

                                    <option value="Criminal Lawyer">
                                        Criminal Lawyer
                                    </option>

                                    <option value="Family Lawyer">
                                        Family Lawyer
                                    </option>

                                    <option value="Corporate Lawyer">
                                        Corporate Lawyer
                                    </option>

                                    <option value="Property Lawyer">
                                        Property Lawyer
                                    </option>

                                    <option value="Business Lawyer">
                                        Business Lawyer
                                    </option>

                                    <option value="Civil Lawyer">
                                        Civil Lawyer
                                    </option>

                                    <option value="Immigration Lawyer">
                                        Immigration Lawyer
                                    </option>

                                    <option value="Tax Lawyer">
                                        Tax Lawyer
                                    </option>

                                    <option value="Employment Lawyer">
                                        Employment Lawyer
                                    </option>

                                    <option value="Intellectual Property Lawyer">
                                        Intellectual Property Lawyer
                                    </option>
                                </select>

                                <input
                                    type="number"
                                    name="experience"
                                    defaultValue={
                                        profile?.experience || ""
                                    }
                                    placeholder="Years of Experience"
                                    className="input input-bordered w-full rounded-xl focus:border-[#B88A44]"
                                    required
                                />

                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={
                                        profile?.location || ""
                                    }
                                    placeholder="Location"
                                    className="input input-bordered w-full rounded-xl focus:border-[#B88A44]"
                                    required
                                />

                                <input
                                    type="number"
                                    name="fee"
                                    defaultValue={
                                        profile?.fee || ""
                                    }
                                    placeholder="Consultation Fee"
                                    className="input input-bordered w-full rounded-xl focus:border-[#B88A44]"
                                    required
                                />

                                <input
                                    type="number"
                                    step="0.1"
                                    min="1"
                                    max="5"
                                    name="rating"
                                    defaultValue={
                                        profile?.rating || ""
                                    }
                                    placeholder="Rating (1-5)"
                                    className="input input-bordered w-full rounded-xl focus:border-[#B88A44]"
                                    required
                                />

                                <select
                                    name="status"
                                    defaultValue={
                                        profile?.status ||
                                        "Available"
                                    }
                                    className="select select-bordered w-full rounded-xl"
                                >
                                    <option value="Available">
                                        Available
                                    </option>

                                    <option value="Busy">
                                        Busy
                                    </option>
                                </select>

                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="input input-bordered w-full bg-base-200 rounded-xl"
                                />

                                <textarea
                                    name="about"
                                    defaultValue={
                                        profile?.about || ""
                                    }
                                    placeholder="Write a professional summary about yourself..."
                                    rows={6}
                                    className="textarea textarea-bordered md:col-span-2 rounded-xl focus:border-[#B88A44]"
                                    required
                                />

                                <motion.button
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow:
                                            "0px 15px 40px rgba(212,169,90,0.35)",
                                    }}
                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                    type="submit"
                                    className="
                                    md:col-span-2
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    py-4
                                    text-lg
                                    font-bold
                                    text-white
                                    bg-gradient-to-r
                                    from-[#D4A95A]
                                    via-[#C89A48]
                                    to-[#B88A44]
                                    shadow-xl
                                    group
                                    "
                                >
                                    <span className="relative z-10">
                                        {profile
                                            ? "Update Legal Profile"
                                            : "Create Legal Profile"}
                                    </span>

                                    <span
                                        className="
                                        absolute
                                        inset-0
                                        bg-white/20
                                        translate-x-[-120%]
                                        skew-x-12
                                        group-hover:translate-x-[120%]
                                        transition-transform
                                        duration-1000
                                        "
                                    />
                                </motion.button>

                            </form>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ManageLegalProfile;

