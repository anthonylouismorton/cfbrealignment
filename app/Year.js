import React, { useState, useEffect } from 'react';
import YearSlider from './YearSlider';

function Year({ currentYear, setCurrentYear }) {
  const [isVisible, setIsVisible] = useState(true);
  let hideTimer;

  useEffect(() => {

    const hideSlider = () => {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // 5 seconds
    };

    const showSlider = () => {
      clearTimeout(hideTimer);
      setIsVisible(true);
    };


    hideSlider();

    // Listen for mouse enter and leave events on the parent div
    const div = document.getElementById('yearDiv'); // Replace with your actual div ID
    div.addEventListener('mouseenter', showSlider);
    div.addEventListener('mouseleave', hideSlider);

    return () => {
      div.removeEventListener('mouseenter', showSlider);
      div.removeEventListener('mouseleave', hideSlider);
    };
  }, []);
  const showSlider = () => {
    clearTimeout(hideTimer);
    setIsVisible(true);
  };
  return (
    <div
      id="yearDiv" // Give your div an ID for event handling
      className="fixed top-0 left-0 w-full text-center h-20"
      onFocus={showSlider}
    >
      {isVisible && 
        <YearSlider currentYear={currentYear} setCurrentYear={setCurrentYear} />
      }
    </div>
  );
}

export default Year;
