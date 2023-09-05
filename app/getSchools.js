export function getSchools(svg, projection, schools, year) {
  var currentConferences = []
  schools.forEach((conference) => {
    if(conference.founded <= year && (conference.disbanded === null || conference.disbanded > year)){
      currentConferences.push(conference)
    }
  })
  var schoolStates = []

  currentConferences.forEach((conference) => {
    conference.schools.forEach((school) => {
      if(!schoolStates.includes(school.stateId) && (school.years.includes(year))){
        schoolStates.push({state: school.stateId, conference: conference.abbreviation})

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
