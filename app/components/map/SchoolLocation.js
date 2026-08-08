import React, { useMemo } from "react";
import { Marker, Annotation } from "react-simple-maps";
import { useDispatch, useSelector } from 'react-redux';
import { setMapInfo } from '@/redux/features/mapSlices';
import { setSchool } from '@/redux/features/mapSlices';
import { getGlowChanges } from '../../functions/getGlowChanges';

const SchoolLocation = () => {
  const { schools, hoveredSchool, styling } = useSelector(state => state.mapReducer);
  const { schoolModal } = useSelector(state => state.mapReducer);
  const { year } = useSelector(state => state.yearReducer);
  const { conferenceChanges } = useSelector(state => state.conInfoReducer);
  const option = useSelector((state) => state.optionsReducer);
  const dispatch = useDispatch();
  const { glowBySchool } = useMemo(() => getGlowChanges(conferenceChanges), [conferenceChanges]);
  const handleSchoolModal = (school) =>{
    dispatch(setSchool({modal: !schoolModal, school: school}));
  };

  return (
    <>
    {schools && schools.map(school => {
      const ringColor = glowBySchool.get(school.name);
      const ringRadius = styling.logoSize / 2 * 1.35;
      return (
      <Marker
        className='cursor-pointer'
        key={school.name}
        coordinates={school.coordinates}
        onClick={()=> handleSchoolModal(school)}
        onMouseEnter={() => dispatch(setMapInfo({map: "hoveredSchool", value: school}))}
        onMouseLeave={() => dispatch(setMapInfo({map: "hoveredSchool", value: null}))}

      >
        {option.showLocation && option.showLogos === false &&
          <circle r={styling.circleRadius} fill={school.color} />
        }
        {option.showLogos &&
         <image
            href={school.logo}
            width={styling.logoSize}
            height={styling.logoSize}
            x={styling.logoOffset}
            y={styling.logoOffset}
          />
        }
        {option.showLogos && ringColor && (
          <circle
            r={ringRadius}
            fill="none"
            stroke={ringColor}
            strokeWidth={Math.max(1, styling.logoSize / 10)}
            style={{ color: ringColor, opacity: 0, animation: 'ring-pulse 1.4s ease-out 1 forwards' }}
          />
        )}
      </Marker>
      );
    })}
    {hoveredSchool && (
      <Annotation
        subject={hoveredSchool.coordinates}
        dx={0}
        dy={0}
      >
        <foreignObject x={styling.hoveredSchool.x} y={styling.hoveredSchool.y} width="500" height="140">
        <div className={`bg-black z-10 bg-opacity-75 inline-block ${styling.hoveredSchool.padding} ${styling.hoveredSchool.rounded}`}>
          <p style={{ fontSize: styling.hoveredSchool.fontSize, color: "#b4b4b4", margin: 0, fontWeight: 600 }}>
            {hoveredSchool.name}
          </p>
          <p style={{ fontSize: styling.hoveredSchool.fontSize, color: "#b4b4b4", margin: 0 }}>
            Conference: {hoveredSchool.conference}
          </p>
          {(hoveredSchool.name === "University of Iowa" && (year === 1907 || year === 1908)) ? (
            <>
              <p style={{ fontSize: styling.hoveredSchool.fontSize, color: "#b4b4b4", margin: 0 }}>Big 8 Member Since: 1900</p>
              <p style={{ fontSize: styling.hoveredSchool.fontSize, color: "#b4b4b4", margin: 0 }}>Big Ten Member since: 1907</p>
            </>
          ) : (
            <p style={{ fontSize: styling.hoveredSchool.fontSize, color: "#b4b4b4", margin: 0 }}>
              {hoveredSchool.schoolInfo.rejoined ? `Member since: ${hoveredSchool.schoolInfo.rejoined[0].year}` : `Member since: ${hoveredSchool.schoolInfo.years[0]}`}
            </p>
          )}
        </div>
        </foreignObject>
      </Annotation>
    )}
    </>
  )
};

export default SchoolLocation;
