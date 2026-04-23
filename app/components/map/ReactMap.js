import React, { useEffect, useRef, useMemo } from 'react';
import States from './States';
import SchoolInfo from './schoolInfo';
import StateInfo from './StateInfo';
import SchoolLocation from './SchoolLocation';
import conferenceData from '../../data/updatedConferenceData.json';
import { getConferences } from '../../functions/getConInfo';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { IconButton } from '@mui/material';
import { openFullscreen } from '../../../redux/features/layoutSlices';
import { setLegend, setChanges } from '@/redux/features/conInfoSlices';
import { setMapInfo, setLogo, setMapStyling } from '@/redux/features/mapSlices';
import { handleZoom } from '../../functions/handleZoom';
import { useDispatch, useSelector } from 'react-redux';
import Autoplay from './AutoPlay';
import { geoAlbersUsa } from 'd3-geo';
import {
  ComposableMap,
  Annotation,
  ZoomableGroup,
} from "react-simple-maps";

const MapChart = ({ headerRef }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const { fullscreen, showMobile } = useSelector((state)=> state.layoutReducer);
  const { styling, logoOffSet, logoSize, mapSize, position, hoveredState, mapStyle, defaultZoom } = useSelector(state => state.mapReducer);
  const conFilter = useSelector(state => state.conFilterReducer);
  const option = useSelector((state) => state.optionsReducer);
  const year = useSelector(state => state.yearReducer);
//Projection should always have an aspect ratio fo 1.67 for width to height
  let projection = geoAlbersUsa().translate([mapSize.width/2, mapSize.height/2]);

  function setMapDimensions(screenWidth, screenHeight, option){
    let mapHeight = screenHeight;
    let mapWidth = screenWidth;
    let adjustedWidth = screenWidth;
    let zoom = 1;
    if(!option.hideHistory){
      adjustedWidth -= 320
    };
    if(!option.hideLegend){
      adjustedWidth -= 192
    };
  
    if(fullscreen){
      mapWidth = Math.round(mapHeight * 1.67);
      if(mapWidth > screenWidth){
        mapWidth = screenWidth;
        mapHeight = Math.round(mapWidth /1.67);
      };
    }
    else{
      if(screenWidth >= 1024){
        const headerHeight = headerRef?.current?.getBoundingClientRect().height ?? 128;
        mapHeight -= headerHeight;
      }
      mapWidth = Math.round(mapHeight * 1.67);
      console.log(adjustedWidth, mapWidth, screenWidth)
      if(mapWidth >= adjustedWidth){
        mapWidth = adjustedWidth;
        mapHeight = Math.round(mapWidth /1.67);
      };
      
    };
      zoom = Math.round(((mapWidth / 835) + Number.EPSILON) * 100) / 100;
      console.log(mapWidth)
      return {mapHeight, mapWidth, zoom};
  };

  const { getSchools, conferenceChanges, getLegendConferences, getMapFill } = useMemo(() =>
    getConferences(conferenceData, year, option, conFilter),
    [year, option, conFilter]
  );

  useEffect(() => {
    let { updateStyling } = handleZoom(option, position.zoom, styling, logoSize, logoOffSet);

    dispatch(setLegend(getLegendConferences));
    dispatch(setChanges(conferenceChanges));
    dispatch(setLogo({ updateStyling }));
    dispatch(setMapInfo({map: "schools", value: getSchools}));
    dispatch(setMapInfo({map: "mapFill", value: getMapFill}));

  }, [year, option, showMobile, conFilter, position.zoom, fullscreen, hoveredState, getSchools, conferenceChanges, getLegendConferences, getMapFill]);

  useEffect(()=> {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    if(!fullscreen){
      let mapDim = setMapDimensions(windowWidth, windowHeight, option);
      projection = geoAlbersUsa().translate([mapDim.mapWidth/2, mapDim.mapHeight/2]);
      dispatch(setMapInfo({map: "mapSize", value: {width: mapDim.mapWidth, height: mapDim.mapHeight}}));
      dispatch(setMapInfo({map: "position", value: { coordinates: [-98.7, 38.77], zoom: mapDim.zoom }}));
      dispatch(setMapStyling({ position: 'relative', width: mapDim.mapWidth, height: mapDim.mapHeight,  borderWidth: '2px', borderStyle: 'solid', borderColor: 'white', borderRadius: '0.375rem' }));
      dispatch(setMapInfo({map: "defaultZoom", value: mapDim.zoom}));
    }
    else{
      let mapDim = setMapDimensions(window.innerWidth, window.innerHeight, option);
      projection = geoAlbersUsa().translate([mapDim.mapWidth/2, mapDim.mapHeight/2]);
      dispatch(setMapInfo({map: "mapSize", value: {width: mapDim.mapWidth, height: mapDim.mapHeight}}));
      dispatch(setMapInfo({map: "position", value: { coordinates: [-98.7, 38.77], zoom: mapDim.zoom }}));
      dispatch(setMapStyling({ position: 'relative', width: mapDim.mapWidth, height: mapDim.mapHeight }));
      dispatch(setMapInfo({map: "defaultZoom", value: mapDim.zoom}));
    };

    const handleResize = () => {
      if(!fullscreen){
        let mapDim = setMapDimensions(window.innerWidth, window.innerHeight, option);
        projection = geoAlbersUsa().translate([mapDim.mapWidth/2, mapDim.mapHeight/2]);
        dispatch(setMapInfo({map: "mapSize", value: {width: mapDim.mapWidth, height: mapDim.mapHeight}}));
        dispatch(setMapInfo({map: "position", value: { coordinates: [-98.7, 38.77], zoom: mapDim.zoom }}));
        dispatch(setMapStyling({ position: 'relative', width: mapDim.mapWidth, height: mapDim.mapHeight,  borderWidth: '2px', borderStyle: 'solid', borderColor: 'white', borderRadius: '0.375rem' }));
        dispatch(setMapInfo({map: "defaultZoom", value: mapDim.zoom}));
      }
      else{
        let mapDim = setMapDimensions(window.innerWidth, window.innerHeight, option);
        projection = geoAlbersUsa().translate([mapDim.mapWidth/2, mapDim.mapHeight/2]);
        dispatch(setMapInfo({map: "mapSize", value: {width: mapDim.mapWidth, height: mapDim.mapHeight}}));
        dispatch(setMapInfo({map: "position", value: { coordinates: [-98.7, 38.77], zoom: mapDim.zoom }}));
        dispatch(setMapStyling({ position: 'relative', width: mapDim.mapWidth, height: mapDim.mapHeight }));
        dispatch(setMapInfo({map: "defaultZoom", value: mapDim.zoom}));
      };

    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  function handleMoveEnd(position) {
    dispatch(setMapInfo({map: "position", value: position}));
  }

  const handleMouseMove = (event) => {
    const currentCenter = projection(position.coordinates);
    if(currentCenter){
      const box = wrapperRef.current.getBoundingClientRect();
      const { top, left } = box
      const resizeFactorX = 1 / mapSize.width * box.width
      const resizeFactorY = 1 / mapSize.height * box.height
  
      //Need to account for people panning on the map. Find the original center of the map and adjust for the new center of the map when people pan to a new center on the map
      const originalCenter = [ Number((mapSize.width / 2).toFixed(1)), Number((mapSize.height / 2).toFixed(1)) ];
      const centerOffsetX = currentCenter[0].toFixed(1) - originalCenter[0];
      const centerOffsetY = currentCenter[1].toFixed(1) - originalCenter[1];
  
      const clientX = (event.clientX - left) / resizeFactorX;
      const clientY = (event.clientY - top) / resizeFactorY;
      var xOffset = 0;
      var yOffset = 0;
      const center = projection.invert([ clientX + centerOffsetX, clientY + centerOffsetY]);
  
      if(center[0] < -156){
        xOffset = 1.25;
      }
      else if(center[0] < -130 && center[0] > -156){
        xOffset = -2.5;
        yOffset = 0.25;
      }
      else if(center[0] < -113 && center[0] > -122){
        xOffset = 1.25;
      }
      else if(center[0] > -113){
        xOffset = 1.5;
      };
  
      if(center[1] < 31 && center[1] > 29 && center[0] > -150){
        yOffset = 2;
      }
      else if(center[1] < 29 && center[0] > -150){
        yOffset = 4;
      };
      let long = center[0] + xOffset;
      let lat = center[1] + yOffset;
      dispatch(setMapInfo({map: "toolTipPos", value: { longitude: long, latitude: lat }}));

    }
  };

  const handleReset = () => {
    dispatch(setMapInfo({map: "position", value: { coordinates: [-96.6, 38.7], zoom: defaultZoom }}));
  };

  return (
    <div ref={wrapperRef} className='map' style={mapStyle}>
    <ComposableMap
     projection={projection}
     width={mapSize.width}
     height={mapSize.height}
    >
      <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
      >
        <States handleMouseMove={handleMouseMove}/>
        <SchoolLocation wrapper={wrapperRef}/>

        <Annotation
          subject={[-84, 50]}
          dx={0}
          dy={0}
        >
          <foreignObject width="150" height="35">
            <Autoplay />
          </foreignObject>
        </Annotation>
        <Annotation
          subject={[-130, 48]}
          dx={0}
          dy={0}
        >
          <foreignObject width="150" height="35">
          <p className='absolute top-1 left-1 sm:top-2 sm:left-2 lg:top-3 lg:left-3 text-white text-[12px] md:text-[14px] lg:text-[16px] font-semibold'>
            {year}
          </p>
          </foreignObject>
        </Annotation>
        {showMobile &&
          <Annotation
            subject={[-89, 28]}
            dx={0}
            dy={0}
          >
            <foreignObject width="150" height="35">
              <div className='text-white'>{year}</div>
            </foreignObject>
          </Annotation>
        }
      </ZoomableGroup>
    </ComposableMap>
    {!fullscreen && 
    <div>
      <div className='hidden lg:block absolute bottom-3 right-3'>
        <IconButton className="p-0 fullScreen" id="fullscreen" onClick={()=> dispatch(openFullscreen())}>
          <FullscreenIcon className="text-white text-[25px]" />
        </IconButton>
      </div>
      <div>
        <button className='absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-3 lg:right-3 text-black text-[10px] md:text-[12px] lg:text-[14px] font-semibold bg-white border border-white hover:bg-black hover:text-white hover:border-white p-[2px] md:p-[3px] lg:p-1 rounded-sm' onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
    }
      <SchoolInfo/>
      <StateInfo/>
    </div>
  );
};

export default MapChart;
