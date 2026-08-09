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

  // States with concurrent conferences get one of three treatments depending
  // on how many are stacked: 2 -> a thin diagonal split, 3-4 -> a diagonal
  // stripe (one band per conference), 5+ -> a checkerboard, since that many
  // stripes side by side stops reading as distinct bands.
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
          const n = colors.length;
          if (n <= 4) {
            // n=2: a thin split. n=3-4: a stripe per conference, narrower bands.
            // 3 and 4 also run opposite diagonals so they're distinguishable at a glance,
            // not just by stripe count.
            const band = n === 2 ? 16 : 12;
            const angle = n === 4 ? -45 : 45;
            return (
              <pattern
                key={key}
                id={`conf-stripe-${sanitizeId(key)}`}
                width={band * n}
                height={band}
                patternUnits="userSpaceOnUse"
                patternTransform={`rotate(${angle})`}
              >
                {colors.map((color, i) => (
                  <rect key={i} x={i * band} y={0} width={band} height={band} fill={color} />
                ))}
              </pattern>
            );
          }
          const cell = 9;
          const cells = [];
          for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
              cells.push({ x: col * cell, y: row * cell, color: colors[(row + col) % n] });
            }
          }
          return (
            <pattern
              key={key}
              id={`conf-stripe-${sanitizeId(key)}`}
              width={cell * n}
              height={cell * n}
              patternUnits="userSpaceOnUse"
            >
              {cells.map((c, i) => (
                <rect key={i} x={c.x} y={c.y} width={cell} height={cell} fill={c.color} />
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
