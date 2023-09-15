import React, { useState, useEffect, useRef } from 'react';

export default function OptionsMenu({ options, setOptions, menu, setMenu }) {
  const [isChecked, setIsChecked] = useState({ conferences: options.conferences, majorConferences: options.majorConferences, showHistory: options.showHistory });
  const menuRef = useRef(null);
  const conferences = ['SEC', 'Pac-12','Big 12','ACC','Big Ten','SOCON','BIG 8','Border','Southwest','C-USA','WAC','MVC','NMC','Skyline']

  const openMenu = () => {
    setMenu(!menu);
  };

  const handleOptions = (e) => {
    const value = e.target.value;
    setIsChecked({ ...isChecked, [value]: e.target.checked });
    setOptions({
      ...options,
      [value]: e.target.checked,
    });
  };

  // Add a click event listener to the document
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Check if the click occurred outside of the menu
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(false); // Close the menu
      }
    };

    // Attach the event listener when the menu is open
    if (menu) {
      document.addEventListener('click', handleDocumentClick);
    }

    // Clean up the event listener when the component unmounts or when the menu is closed
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [menu, setMenu, isChecked]);

  return (
    <div className='bg-white rounded w-96' ref={menuRef}>
      <p className='flex flex-col p-4 text-center font-bold'>Options</p>
      <div className='pl-2'>
        <div>
          <input type="checkbox" checked={isChecked.conferences} value="conferences" onChange={handleOptions} />
          <label className='p-2'>Logos off</label>
        </div>
        <div>
          <input type="checkbox" checked={isChecked.majorConferences} value="majorConferences" onChange={handleOptions} />
          <label className='p-2'>Major Conferences</label>
        </div>
        <div>
          <input type="checkbox" checked={isChecked.showHistory} value="showHistory" onChange={handleOptions} />
          <label className='p-2'>Show History</label>
        </div>
      </div>
      <div className='text-center pb-4'>
        <button className='bg-black text-white rounded p-3 font-bold' onClick={openMenu}>
          hide
        </button>
      </div>
    </div>
  );
}
