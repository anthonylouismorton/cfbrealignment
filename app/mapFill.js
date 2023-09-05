import { getSchools } from "./getSchools";
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

export function mapFill(svg, projection, conferenceData, year, conferenceColors, mapdata) {
  
  const fillStates = getSchools(svg, projection, conferenceData, year);
  const stateConferenceMap = {};

  fillStates.forEach((item) => {
    const { state, conference } = item;
    if (!stateConferenceMap[state]) {
      stateConferenceMap[state] = [];
    }
    if (!stateConferenceMap[state].includes(conference)) {
      stateConferenceMap[state].push(conference);
    }
  });
  
  const legendConferences = []
  fillStates.forEach(item => {
    if (!legendConferences.includes(item.conference)) {
      legendConferences.push(item.conference);
    }
  });
  console.log(stateConferenceMap)
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
        // Single conference, use its color
        const color = conferenceColors.find((c) => c.conference === conferences[0]);
        return color ? color.color : 'white';
      } else {
        // Multiple conferences, create a gradient fill with dynamically calculated stop offsets
        const gradientId = `gradient-${d.id}`;
        const numConferences = conferences.length;

        const stops = [];
        if(conferences.length === 2){
          for (let i = 0; i < numConferences; i++) {
            const color = conferenceColors.find((c) => c.conference === conferences[i]);
            const offset = `${(100 / numConferences)}%`; // Calculate dynamic stop offsets
            console.log(offset)
            console.log(color.color)
            stops.push(`<stop offset="${offset}" stop-color="${color ? color.color : 'white'}"/>`);
          }
        }
        console.log(stops)
        svg
          .append('defs')
          .html(
            `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
               ${stops.join('')}
             </linearGradient>`
          );

        return `url(#${gradientId})`;
      }
    } else {
      return 'white';
    }
  });
    return legendConferences
}