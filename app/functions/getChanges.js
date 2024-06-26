import conferenceData from '../data/updatedConferenceData.json';
import cfbHistory from '../data/cfbHistory.json';
import getConName from './getConName';

export function getChanges(currentConferences, currentYear, historyArray) {
  currentConferences.forEach((conference) => {
    if(conference.founded === currentYear){
      historyArray.push({change: 'founded', ...conference});
    };

    if(conference.disbanded === currentYear){
      historyArray.push({change: 'disbanded', ...conference});
    };

    conference.schools.forEach((school)=>{
      if(school.years[0] === currentYear){
        historyArray.push({change: 'joined', joined: currentYear, conferenceLogo: conference.logo, mapColor: conference.mapColor, ...school, currentAbbreviation: conference.currentAbbreviation});
      };

      if(school.left){
        school.left.forEach((left) => {
          if(left.year === currentYear){
            conferenceData.forEach((item) => {
              if(left.newConference === item.abbreviation){
                const { currentAbbreviation } = getConName(item, currentYear);
                historyArray.push({change: 'left', left: left.year, newConferenceColor: item.mapColor, newConferenceLogo: item.logo, newConferenceAbbr: currentAbbreviation, oldConferenceLogo: conference.logo, oldConferenceAbrr: conference.currentAbbreviation, oldConferenceColor: conference.mapColor, ...school});
              };
            });
          };
        });
      };

      if(school.rejoined){
        school.rejoined.forEach((rejoined) => {
          if(rejoined.year === currentYear){
            historyArray.push({change: 'rejoined', year: rejoined.year, oldConference: rejoined.oldConference, conferenceLogo: conference.logo, ...school, mapColor: conference.mapColor, currentAbbreviation: conference.currentAbbreviation})
          };
        });
      };
    });
    
    // you can remove the first if statement once all conferences has a names array
    if(conference.names){
      if(conference.names.length > 1 && conference.names[1].startYear <= currentYear){
        let prevConfName = {};
        conference.names.forEach((name) => {
          if(name.startYear === currentYear){
            historyArray.push({change: 'nameChange', oldName: prevConfName.abbreviation, newName: name.abbreviation, oldLogo: prevConfName.logo, newLogo: name.logo, oldColor: prevConfName.primaryColor, newColor: name.primaryColor, mapColor: conference.mapColor});
            return false;
          };
            prevConfName = name;
        });
      };
    };
  });

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
      });
    };
  });
  
  filteredHistory.sort((a, b) => {
    const order = {
      disbanded: 1,
      founded: 2,
      nameChange: 3,
      joined: 4,
      rejoined: 5,
      left: 6,
      history: 7

    };
    return order[a.change] - order[b.change];
  });
  return filteredHistory;
}
