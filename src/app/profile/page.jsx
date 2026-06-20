
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [editing, setEditing] =
        useState(false);

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            phone: "",
            address: "",
            bio: "",
            image: "",
            role: "",
        });

    useEffect(() => {
        const getUser = async () => {
            try {
                const session =
                    await authClient.getSession();

                if (!session?.data?.user) return;

                const currentUser =
                    session.data.user;

                const res = await fetch(
                    `http://localhost:5000/users/${currentUser.email}`
                );

                const data =
                    await res.json();

                setUser(data);

                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    address: data.address || "",
                    bio: data.bio || "",
                    image: data.image || "",
                    role: data.role || "",
                });
            } catch (error) {
                console.log(error);
            }
        };

        getUser();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(
                `http://localhost:5000/users/${user.email}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await res.json();

            console.log("Update Response:", data);

            if (!res.ok) {
                throw new Error(
                    data.message || "Update Failed"
                );
            }

            toast.success(
                "Profile Updated Successfully 🎉"
            );

            setUser(formData);

            // Navbar instantly update হবে
            window.dispatchEvent(
                new Event("user-auth-changed")
            );

            setEditing(false);
        } catch (error) {
            console.error(error);

            toast.error(
                error.message || "Update Failed"
            );
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F5EF] py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-[#E5D8C8] overflow-hidden">

                <div className="bg-gradient-to-r from-[#D4A95A] to-[#C39245] h-36" />

                <div className="px-8 pb-8">

                    <div className="-mt-16 flex flex-col md:flex-row md:items-end gap-6">

                        {formData.image ? (
                            <Image
                                src={formData.image}
                                alt={formData.name}
                                width={130}
                                height={130}
                                className="rounded-full border-4 border-white object-cover"
                            />
                        ) : (
                            <div className="w-[130px] h-[130px] rounded-full border-4 border-white bg-[#D4A95A] text-white flex items-center justify-center text-5xl font-bold">
                                {formData.name?.charAt(0)}
                            </div>
                        )}

                        <div>
                            <h2 className="text-3xl font-bold text-[#3B2F1E]">
                                {formData.name}
                            </h2>

                            <p className="text-[#8B6F47]">
                                {formData.role}
                            </p>
                        </div>

                        <div className="md:ml-auto">
                            {!editing ? (
                                <button
                                    onClick={() =>
                                        setEditing(true)
                                    }
                                    className="bg-[#D4A95A] text-white px-6 py-3 rounded-xl font-semibold"
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <button
                                    onClick={
                                        handleUpdate
                                    }
                                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
                                >
                                    Save Changes
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-10">

                        <div>
                            <label className="font-semibold">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={!editing}
                                className="w-full mt-2 border rounded-xl p-3"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">
                                Email
                            </label>

                            <input
                                type="email"
                                value={
                                    formData.email
                                }
                                disabled
                                className="w-full mt-2 border rounded-xl p-3 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={
                                    formData.phone
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={!editing}
                                className="w-full mt-2 border rounded-xl p-3"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">
                                Address
                            </label>

                            <input
                                type="text"
                                name="address"
                                value={
                                    formData.address
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={!editing}
                                className="w-full mt-2 border rounded-xl p-3"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="font-semibold">
                                Profile Image URL
                            </label>

                            <input
                                type="text"
                                name="image"
                                value={
                                    formData.image
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={!editing}
                                className="w-full mt-2 border rounded-xl p-3"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="font-semibold">
                                Bio
                            </label>

                            <textarea
                                rows={5}
                                name="bio"
                                value={
                                    formData.bio
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={!editing}
                                className="w-full mt-2 border rounded-xl p-3"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

