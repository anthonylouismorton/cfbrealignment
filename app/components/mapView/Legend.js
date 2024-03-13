import React from 'react';
import { useSelector } from 'react-redux';
import '../../../Legend.css'

function Legend() {
  const { legendConferences } = useSelector(state => state.conInfoReducer);

  return (
    <div className='flex flex-col legend-history-container overflow-auto pb-5'>
        <p className="text-md md:text-lg lg:text-xl font-semibold pb-2 text-white text-center">Conferences</p>
      {legendConferences &&
        legendConferences
          .slice()
          .sort((a, b) => a.abbreviation.localeCompare(b.abbreviation))
          .map((conference, index) => (
            <div key={index} className="legend-item xl:mb-1 pl-2">
              <div className='flex flex-row items-center'>
                <div
                  className="legend-color w-[7px] h-[7px] md:w-[14px] md:h-[14px] lg:w-[18px] lg:h-[18px] xl:w-[24px] xl:h-[24px] mr-1 md:mr-2"
                  style={{ backgroundColor: conference.mapColor }}
                ></div>
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
