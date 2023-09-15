export function getConferences(svg, projection, conferenceData, year) {

  var currentConferences = []
  conferenceData.forEach((conference) => {
    if(conference.founded <= year && (conference.disbanded === null || conference.disbanded >= year)){
      currentConferences.push(conference)
    }
  })

  var schoolStates = []

  currentConferences.forEach((conference) => {
    
    //need the states for schools playing during the current year for filling in the states on the map to represent active conferences
    conference.schools.forEach((school) => {
      if(!schoolStates.includes(school.stateId) && (school.years.includes(year))){
        schoolStates.push({state: school.stateId, ...conference})
    }
  })
  });
  return { schoolStates, currentConferences }
}
