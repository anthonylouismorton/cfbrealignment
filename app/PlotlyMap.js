import React from 'react';
import Plot from 'react-plotly.js';

const PlotlyMap = () => {
  // Your plotly map configuration goes here
  const data = [
    // {
    //   type:'scattergeo',
    //   locationmode: 'USA-states',
    //   lon: [10, 20, 30],
    //   lat: [20, 30, 40],
    //   text: ['A', 'B', 'C'],
    //   mode: 'markers',
    // },
    {type: "scattermapbox", lon: [-86], lat: [34], marker: {size: 20, color: 'purple'}},
    {
      type: "choroplethmapbox",locations: ["AL"], z: [10], coloraxis: "coloraxis", geojson: {type: "Feature", id: "AL", geometry: {type: "Polygon", coordinates: [[
      [-86, 35], [-85, 34], [-85, 32], [-85, 32], [-85, 32], [-85, 32], [-85, 31],
      [-86, 31], [-87, 31], [-87, 31], [-88, 30], [-88, 30], [-88, 30], [-88, 30],
      [-88, 34], [-88, 35]]]
     }}}
  ];

  const layout = {
    showlegend: false,
    geo: {
      scope: 'usa',
      projection: {
          type: 'albers usa'
      },
      showland: true,
      landcolor: 'rgb(250,250,250)',
      subunitcolor: 'rgb(217,217,217)',
      countrycolor: 'rgb(217,217,217)',
      countrywidth: 0.5,
      subunitwidth: 0.5
    },
    locations: {
      'California': 'red', // Set California to red
      // Add more entries for other states if needed
    }
  }

  const config = {
    displaylogo: false,
    modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d',
    'zoom3d', 'pan3d', 'orbitRotation', 'tableRotation', 'handleDrag3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d','hoverClosestCartesian', 'hoverCompareCartesian','zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo',
    'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toImage', 'sendDataToCloud', 'toggleSpikelines', 'resetViewMapbox']
  }

  return <Plot data={data} layout={layout} config={config} />;
};

export default PlotlyMap;
