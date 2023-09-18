import React from 'react';

function Legend({ activeConferences }) {
  return (
    <div>
      <h2 className="text-center mb-1 xl:mb-2 text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[16px] 2xl:text-[20px] font-semibold text-white">CONFERENCES</h2>
      <div id="legend">
        {activeConferences && activeConferences.map((conference, index) => (
          <div key={index} className="legend-item flex items-center mb-2">
            <div
              className="legend-color w-[7px] h-[7px] mr-1 md:w-2 md:h-2 xl:w-3 xl:h-3 w-4 h-4 2xl:w-6 2xl:h-6 md:mr-2"
              style={{ backgroundColor: conference.primaryColor }}
            ></div>
            <div className="legend-label text-[6px] sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-[14px] 2xl:text-[16px] text-white">
              {conference.abbreviation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Legend;
