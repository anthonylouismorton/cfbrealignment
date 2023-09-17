import React from 'react';

function Legend({ activeConferences }) {
  return (
    <div className="pr-40 pb-20 rounded">
      <h2 className="text-center mb-2 text-xl font-semibold text-white">CONFERENCES</h2>
      <div id="legend">
        {activeConferences && activeConferences.map((conference, index) => (
          <div key={index} className="legend-item flex items-center mb-2">
            <div
              className="legend-color w-6 h-6 mr-2"
              style={{ backgroundColor: conference.primaryColor }}
            ></div>
            <div className="legend-label text-md text-white">
              {conference.abbreviation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Legend;
