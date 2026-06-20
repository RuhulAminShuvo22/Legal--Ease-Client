// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Button } from "@heroui/react";
// import { toast } from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";


// const formVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//         opacity: 1,
//         y: 0,
//         transition: {
//             type: "spring",
//             stiffness: 90,
//             damping: 15,
//             staggerChildren: 0.08,
//         },
//     },
// };

// const itemVariants = {
//     hidden: { opacity: 0, y: 15 },
//     visible: {
//         opacity: 1,
//         y: 0,
//     },
// };

// const floatingVariants = {
//     animate: (i) => ({
//         y: [0, -30, 0],
//         x: [0, i * 15, 0],
//         transition: {
//             duration: 6 + i,
//             repeat: Infinity,
//             ease: "easeInOut",
//         },
//     }),
// };

// export default function LoginPage() {
//     const router = useRouter();

//     const [loading, setLoading] = useState(false);

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         const formData = new FormData(e.target);

//         const email = formData.get("email");
//         const password = formData.get("password");

//         setLoading(true);

//         try {
//             const { error } = await authClient.signIn.email({
//                 email,
//                 password,
//             });

//             if (error) {
//                 toast.error(error.message || "Login Failed");
//                 return;
//             }

//             toast.success("Login Successful 🎉");

//             // Navbar update trigger
//             window.dispatchEvent(
//                 new Event("user-auth-changed")
//             );

//             // Next.js refresh
//             router.refresh();

//             // Home page redirect
//             router.push("/");

//         } catch (error) {
//             console.error(error);
//             toast.error("Something went wrong!");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleGoogleLogin = async () => {
//         try {
//             await authClient.signIn.social({
//                 provider: "google",
//                 callbackURL: "/",
//             });
//         } catch (error) {
//             console.error(error);
//             toast.error("Google Login Failed");
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-[#F8F5EF] px-4 py-12 overflow-hidden relative">

//             {/* Background Effects */}
//             <motion.div
//                 custom={1}
//                 animate="animate"
//                 variants={floatingVariants}
//                 className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#D4A95A]/10 blur-3xl"
//             />

//             <motion.div
//                 custom={-1}
//                 animate="animate"
//                 variants={floatingVariants}
//                 className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-[#8B6F47]/10 blur-3xl"
//             />

//             <motion.div
//                 variants={formVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="w-full max-w-md bg-white border border-[#E6DCC8] rounded-3xl shadow-xl p-8 md:p-10 z-10"
//             >
//                 {/* Logo */}
//                 <motion.div
//                     className="flex justify-center mb-4"
//                     animate={{ scale: [1, 1.03, 1] }}
//                     transition={{
//                         duration: 4,
//                         repeat: Infinity,
//                     }}
//                 >
//                     <Image
//                         src="/newlogo.png"
//                         alt="LegalEase"
//                         width={220}
//                         height={80}
//                         priority
//                     />
//                 </motion.div>

//                 {/* Heading */}
//                 <div className="text-center mb-8">
//                     <h2 className="text-3xl font-bold text-[#3B2F1E]">
//                         Welcome Back
//                     </h2>

//                     <p className="text-[#8B6F47] text-sm mt-2">
//                         Sign in to access legal services and connect with trusted lawyers.
//                     </p>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleLogin} className="space-y-5">
//                     <motion.div variants={itemVariants}>
//                         <label className="block mb-2 text-sm font-semibold text-[#3B2F1E]">
//                             Email
//                         </label>

//                         <input
//                             type="email"
//                             name="email"
//                             required
//                             placeholder="john@example.com"
//                             className="w-full px-4 py-3 border border-[#E6DCC8] rounded-xl focus:outline-none focus:border-[#D4A95A]"
//                         />
//                     </motion.div>

//                     <motion.div variants={itemVariants}>
//                         <label className="block mb-2 text-sm font-semibold text-[#3B2F1E]">
//                             Password
//                         </label>

//                         <input
//                             type="password"
//                             name="password"
//                             required
//                             placeholder="••••••••"
//                             className="w-full px-4 py-3 border border-[#E6DCC8] rounded-xl focus:outline-none focus:border-[#D4A95A]"
//                         />
//                     </motion.div>

//                     <motion.div variants={itemVariants}>
//                         <Button
//                             type="submit"
//                             size="lg"
//                             isLoading={loading}
//                             className="w-full bg-[#D4A95A] text-white font-bold rounded-xl"
//                         >
//                             Sign In
//                         </Button>
//                     </motion.div>

//                     {/* Divider */}
//                     <motion.div
//                         variants={itemVariants}
//                         className="flex items-center my-6"
//                     >
//                         <div className="flex-1 border-t border-[#E6DCC8]" />
//                         <span className="px-4 text-sm text-[#8B6F47]">
//                             OR
//                         </span>
//                         <div className="flex-1 border-t border-[#E6DCC8]" />
//                     </motion.div>

//                     {/* Google Login */}
//                     <motion.div variants={itemVariants}>
//                         <button
//                             type="button"
//                             onClick={handleGoogleLogin}
//                             className="w-full flex items-center justify-center gap-3 border border-[#E6DCC8] rounded-xl py-3 bg-white hover:bg-gray-50 transition-all duration-300"
//                         >
//                             <Image
//                                 src="https://www.svgrepo.com/show/475656/google-color.svg"
//                                 alt="Google"
//                                 width={22}
//                                 height={22}
//                             />

//                             <span className="font-semibold text-[#3B2F1E]">
//                                 Continue with Google
//                             </span>
//                         </button>
//                     </motion.div>
//                 </form>

//                 {/* Register Link */}
//                 <div className="text-center mt-8 text-sm text-[#8B6F47]">
//                     Don ot have an account?{" "}
//                     <Link
//                         href="/register"
//                         className="font-bold text-[#D4A95A] hover:underline"
//                     >
//                         Create Account
//                     </Link>
//                 </div>
//             </motion.div>
//         </div>
//     );
// }