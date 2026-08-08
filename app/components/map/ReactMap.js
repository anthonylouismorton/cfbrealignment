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
import { requestBrowserFullscreen } from '../../functions/handleFullscreen';
import { setLegend, setChanges } from '@/redux/features/conInfoSlices';
import { setMapInfo, setLogo, setMapStyling } from '@/redux/features/mapSlices';
import { handleZoom } from '../../functions/handleZoom';
import { useDispatch, useSelector } from 'react-redux';
import Autoplay from './AutoPlay';
import { geoAlbersUsa } from 'd3-geo';
import {
  ComposableMap,
  ZoomableGroup,
} from "react-simple-maps";

const MapChart = ({ headerRef, onOpenFullscreen }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const { fullscreen } = useSelector((state)=> state.layoutReducer);
  const { styling, logoOffSet, logoSize, mapSize, position, hoveredState, mapStyle, defaultZoom, toolTipPos } = useSelector(state => state.mapReducer);
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
    // History panel is only rendered at lg+ (>=1024px), Legend panel at sm+ (>=640px).
    // Only reserve their space when they're actually visible, otherwise mobile
    // screens end up with a negative adjustedWidth and the map fails to render.
    if(!option.hideHistory && screenWidth >= 1024){
      adjustedWidth -= 320
    };
    if(!option.hideLegend && screenWidth >= 640){
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
      if(mapWidth >= adjustedWidth){
        mapWidth = adjustedWidth;
        mapHeight = Math.round(mapWidth /1.67);
      };
      
    };
      // Safety floor: never let the map collapse to zero/negative dimensions
      mapWidth = Math.max(mapWidth, 200);
      mapHeight = Math.max(mapHeight, Math.round(mapWidth / 1.67));
      zoom = Math.round(((mapWidth / 835) + Number.EPSILON) * 100) / 100;
      return {mapHeight, mapWidth, zoom};
  };

  const { getSchools, conferenceChanges, getLegendConferences, getMapFill } = useMemo(() =>
    getConferences(conferenceData, year, option, conFilter),
    [year, option, conFilter]
  );

  useEffect(() => {
    let { updateStyling } = handleZoom(option, position.zoom, styling, logoSize, logoOffSet, mapSize.width);

    dispatch(setLegend(getLegendConferences));
    dispatch(setChanges(conferenceChanges));
    dispatch(setLogo({ updateStyling }));
    dispatch(setMapInfo({map: "schools", value: getSchools}));
    dispatch(setMapInfo({map: "mapFill", value: getMapFill}));

  }, [year, option, conFilter, position.zoom, fullscreen, hoveredState, getSchools, conferenceChanges, getLegendConferences, getMapFill, mapSize.width]);

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

  // Screen-space position for the state hover tooltip (rendered as plain
  // HTML below, not an SVG Annotation) -- deliberately NOT routed through
  // the map projection. An earlier version converted this to a geographic
  // point and back so it could use react-simple-maps' Annotation component,
  // but projection() can return null for points outside its valid domain
  // (it happened for real on the deployed build), which crashes Annotation's
  // internal array-destructure with no way to guard against it from here.
  // Plain cursor-relative coordinates can't have that failure mode.
  const handleMouseMove = (event) => {
    const box = wrapperRef.current.getBoundingClientRect();
    dispatch(setMapInfo({map: "toolTipPos", value: { x: event.clientX - box.left, y: event.clientY - box.top }}));
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
      </ZoomableGroup>
    </ComposableMap>
    <div className='absolute top-1 left-1 sm:top-2 sm:left-2 lg:top-3 lg:left-3 text-white text-[12px] md:text-[14px] lg:text-[16px] font-semibold'>
      {year}
    </div>
    {hoveredState?.stateInfo?.conferences && toolTipPos.x !== null && (
      <div
        className='absolute bg-black bg-opacity-75 py-1 px-2 rounded-sm'
        style={{ left: toolTipPos.x + 12, top: toolTipPos.y - 10, pointerEvents: 'none' }}
      >
        {hoveredState.stateInfo.conferences.map((conf, i) => (
          <p key={i} style={{ fontSize: '11px', margin: 0, color: conf.color }}>
            {conf.conference}
          </p>
        ))}
      </div>
    )}
    <div className='absolute bottom-1 left-1 sm:bottom-2 sm:left-2 lg:bottom-3 lg:left-3'>
      <Autoplay />
    </div>
    {!fullscreen &&
    <div>
      <div className='absolute bottom-1 right-1 sm:bottom-2 sm:right-2 lg:bottom-3 lg:right-3'>
        <IconButton
          className="p-[2px] md:p-[3px] lg:p-1 fullScreen"
          id="fullscreen"
          onClick={() => {
            if (onOpenFullscreen) {
              onOpenFullscreen();
            } else {
              dispatch(openFullscreen());
              requestBrowserFullscreen();
            }
          }}
        >
          <FullscreenIcon className="text-white text-[18px] sm:text-[20px] lg:text-[25px]" />
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
