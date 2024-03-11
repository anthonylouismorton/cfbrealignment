import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const year = useSelector(state => state.yearReducer)
  return (
    <p className='hidden md:block text-white text-center md:text-[16px] lg:text-[19px] xl:text-[22px] 2xl:text-[25px] font-bold w-full mt-2'>Division I College Football Conference History: Year {year}</p>
  );
}

export default Header;
