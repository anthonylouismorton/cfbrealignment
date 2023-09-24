import React, { useEffect } from 'react';
import * as d3 from 'd3'; 
import * as topojson from 'topojson-client';
import conferenceData from './data/conferenceData.json';
import { getConferences } from './functions/getConferences';
import { getChanges } from './functions/getChanges';
import { mapFill } from './functions/mapFill';
import { schoolLocations } from './schoolLocations';

export default function Map({ mapdata, currentYear, options, isYearVisible, setChangesList, changesList, schoolStates, setSchoolStates, currentConferences, setCurrentConferences, activeConferences, setActiveConferences }) {

  useEffect(() => {
    
    const width = 975;
    const height = 610;
    
    const svg = d3
      .select('#map')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'width: 100%; height: auto;')
      .attr('viewBox', `0 0 ${width} ${height}`);

    const projection = d3.geoAlbersUsa()
      .scale(1300)
      .translate([width / 2, height / 2]);

      if (isYearVisible || options.hideYear){
        const [x, y] = projection([-89.588, 27.2033]);
        svg
          .append('text')
          .attr('x', x)
          .attr('y', y)
          .attr('text-anchor', 'middle')
          .style('fill', 'white')
          .style('font-size', '20px') 
          .style('font-weight', 'bold') 
          .text("Year: " + currentYear);
      }
    // const [x2, y2] = projection([-79.873968, 46.657440]);
    // var timelapse = svg
    //   .append('text')
    //   .attr('x', x2)
    //   .attr('y', y2)
    //   .attr('text-anchor', 'middle')
    //   .style('fill', 'white')
    //   .style('border', 'white')
    //   .style('font-size', '12px')
    //   .style('font-weight', 'bold')
    //   .text('Time-lapse');

    // // Add an onclick event listener
    // timelapse.on('click', function() {
    //   // Your code to be executed when the text is clicked goes here
    //   // For example, you can open a URL or perform any other action.
    //   // To open a URL in a new tab, you can use window.open():
    //   // window.open('https://example.com', '_blank');
    // });
    // timelapse.style('cursor', 'pointer');

      
    const path = d3.geoPath(projection);
    const usa = svg
      .append('g')
      .append('path')
      .datum(topojson.feature(mapdata, mapdata.objects.nation))
      .attr('d', d3.geoPath());
    
    
    const { getSchoolStates, getCurrentConferences } = getConferences(conferenceData, currentYear, mapdata, options.majorConferences);
    setCurrentConferences(getCurrentConferences)
    setSchoolStates(getSchoolStates)
    const getLegendConferences = mapFill(svg, getSchoolStates, mapdata, currentYear)
    setActiveConferences(getLegendConferences)
    var conferenceChanges = getChanges(getCurrentConferences, currentYear)
    setChangesList(conferenceChanges)

    if(!options.conferences){
      schoolLocations(svg, projection, getCurrentConferences, currentYear);
    }
    return () => {
      //Need to clear the map every year change or map duplicates
      d3.select('#map').select('svg').remove();
    };
  }, [mapdata, currentYear, options, isYearVisible]);

  return <div className="w-full sm:w-4/5 lg:w-full" id="map"></div>;
}