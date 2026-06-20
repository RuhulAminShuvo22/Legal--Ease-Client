"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminLoggedIn", "true");

        // Navbar instantly update হবে
        window.dispatchEvent(
          new Event("admin-auth-changed")
        );

        router.push("/admin/admin-dashboard");
      } else {
        setError(
          data.message || "Invalid Email or Password"
        );
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #F8F5F0 0%, #F2EEE8 50%, #ECE7DF 100%)",
      }}
    >
      {/* Background Effects */}
      <div className="absolute w-96 h-96 rounded-full bg-white/40 blur-3xl -top-20 -left-20 animate-pulse" />
      <div className="absolute w-96 h-96 rounded-full bg-stone-200/50 blur-3xl -bottom-20 -right-20 animate-pulse" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/50 animate-[fadeIn_0.8s_ease]">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Image
            src="/newlogo.png"
            alt="Logo"
            width={90}
            height={90}
            className="object-contain animate-bounce"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Sign in to access Admin Dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="admin@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Secure Admin Access
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}