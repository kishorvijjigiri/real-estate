"use client";

import { useState, useMemo } from "react";
import plots, { SQFT_FILTER_PRESETS, MAX_COST_DEFAULT } from "../data/plotsData";
import Header from "../components/Header";
import Legend from "../components/Legend";
import PlotMap from "../components/PlotMap";
import FilterPanel from "../components/FilterPanel";

export default function Home() {
  // State for filter choices
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [maxCost, setMaxCost] = useState(MAX_COST_DEFAULT);

  // Popup filter modal visibility
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Toggle status filter
  const handleToggleStatus = (statusToToggle) => {
    setSelectedStatuses((prev) =>
      prev.includes(statusToToggle)
        ? prev.filter((s) => s !== statusToToggle)
        : [...prev, statusToToggle]
    );
  };

  // Filter plots based on active criteria
  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      // 1. Status Filter
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(plot.status?.toLowerCase())) {
        return false;
      }

      // 2. Square Feet Preset Filter
      if (selectedSize) {
        const preset = SQFT_FILTER_PRESETS.find((p) => p.value === selectedSize);
        if (preset && plot.size > preset.max) {
          return false;
        }
      }

      // 3. Max Cost Filter
      if (plot.totalCost > maxCost) {
        return false;
      }

      return true;
    });
  }, [selectedStatuses, selectedSize, maxCost]);

  // Set of plot IDs matching the filter
  const filteredPlotIds = useMemo(() => {
    return new Set(filteredPlots.map((p) => p.id));
  }, [filteredPlots]);

  // Status counts for legend badges
  const statusCounts = useMemo(() => {
    return {
      total: plots.length,
      available: plots.filter((p) => p.status === "available").length,
      booked: plots.filter((p) => p.status === "booked").length,
      sold: plots.filter((p) => p.status === "sold").length,
    };
  }, []);

  // Check if any filter is active
  const hasActiveFilters =
    selectedStatuses.length > 0 || selectedSize !== null || maxCost < MAX_COST_DEFAULT;

  // Reset all filters
  const resetFilters = () => {
    setSelectedStatuses([]);
    setSelectedSize(null);
    setMaxCost(MAX_COST_DEFAULT);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header Component */}
      <Header />

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 py-3 space-y-3 flex-1">
        {/* Legend Component */}
        <Legend
          statusCounts={statusCounts}
          selectedStatuses={selectedStatuses}
          onToggleStatus={handleToggleStatus}
        />

        {/* Blueprint Layout Map with Filter directly on the Image */}
        <div className="w-full">
          <PlotMap allPlots={plots} filteredPlotIds={filteredPlotIds}>
            {/* Filter Popup Card or Open Button placed directly ON the image */}
            {isFilterOpen ? (
              <div className="max-w-[calc(100vw-1.5rem)]">
                <FilterPanel
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                  maxCost={maxCost}
                  onCostChange={setMaxCost}
                  onReset={resetFilters}
                  onClose={() => setIsFilterOpen(false)}
                  matchingCount={filteredPlots.length}
                  totalCount={plots.length}
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-gray-100 text-xs font-medium text-gray-700 cursor-pointer shadow-md border-0 outline-none"
              
              >
                
                <span>Filter</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                )}
              </button>
            )}
          </PlotMap>
        </div>
      </main>
    </div>
  );
}