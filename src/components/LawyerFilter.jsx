"use client";

export default function LawyerFilter({
  specialization,
  setSpecialization,
  availability,
  setAvailability,
  sort,
  setSort,
}) {
  return (
    <div className="grid md:grid-cols-3 gap-4">

      {/* Category */}

      <select
        value={specialization}
        onChange={(e) =>
          setSpecialization(e.target.value)
        }
        className="
        bg-[#FCF8F3]
        border
        border-[#E8DDCF]
        rounded-xl
        px-4
        py-3
        text-[#1E1E1E]
        "
      >
        <option value="">
          All Categories
        </option>

        <option value="Criminal Lawyer">
          Criminal Lawyer
        </option>

        <option value="Family Lawyer">
          Family Lawyer
        </option>

        <option value="Corporate Lawyer">
          Corporate Lawyer
        </option>

        <option value="Property Lawyer">
          Property Lawyer
        </option>

        <option value="Business Lawyer">
          Business Lawyer
        </option>

      </select>

      {/* Availability */}

      <select
        value={availability}
        onChange={(e) =>
          setAvailability(e.target.value)
        }
        className="
        bg-[#FCF8F3]
        border
        border-[#E8DDCF]
        rounded-xl
        px-4
        py-3
        text-[#1E1E1E]
        "
      >
        <option value="">
          Availability
        </option>

        <option value="Available">
          Available
        </option>

        <option value="Busy">
          Busy
        </option>

      </select>

      {/* Sort */}

      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
        className="
        bg-[#FCF8F3]
        border
        border-[#E8DDCF]
        rounded-xl
        px-4
        py-3
        text-[#1E1E1E]
        "
      >
        <option value="">
          Sort By
        </option>

        <option value="rating">
          Highest Rating
        </option>

        <option value="feeLow">
          Lowest Fee
        </option>

        <option value="feeHigh">
          Highest Fee
        </option>

        <option value="experience">
          Most Experience
        </option>

      </select>

    </div>
  );
}