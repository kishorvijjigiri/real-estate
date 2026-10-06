"use client";

export default function PlotCard({ plot, onSelect }) {
  // Determine card theme color based on plot status
  const getStatusStyles = () => {
    switch (plot.status) {
      case "Available":
        return {
          cardBg: "bg-emerald-50 border-emerald-300 hover:border-emerald-500",
          badgeBg: "bg-emerald-500 text-white",
          accentColor: "text-emerald-700",
          indicator: "bg-emerald-500",
        };
      case "Booked":
        return {
          cardBg: "bg-amber-50 border-amber-300 hover:border-amber-500",
          badgeBg: "bg-amber-400 text-amber-950 font-semibold",
          accentColor: "text-amber-700",
          indicator: "bg-amber-400",
        };
      case "Sold":
        return {
          cardBg: "bg-rose-50 border-rose-300 hover:border-rose-500",
          badgeBg: "bg-rose-500 text-white",
          accentColor: "text-rose-700",
          indicator: "bg-rose-500",
        };
      default:
        return {
          cardBg: "bg-gray-50 border-gray-300 hover:border-gray-500",
          badgeBg: "bg-gray-500 text-white",
          accentColor: "text-gray-700",
          indicator: "bg-gray-500",
        };
    }
  };

  const styles = getStatusStyles();

  // Format currency in Indian numbering format (e.g., ₹33,60,000)
  const formattedCost = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(plot.totalCost);

  return (
    <div
      onClick={() => onSelect && onSelect(plot)}
      className={`group relative flex flex-col justify-between rounded-xl border-2 p-4 shadow-sm transition-all duration-200 
      hover:-translate-y-1 hover:shadow-lg cursor-pointer ${styles.cardBg}`}
    >
      {/* Top Header: Plot Number and Status Badge */}
      <div className="flex items-center justify-between gap-1">
        <span className="font-bold text-slate-800 text-base">
          {plot.plotNumber}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles.badgeBg}`}
        >
          {plot.status}
        </span>
      </div>

      {/* Middle: Size and Facing */}
      <div className="my-3 space-y-1">
        <div className="flex items-baseline justify-between text-xs text-slate-600">
          <span>Area:</span>
          <span className="font-bold text-slate-800 text-sm">
            {plot.size} sq.ft
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Facing:</span>
          <span>{plot.facing}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Size:</span>
          <span>{plot.dimensions}</span>
        </div>
      </div>

      {/* Bottom: Price */}
      <div className="border-t border-slate-200/80 pt-2 flex items-center justify-between">
        <span className="text-[11px] font-medium text-slate-500">Price:</span>
        <span className="text-xs font-bold text-slate-900">
          {formattedCost}
        </span>
      </div>

      {/* Hover Information Tooltip (Desktop) */}
      <div
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden w-56 -translate-x-1/2 rounded-xl bg-slate-900 p-3.5 text-left text-xs text-white shadow-2xl transition-all duration-200 group-hover:block"
      >
        <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
          <span className="font-bold text-sm text-white">{plot.plotNumber}</span>
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${styles.indicator}`}></span>
            <span className="font-semibold">{plot.status}</span>
          </div>
        </div>

        <div className="space-y-1 text-slate-300">
          <p className="flex justify-between">
            <span className="text-slate-400">Dimensions:</span>
            <span className="font-medium text-white">{plot.dimensions}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-slate-400">Total Area:</span>
            <span className="font-medium text-white">{plot.size} sq.ft</span>
          </p>
          <p className="flex justify-between">
            <span className="text-slate-400">Facing:</span>
            <span className="font-medium text-white">{plot.facing}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-slate-400">Road:</span>
            <span className="font-medium text-white">{plot.roadWidth}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-slate-400">Rate:</span>
            <span className="font-medium text-white">₹{plot.rate}/sq.ft</span>
          </p>
          <div className="mt-2 border-t border-slate-700 pt-1.5 flex justify-between font-bold text-emerald-400 text-sm">
            <span>Total Cost:</span>
            <span>{formattedCost}</span>
          </div>
        </div>

        {/* Small tooltip downward arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
      </div>
    </div>
  );
}