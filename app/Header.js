import React from 'react';

function Header({currentYear}) {
  return (
    <p className='text-white text-[30px] font-bold w-full flex justify-center items-center'>Division I College Football Conference History: Year {currentYear}</p>
  );
}

export default Header;
