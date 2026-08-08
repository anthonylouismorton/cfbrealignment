import React, { useMemo } from "react";
import { Geographies, Geography } from "react-simple-maps";
import MapData from '../../data/reactMapData.json';
import { useSelector, useDispatch } from "react-redux";
import { setMapInfo, setState } from "@/redux/features/mapSlices";
import { getGlowChanges } from '../../functions/getGlowChanges';

const sanitizeId = (str) => str.replace(/[^a-zA-Z0-9_-]/g, '_');

const States = ({ handleMouseMove }) => {
  const dispatch = useDispatch();
  const { mapFill } = useSelector(state => state.mapReducer);
  const option = useSelector((state) => state.optionsReducer);
  const { stateModal } = useSelector(state => state.mapReducer);
  const { conferenceChanges } = useSelector(state => state.conInfoReducer);
  const { glowByState } = useMemo(() => getGlowChanges(conferenceChanges), [conferenceChanges]);
  // Highlight the state fill only when the user is reading conferences off
  // state color alone -- if logos are on, the school marker rings instead.
  const showStateHighlight = !option.showLogos && !option.showLocation;

  // States with 2+ concurrent conferences get a diagonal-stripe pattern
  // instead of a blended color, so each conference stays identifiable.
  const stripePatterns = useMemo(() => {
    const patterns = new Map();
    mapFill.forEach((state) => {
      if (state.conferences.length > 1) {
        const key = state.conferences.map((c) => c.conference).sort().join('-');
        if (!patterns.has(key)) {
          patterns.set(key, state.conferences.map((c) => c.color));
        }
      }
    });
    return patterns;
  }, [mapFill]);

  const handleStateModal = (state, conferences) =>{
    dispatch(setState({modal: !stateModal, state: {name: state, ...conferences}}));
  };

  return(
    <>
      <defs>
        {[...stripePatterns.entries()].map(([key, colors]) => {
          const bandWidth = 10;
          return (
            <pattern
              key={key}
              id={`conf-stripe-${sanitizeId(key)}`}
              width={bandWidth * colors.length}
              height={10}
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              {colors.map((color, i) => (
                <rect key={i} x={i * bandWidth} y={0} width={bandWidth} height={10} fill={color} />
              ))}
            </pattern>
          );
        })}
      </defs>
      <Geographies geography={MapData}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const stateInfo = mapFill.find((state) => state.state === geo.id);
            let stateColor = stateInfo?.color || '#b4b4b4';
            if(option.showLocation){
              stateColor = '#b4b4b4'
            } else if (stateInfo && stateInfo.conferences.length > 1) {
              const key = stateInfo.conferences.map((c) => c.conference).sort().join('-');
              stateColor = `url(#conf-stripe-${sanitizeId(key)})`;
            }
            const isChanged = showStateHighlight && glowByState.has(geo.id);
            return (
              <Geography
                onMouseMove={stateInfo ? (event) => handleMouseMove(event) : null}
                onMouseEnter={() => {
                  if (!option.showLocation && stateInfo) {
                    dispatch(setMapInfo({map: "hoveredState", value: { stateInfo }}));
                  }
                }}
                onMouseLeave={() => {
                  dispatch(setMapInfo({map: "hoveredState", value: {stateInfo: null} }));
                  dispatch(setMapInfo({map: "toolTipPos", value: { x: null, y: null }}));
                }}
                onClick={() => !option.showLocation && stateInfo ? handleStateModal(geo.properties.name, stateInfo) : null}
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: stateColor,
                    transition: 'fill 0.3s ease-in-out',
                    outline: "none",
                    ...(isChanged && { animation: 'pulse-brighten 1.4s ease-out 1' })
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
    </>
  )
};

export default States;
