"use client"
import { useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import mapdata from './mapData.json'

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

      
  }, [mapdata]);

  return (
    <div id="map"></div>
  );
}

export default USMap;
