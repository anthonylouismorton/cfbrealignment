import React from 'react';
import { useSelector } from 'react-redux';

function Legend() {
  const { legendConferences } = useSelector(state => state.conInfoReducer);

  return (
    <div className='flex flex-wrap text-center justify-center gap-1 w-[95%]'>
      {legendConferences &&
        legendConferences
          .slice()
          .sort((a, b) => a.abbreviation.localeCompare(b.abbreviation))
          .map((conference, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-[12px] h-[12px] mr-[2px]"
                style={{ backgroundColor: conference.mapColor }}
              ></div>
              <p className="text-[10px] text-white">
                {conference.abbreviation}
              </p>
            </div>
          ))
      }
    </div>
  );
  
}

export default Legend;
