import * as d3 from 'd3';
import * as topojson from 'topojson-client';

export function mapFill(svg, getSchoolStates, mapdata, currentYear) {
  const stateConferenceMap = {};
  getSchoolStates.forEach((item) => {
    var state = item.state
    var conference = ''
    if(item.names){
      item.names.forEach((name) => {
        if(currentYear >= name.startYear && currentYear <= name.endYear || (currentYear >= name.startYear && name.endYear === null)){
          conference = name.conference
        }
      })
    }
    if (!stateConferenceMap[state]) {
      stateConferenceMap[state] = [];
    }
    if (!stateConferenceMap[state].includes(conference)) {
      stateConferenceMap[state].push(conference);
    }
  });
  const legendConferences = []
  getSchoolStates.forEach((item) => {
    if(item.names){
      item.names.forEach((former) => {
        if (!legendConferences.some((conf) => conf.conference === former.conference)) {
          if(currentYear >= former.startYear && currentYear <= former.endYear || (currentYear >= former.startYear && former.endYear === null)){
            legendConferences.push({
              abbreviation: former.abbreviation,
              conference: former.conference,
              headquarters: item.headquarters,
              state: item.state,
              schools: item.schools,
              mapColor: item.mapColor,
              state: item.state
            });
          }
        }
      })
    }
    else if(!legendConferences.some((conf) => conf.conference === item.conference)) {
      legendConferences.push({
        abbreviation: item.abbreviation,
        conference: item.conference,
        headquarters: item.headquarters,
        state: item.state,
        schools: item.schools,
        mapColor: item.mapColor,
        state: item.state
      });
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
        // A gradiant is applied to states that have more than one conference
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
              const offset = `${(100 / numConferences)}%`;
              stops.push(`<stop offset="${offset}" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
            }
          }
          else if (conferences.length === 3) {
            for (let i = 0; i < numConferences; i++) {
              const color = legendConferences.find((c) => c.conference === conferences[i]);
              if (i === 0) {
                stops.push(`<stop offset="33.33%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              } 
              else if (i === 1) {
                stops.push(`<stop offset="33.33%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
                stops.push(`<stop offset="66.66%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              } 
              else {
                stops.push(`<stop offset="66.66%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              }
        
            }
          }
          else if (conferences.length === 4) {
            for (let i = 0; i < numConferences; i++) {
              const color = legendConferences.find((c) => c.conference === conferences[i]);

              if (i === 0) {
                stops.push(`<stop offset="25%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              } 
              else if (i === 1) {
                stops.push(`<stop offset="25%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
                stops.push(`<stop offset="50%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              }
              else if (i === 2) {
                stops.push(`<stop offset="50%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
                stops.push(`<stop offset="75%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              }  
              else {
                stops.push(`<stop offset="75%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              }
            }
          }
          else if (conferences.length === 5) {
            for (let i = 0; i < numConferences; i++) {
              const color = legendConferences.find((c) => c.conference === conferences[i]);

              if (i === 0) {
                stops.push(`<stop offset="20%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              } 
              else if (i === 1) {
                stops.push(`<stop offset="20%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
                stops.push(`<stop offset="40%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              }
              else if (i === 2) {
                stops.push(`<stop offset="40%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
                stops.push(`<stop offset="60%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              } 
              else if (i === 3) {
                stops.push(`<stop offset="60%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
                stops.push(`<stop offset="80%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              }   
              else {
                stops.push(`<stop offset="80%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              }
            }
          }
          else if (conferences.length === 6) {
            for (let i = 0; i < numConferences; i++) {
              const color = legendConferences.find((c) => c.conference === conferences[i]);

              if (i === 0) {
                stops.push(`<stop offset="20%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              } 
              else if (i === 1) {
                stops.push(`<stop offset="20%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
                stops.push(`<stop offset="33.32%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              }
              else if (i === 2) {
                stops.push(`<stop offset="33.32%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
                stops.push(`<stop offset="49.98%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              } 
              else if (i === 3) {
                stops.push(`<stop offset="49.98%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
                stops.push(`<stop offset="66.64%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              }   
              else if (i === 4) {
                stops.push(`<stop offset="66.64%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
                stops.push(`<stop offset="80%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              }
              else {
                stops.push(`<stop offset="80%" stop-color="${color ? color.mapColor : '#D1D5DB'}"/>`);
              }
            }
          }
        svg
          .append('defs')
          .html(
            `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
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