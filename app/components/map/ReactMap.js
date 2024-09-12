import React, { useEffect, useRef } from 'react';
import States from './States';
import SchoolInfo from './schoolInfo';
import StateInfo from './StateInfo';
import SchoolLocation from './SchoolLocation';
import conferenceData from '../../data/updatedConferenceData.json';
import { getConferences } from '../../functions/getConInfo';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { IconButton } from '@mui/material';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { openFullscreen, closeFullscreen } from '../../../redux/features/layoutSlices';
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


const MapChart = () => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const { fullscreen, showMobile } = useSelector((state)=> state.layoutReducer);
  const { styling, logoOffSet, logoSize, mapSize, position, hoveredState, mapStyle } = useSelector(state => state.mapReducer);
  const conFilter = useSelector(state => state.conFilterReducer);
  const option = useSelector((state) => state.optionsReducer);
  const year = useSelector(state => state.yearReducer);
  const projection = geoAlbersUsa().translate([mapSize.width/2, mapSize.height/2]).scale(1000);

  useEffect(() => {

    if(!fullscreen){
      dispatch(setMapInfo({map: "mapSize", value: {width: 800, height: 500}}));
    }
    else{
      dispatch(setMapInfo({map: "mapSize", value: {width: 1150, height: 555}}));
    };

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

    if(fullscreen){
      dispatch(setMapStyling({ position: 'relative', width: '100%' }))
    }
    else{
      dispatch(setMapStyling({ position: 'relative', width: '98%', borderWidth: '2px', borderStyle: 'solid', borderColor: 'white', borderRadius: '0.375rem' }))
    }
    
  }, [year, option, showMobile, conFilter, position.zoom, fullscreen, hoveredState, fullscreen])

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
    {!fullscreen ? (
      <div className='hidden lg:block absolute bottom-3 right-3'>
        <IconButton className="p-0 fullScreen" id="fullscreen" onClick={()=> dispatch(openFullscreen())}>
          <FullscreenIcon className="text-white text-[25px]" />
        </IconButton>
      </div>
    ) : (
      <div className='hidden lg:block absolute bottom-3 lg:right-3'>
        <IconButton className="p-0 absolute bottom-5 right-5 fullScreen" id="closefullscreen" onClick={()=> dispatch(closeFullscreen())}>
          <CloseFullscreenIcon className="text-white text-[25px]" />
        </IconButton>
      </div>
    )}

    <button className='absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-3 lg:right-3 text-black text-[10px] md:text-[12px] lg:text-[14px] font-semibold bg-white border border-white hover:bg-black hover:text-white hover:border-white p-[2px] md:p-[3px] lg:p-1 rounded-sm' onClick={handleReset}>
      Reset
    </button>
    <p className='absolute top-1 left-1 sm:top-2 sm:left-2 lg:top-3 lg:left-3 text-white text-[10px] md:text-[12px] lg:text-[14px] font-semibold'>
      Year: {year}
    </p>
      <SchoolInfo/>
      <StateInfo/>
    </div>
  );
};

export default MapChart;
