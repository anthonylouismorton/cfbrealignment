
export function getOptions(options, currentConferences, setCurrentConferences, activeConferences, setActiveConferences, currentYear){

  var filterConferences = []
  if(!options.majorConferences){
    filterConferences = currentConferences.filter((conference) => {
      if((conference.majorConference.start >= currentYear && conference.majorConference.end > currentYear) || (conference.majorConference.start >= !conference.majorConference.end)){
        return conference
      }

    })
  }
  setActiveConferences(filterConferences)
}
