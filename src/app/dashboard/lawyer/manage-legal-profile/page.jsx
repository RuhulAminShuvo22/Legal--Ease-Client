"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";

const ManageLegalProfile = () => {
    const { data: session, isPending } = authClient.useSession();


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
            lawyerEmail: user?.email,
            lawyerName: form.lawyerName.value,
            specialization: form.specialization.value,
            fee: Number(form.fee.value),
            bio: form.bio.value,
            image: form.image.value,
            status: form.status.value,
        };

        try {
            if (profile?._id) {
                await axios.put(
                    `http://localhost:5000/lawyers/${profile._id}`,
                    lawyerData
                );

                Swal.fire({
                    icon: "success",
                    title: "Profile Updated Successfully",
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
                    title: "Profile Created Successfully",
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
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">

            <h2 className="text-3xl font-bold mb-8">
                Manage Legal Profile
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-4"
            >
                <input
                    type="text"
                    name="lawyerName"
                    defaultValue={profile?.lawyerName || ""}
                    placeholder="Lawyer Name"
                    className="input input-bordered w-full"
                    required
                />

                <select
                    name="specialization"
                    defaultValue={profile?.specialization || ""}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="">Select Specialization</option>
                    <option value="Criminal Lawyer">Criminal Lawyer</option>
                    <option value="Family Lawyer">Family Lawyer</option>
                    <option value="Corporate Lawyer">Corporate Lawyer</option>
                    <option value="Property Lawyer">Property Lawyer</option>
                    <option value="Business Lawyer">Business Lawyer</option>
                    <option value="Civil Lawyer">Civil Lawyer</option>
                    <option value="Immigration Lawyer">Immigration Lawyer</option>
                    <option value="Tax Lawyer">Tax Lawyer</option>
                    <option value="Employment Lawyer">Employment Lawyer</option>
                    <option value="Intellectual Property Lawyer">
                        Intellectual Property Lawyer
                    </option>
                </select>

                <input
                    type="number"
                    name="fee"
                    defaultValue={profile?.fee || ""}
                    placeholder="Consultation Fee"
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="text"
                    name="image"
                    defaultValue={profile?.image || ""}
                    placeholder="Image URL"
                    className="input input-bordered w-full"
                    required
                />

                <select
                    name="status"
                    defaultValue={profile?.status || "Available"}
                    className="select select-bordered w-full"
                >
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                </select>

                <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-base-200"
                />

                <textarea
                    name="bio"
                    defaultValue={profile?.bio || ""}
                    placeholder="Professional Summary"
                    className="textarea textarea-bordered md:col-span-2"
                    rows={5}
                    required
                />

                <button
                    type="submit"
                    className="btn btn-primary md:col-span-2"
                >
                    {profile ? "Update Profile" : "Create Profile"}
                </button>
            </form>
        </div>
    );


};

export default ManageLegalProfile;


