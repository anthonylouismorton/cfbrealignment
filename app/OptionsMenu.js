import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function OptionsMenu({ options, setOptions, menu, setMenu }) {
  const menuRef = useRef(null);
  const conferences = ['SEC', 'Pac-12','Big 12','ACC','Big Ten','SOCON','BIG 8','Border','Southwest','C-USA','WAC','MVC','NMC','Skyline']

  const openMenu = () => {
    setMenu(!menu);
  };

  const handleOptions = (e) => {
    const value = e.target.value;
    // if(value === hideHeader){
    //   setOptions({
    //     ...options,
    //     [value]: e.target.checked,
    //     options.
    //   })
    // }
      setOptions({
        ...options,
        [value]: e.target.checked,
      });
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(false); // Close the menu
      }
    };

    if (menu) {
      document.addEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [menu, setMenu, options]);

  return (
    <CSSTransition
      in={menu}
      timeout={200}
      classNames={{
        enter: 'menu-enter',
        enterActive: 'menu-enter-active',
        exit: 'menu-exit',
        exitActive: 'menu-exit-active',
      }}
      unmountOnExit
    >

    <div className='bg-white rounded w-48' ref={menuRef}>
      <p className='flex flex-col p-3 text-center text-sm text-black font-bold'>SETTINGS</p>
      <div className='pl-2'>
        <div className='flex items-center'>
          <input type="checkbox" checked={options.logo} value="logos" onChange={handleOptions} />
          <label className='pl-2 text-[11px] text-black font-semibold'>Logos off</label>
        </div>
        <div className='flex items-center'>
          <input type="checkbox" checked={options.majorConferences} value="majorConferences" onChange={handleOptions} />
          <label className='pl-2 text-[11px] text-black font-semibold'>Major Conferences Only</label>
        </div>
        {/* <div className='flex items-center'>
          <input type="checkbox" checked={options.hideYear} value="hideYear" onChange={handleOptions} />
          <label className='pl-2 text-[11px] text-black font-semibold'>Discreet Slider</label>
        </div> */}
        <div className='flex items-center'>
          <input type="checkbox" checked={options.hideHistory} value="hideHistory" onChange={handleOptions} />
          <label className='pl-2 text-[11px] text-black font-semibold'>Hide History</label>
        </div>
        <div className='flex items-center'>
          <input type="checkbox" checked={options.hideLegend} value="hideLegend" onChange={handleOptions} />
          <label className='pl-2 text-[11px] text-black font-semibold'>Hide Legend</label>
        </div>
        <div className='hidden sm:flex items-center'>
          <input type="checkbox" checked={options.hideHeader} value="hideHeader" onChange={handleOptions} />
          <label className='pl-2 text-[11px] text-black font-semibold'>Hide Header</label>
        </div>
        <div className='flex items-center'>
          <input type="checkbox" checked={options.hideSettings} value="hideSettings" onChange={handleOptions} />
          <label className='pl-2 text-[11px] text-black font-semibold'>Hide Options</label>
        </div>
      </div>
      <div className='text-center py-3'>
        <button className='bg-black text-white text-[11px] rounded p-2 font-bold' onClick={openMenu}>
          Hide
        </button>
      </div>
    </div>
    </CSSTransition>
  );
}
