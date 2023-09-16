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
import Options from './Options';

function USMap() {
  const [currentYear, setCurrentYear] = useState(1896);
  const [activeConferences, setActiveConferences] = useState(null);
  const [changesList, setChangesList] = useState([]);
  const [options, setOptions] = useState({conferences: false, majorConferences: false, hideHistory: false, hideLegend: false, hideHeader: false, hideSettings: false});
  const [currentConferences, setCurrentConferences] = useState(null);
  const [schoolStates, setSchoolStates] = useState(null);

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
    
      if (options.hideHeader) {
        const [x, y] = projection([-89.588, 27.2033]);
      
        svg
          .append('text')
          .attr('x', x)
          .attr('y', y)
          .attr('text-anchor', 'middle')
          .style('fill', 'white')
          .style('font-weight', 'bold') 
          .text("Year: " + currentYear);
      }
      

    const path = d3.geoPath(projection);
    const usa = svg
      .append('g')
      .append('path')
      .datum(topojson.feature(mapdata, mapdata.objects.nation))
      .attr('d', d3.geoPath());
      const { getSchoolStates, getCurrentConferences } = getConferences(conferenceData, currentYear, mapdata, options.majorConferences);
      setCurrentConferences(getCurrentConferences)
      setSchoolStates(getSchoolStates)
      const getLegendConferences = mapFill(svg, getSchoolStates, mapdata, currentYear)
      setActiveConferences(getLegendConferences)
    
    
    var conferenceChanges = getChanges(getCurrentConferences, currentYear)
    setChangesList(conferenceChanges)

    if(!options.conferences){
      schoolLocations(svg, projection, getCurrentConferences, currentYear);
    }
    const handleKeyDown = (e) => {
      if (e.keyCode === 37) { // Left arrow key
        setCurrentYear(currentYear - 1);
      } else if (e.keyCode === 39) { // Right arrow key
        setCurrentYear(currentYear + 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [mapdata, currentYear, options]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Year currentYear={currentYear} setCurrentYear={setCurrentYear} />
          {!options.hideHeader &&
            <Header currentYear={currentYear} />
          }
        <div className="flex w-full justify-between">
          <div className="hidden xl:block xl:w-[17.5%]">
            {!options.hideHistory &&
              <Changes changesList={changesList}/>
            }
          </div>
          <div className="w-full lg:w-[95%] xl:w-[65%]">
            <div id="map" className="w-full"></div>
          </div>
          <div className="xl:flex xl:w-[17.5%] xl:flex-col xl:justify-between">
            <div className="hidden md:flex justify-end items-start">
              <Options options={options} setOptions={setOptions} activeConferences={activeConferences} />
            </div>
            <div className="hidden xl:flex justify-end items-end">
              {!options.hideLegend &&
                <Legend activeConferences={activeConferences} />
              }
            </div>
          </div>
        </div>
      </div>
      <div className="xl:hidden">
          <div className="w-full">
            {/* <div className="hidden md:flex justify-end items-start">
              <Options options={options} setOptions={setOptions} activeConferences={activeConferences} />
            </div> */}
            {!options.hideHistory &&
              <Changes changesList={changesList}/>
            }
        </div>
      </div>
    </div>
  );
}

export default USMap;
