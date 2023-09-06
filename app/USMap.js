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
  const [year, setYear] = useState(1896);
  const [activeConferences, setActiveConferences] = useState(null)
  const conferenceColors = [
    { conference: "SEC", color: "rgba(255, 208, 70, 0.90)" },
    { conference: "Pac-12", color: "rgba(210, 180, 140, 0.90)" },
    { conference: "Big 12", color: "rgba(239, 72, 62, 0.90)" },
    { conference: "ACC", color: "rgba(1, 60, 166, 0.90)" },
    { conference: "Big Ten", color: "rgba(0, 136, 206, 0.90)" },
    { conference: "SOCON", color: "rgba(218, 41, 28, 0.90)" },
    { conference: "Big 8", color: "rgba(1, 158, 79, 0.90)" },
  ];

  useEffect(() => {
    const width = 975;
    const height = 610;
    var svg = d3.select('#map').select('svg');

    //Need to clear SVG on year change or it creates a new Map beneath the old one
    if (svg.empty()) {
      svg = d3
        .select('#map')
        .append('svg')
        .attr('width', width)
        .attr('height', 610)
        .attr('viewBox', [0, 0, 975, 610])
        .attr('style', 'width: 100%; height: auto; height: intrinsic;');
    } else {
      svg.selectAll('*').remove();
    }

    const projection = d3.geoAlbersUsa()
      .scale(1300)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath(projection);
    const usa = svg
      .append('g')
      .append('path')
      .datum(topojson.feature(mapdata, mapdata.objects.nation))
      .attr('d', d3.geoPath());
    const getLegendConferences = mapFill(svg, projection, conferenceData, year, conferenceColors, mapdata)
    setActiveConferences(getLegendConferences)
    getSchools(svg, projection, conferenceData, year);
  }, [mapdata, year]);

  return (
    <div style={{ position: 'relative' }}>
      <div id="map"></div>
      <Year year={year} setYear={setYear} />
      <Legend activeConferences={activeConferences} conferenceColors={conferenceColors}/>
    </div>
  );
}

export default USMap;
