export function getSchools(svg, projection, schools, year) {
  var currentConferences = []
  schools.forEach((conference) => {
    console.log(conference)
    if(conference.founded <= year && (conference.disbanded === null || conference.disbanded > year)){
      console.log(conference)
      currentConferences.push(conference)
    }
  })
  var schoolStates = []
  console.log(schools)
  currentConferences.forEach((conference) => {
    conference.schools.forEach((school) => {
      if(!schoolStates.includes(school.stateId) && (school.years.includes(year))){
        schoolStates.push({state: school.stateId, conference: conference.conference})

        //Double check Lat Lon in JSON if you get a projection error
        const schoolCords = [school.lat, school.lon];
        const [x, y] = projection(schoolCords);
        // svg
        //   .append('circle')
        //   .attr('cx', x)
        //   .attr('cy', y)
        //   .attr('r', 2)
        //   .attr('fill', 'red');
        svg
        .append('image')
        .attr('x', x - 15) 
        .attr('y', y - 15) 
        .attr('width', 30) 
        .attr('height', 30) 
        .attr('href', school.logo)
        .attr('fill', 'red');
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
