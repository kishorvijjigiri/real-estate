"use client";

import { useState } from "react";
import plots from "../data/plots";

import PlotGrid from "../components/PlotGrid";
import FilterPanel from "../components/FilterPanel";
import Legend from "../components/Legend";
import PlotModal from "../components/PlotModal";

export default function Home() {
  // Filter states
  const [status, setStatus] = useState("All");
  const [size, setSize] = useState("All");
  const [cost, setCost] = useState("All");

  // Selected plot for modal view (click/tap)
  const [selectedPlot, setSelectedPlot] = useState(null);

  // Filter the plots based on active filter choices
  const filteredPlots = plots.filter((plot) => {
    // 1. Status Filter
    if (status !== "All" && plot.status.toLowerCase() !== status.toLowerCase()) {
      return false;
    }

    // 2. Size Filter
    if (size !== "All" && plot.size !== Number(size)) {
      return false;
    }

    // 3. Total Cost Filter
    if (cost === "low" && plot.totalCost >= 3500000) {
      return false; // Below 35 Lakhs
    }

    if (
      cost === "medium" &&
      (plot.totalCost < 3500000 || plot.totalCost > 5000000)
    ) {
      return false; // Between 35L and 50L
    }

    if (cost === "high" && plot.totalCost <= 5000000) {
      return false; // Above 50 Lakhs
    }

    return true;
  });

  // Calculate status counts for the legend
  const statusCounts = plots.reduce((acc, plot) => {
    acc[plot.status] = (acc[plot.status] || 0) + 1;
    return acc;
  }, {});

  // Reset all filters to default
  const resetFilters = () => {
    setStatus("All");
    setSize("All");
    setCost("All");
  };

  return (
    <main className="min-h-screen bg-slate-100 pb-16">
      {/* Header Banner */}
      <header className="bg-slate-900 text-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Residential Gated Community Layout
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl text-white">
              Greenfield Residential Layout
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl">
              Explore plots in an interactive grid. Hover over any plot for quick specs or click to see full details.
            </p>
          </div>

          {/* Quick Stats overview */}
          <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end gap-3 text-center">
            <div className="rounded-xl bg-slate-800/80 border border-slate-700/60 px-4 py-2">
              <div className="text-xl font-bold text-white">{plots.length}</div>
              <div className="text-[11px] font-medium text-slate-400">Total Plots</div>
            </div>
            <div className="rounded-xl bg-emerald-950/40 border border-emerald-700/40 px-4 py-2">
              <div className="text-xl font-bold text-emerald-400">
                {statusCounts.Available || 0}
              </div>
              <div className="text-[11px] font-medium text-emerald-300">Available</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <FilterPanel
          status={status}
          setStatus={setStatus}
          size={size}
          setSize={setSize}
          cost={cost}
          setCost={setCost}
          resetFilters={resetFilters}
        />

        {/* Legend */}
        <Legend counts={statusCounts} />

        {/* Results Counter & Active Filter Tags */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <p className="text-sm font-semibold text-slate-700">
            Showing <span className="text-blue-600 font-bold">{filteredPlots.length}</span> of {plots.length} plots
          </p>

          {(status !== "All" || size !== "All" || cost !== "All") && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Active filters:</span>
              {status !== "All" && (
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  {status}
                </span>
              )}
              {size !== "All" && (
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  {size} sq.ft
                </span>
              )}
              {cost !== "All" && (
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  {cost === "low" ? "< 35L" : cost === "medium" ? "35L-50L" : "> 50L"}
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-rose-600 hover:underline ml-1"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Plots Grid */}
        <PlotGrid
          plots={filteredPlots}
          onSelectPlot={(plot) => setSelectedPlot(plot)}
          onResetFilters={resetFilters}
        />
      </div>

      {/* Plot Details Modal (for mobile tap / desktop click) */}
      {selectedPlot && (
        <PlotModal
          plot={selectedPlot}
          onClose={() => setSelectedPlot(null)}
        />
      )}
    </main>
  );
}