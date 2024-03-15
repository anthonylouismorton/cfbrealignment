import React from 'react';
import { useSelector } from 'react-redux';
import '../../../Legend.css'

function Legend() {
  const { legendConferences } = useSelector(state => state.conInfoReducer);

  return (
    <div className='legend-history-container text-center'>
      <div className="inline-block text-left pb-5">
        <p className="sm:text-sm md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-semibold pb-1 xl:pb-2 text-white">Legend</p>
        {legendConferences &&
          legendConferences
            .slice()
            .sort((a, b) => a.abbreviation.localeCompare(b.abbreviation))
            .map((conference, index) => (
              <div key={index} className="legend-item flex text-center items-center">
                <div
                  className="legend-color sm:w-[12px] sm:h-[12px] md:w-[14px] md:h-[14px] lg:w-[18px] lg:h-[18px] xl:w-[20px] xl:h-[20px] 2xl:w-[24px] 2xl:h-[24px] mr-[2px] md:mr-1 2xl:mr-2"
                  style={{ backgroundColor: conference.mapColor }}
                ></div>
                <p className="legend-label sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]  text-white font-semibold">
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
