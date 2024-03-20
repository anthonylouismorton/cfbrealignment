const getConName = (conference, year) => {
  let currentAbbreviation = conference.abbreviation;
  let currentName = conference.conference;
  if(conference.names !== null && conference.names.length > 1){
    for(const con of conference.names) {
      if(con.startYear <= year && (con.endYear >= year || con.endYear === null)){
        currentAbbreviation = con.abbreviation;
        currentName = con.conference;
        break;
      };
    };
  };
  return { currentAbbreviation, currentName };
};

export default getConName;