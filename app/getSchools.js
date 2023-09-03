export function getSchools(svg, projection, schools) {
  var schoolStates = []
  schools.forEach((school) => {
    if(!schoolStates.includes(school.stateId)){
      schoolStates.push(school.stateId)
    }
    const schoolCords = [school.lat, school.lon];
    const [x, y] = projection(schoolCords);
    svg
      .append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', 2)
      .attr('fill', 'red');
    svg
    .append('image')
    .attr('x', x - 9) // Adjust the x position as needed
    .attr('y', y - 9) // Adjust the y position as needed
    .attr('width', 18) // Set the width of the image
    .attr('height', 18) // Set the height of the image
    .attr('href', school.logo) // Use the URL or path to the logo image
    .attr('fill', 'red');
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
