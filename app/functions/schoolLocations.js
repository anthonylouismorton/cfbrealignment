import * as d3 from 'd3';

export function schoolLocations(svg, projection, currentConferences, year, smallLogos, schoolName) {
  var logoHeight = 28
  if(smallLogos){
    logoHeight = 20
  }

  currentConferences.forEach((conference) => {
    conference.schools.forEach((school) => {
      if(school.years.includes(year)){
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
          .attr('transform', `translate(${x},${y})`);
        
        const schoolName = school.school.replace(/[^\w]+/g, '_'); // Replace spaces and special characters with underscores
        
        schoolGroup
          .append('circle')
          .attr('r', 4)
          .attr('fill', conference.mapColor)
          .style('cursor', 'pointer')
          .attr('id', schoolName);
        
        var tooltip = schoolGroup
          .append('text')
          .attr('class', 'tooltip') // Use class instead of ID for tooltip
          .attr('data-tooltip-id', schoolName) // Add a data attribute to associate with the circle
          .attr('x', 5)
          .attr('dy', '0.35em')
          .style('font-size', '12px')
          .style('fill', conference.mapColor || 'black')
          .style('font-weight', 'bold')
          .style('cursor', 'pointer')
          .style('visibility', 'hidden')
          .text(school.nickName);
        
        d3.selectAll('.school-group') // Select all school-group elements
          .on('mouseover', function () {
            const dataTooltipId = d3.select(this).select('circle').attr('id'); // Get the associated ID
            d3.selectAll('.tooltip') // Select all tooltips
              .filter(function () {
                return d3.select(this).attr('data-tooltip-id') === dataTooltipId;
              })
              .style('visibility', 'visible');
          })
          .on('mouseout', function () {
            d3.selectAll('.tooltip').style('visibility', 'hidden');
          });
        
        
          // if(school.years[0] === year){
          //   console.log(school)
          //   schoolGroup.append('text')
          //     .attr('x', 10) // Adjust the distance from the dot along the x-axis
          //     .attr('dy', '0.35em') // Adjust the vertical alignment if needed
          //     .style('font-size', '12px') // Set the font size as needed
          //     .style('fill', conference.mapColor || 'black') // Set the text color based on school.mapcolor, default to black
          //     .style('cursor', 'pointer')
          //     .text(school.nickName || school.school);
          // }

        }
      }
    })
  });
  return
}