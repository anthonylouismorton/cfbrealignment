import React, { use, useState } from 'react';

export default function OptionsMenu({menu, setMenu}) {
  const openMenu = () => {
    setMenu(!menu)
  }

  return (
    <div className='bg-white rounded bg-opacity-40 w-96'>
      <p className='flex flex-col p-4 text-center font-bold text-white'>
        Options
      </p>
      <button className='bg-white rounded p-3 font-bold' onClick={openMenu}>Close</button>
    </div>
  );
}
