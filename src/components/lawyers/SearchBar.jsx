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
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full bg-[#FCF8F3] border border-[#E8DDCF] rounded-xl py-3 pl-12 pr-4 text-[#1E1E1E] outline-none transition-all duration-300 focus:border-[#D4A95A] focus:ring-2 focus:ring-[#D4A95A]/20"
      />
    </div>
  );
}