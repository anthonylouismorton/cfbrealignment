import React from 'react';
import { FaStepBackward, FaStepForward } from 'react-icons/fa';

function Year({ currentYear, setCurrentYear }) {
  const handleSliderChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentYear(newYear);
  };

  const handlePrevYear = () => {
    const newYear = currentYear - 1;
    if (newYear >= 1896) {
      setCurrentYear(newYear);
    }
  };

  const handleNextYear = () => {
    const newYear = currentYear + 1;
    if (newYear <= 2024) {
      setCurrentYear(newYear);
    }
  };

  return (
    <div className="absolute top-0 right-0 bg-white border rounded border-gray-300 p-2 text-center">
      <div className="mb-2 flex items-center justify-center">
        <button onClick={handlePrevYear} className="arrow-button pr-1">
          <FaStepBackward />
        </button>
        <span className="currentYear-text">{currentYear}</span>
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
          value={currentYear}
          onChange={handleSliderChange}
          className="slider"
        />
      </div>
    </div>
  );
}

export default Year;
