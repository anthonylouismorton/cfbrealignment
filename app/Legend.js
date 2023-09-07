"use client"
import React, { useEffect } from 'react';
import * as d3 from 'd3';

function Legend({activeConferences}) {
  console.log(activeConferences)
  useEffect(() => {
    const legendContainer = d3.select("#legend");
    if(activeConferences){
      const legendItems = legendContainer
        .selectAll(".legend-item")
        .data(activeConferences);

      // Need to clear legend items after year change
      legendContainer.selectAll(".legend-item").remove();

      activeConferences.forEach((conference) => {
        const legendItem = legendContainer
          .append("div")
          .attr("class", "legend-item flex items-center mb-2");

        legendItem
          .append("div")
          .attr("class", "legend-color w-6 h-6 mr-2")
          .style("background-color", conference.mapColor);

        legendItem
          .append("div")
          .attr("class", "legend-label text-sm")
          .text(conference.conference);
      });
    }

  }, [activeConferences]);
  return (
    <div className="bg-white absolute bottom-5 bg-white right-5 p-5 rounded">
      <h2 className="text-center text-lg font-semibold">Conferences</h2>
      <div id="legend"></div>
    </div>

  );
}

export default Legend;
