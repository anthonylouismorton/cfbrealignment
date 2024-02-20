import React from "react"
import { Marker, Annotation } from "react-simple-maps";
import { useDispatch, useSelector } from 'react-redux';
import { setMapInfo } from '@/redux/features/mapSlices';

const schoolLocations = () => {
  const { schools, hoveredSchool, styling} = useSelector(state => state.mapReducer);
  const option = useSelector((state) => state.optionsReducer);
  const dispatch = useDispatch();

  return (
    <>
    {schools && schools.map(school => (
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
      </Marker>
    ))}
    {hoveredSchool && (
      <Annotation
        subject={hoveredSchool.coordinates}
        dx={0}
        dy={0}
      >
        <foreignObject x={styling.hoveredSchool.x} y={styling.hoveredSchool.y} width="500" height="100">
        <div className={`bg-black z-10 bg-opacity-75 inline-block ${styling.hoveredSchool.padding} ${styling.hoveredSchool.rounded}`}>
          <p style={{ fontSize: styling.hoveredSchool.fontSize, color: "#b4b4b4", margin: 0 }}>
            {hoveredSchool.name}
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

export default schoolLocations;