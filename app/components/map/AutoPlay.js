import { useEffect, useState, useRef } from 'react'
import PauseIcon from '@mui/icons-material/Pause';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import { useSelector, useDispatch } from 'react-redux';
import { setYear } from '@/redux/features/yearSlices';

const SPEEDS = {
  slow: { label: 'S', title: 'Slow', changeTime: 4000, idleTime: 1200 },
  medium: { label: 'M', title: 'Medium', changeTime: 2500, idleTime: 750 },
  fast: { label: 'F', title: 'Fast', changeTime: 1200, idleTime: 400 },
};

const BASE_MAP_WIDTH = 835;
const MIN_SCALE = 0.65;
const MAX_SCALE = 1.3;

export default function Autoplay(){
  const dispatch = useDispatch();
  const year = useSelector(state => state.yearReducer);
  const { conferenceChanges } = useSelector(state => state.conInfoReducer);
  const { mapSize } = useSelector(state => state.mapReducer);
  const [start, setStart] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [speed, setSpeed] = useState('medium');
  const timeIntervalRef = useRef(null);

  const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, mapSize.width / BASE_MAP_WIDTH));

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code !== 'Space') return;
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;
      e.preventDefault();
      if (showReplay) {
        handleReplay();
      } else {
        setStart(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showReplay]);

  return (
    <div
      className='flex justify-center items-center bg-black bg-opacity-60 rounded-sm px-1 py-[2px]'
      style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
    >
      <span className='text-white text-[9px] font-semibold mr-1 whitespace-nowrap'>Speed:</span>
      <div className='flex items-center mr-1'>
        {Object.entries(SPEEDS).map(([key, { label, title }]) => (
          <button
            key={key}
            title={`${title} playback speed`}
            onClick={() => setSpeed(key)}
            className={`text-[9px] font-bold leading-none w-[13px] h-[13px] rounded-sm mr-[2px] ${speed === key ? 'bg-white text-black' : 'text-white border border-white'}`}
          >
            {label}
          </button>
        ))}
      </div>
      {!start && !showReplay &&
        <IconButton className='p-0' onClick={handleStart} title="Play">
          <PlayArrowIcon className='text-white text-[21px]'/>
        </IconButton>
      }
      {start &&
        <IconButton className='p-0' onClick={handleStop} title="Pause">
          <PauseIcon className='text-white text-[21px]'/>
        </IconButton>
      }
      {showReplay &&
        <IconButton className='p-0' onClick={handleReplay} title="Replay">
          <ReplayIcon className='text-white text-[21px]'/>
        </IconButton>
      }
    </div>
  );
}
