import React from 'react';

function Header({currentYear}) {
  return (
    <p className='hidden md:block text-white text-center text-[25px] font-bold w-full mt-1'>Division I College Football Conference History: Year {currentYear}</p>
  );
}

export default Header;
