export function mapFill(getSchoolStates, currentYear, schoolName) {
  const stateConferenceMap = {};
  getSchoolStates.forEach((item) => {
    var state = item.state
    var conference = ''
    if(item.names){
      item.names.forEach((name) => {
        if(currentYear >= name.startYear && currentYear <= name.endYear || (currentYear >= name.startYear && name.endYear === null)){
          conference = name.conference
        }
      })
    }
    if (!stateConferenceMap[state]) {
      stateConferenceMap[state] = [];
    }
    if (!stateConferenceMap[state].includes(conference)) {
      stateConferenceMap[state].push(conference);
    }
  });
  const legendConferences = []
  getSchoolStates.forEach((item) => {
    if(item.names){
      item.names.forEach((former) => {
        if (!legendConferences.some((conf) => conf.conference === former.conference)) {
          if(currentYear >= former.startYear && currentYear <= former.endYear || (currentYear >= former.startYear && former.endYear === null)){
            legendConferences.push({
              abbreviation: former.abbreviation,
              conference: former.conference,
              headquarters: item.headquarters,
              state: item.state,
              schools: item.schools,
              mapColor: item.mapColor,
              state: item.state
            });
          }
        }
      })
    }
    else if(!legendConferences.some((conf) => conf.conference === item.conference)) {
      legendConferences.push({
        abbreviation: item.abbreviation,
        conference: item.conference,
        headquarters: item.headquarters,
        state: item.state,
        schools: item.schools,
        mapColor: item.mapColor,
        state: item.state
      });
    }
  });

  return legendConferences
}