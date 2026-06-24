"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const NavbarSearch = () => {

    const router = useRouter();

    const [search, setSearch] =
        useState("");

    const handleSearch = () => {


        if (!search.trim()) return;

        router.push(
            `/lawyers?search=${encodeURIComponent(
                search
            )}`
        );


    };

    const handleKeyDown = (e) => {


        if (e.key === "Enter") {
            handleSearch();
        }


    };

    return (


        <div className="w-full max-w-[500px]">

            <div
                className="
    flex
    items-center
    overflow-hidden
    rounded-full
    bg-white
    border
    border-[#DCCFC0]
    shadow-sm
    hover:shadow-md
    transition-all
    duration-300
    "
            >

                <div
                    className="
      px-4
      text-[#B88746]
      "
                >
                    <FaSearch />
                </div>

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Search lawyers..."
                    className="
      flex-1
      min-w-0
      py-3
      px-2
      text-sm
      md:text-base
      text-[#6B5B45]
      bg-transparent
      outline-none
      "
                />

                <button
                    onClick={handleSearch}
                    className="
      px-4
      md:px-6
      py-3
      bg-gradient-to-r
      from-[#D4A95A]
      via-[#C89A48]
      to-[#B88A44]
      text-white
      text-sm
      md:text-base
      font-semibold
      hover:brightness-110
      transition-all
      duration-300
      "
                >
                    Search
                </button>

            </div>

        </div>


    );
};

export default NavbarSearch;
