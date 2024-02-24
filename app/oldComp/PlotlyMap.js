import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import MapData from './data/plotly.json';
import conferenceData from './data/conferenceData.json';
import { getConferences } from '../functions/getConInfo';
import { mapFill } from '../oldFunc/mapFill';
import { schoolLocations } from './getSchoolLoc';

const PlotlyMap = ({ mapdata, currentYear, options, isYearVisible, setChangesList, setSchoolStates, setCurrentConferences, setActiveConferences, conList }) => {
  const [data, setdata] = useState([]);
  const [layout, setlayout] = useState({});
  const [config, setconfig] = useState({});

  const { getSchoolStates, getCurrentConferences, conferenceChanges } = getConferences(
    conferenceData,
    currentYear,
    options,
    conList
  );

  useEffect(() => {
    let { schoolLat, schoolLon, conColor } = schoolLocations(
      getCurrentConferences,
      currentYear,
    );
  
    setdata([
      {
        type: 'scattergeo',
        locationmode: 'USA-states',
        lon: schoolLon,
        lat: schoolLat,
        mode: 'markers',
        marker: {
          color: conColor,
          size: 8,
          opacity: 0.8,
          reversescale: true,
          autocolorscale: false,
          symbol: 'square',
          line: {
            width: 1
          },
        },
      },
    ]);

    setlayout({
      showlegend: false,
      geo: {
        scope: 'usa',
        projection: {
            type: 'albers usa'
        },
        bgcolor: "black",
        subunitcolor: 'rgb(217,217,217)',
        countrycolor: 'rgb(217,217,217)',
      },
      paper_bgcolor:'rgba(0,0,0,0)',
      margin: { l: 0, r: 0, t: 0, b: 0 },
    })

    setconfig({
      displaylogo: false,
      modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'orbitRotation', 'tableRotation','hoverClosestCartesian', 'hoverCompareCartesian','zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo',
      'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'toImage', 'toggleSpikelines']
    })

  }, [mapdata, currentYear, options, isYearVisible, conList])
  return <Plot className="w-full" data={data} layout={layout} config={config} />;
};

export default PlotlyMap;
