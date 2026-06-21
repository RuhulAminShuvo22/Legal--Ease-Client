"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="relative w-full">

      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
      />

      <input
        type="text"
        placeholder="Search by lawyer name or specialization..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
        w-full
        bg-[#FCF8F3]
        border
        border-[#E8DDCF]
        rounded-xl
        py-3
        pl-12
        pr-4
        outline-none
        focus:border-[#D4A95A]
        text-[#1E1E1E]
        "
      />

    </div>
  );
}