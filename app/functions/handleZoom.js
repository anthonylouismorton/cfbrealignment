
export function handleZoom(option, zoom, styling, logoSize, logoOffSet, mapWidth){
  let updateStyling = styling
  let updateLogoSize = logoSize;
  let updateLogoOffset = logoOffSet;

  // Scale logos relative to the map's actual rendered width instead of a
  // fixed pixel size, so they stay proportionate on any screen. 18px at the
  // app's original default map width (835) is the anchor ratio -- every
  // size below is expressed as a ratio of that same 18px baseline.
  const baseLogoSize = (mapWidth || 835) * (18 / 835);
  const ratio = (px) => baseLogoSize * (px / 18);

  if(option.smallLogos && (zoom < 6)){
    updateLogoSize = ratio(12);
  }
  else if(!option.smallLogos && zoom < 2){
    // No lower bound: a map narrower than the 835px baseline now produces
    // zoom < 1, and logos there should just follow the auto-scaled base
    // size rather than fall through unmatched (the old fixed-size lower
    // bound of zoom >= 1 never had to account for that).
    updateLogoSize = ratio(18);
  }
  else if(!option.smallLogos && (zoom > 2 && zoom < 3)) {
    updateLogoSize = ratio(10);
  }
  else if(!option.smallLogos && (zoom > 3 && zoom < 4)) {
    updateLogoSize = ratio(10);
  }
  else if(!option.smallLogos && (zoom > 4 && zoom < 5)) {
    updateLogoSize = ratio(8);
  }
  else if(!option.smallLogos && (zoom > 5 && zoom < 6)) {
    updateLogoSize = ratio(6);
  }
  else if(!option.smallLogos && (zoom > 6 && zoom < 7)) {
    updateLogoSize = ratio(4);
  }
  else if(!option.smallLogos && (zoom > 7)) {
    updateLogoSize = ratio(2);
  }
  else if(option.smallLogos && (zoom > 6 && zoom < 7)) {
    updateLogoSize = ratio(6);
  }
  else if(option.smallLogos && (zoom > 7)) {
    updateLogoSize = ratio(4);
  }
  if(zoom > 2 && zoom < 4){
    updateStyling = {
      circleRadius: 2,
      hoveredSchool: {
        x: 7,
        y: -2,
        fontSize: "8px",
        padding: "py-[2px] px-[5px]",
        rounded: "rounded-sm"
      }
    };
  }
  else if (zoom > 4){
    updateStyling = {
      circleRadius: 1,
      hoveredSchool: {
        x: 2,
        y: -13,
        fontSize: "2px",
        padding: "py-[1px] px-[2px]",
        rounded: "rounded-[1px]"
      }
    };
  } 
  else{
    updateStyling = {
      circleRadius: 3,
      hoveredSchool: {
        x: 10,
        y: -5,
        fontSize: "12px",
        padding: "py-[2px] px-[5px]",
        rounded: "rounded-sm"
      }
    };
  }
  updateLogoOffset = -(updateLogoSize/2);
  return { updateStyling: {...updateStyling, logoSize: updateLogoSize, logoOffset: updateLogoOffset}};
};