import React from 'react';
import { useSelector } from 'react-redux';

function Legend() {
  const { legendConferences } = useSelector(state => state.conInfoReducer);

  return (
    <div className='flex flex-col lg:ml-[10px] lg:mt-[50px] lg:mt-[75px] 2xl:mt-[150px]'>
      <h2 className="lg:mb-1 xl:mb-2 text-[6px] sm:text-[10px] md:text-[12px] lg:text-[16px] xl:text-[20px] font-semibold text-white">
        CONFERENCES
      </h2>
      {legendConferences && legendConferences.map((conference, index) => (
        <div key={index} className="legend-item xl:mb-1">
          <div className='flex flex-row items-center'>
            <div
              className="legend-color w-[7px] h-[7px] md:w-[14px] md:h-[14px] lg:w-[18px] lg:h-[18px] xl:w-[24px] xl:h-[24px] mr-1 md:mr-2"
              style={{ backgroundColor: conference.mapColor }}
            >
            </div>
            <p className="legend-label text-[6px] sm:text-[8px] md:text-[12px] lg:text-[14px] xl:text-[16px] text-white">
              {conference.abbreviation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Legend;
