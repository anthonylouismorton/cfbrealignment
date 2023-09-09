"use client"
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import mapdata from './mapData.json';
import conferenceData from './conferenceData.json';
import { getSchools } from './getSchools';
import { mapFill } from './mapFill';
import { schoolLocations } from './schoolLocations';
import Year from './Year';
import Legend from './Legend';
import Changes from './Changes';

function USMap() {
  const [currentYear, setCurrentYear] = useState(1896);
  const [activeConferences, setActiveConferences] = useState(null)
  const [changesList, setChangesList] =useState([])

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
      var conferenceChanges = []
      const getLegendConferences = mapFill(svg, schoolStates, mapdata)
      setActiveConferences(getLegendConferences)
    currentConferences.forEach((conference) => {
      if(conference.founded === currentYear){
        conferenceChanges.push({change: 'founded', founded: conference.founded, conference: conference.conference, logo: conference.logo})
      }
      if(conference.disbanded === currentYear){
        console.log(conference.disbanded)
        conferenceChanges.push({change: 'disbanded', disbanded: conference.disbanded, conference: conference.conference, logo: conference.logo})
      }
      conference.schools.forEach((school)=>{
        if(school.years[0] === currentYear){
          conferenceChanges.push({change: 'joined', joined: currentYear, conference: conference.abbreviation, ...school})
        }
        if(school.left){
          school.left.forEach((left) => {
            if(left.year === currentYear){
              conferenceChanges.push({change: 'left', left: left.year, newConference: left.newConference, conference: conference.abbreviation, ...school})
            }
          })
        }
        if(school.rejoined){
          school.rejoined.forEach((rejoined) => {
            if(rejoined.year === currentYear){
              conferenceChanges.push({change: 'rejoined', year: rejoined.year, oldConference: rejoined.oldConference, conference: conference.abbreviation, ...school})
            }
          })
        }
      })
    })

    setChangesList(conferenceChanges)
    schoolLocations(svg, projection, currentConferences, currentYear);
  }, [mapdata, currentYear]);

  return (
    <div style={{ position: 'relative', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
      <div id="map" style={{ margin: '0 auto' }}></div>
      <Year currentYear={currentYear} setCurrentYear={setCurrentYear} />
      <Legend activeConferences={activeConferences}/>
      <Changes changesList={changesList} currentYear={currentYear}/>
    </div>
  );
}

export default USMap;
