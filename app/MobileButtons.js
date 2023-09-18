import React from 'react';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { IconButton } from '@mui/material';

function MobileButtons({currentYear,setCurrentYear}) {
  const handlePrevYear = () => {
    const newYear = currentYear - 1;
    if (newYear >= 1896) {
      setCurrentYear(newYear);
    }
  };
  const handleNextYear = () => {
    const newYear = currentYear + 1;
    if (newYear <= 2024) {
      setCurrentYear(newYear);
    }
  };
  return (
    <div className='flex flex-row items-center'>
      <IconButton className='p-0' onClick={handlePrevYear}>
        <SkipPreviousIcon className="text-white"/>
      </IconButton>
      <p className='text-white mr-2'>Previous Year</p>
      <p className='text-white ml-2'>Next Year</p>
      <IconButton className='p-0' onClick={handleNextYear}>
        <SkipNextIcon className="text-white"/>
      </IconButton>
    </div>
  );
}

export default MobileButtons;
