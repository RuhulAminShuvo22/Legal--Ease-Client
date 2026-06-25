"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import {
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaImage,
    FaSave,
    FaEnvelope,
} from "react-icons/fa";

const UpdateProfilePage = () => {
    const { data: session } =
        authClient.useSession();

    const user = session?.user;

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [formData, setFormData] =
        useState({
            name: "",
            image: "",
            phone: "",
            address: "",
            bio: "",
            role: "",
            email: "",
        });

    useEffect(() => {
        const fetchUser =
            async () => {
                if (!user?.email) return;

                try {
                    const res =
                        await axios.get(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user.email}`
                        );

                    setFormData({
                        name:
                            res.data?.name || "",
                        image:
                            res.data?.image || "",
                        phone:
                            res.data?.phone || "",
                        address:
                            res.data?.address || "",
                        bio:
                            res.data?.bio || "",
                        role:
                            res.data?.role || "",
                        email:
                            res.data?.email || "",
                    });
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchUser();
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit =
        async (e) => {
            e.preventDefault();

            setSaving(true);

            try {
                const res =
                    await axios.put(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user.email}`,
                        {
                            name:
                                formData.name,
                            image:
                                formData.image,
                            phone:
                                formData.phone,
                            address:
                                formData.address,
                            bio:
                                formData.bio,
                        }
                    );
                if (
                    res.data.success
                ) {
                    Swal.fire({
                        icon: "success",
                        title:
                            "Profile Updated",
                        text:
                            "Your profile has been updated successfully.",
                        confirmButtonColor:
                            "#B88A44",
                    });
                }
            } catch (error) {
                console.log(error);

                Swal.fire({
                    icon: "error",
                    title:
                        "Update Failed",
                    text:
                        "Something went wrong.",
                });
            } finally {
                setSaving(false);
            }
        };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-16 h-16 border-4 border-[#D4A95A] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F3EE] p-6 md:p-10">

            <motion.div
                initial={{
                    opacity: 0,
                    y: -20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="mb-10"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-[#2B2118]">
                    Update Profile
                </h1>

                <p className="text-gray-500 mt-3">
                    Manage your account
                    information and
                    personal details.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">

                <motion.div
                    initial={{
                        opacity: 0,
                        x: -30,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    className="
          bg-white/70
          backdrop-blur-xl
          rounded-3xl
          shadow-xl
          p-8
          border
          border-white/50
          "
                >
                    <div className="flex flex-col items-center">

                        <img
                            src={
                                formData.image ||
                                "https://i.ibb.co/Tm5xY7M/user.png"
                            }
                            alt="profile"
                            className="
              w-36
              h-36
              rounded-full
              object-cover
              border-4
              border-[#D4A95A]
              shadow-xl
              "
                        />

                        <h2 className="text-2xl font-bold mt-5">
                            {formData.name}
                        </h2>

                        <p className="text-gray-500">
                            {formData.role}
                        </p>

                        <div className="mt-5 text-center">
                            <p className="flex items-center gap-2 justify-center text-gray-600">
                                <FaEnvelope />
                                {formData.email}
                            </p>
                        </div>

                    </div>
                </motion.div>
                <motion.form
                    initial={{
                        opacity: 0,
                        x: 30,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    onSubmit={
                        handleSubmit
                    }
                    className="
          lg:col-span-2
          bg-white
          rounded-3xl
          shadow-xl
          p-8
          space-y-5
          "
                >

                    <div>
                        <label className="font-semibold mb-2 block">
                            Full Name
                        </label>

                        <div className="relative">
                            <FaUser className="absolute left-4 top-4 text-[#B88A44]" />

                            <input
                                type="text"
                                name="name"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                                className="input input-bordered w-full pl-12"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold mb-2 block">
                            Profile Image URL
                        </label>

                        <div className="relative">
                            <FaImage className="absolute left-4 top-4 text-[#B88A44]" />

                            <input
                                type="text"
                                name="image"
                                value={
                                    formData.image
                                }
                                onChange={
                                    handleChange
                                }
                                className="input input-bordered w-full pl-12"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold mb-2 block">
                            Phone Number
                        </label>

                        <div className="relative">
                            <FaPhone className="absolute left-4 top-4 text-[#B88A44]" />

                            <input
                                type="text"
                                name="phone"
                                value={
                                    formData.phone
                                }
                                onChange={
                                    handleChange
                                }
                                className="input input-bordered w-full pl-12"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold mb-2 block">
                            Address
                        </label>

                        <div className="relative">
                            <FaMapMarkerAlt className="absolute left-4 top-4 text-[#B88A44]" />

                            <input
                                type="text"
                                name="address"
                                value={
                                    formData.address
                                }
                                onChange={
                                    handleChange
                                }
                                className="input input-bordered w-full pl-12"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold mb-2 block">
                            Bio
                        </label>

                        <textarea
                            name="bio"
                            value={
                                formData.bio
                            }
                            onChange={
                                handleChange
                            }
                            rows="5"
                            className="textarea textarea-bordered w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="
            w-full
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-[#D4A95A]
            via-[#C89A48]
            to-[#B88A44]
            text-white
            font-bold
            text-lg
            shadow-xl
            hover:scale-[1.02]
            transition-all
            flex
            justify-center
            items-center
            gap-2
            "
                    >
                        <FaSave />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </motion.form>

            </div>

        </div>
    );
};

export default UpdateProfilePage;