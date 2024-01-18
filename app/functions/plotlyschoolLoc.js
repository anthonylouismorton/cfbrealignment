
export function schoolLocations(currentConferences, year) {

  let schoolLat = []
  let schoolLon = []
  let schoolLogo = []
  let conColor = []

  currentConferences.forEach((conference) => {
    conference.schools.forEach((school) => {
      if(school.years.includes(year)){
        conColor.push(conference.mapColor)
        schoolLat.push(school.lat)
        schoolLon.push(school.lon)
      }
    })
  });

  return { schoolLat, schoolLon, conColor };
}