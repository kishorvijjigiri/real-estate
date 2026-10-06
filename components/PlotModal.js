"use client";

export default function PlotModal({ plot, onClose }) {
  if (!plot) return null;

  const formattedCost = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(plot.totalCost);

  const getStatusBadge = () => {
    switch (plot.status) {
      case "Available":
        return "bg-emerald-500 text-white";
      case "Booked":
        return "bg-amber-400 text-amber-950";
      case "Sold":
        return "bg-rose-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-900">
            {plot.plotNumber}
          </h3>
          <span
            className={`rounded-full px-3 py-0.5 text-xs font-semibold ${getStatusBadge()}`}
          >
            {plot.status}
          </span>
        </div>

        {/* Details Grid */}
        <div className="my-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 p-3">
            <span className="block text-xs font-medium text-slate-500">Plot Area</span>
            <span className="font-bold text-slate-800">{plot.size} sq.ft</span>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <span className="block text-xs font-medium text-slate-500">Dimensions</span>
            <span className="font-bold text-slate-800">{plot.dimensions}</span>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <span className="block text-xs font-medium text-slate-500">Facing Direction</span>
            <span className="font-bold text-slate-800">{plot.facing}</span>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <span className="block text-xs font-medium text-slate-500">Road Width</span>
            <span className="font-bold text-slate-800">{plot.roadWidth}</span>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <span className="block text-xs font-medium text-slate-500">Rate per Sq.Ft</span>
            <span className="font-bold text-slate-800">₹{plot.rate.toLocaleString("en-IN")}/sq.ft</span>
          </div>

          <div className="rounded-xl bg-emerald-50 p-3">
            <span className="block text-xs font-medium text-emerald-700">Total Price</span>
            <span className="font-bold text-emerald-800">{formattedCost}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>

          {plot.status === "Available" ? (
            <button
              onClick={() => alert(`Enquiry received for ${plot.plotNumber}!`)}
              className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700"
            >
              Enquire Now
            </button>
          ) : (
            <button
              disabled
              className="flex-1 cursor-not-allowed rounded-xl bg-slate-200 py-2.5 text-sm font-semibold text-slate-500"
            >
              {plot.status === "Sold" ? "Sold Out" : "Plot Reserved"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
