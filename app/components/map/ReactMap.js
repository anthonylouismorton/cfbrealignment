import React, { useEffect, useRef, useState } from 'react';
import States from './States';
import SchoolInfo from './schoolInfo';
import SchoolLocation from './SchoolLocation';
import conferenceData from '../../data/conferenceData.json';
import { getConferences } from '../../functions/ReactGetConf';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { IconButton } from '@mui/material';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { openFullscreen, closeFullscreen } from '../../../redux/features/layoutSlices';
import { setLegend, setChanges } from '@/redux/features/conInfoSlices';
import { setMapInfo, setLogo } from '@/redux/features/mapSlices';
import { handleZoom } from '../../functions/handleZoom';
import { useDispatch, useSelector } from 'react-redux';
import Autoplay from '../AutoPlay';
import { geoAlbersUsa } from 'd3-geo';
import {
  ComposableMap,
  Annotation,
  ZoomableGroup,
} from "react-simple-maps";

const MapChart = () => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const { fullscreen, showMobile } = useSelector((state)=> state.layoutReducer);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { styling, logoOffSet, logoSize, mapSize, position, toolTipPos, hoveredState } = useSelector(state => state.mapReducer);
  const conFilter = useSelector(state => state.conFilterReducer);
  const option = useSelector((state) => state.optionsReducer);
  const year = useSelector(state => state.yearReducer);
  const projection = geoAlbersUsa().translate([mapSize.width/2, mapSize.height/2]).scale(1000);

  useEffect(() => {
    if(!fullscreen){
      dispatch(setMapInfo({map: "mapSize", value: {width: 800, height: 500}}))
    }
    else{
      dispatch(setMapInfo({map: "mapSize", value: {width: 1150, height: 555}}))
    }

    const { getSchools, conferenceChanges, getLegendConferences, getMapFill } = getConferences(
      conferenceData,
      year,
      option,
      conFilter
    );
   
    let { updateStyling } = handleZoom(option, position.zoom, styling, logoOffSet, logoSize);
    dispatch(setLegend(getLegendConferences));
    dispatch(setChanges(conferenceChanges));
    dispatch(setLogo({ updateStyling }));
    dispatch(setMapInfo({map: "schools", value: getSchools}));
    dispatch(setMapInfo({map: "mapFill", value: getMapFill}));
    
  }, [year, option, showMobile, conFilter, position.zoom, fullscreen, hoveredState])

  function handleMoveEnd(position) {
    dispatch(setMapInfo({map: "position", value: position}));
  }

  const handleReset = () => {
    dispatch(setMapInfo({map: "position", value: { coordinates: [-96.6, 38.7], zoom: 1 }}));
  };

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

  
  const handleFullscreenButtonClick = () => {
    // Check if fullscreen is supported by the browser
    if (document.fullscreenEnabled) {
      // Request fullscreen mode
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(!isFullscreen);
      }).catch((error) => {
        console.error('Error entering fullscreen mode:', error);
      });
    } else {
      console.error('Fullscreen mode is not supported by the browser.');
    }
  };

  return (
    <div ref={wrapperRef} className='relative w-[100%] border-solid border-white border-[2px] rounded-sm'>
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
        {/* {hoveredState.stateInfo && toolTipPos.longitude && toolTipPos.latitude && (
          <Annotation
          subject={[toolTipPos.longitude, toolTipPos.latitude]}
          dx={0}
          dy={0}
          >
          {hoveredState.stateInfo.conferences.map((conference, index) => (
            <text
              key={index}
              y={(index + 1) * 15}
              fill="white"
              fontSize="12px"
              style={{ pointerEvents: 'none' }}
            >
              {conference.conference}
            </text>
          ))}
          </Annotation>
        )} */}
        <Annotation
          subject={[-84, 50]}
          dx={0}
          dy={0}
        >
          <foreignObject width="150" height="35">
            <Autoplay />
          </foreignObject>
        </Annotation>
      </ZoomableGroup>
    </ComposableMap>
    {!showMobile ? (
        !fullscreen ? (
          <div className='absolute bottom-2 right-2 lg:bottom-3 lg:right-3'>
            <IconButton className="p-0 fullScreen" id="fullscreen" onClick={()=> dispatch(openFullscreen())}>
              <FullscreenIcon className="text-white text-[15px] lg:text-[25px]" />
            </IconButton>
          </div>
        ) : ( // Fullscreen mode is active
          <div className='absolute bottom-2 right-2 lg:bottom-3 lg:right-3'>
            <IconButton className="p-0 absolute bottom-5 right-5 fullScreen" id="closefullscreen" onClick={()=> dispatch(closeFullscreen())}>
              <CloseFullscreenIcon className="text-white text-[15px] lg:text-[25px]" />
            </IconButton>
          </div>
        )
      ) : (
        !isFullscreen ? (
          <div className='absolute bottom-2 right-2 lg:bottom-3 lg:right-3'>
            <IconButton className="p-0 fullScreen" id="fullscreen" onClick={handleFullscreenButtonClick}>
              <FullscreenIcon className="text-white text-[15px] lg:text-[25px]" />
            </IconButton>
          </div>
        ) : (
          <div className='absolute bottom-2 right-2 lg:bottom-3 lg:right-3'>
            <IconButton className="p-0 absolute bottom-5 right-5 fullScreen" id="closefullscreen" onClick={handleFullscreenButtonClick}>
              <CloseFullscreenIcon className="text-white text-[15px] lg:text-[25px]" />
            </IconButton>
          </div>
        )
      )
    }

    <button className='absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-3 lg:right-3 text-black text-[8px] sm:text-[12px] lg:text-[14px] font-semibold bg-white border border-white hover:bg-black hover:text-white hover:border-white p-0.5 sm:p-1 rounded-sm' onClick={handleReset}>
      Reset
    </button>
      <SchoolInfo/>
    </div>
  );
};

export default MapChart;
