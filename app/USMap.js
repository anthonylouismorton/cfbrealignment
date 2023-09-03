"use client"
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import mapdata from './mapData.json';
import conferenceData from './conferenceData.json';
import { getSchools } from './getSchools';
import { mapFill } from './mapFill';
import Year from './Year';
import Legend from './Legend';

function USMap() {
  const [year, setYear] = useState(1915);
  const conferenceColors = [
    { school: "Southeastern Conference", color: "rgba(0, 75, 141, 0.90)" },
    { school: "Pac-12", color: "rgba(210, 180, 140, 0.90)" },
    { school: "Conference C", color: "#5733FF" },
  ];
  
  useEffect(() => {
    const width = 975;
    const height = 610;

    const svg = d3
      .select('#map')
      .append('svg')
      .attr('width', width)
      .attr('height', 610)
      .attr('viewBox', [0, 0, 975, 610])
      .attr('style', 'width: 100%; height: auto; height: intrinsic;');
    
    const projection = d3.geoAlbersUsa()
    .scale(1300)
    .translate([width / 2, height / 2]);

    const path = d3.geoPath(projection);

    const usa = svg
      .append('g')
      .append('path')
      .datum(topojson.feature(mapdata, mapdata.objects.nation))
      .attr('d', d3.geoPath());
      
    const fillStates = getSchools(svg, projection, conferenceData, year);
    const stateConferenceMap = {};
    fillStates.forEach((item) => {
        stateConferenceMap[item.state] = item.conference;
      });
    const state = svg
      .append('g')
      .attr('stroke', 'black')
      .attr('fill', 'white')
      .selectAll('path')
      .data(topojson.feature(mapdata, mapdata.objects.states).features)
      .join('path')
      .attr('vector-effect', 'non-scaling-stroke')
      .attr('d', d3.geoPath())
      .style('fill', (d) => {
        const conference = stateConferenceMap[d.id];
        if (conference) {
          // Use the conference's color here, e.g., based on your conferenceColors array
          const color = conferenceColors.find((c) => c.school === conference);
          return color ? color.color : 'white'; // Default to white if no color is found
        } else {
          return 'white'; // This will make states not in the array transparent
        }
      });      

      getSchools(svg, projection, conferenceData, year)
  }, [mapdata, year]);

  return (
    <div style={{ position: 'relative' }}>
      <div id="map"></div>
      <Year year={year} setYear={setYear} />
      <Legend/>
    </div>
  );
}

export default USMap;
