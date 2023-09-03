"use client"
import { useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import mapdata from './mapData.json';
import conferenceData from './conferenceData.json';
import { getSchools } from './getSchools';
import Year from './Year';
import Legend from './Legend';

function USMap() {
  
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
      
    const fillStates = getSchools(svg, projection, conferenceData[0].schools);
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
        if (fillStates.includes(d.id)) {
          return 'rgba(0, 75, 141, 90)'; // Adjust the color and opacity as needed
        } else {
          return 'white'; // This will make states not in the array transparent
        }
      });      

      getSchools(svg, projection, conferenceData[0].schools)
  }, [mapdata]);

  return (
    <div style={{ position: 'relative' }}>
      <div id="map"></div>
      <Year year={2023} />
      <Legend/>
    </div>
  );
}

export default USMap;
