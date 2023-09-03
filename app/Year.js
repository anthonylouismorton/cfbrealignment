"use client"
import React, { useState } from 'react';

function Year({ year, setYear }) {
  console.log(setYear)
  const handleInputChange = (e) => {
    setYear(e.target.value);
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
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
