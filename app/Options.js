import React, { useState } from 'react';
import OptionsMenu from './OptionsMenu';

export default function Options({ options, setOptions }) {
  const [open, setOpen] = useState(false);
  const [showHiddenDiv, setShowHiddenDiv] = useState(false)

  const handleOpen = () => {
    setOpen(!open);
    if(options.hideSettings){
      setShowHiddenDiv(false);
    }

  };
  const handleMouseLeave = () => {
      setShowHiddenDiv(false);
  };
  const handleMouseEnter = () => {
    if (options.hideSettings) {
      setShowHiddenDiv(true);
    }
  };

  return (
    <div className='menu-container z-10'>
      {!options.hideSettings && (
        <div className='w-[28px] h-[114px]'>
        <button
          onClick={handleOpen}
          className="flex flex-col items-center text-center font-bold"
         >
          <h1 className='pr-2 text-[8px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px]' style={{color: 'white', letterSpacing: '3px', transform: 'rotate(180deg)', writingMode: 'vertical-lr', lineHeight: '1.2'}}>
            SETTINGS
          </h1>
        </button>
      </div>
      )}
      {options.hideSettings && !showHiddenDiv && (
        <div className="hover-div w-[28px] h-[114px]" onMouseEnter={handleMouseEnter}></div>
      )}
      {showHiddenDiv &&
        <div className='bg-white'>
        <button
          onClick={handleOpen}
          onMouseLeave={handleMouseLeave}
          className="flex flex-col items-center text-center font-bold"
        >
          <h1 className='pr-2 w-[28px] h-[114px]' style={{fontSize: '10px', color: 'black', letterSpacing: '3px', transform: 'rotate(180deg)', writingMode: 'vertical-lr', lineHeight: '1.2'}}>
            SETTINGS
          </h1>
        </button>
      </div>
      }
      <div>
        <OptionsMenu options={options} setOptions={setOptions} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
