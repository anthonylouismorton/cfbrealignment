import React, { useState } from 'react';
import OptionsMenu from './OptionsMenu';

export default function Options({ options, setOptions }) {
  const [open, setOpen] = useState(true);
  const [showDiv, setShowDiv] = useState(false);
  const [showHiddenDiv, setShowHiddenDiv] = useState(false)

  const handleOpen = () => {
    setOpen(!open);
    setShowDiv(!open);
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
  console.log(!showDiv)
  return (
    <div className='menu-container z-10'>
      {!options.hideSettings && (
        <div className='w-[28px] h-[114px]'>
        <button
          onClick={handleOpen}
          className="flex flex-col items-center text-center font-bold"
         >
          <h1 className='px-2 py-5' style={{fontSize: '10px', color: 'white', letterSpacing: '3px', transform: 'rotate(180deg)', writingMode: 'vertical-lr', lineHeight: '1.2'}}>
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
          <h1 className='px-2 py-5 w-[28px] h-[114px]' style={{fontSize: '10px', color: 'black', letterSpacing: '3px', transform: 'rotate(180deg)', writingMode: 'vertical-lr', lineHeight: '1.2'}}>
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
