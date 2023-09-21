import React, { useState, useEffect } from 'react';
import YearSlider from './YearSlider';

function Year({ currentYear, setCurrentYear }) {
  const [isVisible, setIsVisible] = useState(true);
  let hideTimer;

  useEffect(() => {

    const hideSlider = () => {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    const showSlider = () => {
      clearTimeout(hideTimer);
      setIsVisible(true);
    };


    hideSlider();
    const div = document.getElementById('yearDiv');
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
      id="yearDiv"
      className="hidden md:block w-full text-center h-20 mt-200"
      onFocus={showSlider}
    >
      {isVisible &&
        <YearSlider currentYear={currentYear} setCurrentYear={setCurrentYear} />
      }
    </div>
  );
}

export default Year;
