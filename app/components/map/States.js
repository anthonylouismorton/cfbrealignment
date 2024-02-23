import React from "react";
import { Geographies, Geography } from "react-simple-maps";
import MapData from '../../data/reactMapData.json';
import { useSelector, useDispatch } from "react-redux";
import { setMapInfo, setState } from "@/redux/features/mapSlices";

const States = ({ handleMouseMove }) => {
  const dispatch = useDispatch();
  const { mapFill, toolTipPos } = useSelector(state => state.mapReducer);
  const option = useSelector((state) => state.optionsReducer);
  const { stateModal } = useSelector(state => state.mapReducer);
  const handleStateModal = (state, conferences) =>{
    dispatch(setState({modal: !stateModal, state: {state, conferences}}));
  };
  
  return(
    <Geographies geography={MapData}>
      {({ geographies }) =>
        geographies.map((geo) => {
          const stateInfo = mapFill.find((state) => state.state === geo.id);
          let stateColor = stateInfo?.color || '#b4b4b4';
          return (
            <Geography
              onMouseMove={stateInfo ? (event) => handleMouseMove(event, geo) : null}
              onMouseEnter={() => {
                if (!option.showLocation && stateInfo) {
                  dispatch(setMapInfo({map: "hoveredState", value: { stateInfo }}));
                }
              }}
              onMouseLeave={() => {
                dispatch(setMapInfo({map: "hoveredState", value: {stateInfo: null} }));
                dispatch(setMapInfo({map: "toolTipPos", value: {...toolTipPos, longitude: null, latitude: null}}));
              }}
              onClick={() => handleStateModal(geo.properties.name, stateInfo)}
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
  )
};

export default States;