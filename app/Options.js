import React, { use, useState } from 'react';
import OptionsMenu from './OptionsMenu';

export default function Options({options, setOptions}) {
  const [menu, setMenu] = useState(false)
  const openMenu = () => {
    setMenu(!menu)
  }

  return (
    <>
    {!menu ? (
      <div className='bg-white rounded'>
        <button onClick={openMenu}>
        <p className='flex flex-col p-4 text-center font-bold'>
          <span style={{ margin: '0', padding: '0' }}>O</span>
          <span style={{ margin: '0', padding: '0' }}>p</span>
          <span style={{ margin: '0', padding: '0' }}>t</span>
          <span style={{ margin: '0', padding: '0' }}>i</span>
          <span style={{ margin: '0', padding: '0' }}>o</span>
          <span style={{ margin: '0', padding: '0' }}>n</span>
          <span style={{ margin: '0', padding: '0' }}>s</span>
        </p>
        </button>
      </div>
    ) : (
      <OptionsMenu options={options} setOptions={setOptions} menu={menu} setMenu={setMenu}/>
    )}
  </>
  );
}

