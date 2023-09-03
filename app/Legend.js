"use client"
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const conferenceColors = {
  "SEC": "rgba(0, 75, 141, 90)",
  "Conference B": "#33FF57",
  "Conference C": "#5733FF",
};

function Legend() {
  useEffect(() => {
    // Select the legend container
    const legendContainer = d3.select("#legend");

    // Create legend items
    const legendItems = legendContainer
      .selectAll(".legend-item")
      .data(Object.entries(conferenceColors))
      .enter()
      .append("div")
      .attr("class", "legend-item flex items-center mb-2");

    // Add color squares to legend items
    legendItems
      .append("div")
      .attr("class", "legend-color w-6 h-6 mr-2")
      .style("background-color", (d) => d[1]);

    // Add conference names to legend items
    legendItems
      .append("div")
      .attr("class", "legend-label text-sm")
      .text((d) => d[0]);
  }, []);

  return (
    <div id="legend" style={{ position: "absolute", bottom: "20px", right: "20px" }}></div>
  );
}

export default Legend;
