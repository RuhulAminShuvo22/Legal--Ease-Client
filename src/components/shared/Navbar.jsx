// "use client";


// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaSearch,
//   FaBars,
//   FaTimes,
//   FaChevronDown,
// } from "react-icons/fa";

// import { authClient } from "@/lib/auth-client";

// const navLinks = [
//   {
//     name: "Home",
//     href: "/",
//   },
//   {
//     name: "Browse Lawyers",
//     href: "/lawyers",
//   },
// ];

// export default function Navbar() {
//   const router = useRouter();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const session =
//           await authClient.getSession();

//         if (!session?.data?.user) {
//           setUser(null);
//           return;
//         }

//         const currentUser =
//           session.data.user;

//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${currentUser.email}`
//         );

//         const dbUser =
//           await res.json();

//         setUser(dbUser);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getUser();

//     window.addEventListener(
//       "user-auth-changed",
//       getUser
//     );

//     return () => {
//       window.removeEventListener(
//         "user-auth-changed",
//         getUser
//       );
//     };
//   }, []);

//   const handleLogout = async () => {
//     await authClient.signOut();

//     setUser(null);

//     router.push("/");
//   };

//   // const handleAdminLogout = () => {
//   //   localStorage.removeItem("adminLoggedIn");

//   //   setAdminLoggedIn(false);
//   //   setAdminMenuOpen(false);

//   //   window.dispatchEvent(
//   //     new Event("admin-auth-changed")
//   //   );

//   //   router.push("/");
//   // };
//   return (
//     <header className="sticky top-0 z-50 bg-[#F8F5F0] py-4">
//       <motion.div
//         initial={{
//           opacity: 0,
//           y: -15,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           duration: 0.4,
//         }}
//         className="mx-auto max-w-7xl px-4"
//       >
//         <div className="rounded-[24px] border border-[#DCCFC0] bg-[#F9F6F1] px-5 lg:px-8 py-4 shadow-sm">
//           <div className="flex items-center justify-between">

