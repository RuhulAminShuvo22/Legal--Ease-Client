// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import {
//     FaFacebookF,
//     FaTwitter,
//     FaLinkedinIn,
//     FaInstagram,
// } from "react-icons/fa";

// const socialIcons = [
//     FaFacebookF,
//     FaTwitter,
//     FaLinkedinIn,
//     FaInstagram,
// ];

// const Footer = () => {
//     return (
//         <footer className="bg-[#F8F5F0] border-t border-[#DCCFC0] mt-20">
//             <div className="mx-auto max-w-7xl px-6 py-16">

//                 {/* TOP SECTION */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

//                     {/* Brand */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                     >
//                         {/* LOGO */}
//                         <motion.div
//                             whileHover={{ y: -5, scale: 1.05 }}
//                             transition={{ type: "spring", stiffness: 200 }}
//                             className="w-fit"
//                         >
//                             <Image
//                                 src="/newlogo.png"
//                                 alt="LegalEase"
//                                 width={180}
//                                 height={60}
//                                 className="h-[55px] w-auto object-contain"
//                             />
//                         </motion.div>

//                         <p className="mt-4 text-sm text-[#7A6A55] leading-relaxed">
//                             Find trusted lawyers instantly. Book consultations, compare profiles,
//                             and get legal help with confidence.
//                         </p>

//                         {/* Social */}
//                         <div className="flex gap-4 mt-6">
//                             {socialIcons.map((Icon, i) => (
//                                 <motion.a
//                                     key={i}
//                                     href="#"
//                                     whileHover={{ y: -6, scale: 1.2 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#DCCFC0] text-[#B88746] hover:bg-[#B88746] hover:text-white transition shadow-sm"
//                                 >
//                                     <Icon size={14} />
//                                 </motion.a>
//                             ))}
//                         </div>
//                     </motion.div>

//                     {/* Quick Links */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.7 }}
//                     >
//                         <h3 className="text-lg font-semibold text-[#6B5B45] mb-5">
//                             Quick Links
//                         </h3>

//                         <div className="flex flex-col gap-3 text-sm">
//                             {["Home", "Browse Lawyers", "Companies", "Pricing"].map((item) => (
//                                 <Link
//                                     key={item}
//                                     href="#"
//                                     className="text-[#7A6A55] hover:text-[#B88746] transition hover:translate-x-1 duration-300"
//                                 >
//                                     {item}
//                                 </Link>
//                             ))}
//                         </div>
//                     </motion.div>

//                     {/* Services */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                     >
//                         <h3 className="text-lg font-semibold text-[#6B5B45] mb-5">
//                             Services
//                         </h3>

//                         <div className="flex flex-col gap-3 text-sm">
//                             {[
//                                 "Legal Consultation",
//                                 "Case Review",
//                                 "Lawyer Booking",
//                                 "Corporate Law",
//                             ].map((item) => (
//                                 <Link
//                                     key={item}
//                                     href="#"
//                                     className="text-[#7A6A55] hover:text-[#B88746] transition hover:translate-x-1 duration-300"
//                                 >
//                                     {item}
//                                 </Link>
//                             ))}
//                         </div>
//                     </motion.div>

//                     {/* Contact */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.9 }}
//                     >
//                         <h3 className="text-lg font-semibold text-[#6B5B45] mb-5">
//                             Contact
//                         </h3>

//                         <div className="text-sm text-[#7A6A55] space-y-3">
//                             <p>📍 Dhaka, Bangladesh</p>
//                             <p>📧 support@legalease.com</p>
//                             <p>📞 +880 1234 567890</p>
//                         </div>
//                     </motion.div>
//                 </div>

//                 {/* DIVIDER */}
//                 <div className="my-10 border-t border-[#DCCFC0]" />

//                 {/* BOTTOM */}
//                 <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#7A6A55]">
//                     <p>© 2026 LegalEase. All rights reserved.</p>

//                     <div className="flex gap-6">
//                         <Link href="#" className="hover:text-[#B88746] transition">
//                             Privacy Policy
//                         </Link>
//                         <Link href="#" className="hover:text-[#B88746] transition">
//                             Terms
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;