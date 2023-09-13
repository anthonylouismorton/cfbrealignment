"use client"
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import mapdata from './mapData.json';
import conferenceData from './conferenceData.json';
import { getSchools } from './getSchools';
import { getChanges } from './getChanges';
import { mapFill } from './mapFill';
import { schoolLocations } from './schoolLocations';
import Year from './Year';
import Legend from './Legend';
import Changes from './History';

function USMap() {
  const [currentYear, setCurrentYear] = useState(1896);
  const [activeConferences, setActiveConferences] = useState(null)
  const [changesList, setChangesList] = useState([])
  useEffect(() => {

    const width = 975;
    const height = 610;
    var svg = d3.select('#map').select('svg');

    //Need to clear SVG on currentYear change or it creates a new Map beneath the old one
    if (svg.empty()) {
      svg = d3
        .select('#map')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        // .attr('style', 'width: 100%; height: auto; height: intrinsic;');
    } 
    else {
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
      const { schoolStates, currentConferences } = getSchools(svg, projection, conferenceData, currentYear, mapdata);
      const getLegendConferences = mapFill(svg, schoolStates, mapdata, currentYear)
      setActiveConferences(getLegendConferences)
    
    const yearGroup = svg.append('g')
      .attr('class', 'year-group')
      .attr('transform', 'translate(600, 550)');
    
    const rectWidth = 100;
    const rectHeight = 40;
    
    yearGroup.append('rect')
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .attr('rx', 4)
      .attr('ry', 4)
      .style('fill', 'white')
      .style('opacity', 0.4)
    
    const centerX = rectWidth / 2;
    const centerY = rectHeight / 2;
    
    yearGroup.append('text')
      .attr('class', 'year-text')
      .attr('x', centerX)
      .attr('y', centerY) 
      .style('font-size', '16px')
      .style('fill', 'white')
      .style('font-weight', '500')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .text(`Year ${currentYear}`);
    
    var conferenceChanges = getChanges(currentConferences, currentYear)
    setChangesList(conferenceChanges)
    schoolLocations(svg, projection, currentConferences, currentYear);

  }, [mapdata, currentYear]);
  console.log(changesList)
  return (
    <div>
      <div className="pt-5 relative text-center flex justify-center">
        <div id="map" style={{ margin: '0 auto' }}></div>
      </div>
      <Year currentYear={currentYear} setCurrentYear={setCurrentYear} />
      <Legend activeConferences={activeConferences}/>
      {changesList.length > 0 &&
      <Changes changesList={changesList}/>
      }
    </div>
  );
}

export default USMap;
