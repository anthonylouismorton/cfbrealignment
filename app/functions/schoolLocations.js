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

        if(schoolName){
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
            .attr('class', 'tooltip')
            .attr('data-tooltip-id', schoolName)
            .attr('x', 5)
            .attr('dy', '0.35em')
            .style('font-size', '12px')
            .attr('width', '100%')
            .attr('height', '100%')
            .style('fill', 'white')
            .style('fill', conference.mapColor || 'black')
            .style('font-weight', 'bold')
            .style('cursor', 'pointer')
            .style('visibility', 'hidden')
            .text(school.nickName)
        
        
          d3.selectAll('.school-group')
          .on('mouseover', function () {
            const dataTooltipId = d3.select(this).select('circle').attr('id')
            d3.selectAll('.tooltip')
              .filter(function () {
                return d3.select(this).attr('data-tooltip-id') === dataTooltipId;
              })
              .style('visibility', 'visible')
              .raise();
          })
          .on('mouseout', function () {
            d3.selectAll('.tooltip').style('visibility', 'hidden');
          });


        }
      }
    })
  });
  return
}