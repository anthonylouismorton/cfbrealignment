import { useEffect, useState, useRef } from 'react'
import PauseIcon from '@mui/icons-material/Pause';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import { useSelector, useDispatch } from 'react-redux';
import { setYear } from '@/redux/features/yearSlices';

const SPEEDS = {
  slow: { label: 'S', changeTime: 4000, idleTime: 1200 },
  medium: { label: 'M', changeTime: 2500, idleTime: 750 },
  fast: { label: 'F', changeTime: 1200, idleTime: 400 },
};

export default function Autoplay(){
  const dispatch = useDispatch();
  const year = useSelector(state => state.yearReducer);
  const { conferenceChanges } = useSelector(state => state.conInfoReducer);
  const [start, setStart] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [speed, setSpeed] = useState('medium');
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
    let time = SPEEDS[speed].changeTime
    let nextYear = year + 1
    if(conferenceChanges.length === 0){
      time = SPEEDS[speed].idleTime
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
  }, [start, year, conferenceChanges, speed]);

  return (
    <div className='flex justify-center items-center'>
      <div className='flex items-center mr-1'>
        {Object.entries(SPEEDS).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setSpeed(key)}
            className={`text-[9px] xl:text-[10px] font-bold leading-none w-[13px] h-[13px] xl:w-[15px] xl:h-[15px] rounded-sm mr-[2px] ${speed === key ? 'bg-white text-black' : 'text-white border border-white'}`}
          >
            {label}
          </button>
        ))}
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