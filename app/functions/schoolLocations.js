export function schoolLocations(svg, projection, currentConferences, year, smallLogos) {
  var logoHeight = 28
  console.log(smallLogos)
  if(smallLogos){
    logoHeight = 20
  }

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
            .attr('x', x - logoHeight/2)
            .attr('y', y - logoHeight/2)
            .attr('width', logoHeight)
            .attr('height', logoHeight)
            .attr('href', school.logo);

          // Apply the bounce effect by adding the CSS class "bouncing-element" to the image
          schoolImage.classed('bouncing-element', true);
        }
        else{
          svg
            .append('image')
            .attr('x', x - logoHeight/2) 
            .attr('y', y - logoHeight/2) 
            .attr('width', logoHeight) 
            .attr('height', logoHeight) 
            .attr('href', school.logo)
        }
      }
    })
  });
  return
}