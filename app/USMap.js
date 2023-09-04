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
    { school: "Southeastern Conference", color: "rgba(255, 208, 70, 0.90)" },
    { school: "Pac-12", color: "rgba(210, 180, 140)" },
    { school: "Big 12", color: "rgba(239, 72, 62, 0.90)" },
    { school: "Atlantic Coast Conference", color: "rgba(1, 60, 166, 0.90)" },
    { school: "Big Ten", color: "rgba(0, 136, 206, 0.90)" },
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

    const fillStates = getSchools(svg, projection, conferenceData, year);
    const stateConferenceMap = {};
    fillStates.forEach((item) => {
      stateConferenceMap[item.state] = item.conference;
    });
    const legendConferences = []
    fillStates.forEach(item => {
      if (!legendConferences.includes(item.conference)) {
        legendConferences.push(item.conference);
      }
    });
    setActiveConferences(legendConferences)
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
          const color = conferenceColors.find((c) => c.school === conference);
          return color ? color.color : 'white'; 
        } else {
          return 'white';
        }
      });

    getSchools(svg, projection, conferenceData, year);
  }, [mapdata, year]);

  return (
    <div style={{ position: 'relative' }}>
      <div id="map"></div>
      <Year year={year} setYear={setYear} />
      <Legend activeConferences={activeConferences}/>
    </div>
  );
}

export default USMap;