//             {/* Logo */}
//             <Link
//               href="/"
//               className="flex items-center"
//             >
//               <Image
//                 src="/newlogo.png"
//                 alt="LegalEase"
//                 width={240}
//                 height={60}
//                 priority
//                 className="h-[60px] w-auto object-contain"
//               />
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center gap-10">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className="font-medium text-[#6B5B45] transition-all duration-300 hover:text-[#C39245]"
//                 >
//                   {link.name}
//                 </Link>
//               ))}


//             </nav>
//             {/* Search */}
//             <div className="hidden lg:block">
//               <div className="relative">
//                 <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B88746]" />

//                 <input
//                   type="text"
//                   placeholder="Search lawyers..."
//                   className="w-[260px] xl:w-[340px] rounded-full border border-[#DCCFC0] bg-white py-3 pl-11 pr-4 text-sm text-[#6B5B45] outline-none transition-all focus:border-[#CBA56A] focus:ring-2 focus:ring-[#E9D7B8]"
//                 />
//               </div>
//             </div>

//             {/* Desktop Right Side */}
//             <div className="hidden lg:flex items-center gap-6">

//               {user ? (
//                 <div className="relative">

//                   <button
//                     onClick={() =>
//                       setUserMenuOpen(!userMenuOpen)
//                     }
//                     className="flex items-center gap-3"
//                   >
//                     {/* User Image */}
//                     {user.image ? (
//                       <Image
//                         src={user.image}
//                         alt={user.name}
//                         width={45}
//                         height={45}
//                         className="rounded-full object-cover border"
//                       />
//                     ) : (
//                       <div className="w-11 h-11 rounded-full bg-[#D4A95A] text-white flex items-center justify-center font-bold text-lg">
//                         {user?.name?.charAt(0)}
//                       </div>
//                     )}

//                     {/* Welcome Text */}
//                     <div className="text-left">
//                       <h4 className="font-semibold text-[#3B2F1E]">
//                         Welcome Back
//                       </h4>

//                       <p className="text-xs text-[#8B6F47]">
//                         {user.name} ({user.role})
//                       </p>
//                     </div>

//                     <FaChevronDown />
//                   </button>

//                   {/* User Dropdown */}
//                   <AnimatePresence>
//                     {userMenuOpen && (
//                       <motion.div
//                         initial={{
//                           opacity: 0,
//                           y: 10,
//                         }}
//                         animate={{
//                           opacity: 1,
//                           y: 0,
//                         }}
//                         exit={{
//                           opacity: 0,
//                           y: 10,
//                         }}
//                         className="absolute right-0 mt-4 w-64 overflow-hidden rounded-2xl bg-white shadow-xl border border-[#E5D8C8]"
//                       >
//                         <div className="px-5 py-4 border-b">
//                           <h4 className="font-semibold text-[#3B2F1E]">
//                             {user.name}
//                           </h4>

//                           <p className="text-sm text-[#8B6F47]">
//                             {user.email}
//                           </p>
//                         </div>

//                         <Link
//                           href="/profile"
//                           className="block px-5 py-3 hover:bg-gray-50"
//                         >
//                           Profile
//                         </Link>

//                         <Link
//                           href="/dashboard"
//                           className="block px-5 py-3 hover:bg-gray-50 text-[#6B5B45]"
//                         >
//                           Dashboard
//                         </Link>

//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-50"
//                         >
//                           Logout
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ) : (
//                 <>
//                   <Link
//                     href="/login"
//                     className="font-medium text-[#6B5B45] transition hover:text-[#C39245]"
//                   >
//                     Sign In
//                   </Link>

//                   <Link
//                     href="/register"
//                     className="rounded-full bg-gradient-to-r from-[#D4A95A] to-[#C39245] px-7 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
//                   >
//                     Get Started
//                   </Link>
//                 </>
//               )}

//             </div>


//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="lg:hidden text-[#6B5B45]"
//             >
//               {menuOpen ? (
//                 <FaTimes size={24} />
//               ) : (
//                 <FaBars size={24} />
//               )}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           <AnimatePresence>
//             {menuOpen && (
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   height: 0,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   height: "auto",
//                 }}
//                 exit={{
//                   opacity: 0,
//                   height: 0,
//                 }}
//                 transition={{
//                   duration: 0.3,
//                 }}
//                 className="overflow-hidden lg:hidden"
//               >
//                 <div className="mt-5 border-t border-[#E4D8CA] pt-5">

//                   {/* Mobile Search */}
//                   <div className="relative mb-5">
//                     <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B88746]" />

//                     <input
//                       type="text"
//                       placeholder="Search lawyers..."
//                       className="w-full rounded-full border border-[#DCCFC0] bg-white py-3 pl-11 pr-4 outline-none"
//                     />
//                   </div>

//                   {/* Mobile Links */}
//                   <nav className="flex flex-col gap-4">
//                     {navLinks.map((link) => (
//                       <Link
//                         key={link.name}
//                         href={link.href}
//                         onClick={() =>
//                           setMenuOpen(false)
//                         }
//                         className="font-medium text-[#6B5B45] hover:text-[#C39245]"
//                       >
//                         {link.name}
//                       </Link>
//                     ))}


//                   </nav>

//                   {!user ? (
//                     <div className="mt-6 flex flex-col gap-3">
//                       <Link
//                         href="/login"
//                         className="rounded-xl border border-[#DCCFC0] px-4 py-3 text-center font-medium text-[#6B5B45]"
//                       >
//                         Sign In
//                       </Link>

//                       <Link
//                         href="/register"
//                         className="rounded-xl bg-gradient-to-r from-[#D4A95A] to-[#C39245] px-4 py-3 text-center font-semibold text-white"
//                       >
//                         Get Started
//                       </Link>
//                     </div>
//                   ) : (
//                     <div className="mt-6 flex flex-col gap-3">
//                       <Link
//                         href="/profile"
//                         className="font-medium text-[#6B5B45]"
//                       >
//                         Profile
//                       </Link>

//                       <Link
//                         href="/dashboard"
//                         className="font-medium text-[#6B5B45]"
//                       >
//                         Dashboard
//                       </Link>

//                       <button
//                         onClick={handleLogout}
//                         className="text-left font-medium text-red-600"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>
//     </header >
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

const NavbarSearch = dynamic(
  () => import("./NavbarSearch"),
  {
    ssr: false,
  }
);

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Browse Lawyers",
    href: "/lawyers",
  },
];

