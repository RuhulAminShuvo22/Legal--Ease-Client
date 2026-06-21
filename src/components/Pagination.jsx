"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="flex justify-center items-center gap-2 mt-12">

      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
        className="
        h-11
        w-11
        rounded-xl
        border
        border-[#E8DDCF]
        bg-white
        flex
        justify-center
        items-center
        disabled:opacity-40
        "
      >
        <ChevronLeft size={18} />
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() =>
            setCurrentPage(index + 1)
          }
          className={`
          h-11
          w-11
          rounded-xl
          transition
          ${
            currentPage === index + 1
              ? "bg-[#D4A95A] text-white"
              : "bg-white border border-[#E8DDCF]"
          }
          `}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
        className="
        h-11
        w-11
        rounded-xl
        border
        border-[#E8DDCF]
        bg-white
        flex
        justify-center
        items-center
        disabled:opacity-40
        "
      >
        <ChevronRight size={18} />
      </button>

    </div>
  );
}