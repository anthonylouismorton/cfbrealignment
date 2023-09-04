"use client"
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const conferenceColors = [
  {conference: "Southeastern Conference", color: "rgba(255, 208, 70, 0.90)"},
  {conference: "Pac-12", color: "rgba(210, 180, 140, 90)"},
  {conference: "Big 12", color: "rgba(239, 72, 62, 0.90)" },
  {conference: "Atlantic Coast Conference", color: "rgba(1, 60, 166, 0.90)"},
  {conference: "Big Ten", color: "rgba(0, 136, 206, 0.90)"}
];

function Legend({activeConferences}) {
  useEffect(() => {
    const legendContainer = d3.select("#legend");
    if(activeConferences){
      const filteredConferences = conferenceColors.filter(conference => activeConferences.includes(conference.conference))
      console.log(filteredConferences)
      const legendItems = legendContainer
        .selectAll(".legend-item")
        .data(filteredConferences);

      // Clear existing legend items
legendContainer.selectAll(".legend-item").remove();

filteredConferences.forEach((conference) => {
  const legendItem = legendContainer
    .append("div")
    .attr("class", "legend-item flex items-center mb-2");

  legendItem
    .append("div")
    .attr("class", "legend-color w-6 h-6 mr-2")
    .style("background-color", conference.color);

  legendItem
    .append("div")
    .attr("class", "legend-label text-sm")
    .text(conference.conference);
});


    }

  }, [activeConferences]);
  return (
    <div id="legend" style={{ position: "absolute", bottom: "20px", right: "20px" }}></div>
  );
}

export default Legend;
