import { useEffect, useState, useRef } from 'react'
import StopIcon from '@mui/icons-material/Stop';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function Autoplay({changesList, currentYear, setCurrentYear}){
  const [start, setStart] = useState(false);
  const timeIntervalRef = useRef(null);

  const handleStart = () => {
    setStart(true)
  };
  const handleStop = () => {
    setStart(false)
  };

  
  useEffect(() => {
    let time = 5000
    let nextYear = currentYear + 1
    if(changesList.length === 0){
      time = 1000
    }
    if (start && nextYear < 2025) {
      timeIntervalRef.current = setInterval(() => {
        setCurrentYear((prevYear) => prevYear + 1);
      }, time);
    } 
    else if (!start) {
      clearInterval(timeIntervalRef.current);
    }
    else if(nextYear === 2025){
      clearInterval(timeIntervalRef.current);
      setStart(false)
    }

    return () => {
      clearInterval(timeIntervalRef.current);
    };
  }, [start, currentYear, setCurrentYear, changesList]);

  return (
    <div className='flex justify-center items-center'>
      <div className='flex items-center'>
        <h1 className='text-white text-[6px] sm:text-[10px] md:text-[12px] lg:text-[20px] font-semibold md:pr-1'>
          AutoPlay
        </h1>
      </div>
      {!start &&
        <IconButton className='p-0' onClick={handleStart}>
          <PlayArrowIcon className='text-white text-[8px] sm:text-[16px] md:text-[18px] lg:text-[21px] xl:text-[23px] 2xl:text-[26px]'/>
        </IconButton>
      }
      {start &&
        <IconButton className='p-0' onClick={handleStop}>
          <StopIcon className='text-white text-[8px] sm:text-[16px] md:text-[18px] lg:text-[21px] xl:text-[23px] 2xl:text-[26px]'/>
        </IconButton>
      }
    </div>
  );
}