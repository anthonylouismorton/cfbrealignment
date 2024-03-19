import React, { useState } from 'react';
import OptionsMenu from '../components/mapView/OptionsMenu';

export default function Options() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);

  };

  return (
    <div className='flex mr-2'>
      <div>
        <button
          onClick={handleOpen}
          className="flex flex-col"
          >
          <h1 className='text-white font-bold text-[8px] sm:text-[8px] md:text-[9px]'>
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
