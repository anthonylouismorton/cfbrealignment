import conferenceData from '../data/conferenceData.json';
import cfbHistory from '../data/cfbHistory.json'

export function getChanges(currentConferences, currentYear, historyArray) {
  currentConferences.forEach((conference) => {
    if(conference.founded === currentYear){
      historyArray.push({change: 'founded', founded: conference.founded, conference: conference.conference, logo: conference.logo})
    }
    if(conference.disbanded === currentYear){
      historyArray.push({change: 'disbanded', disbanded: conference.disbanded, conference: conference.conference, logo: conference.logo})
    }
    conference.schools.forEach((school)=>{
      if(school.years[0] === currentYear){
        historyArray.push({change: 'joined', joined: currentYear, conference: conference.abbreviation, conferenceLogo: conference.logo, ...school})
      }
      if(school.left){
        school.left.forEach((left) => {
          if(left.year === currentYear){
            conferenceData.forEach((item) => {
              if(left.newConference === item.abbreviation){
                historyArray.push({change: 'left', left: left.year, newConferenceLogo: item.logo,  oldConferenceLogo: conference.logo, conference: conference.abbreviation, ...school})
              }
            })
          }
        })
      }
      if(school.rejoined){
        school.rejoined.forEach((rejoined) => {
          if(rejoined.year === currentYear){
            historyArray.push({change: 'rejoined', year: rejoined.year, oldConference: rejoined.oldConference, conference: conference.abbreviation, conferenceLogo: conference.logo, ...school})
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
            historyArray.push({change: 'nameChange', oldName: prevConfName.abbreviation, newName: name.abbreviation, oldLogo: prevConfName.logo, newLogo: name.logo, oldColor: prevConfName.primaryColor, newColor: name.primaryColor, mapColor: conference.mapColor})
            return false
          }
            prevConfName = name
        })
      }
    }
  })

  const filteredHistory = historyArray.filter((school, index, self) => {
    const hasDuplicate = self.some(
      (otherSchool, otherIndex) =>
        otherIndex !== index &&
        otherSchool.school === school.school &&
        otherSchool.change === "left"
    );
      
    return !hasDuplicate || school.change !== "joined";
  });

  cfbHistory.history.find((year) => {
    if(year.year === currentYear){
      year.events.forEach((event) => {
        filteredHistory.push({ change: 'history', event: event })
      })
    }
  })

  return filteredHistory;
}
