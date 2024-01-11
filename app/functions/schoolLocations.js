import * as d3 from 'd3';

export function schoolLocations(svg, projection, currentConferences, year, smallLogos, schoolName) {
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
        console.log(schoolName)
        if(!schoolName){
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
        else{
          const schoolGroup = svg.append('g')
          .attr('class', 'school-group')
          .attr('transform', `translate(${x},${y})`) // Translate the group to the school's location
        
        // schoolGroup.append('rect')
        // .attr('width', 8)
        // .attr('height', 8)
        // .attr('fill', conference.mapColor);
        schoolGroup.append('circle')
          .attr('r', 4)
          .attr('fill', conference.mapColor);
        // Add text (school name) next to the dot
        // schoolGroup.append('text')
        //   .attr('x', 10) // Adjust the distance from the dot along the x-axis
        //   .attr('dy', '0.35em') // Adjust the vertical alignment if needed
        //   .style('font-size', '12px') // Set the font size as needed
        //   .style('fill', conference.mapColor || 'black') // Set the text color based on school.mapcolor, default to black
        //   .style('cursor', 'pointer')
        //   .text(school.nickName || school.school);
        
        // Attach event listeners if needed
        schoolGroup
          .on('mouseover', function () {
            // Add your mouseover logic here
          })
          .on('mouseout', function () {
            // Add your mouseout logic here
          });
        }
      }
    })
  });
  return
}