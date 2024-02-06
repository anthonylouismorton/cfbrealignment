import React, { useEffect, useState } from 'react';
import SchoolInfo from './schoolInfo';
import conferenceData from './data/conferenceData.json';
import { getConferences } from './functions/ReactGetConf';
import { schoolLocations } from './functions/ReactMapSchoolLoc';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { IconButton } from '@mui/material';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup
} from "react-simple-maps";
import MapData from './data/reactMapData.json'
import '../styles.css'
import * as d3 from 'd3';

const MapChart = ({ mapdata, currentYear, options, isYearVisible, setChangesList, setSchoolStates, setCurrentConferences, setActiveConferences, conList, fullscreen, setfullscreen }) => {
  const [schools, setschools] = useState([]);
  const [logosize, setlogosize] = useState(20);
  const [logooffset, setlogooffset] = useState(-10);
  const [position, setPosition] = useState({ coordinates: [-96.5, 38.758362677392945], zoom: 0.93});
  const [mapfill, setmapfill] = useState([]);
  const [hoveredschool, sethoveredschool] = useState(null);
  const [selectedschool, setselectedschool] = useState(null);
  const [schoolmodal, setschoolmodal] = useState(false);
  const [mapsize, setmapsize] = useState([800,500]);

  const [styling, setstyling] = useState({
    circleRadius: 3,
    forO: { x: 10, y: -5, fontSize: "12px", padding: "py-[2px] px-[5px]", rounded: "rounded-sm"},
  });

  useEffect(() => {
    if(!fullscreen){
      setmapsize([800,500])
    }
    else{
      setmapsize([1150,555])
    }

    const { getSchools, getCurrentConferences, conferenceChanges, getLegendConferences, getMapFill } = getConferences(
      conferenceData,
      currentYear,
      options,
      conList
    );
   
    if(options.smallLogos && position.zoom >= 1){
      setlogosize(10)
      setlogooffset(-5)
    }
    else if((!options.smallLogos && position.zoom >= 1 && position.zoom < 2)){
      setlogosize(20)
      setlogooffset(-10)
    }
    else if(!options.smallLogos && (position.zoom > 1 && position.zoom < 2)) {
      setlogosize(18)
      setlogooffset(-9)
    }
    else if(!options.smallLogos && (position.zoom > 2 && position.zoom < 3)) {
      setlogosize(16)
      setlogooffset(-8)
    }
    else if(!options.smallLogos && (position.zoom > 3 && position.zoom < 4)) {
      setlogosize(14)
      setlogooffset(-7)
    }
    else if(!options.smallLogos && (position.zoom > 4 && position.zoom < 5)) {
      setlogosize(12)
      setlogooffset(-6)
    }
    else if(!options.smallLogos && (position.zoom > 5 && position.zoom < 6)) {
      setlogosize(8)
      setlogooffset(-4)
    }
    else if(!options.smallLogos && (position.zoom > 6 && position.zoom < 7)) {
      setlogosize(6)
      setlogooffset(-3)
    }
    else if(!options.smallLogos && (position.zoom > 7)) {
      setlogosize(4)
      setlogooffset(-2)
    }
    else if(options.smallLogos && (position.zoom > 6 && position.zoom < 7)) {
      setlogosize(6)
      setlogooffset(-3)
    }
    else if(options.smallLogos && (position.zoom > 7)) {
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
    
    setCurrentConferences(getCurrentConferences);
    setSchoolStates(getSchools);
    setActiveConferences(getLegendConferences);
    setChangesList(conferenceChanges);
    setmapfill(getMapFill)
    setschools(getSchools)
    
  }, [mapdata, currentYear, options, isYearVisible, conList, position.zoom, fullscreen])

  function handleMoveEnd(position) {
    setPosition(position);
  }

  const handleReset = () => {
    setPosition({ coordinates: [-96.5, 38.758362677392945], zoom: 0.93 })
  };

  const handleSchoolModal = (school) =>{
    setschoolmodal(true)
    setselectedschool(school)
  }
  console.log(fullscreen, mapsize)
  return (
    <div className="relative w-[100%]">
    <ComposableMap
     projection="geoAlbersUsa"
     width={mapsize[0]}
     height={mapsize[1]}
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
            let stateColor = '#DDD';
            if(!options.showLocation && stateInfo){
              stateColor =
                stateInfo.conferences.length === 1
                  ? stateInfo.conferences[0].color
                  : stateInfo.conferences.length === 2
                  ? d3.scaleLinear().domain([0, 1]).range([stateInfo.conferences[0].color, stateInfo.conferences[1].color])(0.5)
                  : stateInfo.conferences.length === 3
                  ? d3.scaleLinear().domain([0, 1, 2]).range([stateInfo.conferences[0].color, stateInfo.conferences[1].color, stateInfo.conferences[2].color])(0.33)
                  : stateInfo.conferences.length === 4
                  ? d3.scaleLinear().domain([0, 1, 2, 3]).range([stateInfo.conferences[0].color, stateInfo.conferences[1].color, stateInfo.conferences[2].color, stateInfo.conferences[3].color])(0.25)
                  : stateInfo.conferences.length === 5
                  ? d3.scaleLinear().domain([0, 1, 2, 3, 4]).range([stateInfo.conferences[0].color, stateInfo.conferences[1].color, stateInfo.conferences[2].color, stateInfo.conferences[3].color, stateInfo.conferences[4].color])(0.2)
                  : stateInfo.conferences.length === 6
                  ? d3.scaleLinear().domain([0, 1, 2, 3, 4, 5]).range([stateInfo.conferences[0].color, stateInfo.conferences[1].color, stateInfo.conferences[2].color, stateInfo.conferences[3].color, stateInfo.conferences[4].color, stateInfo.conferences[5].color])(0.5)
                  : '#DDD';
            }
            return (
              <Geography
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
            onMouseLeave={() => sethoveredschool(null)}

          >
            {options.showLocation && options.showLogos === false &&
              <circle r={styling.circleRadius} fill={school.color} />
            }
            {options.showLogos &&
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
              {(hoveredschool.name === "University of Iowa" && (currentYear === 1907 || currentYear === 1908)) ? (
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

      </ZoomableGroup>
    </ComposableMap>
      {!fullscreen ?
        <IconButton className="p-0 absolute bottom-2 right-2 lg:bottom-3 lg:right-3 fullScreen" id="fullscreen" onClick={()=>setfullscreen(true)}>
          <FullscreenIcon className="text-white text-[15px] lg:text-[25px]" />
        </IconButton>
        :
        <IconButton className="p-0 absolute bottom-5 right-5 fullScreen" id="closefullscreen" onClick={()=>setfullscreen(false)}>
          <CloseFullscreenIcon className="text-white text-[15px] lg:text-[25px] xl:text-[35px] 2xl:text-[35px]" />
        </IconButton>
      }
    <button className='absolute top-2 right-2 lg:top-3 lg:right-3 text-black text-[9px] sm:text-[12px] lg:text-[14px] font-semibold bg-white border border-white hover:bg-black hover:text-white hover:border-white p-1 rounded-sm' onClick={handleReset}>
      Reset
    </button>
    {selectedschool &&
      <SchoolInfo schoolmodal={schoolmodal} setschoolmodal={setschoolmodal} selectedschool={selectedschool} setselectedschool={setselectedschool} currentYear={currentYear}
      />
    }
    </div>
  );
};

export default MapChart;
