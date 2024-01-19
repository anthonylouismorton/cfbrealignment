import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup
} from "react-simple-maps";
import MapData from './data/reactMapData.json'

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// const offsets = {
//   VT: [50, -8],
//   NH: [34, 2],
//   MA: [30, -1],
//   RI: [28, 2],
//   CT: [35, 10],
//   NJ: [34, 1],
//   DE: [33, 0],
//   MD: [47, 10],
//   DC: [49, 21]
// };

const MapChart = () => {
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
      </ZoomableGroup>
    </ComposableMap>
    </div>
  );
};

export default MapChart;
