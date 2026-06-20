"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";


// Form Animation
const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 90,
            damping: 15,
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

// Background Floating Animation
const floatingVariants = {
    animate: (i) => ({
        y: [0, -30, 0],
        x: [0, i * 15, 0],
        transition: {
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
        },
    }),
};

export default function RegisterPage() {
    const router = useRouter();

    const [selectedRole, setSelectedRole] = useState("client");

    useEffect(() => {
        const saveGoogleUser = async () => {
            try {
                const session = await authClient.getSession();

                if (!session?.data?.user) return;

                const user = session.data.user;

                const role =
                    localStorage.getItem("selectedRole") ||
                    "client";

                await fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role,
                        provider: "google",
                        createdAt: new Date(),
                    }),
                });

                localStorage.removeItem("selectedRole");

                console.log("✅ Google user saved");
            } catch (error) {
                console.log(error);
            }
        };

        saveGoogleUser();
    }, []);

    // Google Login
    const handleGoogleLogin = async () => {
        try {
            localStorage.setItem(
                "selectedRole",
                selectedRole
            );

            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/login",
            });
        } catch (error) {
            console.error(error);
            toast.error("Google Login Failed!");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries());

        if (user.password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        if (!user.role) {
            toast.error("Please select a role.");
            return;
        }

        try {
            const { error } = await authClient.signUp.email({
                name: user.name,
                email: user.email,
                password: user.password,
                image: user.photoUrl,
                role: user.role,
            });

            if (error) {
                toast.error(error.message || "Registration failed!");
                return;
            }

            const saveUser = await fetch(
                "http://localhost:5000/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: user.name,
                        email: user.email,
                        image: user.photoUrl,
                        role: user.role,
                        createdAt: new Date(),
                    }),
                }
            );

            await saveUser.json();

            toast.success(
                `Account created successfully as ${user.role === "lawyer"
                    ? "lawyer"
                    : "Client"
                } 🎉`
            );

            e.target.reset();
            setSelectedRole("client");

            setTimeout(() => {
                router.push("/");
            }, 1500);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F5EF] px-4 py-12 overflow-hidden relative">
            {/* Background Effects */}
            <motion.div
                custom={1}
                animate="animate"
                variants={floatingVariants}
                className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#D4A95A]/10 blur-3xl"
            />

            <motion.div
                custom={-1}
                animate="animate"
                variants={floatingVariants}
                className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-[#8B6F47]/10 blur-3xl"
            />

            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md bg-white border border-[#E6DCC8] rounded-3xl shadow-xl p-8 md:p-10 z-10"
            >
                {/* Logo */}
                <motion.div
                    className="flex justify-center mb-4"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                    }}
                >
                    <Image
                        src="/newlogo.png"
                        alt="legal-ease"
                        width={220}
                        height={80}
                        priority
                    />
                </motion.div>

                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#3B2F1E]">
                        Create Your Account
                    </h2>

                    <p className="text-[#8B6F47] text-sm mt-2">
                        Find the right lawyer and get expert legal support with LegalEase.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Full Name */}
                    <motion.div variants={itemVariants}>
                        <label className="block mb-2 text-sm font-semibold text-[#3B2F1E]">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-[#E6DCC8] rounded-xl focus:outline-none focus:border-[#D4A95A]"
                        />
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={itemVariants}>
                        <label className="block mb-2 text-sm font-semibold text-[#3B2F1E]">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 border border-[#E6DCC8] rounded-xl focus:outline-none focus:border-[#D4A95A]"
                        />
                    </motion.div>

                    {/* Image URL */}
                    <motion.div variants={itemVariants}>
                        <label className="block mb-2 text-sm font-semibold text-[#3B2F1E]">
                            Image URL
                        </label>

                        <input
                            type="url"
                            name="photoUrl"
                            placeholder="https://example.com/photo.jpg"
                            className="w-full px-4 py-3 border border-[#E6DCC8] rounded-xl focus:outline-none focus:border-[#D4A95A]"
                        />
                    </motion.div>

                    {/* Password */}
                    <motion.div variants={itemVariants}>
                        <label className="block mb-2 text-sm font-semibold text-[#3B2F1E]">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-[#E6DCC8] rounded-xl focus:outline-none focus:border-[#D4A95A]"
                        />

                        <p className="text-xs text-[#8B6F47] mt-2">
                            Password must be at least 6 characters.
                        </p>
                    </motion.div>

                    {/* Role Selection */}
                    <motion.div variants={itemVariants}>
                        <label className="block mb-3 text-sm font-semibold text-[#3B2F1E]">
                            Select Your Role
                        </label>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setSelectedRole("client")}
                                className={`px-6 py-3 rounded-xl border transition-all duration-300 ${selectedRole === "client"
                                    ? "bg-[#D4A95A] text-white border-[#D4A95A]"
                                    : "bg-white text-[#3B2F1E] border-[#E6DCC8]"
                                    }`}
                            >
                                Client
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedRole("lawyer")}
                                className={`px-6 py-3 rounded-xl border transition-all duration-300 ${selectedRole === "lawyer"
                                    ? "bg-[#D4A95A] text-white border-[#D4A95A]"
                                    : "bg-white text-[#3B2F1E] border-[#E6DCC8]"
                                    }`}
                            >
                                Lawyer
                            </button>
                        </div>

                        <input
                            type="hidden"
                            name="role"
                            value={selectedRole}
                        />
                    </motion.div>

                    {/* Create Account Button */}
                    <motion.div variants={itemVariants}>
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-[#D4A95A] hover:bg-[#C89A47] text-white font-bold rounded-xl"
                        >
                            Create Account
                        </Button>
                    </motion.div>
                    {/* Divider */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center my-6"
                    >
                        <div className="flex-1 border-t border-[#E6DCC8]" />

                        <span className="px-4 text-sm text-[#8B6F47]">
                            OR
                        </span>

                        <div className="flex-1 border-t border-[#E6DCC8]" />
                    </motion.div>

                    {/* Google Login */}
                    <motion.div variants={itemVariants}>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 border border-[#E6DCC8] rounded-xl py-3 bg-white hover:bg-gray-50 transition-all duration-300"
                        >
                            <Image
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                width={22}
                                height={22}
                            />

                            <span className="font-semibold text-[#3B2F1E]">
                                Continue with Google
                            </span>
                        </button>
                    </motion.div>
                </form>

                {/* Login Link */}
                <div className="text-center mt-8 text-sm text-[#8B6F47]">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-bold text-[#D4A95A] hover:underline"
                    >
                        Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}