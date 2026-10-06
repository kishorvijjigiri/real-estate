# Real Estate Plot Layout Web Application

A responsive, modern web application built using **Next.js** and **Tailwind CSS** that showcases an interactive real estate plot layout.

---

## 🌟 Key Features

1. **Responsive Plot Grid Layout**:
   - Displays plots in a structured, responsive grid (2 columns on mobile, 3-4 on tablet, 6 on desktop).
   - Realistic colony/gated community dummy layout dataset with 36 plots.

2. **Visually Distinguishable Statuses**:
   - 🟢 **Available** (Emerald Green) – Ready for immediate booking.
   - 🟡 **Booked** (Amber/Yellow) – Reserved by a customer.
   - 🔴 **Sold** (Rose/Red) – Sold out.

3. **Hover Information Tooltip (Desktop)**:
   - Hovering over any plot card displays an interactive tooltip with details:
     - Plot Number
     - Status with live indicator
     - Dimensions (e.g., `30 x 40 ft`)
     - Area in sq.ft (e.g., `1,200 sq.ft`)
     - Facing Direction (e.g., East, North, West, South)
     - Road Width (e.g., `40 ft Main Road`)
     - Rate per sq.ft (e.g., `₹2,800/sq.ft`)
     - Total Cost formatted in Indian Rupees (e.g., `₹33,60,000`)

4. **Click / Tap Plot Details Modal (Mobile & Desktop)**:
   - On mobile touch devices where hover is unavailable (as well as on desktop click), clicking a plot opens a clean details modal with an enquiry button.

5. **Status Legend**:
   - Displays color indicators along with live counts for Available, Booked, and Sold plots.

6. **Interactive Filters**:
   - **Status Filter**: View All, Available only, Booked only, or Sold only.
   - **Plot Size Filter**: Filter by exact plot size (1,000 sq.ft, 1,200 sq.ft, 1,500 sq.ft, 1,800 sq.ft, 2,400 sq.ft).
   - **Total Cost Filter**: Filter by budget (Under ₹35 Lakhs, ₹35L - ₹50L, Above ₹50 Lakhs).
   - **Reset Filters**: One-click button to reset all filters.

7. **Clean & Fresher-Friendly Code**:
   - Pure JavaScript (`.js` files, no TypeScript complexity).
   - Standard React `useState` hooks.
   - Modular, reusable components with straightforward Tailwind CSS utility classes.
   - Zero external libraries or heavy state managers.

---

## 📁 Project Structure

```text
real-estate-layout/
├── app/
│   ├── globals.css          # Tailwind CSS styles
│   ├── layout.js            # Root layout and metadata
│   └── page.js              # Main page with state & filter logic
├── components/
│   ├── FilterPanel.js       # Filter controls (Status, Size, Cost, Reset)
│   ├── Legend.js            # Status indicators & counts
│   ├── PlotCard.js          # Individual plot card with hover tooltip
│   ├── PlotGrid.js          # Responsive grid container with empty state
│   └── PlotModal.js         # Mobile-friendly details popup modal
├── data/
│   ├── plots.js             # Static plot dataset (36 plots)
│   └── plotsData.js         # Backward compatibility export
├── package.json
└── README.md
```

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- npm (comes bundled with Node.js)

### Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd real-estate-layout
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Build for production** (optional):
   ```bash
   npm run build
   npm run start
   ```

---

## 📤 How to Push to GitHub

If you want to upload this project to your GitHub account:

1. Create a new, empty repository on [GitHub](https://github.com/new) (e.g., named `real-estate-layout`).
2. Open your terminal in this project folder and run:
   ```bash
   git add .
   git commit -m "feat: complete real estate plot layout application"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/real-estate-layout.git
   git push -u origin main
   ```

*(Replace `<YOUR-USERNAME>` with your GitHub username).*

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS
- **Language**: JavaScript (ES6+)
