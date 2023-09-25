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
    <div className='flex flex-row justify-center'>
      <h1 className='text-white text-[16px] xl:text-[20px] font-bold mr-2'>
        AutoPlay
      </h1>
      {!start &&
        <IconButton className='p-0' onClick={handleStart}>
          <PlayArrowIcon className='text-white'/>
        </IconButton>
      }
      {start &&
        <IconButton className='p-0' onClick={handleStop}>
          <StopIcon className='text-white'/>
        </IconButton>
      }
    </div>
  );
}