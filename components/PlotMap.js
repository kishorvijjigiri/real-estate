"use client";

import { useState } from "react";

// Format currency in Indian format (Lakhs / Crores)
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

export default function PlotMap({ allPlots = [], filteredPlotIds = new Set(), children }) {
  // Zoom & Pan states
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Hover state
  const [hoveredPlot, setHoveredPlot] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.9));
  };

  // Desktop drag handlers
  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
    if (hoveredPlot) {
      setTooltipPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch pan handlers for mobile screens
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      setPan({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Basic status color styling for SVG plot display
  const getPlotColor = (plot, isMatched) => {
    if (!isMatched) {
      return {
        fill: "rgba(209, 213, 219, 0.3)",
        stroke: "rgba(156, 163, 175, 0.4)",
        opacity: 0.3,
        textColor: "#9ca3af",
      };
    }

    const s = plot.status?.toLowerCase();
    // 1. Available -> Green
    if (s === "available") {
      return {
        fill: "rgba(34, 197, 94, 0.8)",
        stroke: "#15803d",
        opacity: 0.9,
        textColor: "#ffffff",
      };
    }
    // 2. Booked -> Amber / Orange
    if (s === "booked") {
      return {
        fill: "rgba(245, 158, 11, 0.85)",
        stroke: "#b45309",
        opacity: 0.9,
        textColor: "#ffffff",
      };
    }
    // 3. Sold -> Red
    return {
      fill: "rgba(239, 68, 68, 0.8)",
      stroke: "#b91c1c",
      opacity: 0.9,
      textColor: "#ffffff",
    };
  };

  return (
    // Map container - borderless, fits image naturally
    <div
      className={`relative w-full max-w-[1024px] mx-auto aspect-[1024/545] overflow-hidden select-none border-0 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ border: "none", outline: "none", boxShadow: "none" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsDragging(false);
        setHoveredPlot(null);
        setTooltipPos(null);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* Map Content Container with zoom and pan transform */}
      <div
        className="w-full h-full pointer-events-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: isDragging ? "none" : "transform 0.1s ease-out",
        }}
      >
        <div className="relative w-full h-full border-0">
          {/* Blueprint background map image - borderless */}
          <img
            src="/layout-map.jpg"
            alt="Real Estate Plot Layout"
            className="w-full h-full block object-fill pointer-events-none border-0"
            style={{ border: "none", outline: "none" }}
            draggable={false}
          />

          {/* SVG plot coordinates overlay aligned with background */}
          <svg
            viewBox="0 0 1024 545"
            className="absolute inset-0 h-full w-full pointer-events-auto border-0"
            style={{ border: "none", outline: "none" }}
            preserveAspectRatio="none"
          >
            {allPlots.map((plot) => {
              const { x, y, width = 17, height = 30 } = plot.mapCoords || {};
              const isMatched = filteredPlotIds.has(plot.id);
              const isHovered = hoveredPlot?.id === plot.id;
              const style = getPlotColor(plot, isMatched);

              return (
                <g
                  key={plot.id}
                  className="cursor-pointer"
                  onMouseEnter={(e) => {
                    setHoveredPlot(plot);
                    setTooltipPos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => {
                    setHoveredPlot(null);
                    setTooltipPos(null);
                  }}
                >
                  {/* Basic plot rectangle */}
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={style.fill}
                    stroke={isHovered ? "#000000" : style.stroke}
                    strokeWidth={isHovered ? "2" : "1"}
                    opacity={style.opacity}
                  />

                  {/* Centered plot number text */}
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={width < 18 ? "6.5" : "7.5"}
                    fill={isMatched ? style.textColor : "#9ca3af"}
                    fontWeight="700"
                    className="pointer-events-none select-none font-mono"
                  >
                    {plot.number}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Filter Button / Card placed directly ON the image */}
      <div className="absolute top-3 left-3 z-20 pointer-events-auto">
        {children}
      </div>

      {/* Hover Tooltip Card (Zero border radius) */}
      {hoveredPlot && tooltipPos && (
        <div
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform:
              tooltipPos.y < 160
                ? "translate(-50%, 12px)"
                : "translate(-50%, -100%) translateY(-12px)",
            borderRadius: "0px",
          }}
          className="pointer-events-none fixed z-50 w-56 rounded-none border border-gray-300 bg-white p-2.5 text-xs text-gray-900 shadow-md"
        >
          {/* Header row: Plot : {number} and Status */}
          <div className="mb-1.5 flex items-center justify-between border-b border-gray-200 pb-1">
            <span className="font-semibold text-gray-900">
              Plot : {hoveredPlot.number}
            </span>
            <span
              style={{ borderRadius: "0px" }}
              className={`rounded-none px-1.5 py-0.5 text-[10px] font-medium capitalize ${
                hoveredPlot.status === "available"
                  ? "bg-green-100 text-green-800"
                  : hoveredPlot.status === "booked"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {hoveredPlot.status}
            </span>
          </div>

          {/* Details rows: Total Sq Ft, Rate, and Total Cost */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Sq Ft:</span>
              <span className="font-mono font-medium text-gray-800">
                {Number(hoveredPlot.size).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Rate:</span>
              <span className="font-mono font-medium text-gray-800">
                ₹{hoveredPlot.rate.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-1 font-semibold">
              <span className="text-gray-600">Total Cost:</span>
              <span className="font-mono font-bold text-gray-900">
                {formatCost(hoveredPlot.totalCost || hoveredPlot.size * hoveredPlot.rate)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Basic Zoom Controls placed directly ON the image (Bottom-Right) */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded bg-white p-1 text-gray-700 shadow-md pointer-events-auto border-0">
        <button
          type="button"
          onClick={handleZoomOut}
          style={{ border: "none", outline: "none" }}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded text-base font-bold text-gray-700 hover:bg-gray-100 border-0 outline-none"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          −
        </button>
        <button
          type="button"
          onClick={handleZoomIn}
          style={{ border: "none", outline: "none" }}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded text-base font-bold text-gray-700 hover:bg-gray-100 border-0 outline-none"
          title="Zoom In"
          aria-label="Zoom In"
        >
          +
        </button>
      </div>
    </div>
  );
}
