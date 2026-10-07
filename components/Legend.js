"use client";

// Legend component for status filter buttonsS
export default function Legend({ statusCounts, selectedStatuses = [], onToggleStatus }) {
  const isStatusActive = (statusToCheck) => {
    return selectedStatuses.length === 0 || selectedStatuses.includes(statusToCheck);
  };

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {/* Available Button - Green*/}
      <button
        type="button"
        onClick={() => onToggleStatus("available")}
        className={`px-3 py-1.5 text-xs text-white bg-green-600 hover:bg-green-700 cursor-pointer ${
          isStatusActive("available") ? "opacity-100" : "opacity-40"
        }`}
      >
        Available ({statusCounts.available})
      </button>

      {/* Booked Button - Orange */}
      <button
        type="button"
        onClick={() => onToggleStatus("booked")}
        className={`px-3 py-1.5 text-xs text-white bg-amber-500 hover:bg-amber-600 cursor-pointer ${
          isStatusActive("booked") ? "opacity-100" : "opacity-40"
        }`}
      >
        Booked ({statusCounts.booked})
      </button>

      {/* Sold Button - Red */}
      <button
        type="button"
        onClick={() => onToggleStatus("sold")}
        className={`px-3 py-1.5 text-xs  text-white bg-red-600 hover:bg-red-700 cursor-pointer ${
          isStatusActive("sold") ? "opacity-100" : "opacity-40"
        }`}
      >
        Sold ({statusCounts.sold})
      </button>
    </div>
  );
}
