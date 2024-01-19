
export function schoolLocations(currentConferences, year) {

  let schoolList = []

  currentConferences.forEach((conference) => {
    conference.schools.forEach((school) => {
      if(school.years.includes(year)){
        schoolList.push({color: conference.mapColor, coordinates: [ school.lon, school.lat], name: school.school, logo: school.logo})
      }
    })
  });
  return schoolList;
}