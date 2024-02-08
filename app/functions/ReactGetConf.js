import { getChanges } from "./getChanges";
import * as d3 from 'd3';

export function getConferences(conferenceData, year, option, conferences) {
  const { majorConferences, powerConferences, aqConferences} = option
  var getCurrentConferences = [];
  var historyArray = [];
  var getLegendConferences = [];
  var getMapFill = [];

  conferenceData.forEach((conference) => {
    
    //Need to filter out conferences with no data or unused currently
    if(!conference.founded){
      return
    }

    //Filter by user selected conferences only
    if(option.conFilter){
      if(conferences[conference.abbreviation] === false){
        return;
      }
    }

    //Filter out conferences that dropped from division I to IAA
    if(conference.divisionIAA){
      if(conference.divisionIAA.start <= year){
        if(conference.divisionIAA.start === year){
          historyArray.push({change: 'dropped', ...conference, division: "IAA"})
        }
        return;
      }
    }
    //Filter out conferences that dropped from division I to II
    if(conference.divisionII){
      if(conference.divisionII.start <= year){
        if(conference.divisionII.start === year){
          historyArray.push({change: 'dropped', ...conference, division: "II"})
        }
        return;
      }
    }

    if(conference.founded <= year && (conference.disbanded === null || conference.disbanded >= year)){
      if(majorConferences){
        if((conference.majorConference.start <= year && conference.majorConference.end >= year) || (conference.majorConference.start <= year && conference.majorConference.end === null) && conference.majorConference.start !==null){
          getCurrentConferences.push(conference)
        }
      }
      else if(year >= 1998 && year < 2014 && aqConferences){
        if(conference.aqConference){
          if(conference.aqConference.start <= year && conference.aqConference.end >= year){
            getCurrentConferences.push(conference)
          }
        }
      }
      else if(year >=2014 && powerConferences){
        if(conference.powerConference){
          getCurrentConferences.push(conference)
        }
      }
      else{
        getCurrentConferences.push(conference)
      }
    }
  });

  var getSchools = []

  //need the states for schools playing during the current year for filling in the states on the map to represent active conferences
  getCurrentConferences.forEach((conference) => {
    getLegendConferences.push({
      abbreviation: conference.abbreviation,
      mapColor: conference.mapColor
    });

    conference.schools.forEach((school) => {
      if(school.years.includes(year)){
        if((year === 1907 || year === 1908) && school.school === "University of Iowa"){

        }
        else{
          getSchools.push({color: conference.mapColor, conference: conference.abbreviation, coordinates: [ school.lon, school.lat], name: school.school, logo: school.logo, state: school.stateId, schoolInfo: {...school}})
        };
      };
    });
  });

  if(year === 1907 || year === 1908){
    getSchools.push(
      {color: "rgb(0, 140, 102)", conference: [conferenceData[6].abbreviation, conferenceData[8].abbreviation], coordinates: [ conferenceData[8].schools[1].lon, conferenceData[8].schools[1].lat], name: conferenceData[8].schools[1].school, logo: conferenceData[8].schools[1].logo, state: conferenceData[8].schools[1].stateId, schoolInfo: conferenceData[8].schools[0]}
    );
  } ;

  getSchools.forEach((school) => {
    const { state, conference, color } = school;
    const existingStateIndex = getMapFill.findIndex((currentState) => currentState.state === state);
    if(existingStateIndex === -1){
      getMapFill.push({
        state: state,
        conferences: [ { conference: conference, color: color } ],
      });
    } 
    else{
      const existingConferenceIndex = getMapFill[existingStateIndex].conferences.findIndex((conf) => conf.conference === conference);
      if(existingConferenceIndex === -1){
        getMapFill[existingStateIndex].conferences.push({ conference: conference, color: color });
      }
      else{
        getMapFill[existingStateIndex].conferences[existingConferenceIndex].color = color;
      };
    };
  });
  getMapFill.map((state) => {
    if(state.conferences.length > 1){
      if(state.conferences.length === 2){
        const abbreviation = `${state.conferences[0].conference} / ${state.conferences[1].conference}`
        if(!getLegendConferences.some(item => item.abbreviation === abbreviation)){
          getLegendConferences.push({
            abbreviation: abbreviation,
            mapColor: d3.scaleLinear().domain([0, 1]).range([state.conferences[0].color, state.conferences[1].color])(0.5)
          });
        }
      }
      else if(state.conferences.length === 3){
        if(!getLegendConferences.some(item => item.abbreviation === `${state.conferences[0].conference} / ${state.conferences[1].conference} / ${state.conferences[2].conference}`)){
          getLegendConferences.push({
            abbreviation: `${state.conferences[0].conference} / ${state.conferences[1].conference} / ${state.conferences[2].conference}`,
            mapColor: d3.scaleLinear().domain([0, 1, 2]).range([state.conferences[0].color, state.conferences[1].color, state.conferences[2].color])(0.33)
          });
        }
      }
      else if(state.conferences.length === 4){
        if(!getLegendConferences.some(item => item.abbreviation === `${state.conferences[0].conference} / ${state.conferences[1].conference} / ${state.conferences[2].conference} / ${state.conferences[3].conference}`)){
          getLegendConferences.push({
            abbreviation: `${state.conferences[0].conference} / ${state.conferences[1].conference} / ${state.conferences[2].conference} / ${state.conferences[3].conference}`,
            mapColor: d3.scaleLinear().domain([0, 1, 2, 3]).range([state.conferences[0].color, state.conferences[1].color, state.conferences[2].color, state.conferences[3].color])(0.25)
          });
        }
      }
      else if(state.conferences.length === 5){
        if(!getLegendConferences.some(item => item.abbreviation === `${state.conferences[0].conference} / ${state.conferences[1].conference} / ${state.conferences[2].conference} / ${state.conferences[3].conference} / ${state.conferences[4].conference}`)){
          getLegendConferences.push({
            abbreviation: `${state.conferences[0].conference} / ${state.conferences[1].conference} / ${state.conferences[2].conference} / ${state.conferences[3].conference} / ${state.conferences[4].conference}`,
            mapColor: d3.scaleLinear().domain([0, 1, 2, 3, 4]).range([state.conferences[0].color, state.conferences[1].color, state.conferences[2].color, state.conferences[3].color, state.conferences[4].color])(0.2)
          });
        }
      }
      else if(state.conferences.length === 6){
        if(!getLegendConferences.some(item => item.abbreviation === `${state.conferences[0].conference} / ${state.conferences[1].conference} / ${state.conferences[2].conference} / ${state.conferences[3].conference} / ${state.conferences[4].conference} / ${state.conferences[5].conference}`)){
          getLegendConferences.push({
            abbreviation: `${state.conferences[0].conference} / ${state.conferences[1].conference} / ${state.conferences[2].conference} / ${state.conferences[3].conference} / ${state.conferences[4].conference} / ${state.conferences[5].conference}`,
            mapColor: d3.scaleLinear().domain([0, 1, 2, 3, 4, 5]).range([state.conferences[0].color, state.conferences[1].color, state.conferences[2].color, state.conferences[3].color, state.conferences[4].color, state.conferences[5].color])(0.5)
          });
        }
      }
    }
  })

  const conferenceChanges = getChanges(getCurrentConferences, year, historyArray);
  return { getSchools, conferenceChanges, getLegendConferences, getMapFill };
}
