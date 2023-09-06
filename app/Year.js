import React from 'react';
import { FaStepBackward, FaStepForward } from 'react-icons/fa';

function Year({ year, setYear }) {
  const handleSliderChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setYear(newYear);
  };

  const handlePrevYear = () => {
    const newYear = year - 1;
    if (newYear >= 1896) {
      setYear(newYear);
    }
  };

  const handleNextYear = () => {
    const newYear = year + 1;
    if (newYear <= 2024) {
      setYear(newYear);
    }
  };

  return (
    <div className="absolute top-5 right-5 bg-white border rounded border-gray-300 p-2 text-center">
      <div className="mb-2 flex items-center justify-center">
        <button onClick={handlePrevYear} className="arrow-button pr-1">
          <FaStepBackward />
        </button>
        <span className="year-text">{year}</span>
        <button onClick={handleNextYear} className="arrow-button pl-1">
          <FaStepForward />
        </button>
      </div>
      <div className="slider-container">
        <span>Year</span>
        <input
          type="range"
          min="1896"
          max="2024"
          step="1"
          value={year}
          onChange={handleSliderChange}
          className="slider"
        />
      </div>
    </div>
  );
}

export default Year;
