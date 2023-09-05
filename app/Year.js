"use client"
import React, { useState } from 'react';

function Year({ year, setYear }) {
  const handleInputChange = (e) => {
    let newYear = Number(e.target.value);

    if (newYear < 1896) {
      newYear = 1896;
    } else if (newYear > 2024) {
      newYear = 2024;
    }
  
    setYear(newYear);
  };
  

  const handleYearChange = (newYear) => {
    if (newYear >= 1896 && newYear <= 2024) {
      setYear(newYear);
    }
  };

  return (
    <div className="absolute top-5 right-5 bg-opacity-80 bg-white p-1 rounded flex items-center">
      <button
        onClick={() => handleYearChange(Number(year) - 1)}
        className="mr-2"
      >
        &lt;
      </button>
      <input
        type="text"
        value={year}
        onChange={handleInputChange}
        className="w-16 bg-opacity-80 bg-white mr-2 text-center"
      />
      <button
        onClick={() => handleYearChange(Number(year) + 1)}
        className="mr-2"
      >
        &gt;
      </button>
    </div>
  );
}

export default Year;
