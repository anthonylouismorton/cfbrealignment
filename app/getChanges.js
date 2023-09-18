import conferenceData from './conferenceData.json';

export function getChanges(currentConferences, currentYear) {
  var conferenceChanges = []
  currentConferences.forEach((conference) => {
    if(conference.founded === currentYear){
      conferenceChanges.push({change: 'founded', founded: conference.founded, conference: conference.conference, logo: conference.logo})
    }
    if(conference.disbanded === currentYear){
      conferenceChanges.push({change: 'disbanded', disbanded: conference.disbanded, conference: conference.conference, logo: conference.logo})
    }
    conference.schools.forEach((school)=>{
      if(school.years[0] === currentYear){
        conferenceChanges.push({change: 'joined', joined: currentYear, conference: conference.abbreviation, conferenceLogo: conference.logo, ...school})
      }
      if(school.left){
        school.left.forEach((left) => {
          if(left.year === currentYear){
            conferenceData.forEach((item) => {
              if(left.newConference === item.abbreviation){
                conferenceChanges.push({change: 'left', left: left.year, newConferenceLogo: item.logo,  oldConferenceLogo: conference.logo, conference: conference.abbreviation, ...school})
              }
            })
          }
        })
      }
      if(school.rejoined){
        school.rejoined.forEach((rejoined) => {
          if(rejoined.year === currentYear){
            conferenceChanges.push({change: 'rejoined', year: rejoined.year, oldConference: rejoined.oldConference, conference: conference.abbreviation, conferenceLogo: conference.logo, ...school})
          }
        })
      }
    })
    // you can remove the first if statement once all conferences has a names array
    if(conference.names){
      if(conference.names.length > 1 && conference.names[1].startYear <= currentYear){
        let prevConfName = {}
        conference.names.forEach((name) => {
          if(name.startYear === currentYear){
            conferenceChanges.push({change: 'nameChange', oldName: prevConfName.abbreviation, newName: name.abbreviation, oldLogo: prevConfName.logo, newLogo: name.logo, oldColor: prevConfName.primaryColor, newColor: name.primaryColor})
            return false
          }
            prevConfName = name
        })
      }
    }
  })

  const filteredConferences = conferenceChanges.filter((school, index, self) => {
    const hasDuplicate = self.some(
      (otherSchool, otherIndex) =>
        otherIndex !== index &&
        otherSchool.school === school.school &&
        otherSchool.change === "left"
    );
      
    return !hasDuplicate || school.change !== "joined";
  });
  return filteredConferences;
}
