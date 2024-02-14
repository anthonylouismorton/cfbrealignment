import React, { useEffect, useState, useRef } from 'react';
import SchoolInfo from './schoolInfo';
import conferenceData from '../data/conferenceData.json';
import { getConferences } from '../functions/ReactGetConf';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { IconButton } from '@mui/material';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { openFullscreen, closeFullscreen } from '../../redux/features/layoutSlices';
import { setLegend, setChanges } from '@/redux/features/conInfoSlices';
import { useDispatch, useSelector } from 'react-redux';
import Autoplay from './AutoPlay';
import { geoAlbersUsa, geoPath } from 'd3-geo';

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
} from "react-simple-maps";
import MapData from '../data/reactMapData.json';

const MapChart = () => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const { fullscreen, isYearVis } = useSelector((state)=> state.layoutReducer);
  const conFilter = useSelector(state => state.conFilterReducer);
  const option = useSelector((state) => state.optionsReducer);
  const year = useSelector(state => state.yearReducer);
  const [schools, setschools] = useState([]);
  const [logosize, setlogosize] = useState(20);
  const [logooffset, setlogooffset] = useState(-10);
  const [position, setPosition] = useState({ coordinates: [-96.5, 38.758362677392945], zoom: 0.93});
  const [mapfill, setmapfill] = useState([]);
  const [hoveredschool, sethoveredschool] = useState(null);
  const [hoveredstate, sethoveredstate] = useState(null);
  const [selectedschool, setselectedschool] = useState(null);
  const [schoolmodal, setschoolmodal] = useState(false);
  const [mapsize, setmapsize] = useState({width: 800, height: 500});
  const projection = geoAlbersUsa().translate([mapsize.width/2, mapsize.height/2]).scale(1000);
  const [toolTipPos, settoolTipPos] = useState({longitude: null, latitude: null, longOffSet: 0, latOffSet: 0});
  const [styling, setstyling] = useState({
    circleRadius: 3,
    forO: { x: 10, y: -5, fontSize: "12px", padding: "py-[2px] px-[5px]", rounded: "rounded-sm"},
  });

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
   
    if(option.smallLogos && position.zoom >= 1){
      setlogosize(10)
      setlogooffset(-5)
    }
    else if((!option.smallLogos && position.zoom >= 1 && position.zoom < 2)){
      setlogosize(20)
      setlogooffset(-10)
    }
    else if(!option.smallLogos && (position.zoom > 1 && position.zoom < 2)) {
      setlogosize(18)
      setlogooffset(-9)
    }
    else if(!option.smallLogos && (position.zoom > 2 && position.zoom < 3)) {
      setlogosize(16)
      setlogooffset(-8)
    }
    else if(!option.smallLogos && (position.zoom > 3 && position.zoom < 4)) {
      setlogosize(14)
      setlogooffset(-7)
    }
    else if(!option.smallLogos && (position.zoom > 4 && position.zoom < 5)) {
      setlogosize(12)
      setlogooffset(-6)
    }
    else if(!option.smallLogos && (position.zoom > 5 && position.zoom < 6)) {
      setlogosize(8)
      setlogooffset(-4)
    }
    else if(!option.smallLogos && (position.zoom > 6 && position.zoom < 7)) {
      setlogosize(6)
      setlogooffset(-3)
    }
    else if(!option.smallLogos && (position.zoom > 7)) {
      setlogosize(4)
      setlogooffset(-2)
    }
    else if(option.smallLogos && (position.zoom > 6 && position.zoom < 7)) {
      setlogosize(6)
      setlogooffset(-3)
    }
    else if(option.smallLogos && (position.zoom > 7)) {
      setlogosize(4)
      setlogooffset(-2)
    }
    if (position.zoom > 2 && position.zoom < 4) {
      setstyling(prevStyling => ({...prevStyling, circleRadius: 2,
        forO: {...prevStyling.forO, x: 7, y: -2, fontSize: "8px", padding: "py-[2px] px-[5px]"
      }}))
    }
    else if(position.zoom > 4){
      setstyling(prevStyling => ({...prevStyling, circleRadius: 1,
        forO: {...prevStyling.forO,x: 2, y: -13, fontSize: "2px", padding: "py-[1px] px-[2px]", rounded: "rounded-[1px]"
      }}))
    }
    else {
      setstyling(prevStyling => ({...prevStyling, circleRadius: 3,
        forO: {...prevStyling.forO,x: 10, y: -5, fontSize: "12px", padding: "py-[2px] px-[5px]"
      }}))
    
    }
    dispatch(setLegend(getLegendConferences));
    dispatch(setChanges(conferenceChanges));
    setmapfill(getMapFill);
    setschools(getSchools);
    
  }, [year, option, isYearVis, conFilter, position.zoom, fullscreen])

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
    console.log(box);
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

    const center = projection.invert([x,y])
    console.log(center)
    // const cx = event.clientX - dim.left;
    // const cy = event.clientY - dim.top;
    // const [orgX, orgY] = gp.bounds(geo)[0];
    // const [x, y] = projection.invert([orgX + cx, orgY + cy]);
    settoolTipPos({ longitude: center[0], latitude: center[1] });
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
              let stateColor = stateInfo?.color || '#DDD';
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
                      ...(stateColor !== '#DDD' && { opacity: 0.7 }),
                      outline: "none",
                      cursor: stateColor !== '#DDD' ? "pointer" : "default"
                    },                    
                    pressed: { outline: "none", fill: stateColor },
                  }}
                />  
              );
            })
          } 
        </Geographies>
        {schools && schools.map(school => (
          <Marker 
            className='cursor-pointer'
            key={school.name}
            coordinates={school.coordinates} 
            onClick={()=> handleSchoolModal(school)} 
            onMouseEnter={() => sethoveredschool(school)} 
            onMouseLeave={()=> sethoveredschool(null)}

          >
            {option.showLocation && option.showLogos === false &&
              <circle r={styling.circleRadius} fill={school.color} />
            }
            {option.showLogos &&
             <image
                href={school.logo}
                width={logosize}
                height={logosize}
                x={logooffset}
                y={logooffset}
              />
            }
          </Marker>
        ))}
        {hoveredschool && (
          <Annotation
            subject={hoveredschool.coordinates}
            dx={0}
            dy={0}
          >
            <foreignObject x={styling.forO.x} y={styling.forO.y} width="500" height="100">
            <div className={`bg-black z-10 bg-opacity-75 inline-block ${styling.forO.padding} ${styling.forO.rounded}`}>
              <p style={{ fontSize: styling.forO.fontSize, color: "#DDD", margin: 0 }}>
                {hoveredschool.name}
              </p>
              {(hoveredschool.name === "University of Iowa" && (year === 1907 || year === 1908)) ? (
                <>
                  <p style={{ fontSize: styling.forO.fontSize, color: "#DDD", margin: 0 }}>Big 8 Member Since: 1900</p>
                  <p style={{ fontSize: styling.forO.fontSize, color: "#DDD", margin: 0 }}>Big Ten Member since: 1907</p>
                </>
              ) : (
                <p style={{ fontSize: styling.forO.fontSize, color: "#DDD", margin: 0 }}>
                  {hoveredschool.schoolInfo.rejoined ? `Member since: ${hoveredschool.schoolInfo.rejoined[0].year}` : `Member since: ${hoveredschool.schoolInfo.years[0]}`}
                </p>
              )}
            </div>
            </foreignObject>
          </Annotation>
        )}
        {hoveredstate && toolTipPos && hoveredstate.stateInfo && toolTipPos.longitude && (
          <Annotation
            subject={[toolTipPos.longitude, toolTipPos.latitude]}
            dx={0}
            dy={0}
          >
            <foreignObject width="75" height="100">
              <div className={`bg-black z-10 bg-opacity-75 inline-block py-1 px-1 rounded-sm`}>
                {hoveredstate && hoveredstate.stateInfo.conferences.map((conference, index) =>
                  <p key={index} style={{ fontSize: styling.forO.fontSize, color: "#DDD", margin: 0 }}>
                    {conference.conference}
                  </p>
                )}
              </div>
            </foreignObject>
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
        <IconButton className="p-0 absolute bottom-2 right-2 lg:bottom-3 lg:right-3 fullScreen" id="fullscreen" onClick={()=> dispatch(openFullscreen())}>
          <FullscreenIcon className="text-white text-[15px] lg:text-[25px]" />
        </IconButton>
        :
        <IconButton className="p-0 absolute bottom-5 right-5 fullScreen" id="closefullscreen" onClick={()=> dispatch(closeFullscreen())}>
          <CloseFullscreenIcon className="text-white text-[15px] lg:text-[25px]" />
        </IconButton>
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
