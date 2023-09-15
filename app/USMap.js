"use client"
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import mapdata from './mapData.json';
import conferenceData from './conferenceData.json';
import { getConferences } from './getConferences';
import { getChanges } from './getChanges';
import { mapFill } from './mapFill';
import { schoolLocations } from './schoolLocations';
import Year from './Year';
import Legend from './Legend';
import Changes from './History';
import Header from './Header';
import Filter from './Options';

function USMap() {
  const [currentYear, setCurrentYear] = useState(1896);
  const [activeConferences, setActiveConferences] = useState(null)
  const [changesList, setChangesList] = useState([])
  useEffect(() => {

    const width = 975;
    const height = 610;
    
    // Clear the previous SVG, if it exists
    d3.select('#map').select('svg').remove();
    
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

    const path = d3.geoPath(projection);
    const usa = svg
      .append('g')
      .append('path')
      .datum(topojson.feature(mapdata, mapdata.objects.nation))
      .attr('d', d3.geoPath());
      const { schoolStates, currentConferences } = getConferences(svg, projection, conferenceData, currentYear, mapdata);
      const getLegendConferences = mapFill(svg, schoolStates, mapdata, currentYear)
      setActiveConferences(getLegendConferences)
    
    
    var conferenceChanges = getChanges(currentConferences, currentYear)
    setChangesList(conferenceChanges)
    schoolLocations(svg, projection, currentConferences, currentYear);

  }, [mapdata, currentYear]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Year currentYear={currentYear} setCurrentYear={setCurrentYear} />
        <Header currentYear={currentYear} />
        <div className="flex w-full">
          <div className="w-[17.5%]">
            <Changes changesList={changesList}/>
          </div>
          <div className="w-[65%]">
            <div id="map" className="w-full"></div>
          </div>
          <div className="w-[17.5%] flex flex-col justify-between">
            <div className="flex justify-end items-start">
              <Filter activeConferences={activeConferences} />
            </div>
            <div className="flex justify-end items-end">
              <Legend activeConferences={activeConferences} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default USMap;
