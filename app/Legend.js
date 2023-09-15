import React from 'react';

function Legend({ activeConferences }) {
  return (
    <div className="bg-white p-5 rounded">
      <h2 className="text-center mb-2 text-xl font-semibold">Conferences</h2>
      <div id="legend">
        {activeConferences && activeConferences.map((conference, index) => (
          <div key={index} className="legend-item flex items-center mb-2">
            <div
              className="legend-color w-6 h-6 mr-2"
              style={{ backgroundColor: conference.primaryColor }}
            ></div>
            <div className="legend-label text-lg">
              {conference.abbreviation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Legend;
