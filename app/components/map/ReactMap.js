import React, { useEffect, useState, useRef } from 'react';
import SchoolInfo from '../schoolInfo';
import SchoolLocations from './schoolLocations';
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
  Geographies,
  Geography,
  Annotation,
  ZoomableGroup,
} from "react-simple-maps";
import MapData from '../../data/reactMapData.json';

const MapChart = () => {
  // const { hoveredSchool } = useSelector(state => state.mapReducer);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const { fullscreen, isYearVis } = useSelector((state)=> state.layoutReducer);
  const conFilter = useSelector(state => state.conFilterReducer);
  const option = useSelector((state) => state.optionsReducer);
  const year = useSelector(state => state.yearReducer);
  // const [logosize, setlogosize] = useState(20);
  // const [logooffset, setlogooffset] = useState(-10);
  const [position, setPosition] = useState({ coordinates: [-96.5, 38.758362677392945], zoom: 1});
  const [mapfill, setmapfill] = useState([]);
  const [hoveredstate, sethoveredstate] = useState(null);
  const [selectedschool, setselectedschool] = useState(null);
  const [schoolmodal, setschoolmodal] = useState(false);
  const [mapsize, setmapsize] = useState({width: 800, height: 500});
  const projection = geoAlbersUsa().translate([mapsize.width/2, mapsize.height/2]).scale(1000);
  const [toolTipPos, settoolTipPos] = useState({longitude: null, latitude: null, longOffSet: 0, latOffSet: 0});
  // const [styling, setstyling] = useState({
  //   circleRadius: 3,
  //   logoSize: 20,
  //   logoOffset: -10,
  //   forO: { x: 10, y: -5, fontSize: "12px", padding: "py-[2px] px-[5px]", rounded: "rounded-sm"},
  // });
  useEffect(() => {
    if(!fullscreen){
      setmapsize({width: 800, height: 500})
    }
    else{
      setmapsize({width: 1150, height: 555})
    }

    const { getSchools, conferenceChanges, getLegendConferences, getMapFill } = getConferences(
      conferenceData,
      year,
      option,
      conFilter
    );
   
    let { updateStyling } = handleZoom(option, position.zoom);
    console.log(updateStyling)
    dispatch(setLegend(getLegendConferences));
    dispatch(setChanges(conferenceChanges));
    dispatch(setLogo({ updateStyling }));
    dispatch(setMapInfo({map: "schools", value: getSchools}));
    setmapfill(getMapFill);
    
  }, [year, option, isYearVis, conFilter, position.zoom, fullscreen, hoveredstate])

  function handleMoveEnd(position) {
    setPosition(position);
  }

  const handleReset = () => {
    setPosition({ coordinates: [-96.5, 38.758362677392945], zoom: 1 })
  };

  const handleSchoolModal = (school) =>{
    setschoolmodal(true);
    setselectedschool(school);
  };

  const handleMouseMove = (event) => {

    const box = wrapperRef.current.getBoundingClientRect();
    const width = mapsize.width
    const height = mapsize.height
    const { top, left } = box
    const resizeFactorX = 1 / width * box.width
    const resizeFactorY = 1 / height * box.height

    // const originalCenter = [mapsize.width/2, mapsize.height/2]
    // const prevCenter = projection(position.coordinates)

    // const offsetX = prevCenter[0] - originalCenter[0]
    // const offsetY = prevCenter[1] - originalCenter[1]
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
    settoolTipPos({ longitude: center[0] + xOffset, latitude: center[1] + yOffset });
  };
  return (
    <div ref={wrapperRef} onMouseMove={handleMouseMove} className='relative w-[100%]'>
    <ComposableMap
     projection={projection}
     width={mapsize.width}
     height={mapsize.height}
    >
      <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
      >
        <Geographies geography={MapData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateInfo = mapfill.find((state) => state.state === geo.id);
              let stateColor = stateInfo?.color || '#b4b4b4';
              return (
                <Geography
                  onMouseMove={() => handleMouseMove(event, geo)}
                  onMouseEnter={() => {
                    if (!option.showLocation) {
                      sethoveredstate({ stateInfo });
                    }
                  }}
                  onMouseLeave={() => {
                    sethoveredstate(null)
                    settoolTipPos({...toolTipPos, longitude: null, latitude: null})
                  }}
                  title={"hello"}
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: stateColor,
                      transition: 'fill 0.3s ease-in-out',
                      outline: "none"
                    },
                    hover: {
                      fill: stateColor,
                      ...(stateColor !== '#b4b4b4' && { opacity: 0.7 }),
                      outline: "none",
                      cursor: stateColor !== '#b4b4b4' ? "pointer" : "default"
                    },                    
                    pressed: { outline: "none", fill: stateColor },
                  }}
                />  
              );
            })
          } 
        </Geographies>
        <SchoolLocations/>
        {hoveredstate && toolTipPos && hoveredstate.stateInfo && toolTipPos.longitude && (
          <Annotation
            subject={[toolTipPos.longitude, toolTipPos.latitude]}
            dx={0}
            dy={0}
          >
          {hoveredstate.stateInfo.conferences.map((conference, index) => (
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
        )}
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
      {!fullscreen ?
        <div className='absolute bottom-2 right-2 lg:bottom-3 lg:right-3'>
          <IconButton className="p-0 fullScreen" id="fullscreen" onClick={()=> dispatch(openFullscreen())}>
            <FullscreenIcon className="text-white text-[15px] lg:text-[25px]" />
          </IconButton>
        </div>
        :
        <div className='absolute bottom-2 right-2 lg:bottom-3 lg:right-3'>
          <IconButton className="p-0 absolute bottom-5 right-5 fullScreen" id="closefullscreen" onClick={()=> dispatch(closeFullscreen())}>
            <CloseFullscreenIcon className="text-white text-[15px] lg:text-[25px]" />
          </IconButton>
        </div>
      }
    <button className='absolute top-2 right-2 lg:top-3 lg:right-3 text-black text-[9px] sm:text-[12px] lg:text-[14px] font-semibold bg-white border border-white hover:bg-black hover:text-white hover:border-white p-1 rounded-sm' onClick={handleReset}>
      Reset
    </button>
    {selectedschool &&
      <SchoolInfo schoolmodal={schoolmodal} setschoolmodal={setschoolmodal} selectedschool={selectedschool} setselectedschool={setselectedschool} year={year}
      />
    }
    </div>
  );
};

export default MapChart;
