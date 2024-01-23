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


const MapChart = ({ mapdata, currentYear, options, isYearVisible, setChangesList, setSchoolStates, setCurrentConferences, setActiveConferences, conList }) => {
  const [schools, setschools] = useState([]);
  const [logosize, setlogosize] = useState(20);
  const [logooffset, setlogooffset] = useState(-10);
  const [center, setCenter] = useState([0,0]);
  const [position, setPosition] = useState({ coordinates: [-99, 38.758362677392945], zoom: 0.93});
  const [mapfill, setmapfill] = useState([])

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
    setmapfill(getMapFill);

    // let schoolList = schoolLocations(
    //   getCurrentConferences,
    //   currentYear,
    // );

    setschools(getSchools)
    
  }, [mapdata, currentYear, options, isYearVisible, conList, position.zoom])

  function handleMoveEnd(position) {
    console.log(position)
    setPosition(position);
  }

  const handleReset = () => {
    setPosition({ coordinates: [-99, 38.758362677392945], zoom: 0.93 })
  };
  console.log(mapfill)
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
            const stateColor = stateInfo
              ? stateInfo.conferences.length === 1
                ? stateInfo.conferences[0].color
                : `linear-gradient(to right, ${stateInfo.conferences.map((conf) => conf.color).join(', ')})`
              : '#DDD';

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: stateColor,
                  },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
        </Geographies>
        {schools && schools.map(school => (
          <Marker key={school.name} coordinates={school.coordinates}>
            {options.showLocation && options.showLogos === false &&
              <circle r={3} fill={school.color} />
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
    <button onClick={handleReset} className="className='bg-white text-black text-[16px] rounded p-2 font-bold' reset-button">Reset</button>
    </div>
  );
};

export default MapChart;
