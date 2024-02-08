import React from 'react';
import { useSelector } from 'react-redux';

function Legend() {
  const { legendConferences } = useSelector(state => state.conInfoReducer);
  console.log(legendConferences);
  return (
    <div className='flex flex-col'>
      <h2 className="lg:mb-1 xl:mb-2 text-[6px] sm:text-[10px] md:text-[12px] lg:text-[16px] xl:text-[20px] font-semibold text-white text-center">
        CONFERENCES
      </h2>
      {legendConferences && legendConferences.map((conference, index) => (
        <div key={index} className="legend-item xl:mb-1 pl-2">
          <div className='flex flex-row items-center'>
            <div
              className="legend-color w-[7px] h-[7px] md:w-[14px] md:h-[14px] mr-1 md:mr-2"
              style={{ backgroundColor: conference.mapColor }}
            >
            </div>
            <p className="legend-label text-[6px] sm:text-[8px] md:text-[12px] text-white">
              {conference.abbreviation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Legend;
