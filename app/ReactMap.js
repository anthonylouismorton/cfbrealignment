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


const MapChart = ({ mapdata, currentYear, options, isYearVisible, setChangesList, setSchoolStates, setCurrentConferences, setActiveConferences, conList }) => {
  const [schools, setschools] = useState([]);

  useEffect(() => {
    const { getSchoolStates, getCurrentConferences, conferenceChanges } = getConferences(
      conferenceData,
      currentYear,
      options,
      conList
    );

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
    
  }, [mapdata, currentYear, options, isYearVisible, conList])

  return (
    <div className="w-[86%]">
    <ComposableMap projection="geoAlbersUsa">
      <ZoomableGroup zoom={1}>
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
          <circle r={3} fill={school.color} />
          {/* <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text> */}
        </Marker>
      ))}
      </ZoomableGroup>
    </ComposableMap>
    </div>
  );
};

export default MapChart;
