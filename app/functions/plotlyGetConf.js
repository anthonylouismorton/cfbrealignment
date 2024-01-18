import { getChanges } from "./getChanges";

export function getConferences(conferenceData, year, options, conList) {
  const { majorConferences, powerConferences, aqConferences} = options
  var getCurrentConferences = []
  var historyArray = []

  conferenceData.forEach((conference) => {
    
    //Need to filter out conferences with no data or unused currently
    if(!conference.founded){
      return
    }

    //Filter by user selected conferences only
    if(options.conFilter){
      if(conList[conference.abbreviation] === false){
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

  var getSchoolStates = []

  //need the states for schools playing during the current year for filling in the states on the map to represent active conferences
  getCurrentConferences.forEach((conference) => {
    conference.schools.forEach((school) => {
      if(!getSchoolStates.includes(school.stateId) && (school.years.includes(year))){
        getSchoolStates.push({state: school.stateId, ...conference})
    }
  })
  });

  //Changes for the history component
  const conferenceChanges = getChanges(getCurrentConferences, year, historyArray)

  return { getSchoolStates, getCurrentConferences, conferenceChanges }
}
