import React, { use, useState } from 'react';
import OptionsMenu from './OptionsMenu';

export default function Options() {
  const [menu, setMenu] = useState(false)
  const openMenu = () => {
    setMenu(!menu)
  }

  return (
    <>
    {!menu ? (
      <div className='bg-white rounded bg-opacity-40'>
        <button onClick={openMenu}>
        <p className='flex flex-col p-4 text-center font-bold text-white'>
          <span>F</span>
          <span>i</span>
          <span>l</span>
          <span>t</span>
          <span>e</span>
          <span>r</span>
        </p>
        </button>
      </div>
    ) : (
      <OptionsMenu menu={menu} setMenu={setMenu}/>
    )}
  </>
  );
}

