export default function Legend({ counts = {} }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm border border-slate-200">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Status Legend:
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        {/* Available */}
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Available {counts.Available !== undefined ? `(${counts.Available})` : ""}
          </span>
        </div>

        {/* Booked */}
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full bg-amber-400 ring-4 ring-amber-100"></span>
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Booked {counts.Booked !== undefined ? `(${counts.Booked})` : ""}
          </span>
        </div>

        {/* Sold */}
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full bg-rose-500 ring-4 ring-rose-100"></span>
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Sold {counts.Sold !== undefined ? `(${counts.Sold})` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}