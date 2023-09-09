export function schoolLocations(svg, projection, currentConferences, year) {
  //TO DO
  //Need take in a list of the previous conferences and schools from the previous year. 
  //Next we need to compare them to the currentConferences array. If a school was removed from the array
  //we need to make note if they went to another conference or not. If they haven't
  //They will be marked as independent
  //We need to also need to return the current conference information to the USMap component
  //so that it can be saved in the state to be compared to last time
  currentConferences.forEach((conference) => {
    conference.schools.forEach((school) => {
      if(school.years.includes(year)){
        //Double check Lat Lon in JSON if you get a projection error
        const schoolCords = [school.lat, school.lon];
        const [x, y] = projection(schoolCords);
        if(school.years[0] === year){
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
