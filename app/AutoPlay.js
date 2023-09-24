import { useEffect, useState, useRef } from 'react'
import StopIcon from '@mui/icons-material/Stop';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function Autoplay({changesList, currentYear, setCurrentYear}){
  const [step, setStep] = useState(10000);
  const [start, setStart] = useState(false);
  const timeIntervalRef = useRef(null);
  const timeRef = useRef(3000);

  const handleStart = () => {
    setStart(true)
  };
  const handleStop = () => {
    setStart(false)
  };

  
  useEffect(() => {
    if (start) {
      timeIntervalRef.current = setInterval(() => {
        setCurrentYear((prevYear) => prevYear + 1);
        console.log(changesList, currentYear)
        if (changesList.length === 0) {
          console.log('in the if');
          timeRef.current = 1000;
        }
        else{
          timeRef.current = 5000
        }
      }, timeRef.current);
    } 
    else if (!start) {
      clearInterval(timeIntervalRef.current);
    }

    return () => {
      clearInterval(timeIntervalRef.current);
    };
  }, [start, currentYear, changesList]);


  return (
    <div className='flex flex-row justify-center'>
      <h1 className='text-white text-[20px] font-bold mt-1'>
        AutoPlay
      </h1>
      {!start &&
        <IconButton className='mt-1 p-0' onClick={handleStart}>
          <PlayArrowIcon className='text-white'/>
        </IconButton>
      }
      {start &&
        <IconButton className='mt-1 p-0' onClick={handleStop}>
          <StopIcon className='text-white'/>
        </IconButton>
      }
    </div>
  );
}