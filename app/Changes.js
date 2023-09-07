"use client"
import React, { useEffect } from 'react';
import * as d3 from 'd3';

function Changes() {
  useEffect(() => {
  //   const changeContainer = d3.select("#change");
  //   if(activeConferences){
  //     const filteredConferences = conferenceColors.filter(conference => activeConferences.includes(conference.conference))
  //     const changeItems = changeContainer
  //       .selectAll(".change-item")
  //       .data(filteredConferences);

  //     // Need to clear change items after year change
  //     changeContainer.selectAll(".change-item").remove();

  //     filteredConferences.forEach((conference) => {
  //       const changeItem = changeContainer
  //         .append("div")
  //         .attr("class", "change-item flex items-center mb-2");

  //       changeItem
  //         .append("div")
  //         .attr("class", "change-color w-6 h-6 mr-2")
  //         .style("background-color", conference.color);

  //       changeItem
  //         .append("div")
  //         .attr("class", "change-label text-sm")
  //         .text(conference.conference);
  //     });
  //   }

  }, []);
  return (
    <div className="bg-white absolute top-5 bg-white left-5 pl-8 pr-8 pb-10 rounded">
      <h2 className="text-center text-lg font-semibold">Changes</h2>
      <div id="change"></div>
    </div>

  );
}

export default Changes;
