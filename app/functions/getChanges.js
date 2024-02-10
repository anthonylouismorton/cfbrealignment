import conferenceData from '../data/conferenceData.json';
import cfbHistory from '../data/cfbHistory.json'

export function getChanges(currentConferences, currentYear, historyArray) {
  currentConferences.forEach((conference) => {
    if(conference.founded === currentYear){
      historyArray.push({change: 'founded', ...conference})
    }
    if(conference.disbanded === currentYear){
      historyArray.push({change: 'disbanded', ...conference})
    }
    conference.schools.forEach((school)=>{
      if(school.years[0] === currentYear){
        historyArray.push({change: 'joined', joined: currentYear, conference: conference.abbreviation, conferenceLogo: conference.logo, mapColor: conference.mapColor, ...school})
      }
      if(school.left){
        school.left.forEach((left) => {
          if(left.year === currentYear){
            conferenceData.forEach((item) => {
              if(left.newConference === item.abbreviation){
                historyArray.push({change: 'left', left: left.year, newConferenceColor: item.mapColor, newConferenceLogo: item.logo, newConferenceAbbr: item.abbreviation, oldConferenceLogo: conference.logo, oldConferenceAbrr: conference.abbreviation, oldConferenceColor: conference.mapColor, conference: conference.abbreviation, ...school})
              }
            })
          }
        })
      }
      if(school.rejoined){
        school.rejoined.forEach((rejoined) => {
          console.log(rejoined)
          if(rejoined.year === currentYear){
            historyArray.push({change: 'rejoined', year: rejoined.year, oldConference: rejoined.oldConference, conference: conference.abbreviation, conferenceLogo: conference.logo, ...school, mapColor: conference.mapColor})
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
