import React, { useEffect, useState } from 'react';
import conferenceData from './data/conferenceData.json';
import { getConferences } from './functions/ReactGetConf';
import { schoolLocations } from './functions/ReactMapSchoolLoc';
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

const MapChart = ({ mapdata, currentYear, options, isYearVisible, setChangesList, setSchoolStates, setCurrentConferences, setActiveConferences, conList }) => {
  const [schools, setschools] = useState([]);
  const [logosize, setlogosize] = useState(20);
  const [logooffset, setlogooffset] = useState(-10);
  const [position, setPosition] = useState({ coordinates: [-99, 38.758362677392945], zoom: 0.93});
  const [mapfill, setmapfill] = useState([]);
  const [statetooltip, setstatetooltip] = useState({ visible: false, content: '' });
  const [hoveredschool, sethoveredschool] = useState(null);

  useEffect(() => {


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
      console.log("in the else if")
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
    
    setCurrentConferences(getCurrentConferences);
    setSchoolStates(getSchools);
    setActiveConferences(getLegendConferences);
    setChangesList(conferenceChanges);
    setmapfill(getMapFill)
    setschools(getSchools)
    
  }, [mapdata, currentYear, options, isYearVisible, conList, position.zoom])

  function handleMoveEnd(position) {
    setPosition(position);
  }

  const handleReset = () => {
    setPosition({ coordinates: [-99, 38.758362677392945], zoom: 0.93 })
  };
  console.log(schools)
  return (
    <div className="map-container">
    <ComposableMap projection="geoAlbersUsa">
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
            if (!options.showLocation && stateInfo) {
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
          <Marker key={school.name} coordinates={school.coordinates} onMouseEnter={() => sethoveredschool(school)} onMouseLeave={() => sethoveredschool(null)}>
            {options.showLocation && options.showLogos === false &&
            <>
              <circle r={3} fill={school.color} />
               {hoveredschool === school && (
                  <foreignObject x={10} y={10} width="200" height="50">
                    <div
                      style={{
                        background: "black",
                        zIndex: 1000,
                        display: "inline-block", // Ensures the div size is based on content
                      }}
                    >
                      <p style={{ fontFamily: "system-ui", fontSize: "12px" ,color: "#DDD", margin: 0 }}>
                        {hoveredschool.name}
                      </p>
                      <p style={{ fontFamily: "system-ui", fontSize: "12px" ,color: "#DDD", margin: 0 }}>
                        {hoveredschool.schoolInfo.rejoined ? `Member since ${hoveredschool.schoolInfo.rejoined[0].year}` :  `Member since ${hoveredschool.schoolInfo.years[0]}`}
                      </p>
                    </div>
                  </foreignObject>
                )}
            </>
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
      </ZoomableGroup>
    </ComposableMap>
    <button onClick={handleReset} className="className='bg-white text-black text-[14px] rounded font-bold' reset-button">Reset</button>
    </div>
  );
};

export default MapChart;
