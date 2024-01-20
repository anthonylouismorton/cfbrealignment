import React, { useEffect, useState } from 'react';
import conferenceData from './data/conferenceData.json';
import { getConferences } from './functions/ReactGetConf';
import { mapFill } from './functions/reactMapFill';
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
  const [zoomLevel, setZoomLevel] = useState(1);
  const [center, setCenter] = useState([39.50, 98.35]);

  useEffect(() => {
    const { getSchoolStates, getCurrentConferences, conferenceChanges } = getConferences(
      conferenceData,
      currentYear,
      options,
      conList
    );
    if(options.smallLogos && zoomLevel === 1){
      setlogosize(10)
      setlogooffset(-5)
    }
    else if((!options.smallLogos && zoomLevel === 1)){
      setlogosize(20)
      setlogooffset(-10)
    }
    else if(!options.smallLogos && (zoomLevel > 1 && zoomLevel < 2)) {
      setlogosize(18)
      setlogooffset(-9)
    }
    else if(!options.smallLogos && (zoomLevel > 2 && zoomLevel < 3)) {
      setlogosize(16)
      setlogooffset(-8)
    }
    else if(!options.smallLogos && (zoomLevel > 3 && zoomLevel < 4)) {
      setlogosize(14)
      setlogooffset(-7)
    }
    else if(!options.smallLogos && (zoomLevel > 4 && zoomLevel < 5)) {
      setlogosize(12)
      setlogooffset(-6)
    }
    else if(!options.smallLogos && (zoomLevel > 5 && zoomLevel < 6)) {
      setlogosize(8)
      setlogooffset(-4)
    }
    else if(!options.smallLogos && (zoomLevel > 6 && zoomLevel < 7)) {
      setlogosize(6)
      setlogooffset(-3)
    }
    else if(!options.smallLogos && (zoomLevel > 7)) {
      setlogosize(4)
      setlogooffset(-2)
    }
    else if(options.smallLogos && (zoomLevel > 6 && zoomLevel < 7)) {
      setlogosize(6)
      setlogooffset(-3)
    }
    else if(options.smallLogos && (zoomLevel > 7)) {
      setlogosize(4)
      setlogooffset(-2)
    }
    
    setCurrentConferences(getCurrentConferences);
    setSchoolStates(getSchoolStates);

    const getLegendConferences = mapFill(
      getSchoolStates,
      currentYear,
      options.schoolName
    );
    setActiveConferences(getLegendConferences);
    setChangesList(conferenceChanges);

    let schoolList = schoolLocations(
      getCurrentConferences,
      currentYear,
    );

    setschools(schoolList)
    
  }, [mapdata, currentYear, options, isYearVisible, conList, zoomLevel])

  const handleMoveEnd = (event) => {
    // Get the new zoom level from the event
    const newZoomLevel = event.zoom;
    setZoomLevel(newZoomLevel);
  };
  const handleReset = () => {
    setZoom(1); // Reset zoom level
    setCenter([39.50, 98.35]); // Reset center coordinates
  };
  console.log(logooffset)
  return (
    <div className="map-container">
    <ComposableMap projection="geoAlbersUsa">
      <ZoomableGroup zoom={1} onMoveEnd={handleMoveEnd}>
        <Geographies geography={MapData}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill="#DDD"
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))}
            </>
          )}
        </Geographies>
        {schools && schools.map(school => (
          <Marker key={school.name} coordinates={school.coordinates}>
            {options.showLocation &&
              <circle r={3} fill={school.color} />
            }
            {options.showLogos &&
             <image
                  href={school.logo}
                  width={logosize}
                  height={logosize}
                  // Additional attributes for positioning and styling
                  x={logooffset}
                  y={logooffset}
                  // You can add other attributes like opacity, rotation, etc.
                />
            }
          </Marker>
      ))}
      </ZoomableGroup>
    </ComposableMap>
    <button onClick={handleReset} className="reset-button">Reset</button>
    </div>
  );
};

export default MapChart;
