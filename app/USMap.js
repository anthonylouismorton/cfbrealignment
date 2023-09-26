import React, { useEffect, useState } from 'react';
import * as d3 from 'd3'; 
import * as topojson from 'topojson-client';
import conferenceData from './data/conferenceData.json';
import { getConferences } from './functions/getConferences';
import { getChanges } from './functions/getChanges';
import { mapFill } from './functions/mapFill';
import { schoolLocations } from './functions/schoolLocations';
import AutoPlay from './AutoPlay';
import ReactDOMServer from 'react-dom/server';

export default function Map({ mapdata, currentYear, setCurrentYear, changesList, options, isYearVisible, setChangesList, setSchoolStates, setCurrentConferences, setActiveConferences }) {
  useEffect(() => {
    const width = 975;
    const height = 610;
    const autoPlayCoords = [-81.480081, 48.];
    const projection = d3.geoAlbersUsa()
      .scale(1300)
      .translate([width / 2, height / 2]);
    
    const [playX, playY] = projection(autoPlayCoords);
    
    const svg = d3
      .select('#map')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'width: 100%; height: auto;')
      .attr('viewBox', `0 0 ${width} ${height}`);

      if (isYearVisible || options.hideHeader){
        const [x, y] = projection([-89.588, 27.2033]);
        svg
          .append('text')
          .attr('x', x)
          .attr('y', y)
          .attr('text-anchor', 'middle')
          .style('fill', 'white')
          .style('font-size', '22px') 
          .style('font-weight', '600') 
          .text("Year: " + currentYear);
      }
      
    const path = d3.geoPath(projection);
    const usa = svg
      .append('g')
      .append('path')
      .datum(topojson.feature(mapdata, mapdata.objects.nation))
      .attr('d', d3.geoPath());
    // const autoPlayProps = { currentYear, setCurrentYear, changesList };
    // const autoPlayElement = React.createElement(AutoPlay, autoPlayProps);

    // const autoPlayComponent = ReactDOMServer.renderToString(autoPlayElement);
    //   svg
    //   .append('g')
    //   .attr('transform', `translate(${playX},${playY})`)
    //   .append('foreignObject') 
    //   .attr('width', 130) 
    //   .attr('height', 30)
    //   .append('xhtml:div')
    //   .style('width', '100%')
    //   .style('height', '100%')
    //   .html(autoPlayComponent);
      
    const { getSchoolStates, getCurrentConferences } = getConferences(conferenceData, currentYear, mapdata, options.majorConferences);
    setCurrentConferences(getCurrentConferences)
    setSchoolStates(getSchoolStates)
    const getLegendConferences = mapFill(svg, getSchoolStates, mapdata, currentYear)
    setActiveConferences(getLegendConferences)
    var conferenceChanges = getChanges(getCurrentConferences, currentYear)
    setChangesList(conferenceChanges)

    if(!options.hideLogos){
      schoolLocations(svg, projection, getCurrentConferences, currentYear);
    }
    return () => {
      //Need to clear the map every year change or map duplicates
      d3.select('#map').select('svg').remove();
    };
  }, [mapdata, currentYear, options, isYearVisible]);

  return <div id="map"></div>
  
}