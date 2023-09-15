export function getConferences(conferenceData, year, mapdata, majorConferences) {

  var getCurrentConferences = []
  conferenceData.forEach((conference) => {
    if(conference.founded <= year && (conference.disbanded === null || conference.disbanded >= year)){
      if(!majorConferences){
        getCurrentConferences.push(conference)
      }
      else{
        if((conference.majorConference.start >= year && conference.majorConference.end > year) || (conference.majorConference.start >= !conference.majorConference.end)){
          getCurrentConferences.push(conference)
        }
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
  return { getSchoolStates, getCurrentConferences }
}
