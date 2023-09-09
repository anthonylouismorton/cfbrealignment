import { getSchools } from "./getSchools";
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

export function mapFill(svg, schoolStates, mapdata) {
  
  const stateConferenceMap = {};

  schoolStates.forEach((item) => {
    const { state, conference } = item;
    if (!stateConferenceMap[state]) {
      stateConferenceMap[state] = [];
    }
    if (!stateConferenceMap[state].includes(conference)) {
      stateConferenceMap[state].push(conference);
    }
  });
  const legendConferences = []
  schoolStates.forEach((item) => {
    if (!legendConferences.some((conf) => conf.conference === item.conference)) {
      legendConferences.push(item);
    }
  });

  const statePaths = svg
    .append('g')
    .attr('stroke', 'black')
    .selectAll('path')
    .data(topojson.feature(mapdata, mapdata.objects.states).features)
    .join('path')
    .attr('vector-effect', 'non-scaling-stroke')
    .attr('d', d3.geoPath())
    .style('fill', (d) => {
      const conferences = stateConferenceMap[d.id];
      if (conferences) {
        if (conferences.length === 1) {
          const color = legendConferences.find((c) => c.conference === conferences[0]);
          return color ? color.mapColor : '#D1D5DB';
        } 
        else {
          const gradientId = `gradient-${d.id}`;
          const numConferences = conferences.length;
          const stops = [];
          if(conferences.length === 2){
            for (let i = 0; i < numConferences; i++) {
              const color = legendConferences.find((c) => c.conference === conferences[i]);
              const offset = `${(100 / numConferences)}%`; // Calculate dynamic stop offsets
              stops.push(`<stop offset="${offset}" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
            }
          }
          else if (conferences.length === 3) {
            for (let i = 0; i < numConferences; i++) {
              const color = legendConferences.find((c) => c.conference === conferences[i]);
              let offset;
              
              if (i === 0) {
                stops.push(`<stop offset="33.33%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              } 
              else if (i === 1) {
                offset = '33.33%, 66.66%'; // The second color gets two offsets, 33.33% and 66.66%
                stops.push(`<stop offset="33.33%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
                stops.push(`<stop offset="66.66%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              } 
              else {
                stops.push(`<stop offset="66.66%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              }
        
            }
          }
        svg
          .append('defs')
          .html(
            `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
                ${stops.join('')}
              </linearGradient>`
          );

        return `url(#${gradientId})`;
      }
    } 
    else {
      return '#D1D5DB';
    }
  });
  return legendConferences
}