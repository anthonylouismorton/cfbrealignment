
export function handleMouseMove(event){
  const box = wrapperRef.current.getBoundingClientRect();
  const { top, left } = box
  const resizeFactorX = 1 / mapSize.width * box.width
  const resizeFactorY = 1 / mapSize.height * box.height

  const originalCenter = [mapSize.width/2, mapSize.height/2]
  const prevCenter = projection(position.coordinates)
  const offsetX = prevCenter[0] - originalCenter[0]
  const offsetY = prevCenter[1] - originalCenter[1]
  const clientX = (event.clientX - left) / resizeFactorX
  const clientY = (event.clientY - top) / resizeFactorY
  const x = clientX
  const y = clientY
  var xOffset = 0;
  var yOffset = 0;
  const center = projection.invert([x,y]);

  if(center[0] < -156){
    xOffset = 1.25
  }
  else if(center[0] < -130 && center[0] > -156){
    xOffset = -2.5
    yOffset = 0.25
  }
  else if(center[0] < -113 && center[0] > -122){
    xOffset = 1.25
  }
  else if(center[0] > -113){
    xOffset = 1.5
  }
  if(center[1] < 31 && center[1] > 29 && center[0] > -150){
    yOffset = 2
  }
  else if(center[1] < 29 && center[0] > -150){
    yOffset = 4
  }
  dispatch(setMapInfo({map: "toolTipPos", value: { longitude: center[0] + xOffset, latitude: center[1] + yOffset }}));
};