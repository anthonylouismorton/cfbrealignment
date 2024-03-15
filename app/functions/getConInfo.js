import { getChanges } from "./getChanges";
import * as d3 from 'd3';

export function getConferences(conferenceData, year, option, conferences) {
  const { majorConferences, powerConferences, aqConferences} = option
  var getCurrentConferences = [];
  var historyArray = [];
  var getLegendConferences = [];
  var getMapFill2 = [];

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

  var getSchools = [];

  //need the states for schools playing during the current year for filling in the states on the map to represent active conferences
  getCurrentConferences.forEach((conference, index) => {

    if(conference.disbanded !== year){
      getLegendConferences.push({
        abbreviation: conference.abbreviation,
        mapColor: conference.mapColor
      });
    }

    conference.schools.forEach((school) => {
      if(school.years.includes(year)){
        const existingStateIndex = getMapFill2.findIndex((currentState) => currentState.state === school.stateId);
        if(existingStateIndex === -1){
          getMapFill2.push({
            state: school.stateId,
            conferences: [{conference: conference.abbreviation, color: conference.mapColor, currentSchools: [{coordinates: [ school.lon, school.lat], name: school.school, logo: school.logo, state: school.stateId, schoolInfo: {...school}}]}],
            color: conference.mapColor
          });
        } 
        else{
          const existingConferenceIndex = getMapFill2[existingStateIndex].conferences.findIndex((conf) => conf.conference === conference.abbreviation);
          if(existingConferenceIndex === -1){
            const updatedConferences = [...getMapFill2[existingStateIndex].conferences, { conference: conference.abbreviation, color: conference.mapColor, currentSchools: [{coordinates: [ school.lon, school.lat ], name: school.school, logo: school.logo, state: school.stateId, schoolInfo: {...school}}]
            }];
            var newColor = d3.scaleLinear()
            .domain([...Array(updatedConferences.length).keys()])
            .range(updatedConferences.map(conf => conf.color))
            (1/updatedConferences.length);
            getMapFill2[existingStateIndex].conferences = (updatedConferences);
            getMapFill2[existingStateIndex].color = newColor;
          }
          else{
            getMapFill2[existingStateIndex].conferences[existingConferenceIndex].currentSchools.push({coordinates: [ school.lon, school.lat ], name: school.school, logo: school.logo, state: school.stateId, schoolInfo: {...school}})
          }
        };
      };
      if(school.years.includes(year)){
        if((year === 1907 || year === 1908) && school.school === "University of Iowa"){

        }
        else{
          getSchools.push({color: conference.mapColor, conference: conference.abbreviation, coordinates: [ school.lon, school.lat], name: school.school, logo: school.logo, state: school.stateId, schoolInfo: {...school}});
        };
      };
    });
  });

  if(year === 1907 || year === 1908){
    const iowaIndex = getMapFill2.findIndex((state) => state.state === "19");
    getMapFill2[iowaIndex] = {color: "rgb(0, 140, 102)", conference: [conferenceData[6].abbreviation, conferenceData[8].abbreviation], coordinates: [ conferenceData[8].schools[1].lon, conferenceData[8].schools[1].lat], name: conferenceData[8].schools[1].school, logo: conferenceData[8].schools[1].logo, state: conferenceData[8].schools[1].stateId, schoolInfo: conferenceData[8].schools[0]};

    getSchools.push(
      {color: "rgb(0, 140, 102)", conference: [conferenceData[6].abbreviation, conferenceData[8].abbreviation], coordinates: [ conferenceData[8].schools[1].lon, conferenceData[8].schools[1].lat], name: conferenceData[8].schools[1].school, logo: conferenceData[8].schools[1].logo, state: conferenceData[8].schools[1].stateId, schoolInfo: conferenceData[8].schools[0]}
    );
  };

  const conferenceChanges = getChanges(getCurrentConferences, year, historyArray);
  return { getSchools, conferenceChanges, getLegendConferences, getMapFill2 };
};
