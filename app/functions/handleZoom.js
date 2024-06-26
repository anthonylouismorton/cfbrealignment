
export function handleZoom(option, zoom, styling, logoSize, logoOffSet){
  let updateStyling = styling
  let updateLogoSize = logoSize;
  let updateLogoOffset = logoOffSet;

  if(option.smallLogos && (zoom < 6)){
    updateLogoSize = 12;
  }
  else if((!option.smallLogos && zoom >= 1 && zoom < 2)){
    updateLogoSize = 18;
  }
  else if(!option.smallLogos && (zoom > 1 && zoom < 2)) {
    updateLogoSize = 12;
  }
  else if(!option.smallLogos && (zoom > 2 && zoom < 3)) {
    updateLogoSize = 10;
  }
  else if(!option.smallLogos && (zoom > 3 && zoom < 4)) {
    updateLogoSize = 10;
  }
  else if(!option.smallLogos && (zoom > 4 && zoom < 5)) {
    updateLogoSize = 8;
  }
  else if(!option.smallLogos && (zoom > 5 && zoom < 6)) {
    updateLogoSize = 6;
  }
  else if(!option.smallLogos && (zoom > 6 && zoom < 7)) {
    updateLogoSize = 4;
  }
  else if(!option.smallLogos && (zoom > 7)) {
    updateLogoSize = 2;
  }
  else if(option.smallLogos && (zoom > 6 && zoom < 7)) {
    updateLogoSize = 6;
  }
  else if(option.smallLogos && (zoom > 7)) {
    updateLogoSize = 4;
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
}