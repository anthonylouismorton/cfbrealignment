import React from 'react';
import YearSlider from './YearSlider';

function Year({ currentYear, setCurrentYear }) {
  
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
    <div className="fixed top-0 left-0 w-full text-center">
      <YearSlider currentYear={currentYear} setCurrentYear={setCurrentYear} />
    </div>
  );
}

export default Year;
