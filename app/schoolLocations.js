export function schoolLocations(svg, projection, currentConferences, year) {

  currentConferences.forEach((conference) => {
    conference.schools.forEach((school) => {
      if(school.years.includes(year)){
        //Double check Lat Lon in JSON if you get a projection error
        const schoolCords = [school.lat, school.lon];
        const [x, y] = projection(schoolCords);
        if(school.years[0] === year || (school.rejoined && school.rejoined.some(obj => obj.year === year))){
          //add bounce effect
          const schoolImage = svg
            .append('image')
            .attr('x', x - 15)
            .attr('y', y - 15)
            .attr('width', 30)
            .attr('height', 30)
            .attr('href', school.logo);

          // Apply the bounce effect by adding the CSS class "bouncing-element" to the image
          schoolImage.classed('bouncing-element', true);
        }
        else{
          svg
          .append('image')
          .attr('x', x - 15) 
          .attr('y', y - 15) 
          .attr('width', 30) 
          .attr('height', 30) 
          .attr('href', school.logo)
        }
      }
    })
  });
  return
}
// svg
//   .append('text')
//   .attr('x', x - 5)
//   .attr('y', y + 10)
//   .attr('dy', '0.35em')
//   .text(school.nickName)
//   .attr('fill', 'red')
//   .attr('font-size', '10px');
