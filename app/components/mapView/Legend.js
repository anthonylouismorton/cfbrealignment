import React from 'react';
import { useSelector } from 'react-redux';
import '../../../Legend.css'

function Legend() {
  const { legendConferences } = useSelector(state => state.conInfoReducer);

  return (
    <div className='text-center'>
      <div className="inline-block text-left legend-history-container overflow-auto pb-5">
        <p className="text-md md:text-lg lg:text-xl xl:text-2xl font-semibold pb-2 text-white">Conferences</p>
        {legendConferences &&
          legendConferences
            .slice()
            .sort((a, b) => a.abbreviation.localeCompare(b.abbreviation))
            .map((conference, index) => (
              <div key={index} className="legend-item xl:mb-1 flex">
                <div
                  className="legend-color w-[7px] h-[7px] md:w-[14px] md:h-[14px] lg:w-[18px] lg:h-[18px] xl:w-[24px] xl:h-[24px] mr-1 md:mr-2"
                  style={{ backgroundColor: conference.mapColor }}
                ></div>
                <p className="legend-label text-[6px] sm:text-[8px] md:text-[12px] lg:text-[14px] xl:text-[16px] text-white font-semibold">
                  {conference.abbreviation}
                </p>
              </div>
            ))
        }
      </div>
    </div>
  );
  
}

export default Legend;
