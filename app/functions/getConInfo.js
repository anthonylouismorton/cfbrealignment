import { getChanges } from "./getChanges";
import getConName from "./getConName";
import * as d3 from 'd3';

export function getConferences(conferenceData, year, option, conferences) {
  const { majorConferences, powerConferences, aqConferences } = option;
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
      };
    };

    //Filter out conferences that dropped from division I to IAA
    if(conference.divisionIAA){
      if(conference.divisionIAA.start <= year){
        if(conference.divisionIAA.start === year){
          historyArray.push({change: 'dropped', ...conference, division: "IAA"})
        };
        return;
      };
    };
    //Filter out conferences that dropped from division I to II
    if(conference.divisionII){
      if(conference.divisionII.start <= year){
        if(conference.divisionII.start === year){
          historyArray.push({change: 'dropped', ...conference, division: "II"})
        }
        return;
      };
    };

    if(conference.founded <= year && (conference.disbanded === null || conference.disbanded >= year)){
      if(majorConferences){
        if((conference.majorConference.start <= year && conference.majorConference.end >= year) || (conference.majorConference.start <= year && conference.majorConference.end === null) && conference.majorConference.start !== null){
          const { currentAbbreviation, currentName } = getConName(conference, year);
          getCurrentConferences.push({ ...conference, currentAbbreviation: currentAbbreviation,currentName: currentName });
        };
      }
      else if(year >= 1998 && year < 2014 && aqConferences){
        if(conference.aqConference){
          if(conference.aqConference.start <= year && conference.aqConference.end >= year){
            const { currentAbbreviation, currentName } = getConName(conference, year);
            getCurrentConferences.push({ ...conference, currentAbbreviation: currentAbbreviation,currentName: currentName });
          };
        };
      }
      else if(year >=2014 && powerConferences){
        if(conference.powerConference){
          const { currentAbbreviation, currentName } = getConName(conference, year);
          getCurrentConferences.push({ ...conference, currentAbbreviation: currentAbbreviation,currentName: currentName });
        };
      }
      else{
        const { currentAbbreviation, currentName } = getConName(conference, year);
        getCurrentConferences.push({ ...conference, currentAbbreviation: currentAbbreviation,currentName: currentName });
      };
    };
  });

  var getSchools = [];

  //need the states for schools playing during the current year for filling in the states on the map to represent active conferences
  getCurrentConferences.forEach((conference) => {
    if(conference.disbanded !== year){
      getLegendConferences.push({
        abbreviation: conference.currentAbbreviation,
        mapColor: conference.mapColor
      });
    }

    conference.schools.forEach((school) => {
      if(school.years.includes(year)){
        const existingStateIndex = getMapFill.findIndex((currentState) => currentState.state === school.stateId);
        if((year === 1907 || year === 1908) && school.school === "University of Iowa"){

        }
        else if(existingStateIndex === -1){
          getMapFill.push({
            state: school.stateId,
            conferences: [{ conference: conference.currentAbbreviation, color: conference.mapColor, currentSchools: [{coordinates: [ school.lon, school.lat], name: school.school, logo: school.logo, state: school.stateId, schoolInfo: { ...school }}] }],
            color: conference.mapColor
          });
        } 
        else{
          const existingConferenceIndex = getMapFill[existingStateIndex].conferences.findIndex((conf) => conf.conference === conference.currentAbbreviation);
          if(existingConferenceIndex === -1){
            const updatedConferences = [ ...getMapFill[existingStateIndex].conferences, { conference: conference.currentAbbreviation, color: conference.mapColor, currentSchools: [{coordinates: [ school.lon, school.lat ], name: school.school, logo: school.logo, state: school.stateId, schoolInfo: { ...school } }]
            }];
            var newColor = d3.scaleLinear()
            .domain([...Array(updatedConferences.length).keys()])
            .range(updatedConferences.map(conf => conf.color))
            (1/updatedConferences.length);
            getMapFill[existingStateIndex].conferences = (updatedConferences);
            getMapFill[existingStateIndex].color = newColor;
          }
          else{
            getMapFill[existingStateIndex].conferences[existingConferenceIndex].currentSchools.push({ coordinates: [ school.lon, school.lat ], name: school.school, logo: school.logo, state: school.stateId, schoolInfo: { ...school } })
          }
        };
      };
      if(school.years.includes(year)){
        if((year === 1907 || year === 1908) && school.school === "University of Iowa"){

        }
        else{
          getSchools.push({color: conference.mapColor, conference: conference.currentAbbreviation, coordinates: [ school.lon, school.lat], name: school.school, logo: school.logo, state: school.stateId, schoolInfo: {...school}});
        };
      };
    });
  });

  if(year === 1907 || year === 1908){
    const westernIowa = conferenceData[6];
    const mviaaIowa = conferenceData[8]
    getMapFill.push({
      state: conferenceData[8].schools[1].stateId,
      color: "rgb(0, 140, 102)",
      conferences: [{ conference: westernIowa.abbreviation, color: westernIowa.mapColor, currentSchools: [{ coordinates: [ westernIowa.schools[2].lon, westernIowa.schools[2].lat ], name: westernIowa.schools[2].school, logo: westernIowa.schools[2].logo, state: westernIowa.schools[2].stateId, schoolInfo: westernIowa.schools[2] }] }, { conference: mviaaIowa.abbreviation, color: mviaaIowa.mapColor, currentSchools: [{ coordinates: [ mviaaIowa.schools[1].lon, mviaaIowa.schools[1].lat ], name: mviaaIowa.schools[1].school, logo: mviaaIowa.schools[1].logo, state: mviaaIowa.schools[1].stateId, schoolInfo: mviaaIowa.schools[1] }] }]
    });

    getSchools.push(
      { color: "rgb(0, 140, 102)", conference: `${conferenceData[6].abbreviation} and ${conferenceData[8].abbreviation}`, coordinates: [ conferenceData[8].schools[1].lon, conferenceData[8].schools[1].lat ], name: conferenceData[8].schools[1].school, logo: conferenceData[8].schools[1].logo, state: conferenceData[8].schools[1].stateId, schoolInfo: conferenceData[8].schools[1] }
    );
  };

  const conferenceChanges = getChanges(getCurrentConferences, year, historyArray);
  return { getSchools, conferenceChanges, getLegendConferences, getMapFill };
};