export default function Navbar() {

  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);


  const handleSearch = () => {


    if (!search.trim()) return;

    setMenuOpen(false);

    router.push(
      `/lawyers?search=${encodeURIComponent(
        search
      )}`
    );


  };
  useEffect(() => {

    const getUser = async () => {

      try {

        const session =
          await authClient.getSession();

        if (!session?.data?.user) {

          setUser(null);

          return;

        }

        const currentUser =
          session.data.user;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${currentUser.email}`
        );

        const dbUser =
          await res.json();

        setUser(dbUser);

      } catch (error) {

        console.log(
          "User fetch error:",
          error
        );

      }

    };

    getUser();

    window.addEventListener(
      "user-auth-changed",
      getUser
    );

    return () => {

      window.removeEventListener(
        "user-auth-changed",
        getUser
      );

    };

  }, []);

  const handleLogout = async () => {

    try {

      await authClient.signOut();

      setUser(null);

      setUserMenuOpen(false);

      router.push("/");

    } catch (error) {

      console.log(
        "Logout error:",
        error
      );

    }

  };

  // Prevent Hydration Mismatch

  if (!mounted) {

    return null;

  }

  return (

    <header
      className="
      sticky
      top-0
      z-50
      bg-[#F8F5F0]
      py-4
      "
    >

      <motion.div
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="
        mx-auto
        max-w-7xl
        px-4
        "
      >

        <div
          className="
          rounded-[24px]
          border
          border-[#DCCFC0]
          bg-[#F9F6F1]
          px-5
          lg:px-8
          py-4
          shadow-sm
          "
        >

          <div
            className="
            flex
            items-center
            justify-between
            "
          >

            {/* Logo */}

            <Link
              href="/"
              className="flex items-center"
            >

              <Image
                src="/newlogo.png"
                alt="LegalEase"
                width={220}
                height={60}
                priority
                className="
                h-[60px]
                w-auto
                object-contain
                "
              />

            </Link>
            {/* Desktop Navigation */}

            <nav
              className="
              hidden
              lg:flex
              items-center
              gap-10
              "
            >

              {navLinks.map((link) => (

                <Link
                  key={link.name}
                  href={link.href}
                  className="
                  font-medium
                  text-[#6B5B45]
                  transition-all
                  duration-300
                  hover:text-[#C39245]
                  "
                >
                  {link.name}
                </Link>

              ))}

            </nav>

            {/* Desktop Search */}

            <div
              className="
  hidden
  lg:flex
  items-center
  justify-center
  w-[420px]
  xl:w-[500px]
  "
            >
              <NavbarSearch />
            </div>

            {/* Desktop Right Side */}

            <div
              className="
              hidden
              lg:flex
              items-center
              gap-6
              "
            >

              {user ? (

                <div className="relative">

                  <button
                    onClick={() =>
                      setUserMenuOpen(
                        !userMenuOpen
                      )
                    }
                    className="
                    flex
                    items-center
                    gap-3
                    "
                  >

                    {/* User Image */}

                    {user.image ? (

                      <Image
                        src={user.image}
                        alt={user.name}
                        width={45}
                        height={45}
                        className="
                        rounded-full
                        object-cover
                        border
                        border-[#E6D7C3]
                        "
                      />

                    ) : (

                      <div
                        className="
                        w-11
                        h-11
                        rounded-full
                        bg-[#D4A95A]
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-lg
                        "
                      >
                        {user?.name?.charAt(0)}
                      </div>

                    )}

                    {/* Welcome Text */}

                    <div className="text-left">

                      <h4
                        className="
                        font-semibold
                        text-[#3B2F1E]
                        "
                      >
                        Welcome Back
                      </h4>

                      <p
                        className="
                        text-xs
                        text-[#8B6F47]
                        "
                      >
                        {user.name}
                        {" "}
                        ({user.role})
                      </p>

                    </div>

                    <FaChevronDown
                      className="
                      text-[#8B6F47]
                      "
                    />

                  </button>
                  {/* User Dropdown */}

                  <AnimatePresence>

                    {userMenuOpen && (

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 10,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="
                        absolute
                        right-0
                        mt-4
                        w-64
                        rounded-2xl
                        bg-white
                        shadow-2xl
                        border
                        border-[#EADBC8]
                        overflow-hidden
                        z-50
                        "
                      >

                        <div className="p-5">

                          <h3
                            className="
                            font-bold
                            text-[#3B2F1E]
                            "
                          >
                            {user.name}
                          </h3>

                          <p
                            className="
                            text-sm
                            text-gray-500
                            mt-1
                            "
                          >
                            {user.email}
                          </p>

                        </div>

                        <div className="border-t">

                          <Link
                            href={`/dashboard/${user.role}`}
                            className="
                            block
                            px-5
                            py-3
                            hover:bg-[#FFF8EC]
                            transition
                            "
                          >
                            Dashboard
                          </Link>

                          <Link
                            href={`/dashboard/${user.role}/update-profile`}
                            className="
                            block
                            px-5
                            py-3
                            hover:bg-[#FFF8EC]
                            transition
                            "
                          >
                            Update Profile
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="
                            w-full
                            text-left
                            px-5
                            py-3
                            text-red-500
                            hover:bg-red-50
                            transition
                            "
                          >
                            Logout
                          </button>

                        </div>

                      </motion.div>

                    )}

                  </AnimatePresence>

                </div>

              ) : (

                <div
                  className="
                  flex
                  items-center
                  gap-3
                  "
                >

                  <Link
                    href="/login"
                    className="
                    px-5
                    py-2.5
                    rounded-full
                    border
                    border-[#D4A95A]
                    text-[#B88746]
                    font-medium
                    hover:bg-[#FFF8EC]
                    transition
                    "
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="
                    px-5
                    py-2.5
                    rounded-full
                    bg-gradient-to-r
                    from-[#D4A95A]
                    to-[#B88746]
                    text-white
                    font-medium
                    shadow-md
                    hover:scale-105
                    transition-all
                    "
                  >
                    Register
                  </Link>

                </div>

              )}

            </div>

            {/* Mobile Menu Button */}

            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
              className="
              lg:hidden
              flex
              items-center
              justify-center
              w-11
              h-11
              rounded-xl
              bg-white
              border
              border-[#E6D7C3]
              shadow-md
              text-[#B88746]
              "
            >

              {menuOpen ? (

                <FaTimes
                  size={20}
                />

              ) : (

                <FaBars
                  size={20}
                />

              )}

            </motion.button>

          </div>
          {/* Mobile Menu */}

          <AnimatePresence>

            {menuOpen && (

              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                lg:hidden
                overflow-hidden
                "
              >

                <div
                  className="
                  mt-5
                  rounded-3xl
                  bg-white
                  p-5
                  shadow-xl
                  border
                  border-[#EADBC8]
                  "
                >

                  {/* Mobile Search */}

                  <div className="relative mb-6">

                    <FaSearch
                      className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#B88746]
                      "
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter"
                        ) {
                          handleSearch();
                        }
                      }}
                      placeholder="Search lawyers..."
                      className="
                      w-full
                      rounded-full
                      border
                      border-[#DCCFC0]
                      bg-white
                      py-3
                      pl-11
                      pr-16
                      outline-none
                      focus:border-[#CBA56A]
                      focus:ring-2
                      focus:ring-[#E9D7B8]
                      "
                    />

                    <button
                      onClick={
                        handleSearch
                      }
                      className="
                      absolute
                      right-2
                      top-1/2
                      -translate-y-1/2
                      px-4
                      py-1.5
                      rounded-full
                      bg-gradient-to-r
                      from-[#D4A95A]
                      to-[#B88746]
                      text-white
                      text-sm
                      "
                    >
                      Go
                    </button>

                  </div>

                  {/* Mobile Links */}

                  <div className="space-y-4">

                    {navLinks.map(
                      (link) => (

                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() =>
                            setMenuOpen(
                              false
                            )
                          }
                          className="
                          block
                          text-[#6B5B45]
                          font-medium
                          hover:text-[#B88746]
                          transition
                          "
                        >
                          {link.name}
                        </Link>

                      )
                    )}

                  </div>

                  {/* Mobile User */}

                  {user ? (

                    <div
                      className="
                      mt-6
                      pt-6
                      border-t
                      "
                    >

                      <div
                        className="
                        flex
                        items-center
                        gap-3
                        mb-5
                        "
                      >

                        {user.image ? (

                          <Image
                            src={user.image}
                            alt={user.name}
                            width={50}
                            height={50}
                            className="
                            rounded-full
                            object-cover
                            "
                          />

                        ) : (

                          <div
                            className="
                            w-12
                            h-12
                            rounded-full
                            bg-[#D4A95A]
                            text-white
                            flex
                            items-center
                            justify-center
                            font-bold
                            "
                          >
                            {user?.name?.charAt(
                              0
                            )}
                          </div>

                        )}

                        <div>

                          <h4
                            className="
                            font-semibold
                            text-[#2B2118]
                            "
                          >
                            {user.name}
                          </h4>

                          <p
                            className="
                            text-sm
                            text-gray-500
                            "
                          >
                            {user.role}
                          </p>

                        </div>

                      </div>

                      <div className="space-y-3">

                        <Link
                          href={`/dashboard/${user.role}`}
                          onClick={() =>
                            setMenuOpen(
                              false
                            )
                          }
                          className="
                          block
                          rounded-xl
                          bg-[#FFF8EC]
                          px-4
                          py-3
                          "
                        >
                          Dashboard
                        </Link>

                        <Link
                          href={`/dashboard/${user.role}/update-profile`}
                          onClick={() =>
                            setMenuOpen(
                              false
                            )
                          }
                          className="
                          block
                          rounded-xl
                          bg-[#FFF8EC]
                          px-4
                          py-3
                          "
                        >
                          Update Profile
                        </Link>

                        <button
                          onClick={
                            handleLogout
                          }
                          className="
                          w-full
                          rounded-xl
                          bg-red-50
                          text-red-500
                          px-4
                          py-3
                          text-left
                          "
                        >
                          Logout
                        </button>

                      </div>

                    </div>

                  ) : (

                    <div
                      className="
                      mt-6
                      pt-6
                      border-t
                      flex
                      flex-col
                      gap-3
                      "
                    >

                      <Link
                        href="/login"
                        className="
                        w-full
                        text-center
                        rounded-xl
                        border
                        border-[#D4A95A]
                        text-[#B88746]
                        py-3
                        "
                      >
                        Login
                      </Link>

                      <Link
                        href="/register"
                        className="
                        w-full
                        text-center
                        rounded-xl
                        bg-gradient-to-r
                        from-[#D4A95A]
                        to-[#B88746]
                        text-white
                        py-3
                        "
                      >
                        Register
                      </Link>

                    </div>

                  )}

                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </motion.div>

    </header>

  );
}
