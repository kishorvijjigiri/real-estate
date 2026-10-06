import PlotCard from "./PlotCard";

export default function PlotGrid({ plots, onSelectPlot, onResetFilters }) {
  if (plots.length === 0) {
    return (
      <div className="my-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-slate-800">
          No plots found matching your criteria
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Try adjusting your status, size, or budget filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-4">
      {plots.map((plot) => (
        <PlotCard
          key={plot.id}
          plot={plot}
          onSelect={onSelectPlot}
        />
      ))}
    </div>
  );
}