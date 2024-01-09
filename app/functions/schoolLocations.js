import * as d3 from 'd3';

export function schoolLocations(svg, projection, currentConferences, year, smallLogos) {
  var logoHeight = 28
  if(smallLogos){
    logoHeight = 20
  }

  currentConferences.forEach((conference) => {
    conference.schools.forEach((school) => {
      if(school.years.includes(year)){
        console.log(conference)
        //Double check Lat Lon in JSON if you get a projection error
        const schoolCords = [school.lat, school.lon];
        const [x, y] = projection(schoolCords);

        const schoolImage = svg
          .append('image')
          .attr('x', x - logoHeight / 2)
          .attr('y', y - logoHeight / 2)
          .attr('width', logoHeight)
          .attr('height', logoHeight)
          .attr('href', school.logo)
          .style('cursor', 'pointer');
      
        // bounce effect for schools that are joining or rejoining a conference
        if(school.years[0] === year || (school.rejoined && school.rejoined.some(obj => obj.year === year))){
          // Unsure is the white background is a good idea
          // const imageBackground = svg
          //   .append('rect')
          //   .attr('x', x - logoHeight / 2)
          //   .attr('y', y - logoHeight / 2)
          //   .attr('width', logoHeight)
          //   .attr('height', logoHeight)
          //   .attr('fill', 'white');
    
          schoolImage.classed('bouncing-element', true);
          // imageBackground.classed('bouncing-element', true);
        }
      }
    })
  });
  return
}