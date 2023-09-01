"use client"
import { useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import mapdata from './mapData.json'
import conferenceData from './conferenceData.json'

function USMap() {
  useEffect(() => {
    const width = 975;
    const height = 610;

    const svg = d3
      .select('#map')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
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

    const state = svg
      .append('g')
      .attr('stroke', 'black')
      .attr('fill', 'white')
      .selectAll('path')
      .data(topojson.feature(mapdata, mapdata.objects.states).features)
      .join('path')
      .attr('vector-effect', 'non-scaling-stroke')
      .attr('d', d3.geoPath());
    console.log(conferenceData[0].schools)
    const secSchools = conferenceData[0].schools
    secSchools.forEach((school) => {
      const schoolCords = [school.lat, school.lon];
      const [x, y] = projection(schoolCords);
      svg
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 2)
        .attr('fill', 'red');

      svg
        .append('text')
        .attr('x', x + 5)  // Adjust the position as needed
        .attr('y', y)
        .attr('dy', '0.35em')  // Vertical alignment
        .text(school.school)
        .attr('fill', 'black')
        .attr('font-size', '10px');
    });
    // const phoenixCoords = [-87.3246, 33.1239];
    // const [x, y] = projection(phoenixCoords);
    // svg
    //   .append('circle')
    //   .attr('cx', x)
    //   .attr('cy', y)
    //   .attr('r', 2)
    //   .attr('fill', 'red');

      
  }, [mapdata]);

  return (
    <div id="map"></div>
  );
}

export default USMap;
