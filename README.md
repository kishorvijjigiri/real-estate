# Real Estate Plot Layout

A responsive real estate plot layout application built using Next.js and Tailwind CSS.

## Features

Interactive real estate layout map with plot information.

Users can zoom in, zoom out.

Plots can be filtered by Available, Booked, and Sold status.

Each plot shows its plot number, status, square feet, rate, and total cost when hovered.

Users can filter plots by square feet and maximum cost.

The filter panel shows the number of matching plots.

Users can reset or close the filter panel.

## Project Structure

app

globals.css  
Global CSS and Tailwind CSS styles.

layout.js  
Main layout of the Next.js application.

page.js  
Main page of the application.

components

Header.js  
Application header.

Legend.js  
Available, Booked, and Sold status filters.

FilterPanel.js  
Square feet and maximum cost filters.

PlotMap.js  
Real estate map, plot overlays, zoom, pan, and plot information.

data

plotsData.js  
Contains the plot data and filter presets.

public

layout-map.jpg  
Real estate layout map image.

next.config.mjs  
Next.js configuration file.

package.json  
Project dependencies and scripts.

README.md  
Project documentation.

## Technologies

Next.js

React.js

JavaScript

Tailwind CSS

HTML

CSS

SVG

## Run the Project

Install the dependencies:

```bash
npm install
```

Start the project:

```bash
npm run dev
```

Open:

http://localhost:3000