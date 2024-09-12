import { useEffect, useState, useRef } from 'react'
import PauseIcon from '@mui/icons-material/Pause';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import { useSelector, useDispatch } from 'react-redux';
import { setYear } from '@/redux/features/yearSlices';

export default function Autoplay(){
  const dispatch = useDispatch();
  const year = useSelector(state => state.yearReducer);
  const { conferenceChanges } = useSelector(state => state.conInfoReducer);
  const [start, setStart] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const timeIntervalRef = useRef(null);

  const handleStart = () => {
    setStart(true);
  };
  const handleStop = () => {
    setStart(false);
  };
  const handleReplay = () => {
    dispatch(setYear(1891));
    setStart(true);
    setShowReplay(false);
  };

  
  useEffect(() => {
    let time = 2500
    let nextYear = year + 1
    if(conferenceChanges.length === 0){
      time = 750
    }
    if (start && nextYear < 2026) {
      timeIntervalRef.current = setInterval(() => {
        dispatch(setYear(year + 1));
      }, time);
    } 
    else if (!start) {
      clearInterval(timeIntervalRef.current);
    }
    else if(nextYear === 2026){
      clearInterval(timeIntervalRef.current);
      setStart(false)
      setShowReplay(true)
    }

    return () => {
      clearInterval(timeIntervalRef.current);
    };
  }, [start, year, conferenceChanges]);

  return (
    <div className='flex justify-center items-center'>
      <div className='flex items-center'>
        <h1 className='text-white text-[14px] xl:text-[15px] font-semibold pr-0 md:pr-1'>
          AutoPlay
        </h1>
      </div>
      {!start && !showReplay &&
        <IconButton className='p-0' onClick={handleStart}>
          <PlayArrowIcon className='text-white text-[21px] xl:text-[23px]'/>
        </IconButton>
      }
      {start &&
        <IconButton className='p-0' onClick={handleStop}>
          <PauseIcon className='text-white text-[21px] xl:text-[23px]'/>
        </IconButton>
      }
      {showReplay &&
        <IconButton className='p-0' onClick={handleReplay}>
          <ReplayIcon className='text-white text-[21px] xl:text-[23px]'/>
        </IconButton>
      }
    </div>
  );
}