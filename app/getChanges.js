import conferenceData from './conferenceData.json';

export function getChanges(currentConferences, currentYear) {
  var conferenceChanges = []
  currentConferences.forEach((conference) => {
    if(conference.founded === currentYear){
      conferenceChanges.push({change: 'founded', founded: conference.founded, conference: conference.conference, logo: conference.logo})
    }
    if(conference.disbanded === currentYear){
      console.log(conference.disbanded)
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
                console.log(conference)
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
  })
  return conferenceChanges;
}
