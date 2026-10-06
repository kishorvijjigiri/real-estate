# Real Estate Plot Layout

A responsive web application built with **Next.js** and **Tailwind CSS** that showcases an interactive real estate plot blueprint layout with real-time status tracking and a floating filter card.

Live Reference: [https://real-estate-layout-coral.vercel.app/](https://real-estate-layout-coral.vercel.app/)

---

## 📌 Features

1. **Interactive Blueprint Layout Map**:
   - Blueprint layout map image with SVG plot overlays mapped to exact geographical coordinates.
   - Zoom in, zoom out, and desktop/touch drag-to-pan capabilities.
   - Plots filtered out are dimmed smoothly to highlight matching plots.

2. **Status Color Filters**:
   - 🟢 **Available**: Green button (`bg-green-600`) with real-time count.
   - 🟡 **Booked**: Amber/Orange button (`bg-amber-500`) with real-time count.
   - 🔴 **Sold**: Red button (`bg-red-600`) with real-time count.
   - Centered above the map with clean solid backgrounds and white text.

3. **Compact Hover Information Card**:
   - Hovering on any plot shows a clean rectangular card (zero border-radius) with:
     - `Plot : {number}`
     - Status Badge
     - `Total Sq Ft: {size}`
     - `Rate: ₹{rate}` (without `/sq.ft`)
     - `Total Cost: ₹{cost}`

4. **Floating Filter Card**:
   - Clicking the floating **Filter** button opens the filter card:
     - **Square Feet**: 4 preset buttons (`0 - 540.00`, `≤ 1040.00`, `≤ 1540.00`, `≤ 2040.00`).
     - **Max Cost**: Budget range slider with formatted markers (₹30 L, ₹80 L, ₹1.4 Cr).
     - **Matching Counter**: Live display of matching plots (`X / 218`).
     - **Reset & Close**: Quick reset and close buttons.

---

## 📁 Modular Project Structure

```text
real-estate-layout/
├── app/
│   ├── globals.css          # Minimal Tailwind CSS setup
│   ├── layout.js            # Root layout
│   └── page.js              # Main dashboard page
├── components/
│   ├── Header.js            # Top header component
│   ├── Legend.js            # Centered solid status filter buttons
│   ├── FilterPanel.js       # Floating filter popup card (4 sqft presets, cost slider)
│   └── PlotMap.js           # Blueprint layout map with SVG overlays, zoom & hover card
├── data/
│   └── plotsData.js         # Single dataset file with 218 plots and presets
├── public/
│   └── layout-map.jpg       # Blueprint layout map image
├── next.config.mjs          # JavaScript Next.js configuration
├── package.json
└── README.md
```

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To build for production:
```bash
npm run build
npm run start
```
