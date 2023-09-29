import { getChanges } from "./getChanges";

export function getConferences(conferenceData, year, options) {
  const { majorConferences, powerConferences, aqConferences} = options
  var getCurrentConferences = []
  var historyArray = []

  conferenceData.forEach((conference) => {
    if(conference.divisionIAA){
      if(conference.divisionIAA.start <= year){
        if(conference.divisionIAA.start === year){
          historyArray.push({change: 'dropped', ...conference, division: "IAA"})
        }
        return;
      }
    }
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

  getCurrentConferences.forEach((conference) => {
    
    //need the states for schools playing during the current year for filling in the states on the map to represent active conferences
    conference.schools.forEach((school) => {
      if(!getSchoolStates.includes(school.stateId) && (school.years.includes(year))){
        getSchoolStates.push({state: school.stateId, ...conference})
    }
  })
  });
  const conferenceChanges = getChanges(getCurrentConferences, year, historyArray)
  console.log(conferenceChanges)

  return { getSchoolStates, getCurrentConferences, conferenceChanges }
}
