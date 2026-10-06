"use client";

// Legend component for status filter buttons (borderless solid color buttons with white text)
export default function Legend({ statusCounts, selectedStatuses = [], onToggleStatus }) {
  const isStatusActive = (statusToCheck) => {
    return selectedStatuses.length === 0 || selectedStatuses.includes(statusToCheck);
  };

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {/* Available Button - Green, completely borderless */}
      <button
        type="button"
        onClick={() => onToggleStatus("available")}
        style={{ border: "none", outline: "none" }}
        className={`px-3 py-1.5 text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 cursor-pointer transition border-0 outline-none ${
          isStatusActive("available") ? "opacity-100" : "opacity-40"
        }`}
      >
        Available ({statusCounts.available})
      </button>

      {/* Booked Button - Amber / Orange, completely borderless */}
      <button
        type="button"
        onClick={() => onToggleStatus("booked")}
        style={{ border: "none", outline: "none" }}
        className={`px-3 py-1.5 text-xs font-medium rounded text-white bg-amber-500 hover:bg-amber-600 cursor-pointer transition border-0 outline-none ${
          isStatusActive("booked") ? "opacity-100" : "opacity-40"
        }`}
      >
        Booked ({statusCounts.booked})
      </button>

      {/* Sold Button - Red, completely borderless */}
      <button
        type="button"
        onClick={() => onToggleStatus("sold")}
        style={{ border: "none", outline: "none" }}
        className={`px-3 py-1.5 text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 cursor-pointer transition border-0 outline-none ${
          isStatusActive("sold") ? "opacity-100" : "opacity-40"
        }`}
      >
        Sold ({statusCounts.sold})
      </button>
    </div>
  );
}
