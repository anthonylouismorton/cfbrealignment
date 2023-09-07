export function getSchools(svg, projection, conferenceData, year) {
  //TO DO
  //Need take in a list of the previous conferences and schools from the previous year. 
  //Next we need to compare them to the currentConferences array. If a school was removed from the array
  //we need to make note if they went to another conference or not. If they haven't
  //They will be marked as independent
  //We need to also need to return the current conference information to the USMap component
  //so that it can be saved in the state to be compared to last time
  var currentConferences = []
  conferenceData.forEach((conference) => {
    if(conference.founded <= year && (conference.disbanded === null || conference.disbanded > year)){
      currentConferences.push(conference)
    }
  })
  var schoolStates = []

  currentConferences.forEach((conference) => {
    //need the states for schools playing during the current year for filling in the states on the map to represent active conferences
    conference.schools.forEach((school) => {
      if(!schoolStates.includes(school.stateId) && (school.years.includes(year))){
        schoolStates.push({state: school.stateId, conference: conference.abbreviation, mapColor: conference.primaryColor})

        //Double check Lat Lon in JSON if you get a projection error
        const schoolCords = [school.lat, school.lon];
        const [x, y] = projection(schoolCords);

        svg
        .append('image')
        .attr('x', x - 15) 
        .attr('y', y - 15) 
        .attr('width', 30) 
        .attr('height', 30) 
        .attr('href', school.logo)
    }

  })
  });
  return schoolStates
}
// svg
//   .append('text')
//   .attr('x', x - 5)
//   .attr('y', y + 10)
//   .attr('dy', '0.35em')
//   .text(school.nickName)
//   .attr('fill', 'red')
//   .attr('font-size', '10px');
