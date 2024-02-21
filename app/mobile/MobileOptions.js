import React, { useState } from 'react';
import OptionsMenu from '../components/OptionsMenu';

export default function Options() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);

  };

  return (
    <div className='menu-container flex justify-end w-full pt-1 pr-1'>
      <div>
        <button
          onClick={handleOpen}
          className="flex flex-col"
          >
          <h1 className=' text-white font-bold text-[8px] sm:text-[8px] md:text-[9px]'>
            SETTINGS
          </h1>
        </button>
      </div>
      <div>
        <OptionsMenu open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
