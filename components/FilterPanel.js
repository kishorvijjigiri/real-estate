"use client";

import { SQFT_FILTER_PRESETS } from "../data/plotsData";

// Format currency in Lakhs / Crores
function formatCost(val) {
  if (!val || isNaN(val)) return "₹0";
  const num = Number(val);
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} Lakh`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}

// Filter popup card component using basic Tailwind CSS
export default function FilterPanel({
  selectedSize,
  onSelectSize,
  maxCost,
  onCostChange,
  onReset,
  onClose,
  matchingCount,
  totalCount,
}) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      className="w-72 max-w-[calc(100vw-1.5rem)] rounded border border-gray-300 bg-white p-4 text-sm text-gray-900 shadow-md"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-2">
        <span className="font-semibold text-gray-900">Filters</span>
        <div className="flex items-center gap-1">
          {/* Reset button */}
          <button
            type="button"
            onClick={onReset}
            className="cursor-pointer rounded border border-gray-300 bg-white px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
            title="Reset Filters"
          >
            Reset
          </button>

          {/* Close button */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded border border-gray-300 bg-white px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
              title="Close Filters"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Square Feet: 4 presets in 2x2 grid */}
      <div className="mb-3">
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-xs font-medium text-gray-600">
            Square Feet:
          </label>
          {selectedSize && (
            <button
              type="button"
              onClick={() => onSelectSize(null)}
              className="cursor-pointer text-xs text-blue-600 hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {SQFT_FILTER_PRESETS.map((preset) => {
            const isSelected = selectedSize === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => onSelectSize(isSelected ? null : preset.value)}
                className={`p-1.5 border text-xs font-mono text-center rounded cursor-pointer ${
                  isSelected
                    ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Cost slider */}
      <div className="mb-3">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="font-medium text-gray-600">Max Cost:</span>
          <span className="font-mono font-semibold text-gray-900">
            {formatCost(maxCost)}
          </span>
        </div>
        <input
          type="range"
          min={3000000}
          max={14000000}
          step={250000}
          value={maxCost}
          onChange={(e) => onCostChange(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer rounded bg-gray-200 accent-blue-600"
        />
        <div className="mt-1 flex justify-between font-mono text-[11px] text-gray-400">
          <span>₹30 L</span>
          <span>₹80 L</span>
          <span>₹1.4 Cr</span>
        </div>
      </div>

      {/* Matching count footer */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-xs text-gray-500">
        <span>Matching:</span>
        <span className="font-mono font-semibold text-gray-800">
          {matchingCount} / {totalCount}
        </span>
      </div>
    </div>
  );
}