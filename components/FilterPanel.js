export default function FilterPanel({
  status,
  setStatus,
  size,
  setSize,
  cost,
  setCost,
  resetFilters,
}) {
  return (
    <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">
          Filter Plots
        </h2>
        <span className="text-xs text-slate-400">
          Refine by status, size & budget
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Status Filter */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available Only</option>
            <option value="Booked">Booked Only</option>
            <option value="Sold">Sold Only</option>
          </select>
        </div>

        {/* 2. Plot Size Filter */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Plot Size
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Sizes</option>
            <option value="1000">1,000 sq.ft</option>
            <option value="1200">1,200 sq.ft</option>
            <option value="1500">1,500 sq.ft</option>
            <option value="1800">1,800 sq.ft</option>
            <option value="2400">2,400 sq.ft</option>
          </select>
        </div>

        {/* 3. Total Cost Filter */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Total Cost
          </label>
          <select
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Budgets</option>
            <option value="low">Under ₹35 Lakhs</option>
            <option value="medium">₹35 Lakhs - ₹50 Lakhs</option>
            <option value="high">Above ₹50 Lakhs</option>
          </select>
        </div>

        {/* 4. Reset Button */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 active:scale-[0.98] shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}