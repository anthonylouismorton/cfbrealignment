import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import conferenceData from '../data/conferenceData.json';
import { getConferences } from '../functions/getConferences';
import { mapFill } from './mapFill';
import { schoolLocations } from '../functions/schoolLocations';
import AutoPlay from '../AutoPlay';
import ReactDOMServer from 'react-dom/server';

export default function Map({
  mapdata,
  currentYear,
  options,
  isYearVisible,
  setChangesList,
  setSchoolStates,
  setCurrentConferences,
  setActiveConferences,
  conList,
}) {
  const svgRef = useRef(null);
  const gRef = useRef(null);

  useEffect(() => {
    const width = 975;
    const height = 610;
    const autoPlayCoords = [-81.480081, 48.];
    const initialScale = 1300;
    const projection = d3.geoAlbersUsa().scale(initialScale).translate([width / 2, height / 2]);

    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'width: 100%; height: auto;')
      .attr('viewBox', `0 0 ${width} ${height}`);

    const content = svg.append('g');
    gRef.current = content;

    if (isYearVisible || options.hideHeader) {
      const [x, y] = projection([-89.588, 27.2033]);
      content
        .append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .style('fill', 'white')
        .style('font-size', '22px')
        .style('font-weight', '600')
        .text('Year: ' + currentYear);
    }

    const path = d3.geoPath(projection);

    const usa = content
      .append('path')
      .datum(topojson.feature(mapdata, mapdata.objects.nation))
      .attr('d', path);

    const { getSchoolStates, getCurrentConferences, conferenceChanges } = getConferences(
      conferenceData,
      currentYear,
      options,
      conList
    );
    
    setCurrentConferences(getCurrentConferences);
    setSchoolStates(getSchoolStates);

    const getLegendConferences = mapFill(
      content,
      getSchoolStates,
      mapdata,
      currentYear,
      options.schoolName
    );
    setActiveConferences(getLegendConferences);
    setChangesList(conferenceChanges);

    if (options.showLogos) {
      schoolLocations(
        content,
        projection,
        getCurrentConferences,
        currentYear,
        options.smallLogos,
        options.schoolName
      );
    }

    return () => {
      d3.select(svgRef.current).select('svg').remove();
    };
  }, [mapdata, currentYear, options, isYearVisible, conList]);

  return (
    <div className="w-full" ref={svgRef} id="map"></div>
  );
}
