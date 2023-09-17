import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

  const marks = [
    { value: 1896, label: '1896' }, 
    { value: 1905, label: '1905' }, 
    { value: 1915, label: '1915' }, 
    { value: 1925, label: '1925' },
    { value: 1935, label: '1935' },
    { value: 1945, label: '1945' },
    { value: 1955, label: '1955' },
    { value: 1965, label: '1965' },
    { value: 1975, label: '1975' },
    { value: 1985, label: '1985' },
    { value: 1995, label: '1995' },
    { value: 2005, label: '2005' },
    { value: 2015, label: '2015' },
    { value: 2024, label: '2024' }
  ];


const CustomSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
  height: 2,
  '& .MuiSlider-thumb': {
    height: 15,
    width: 15,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  '& .MuiSlider-valueLabel': {
    fontWeight: 'bold',
    '@media (max-width: 399px)': {
      fontSize: '6px',
      top: 35,
    },
    '@media (min-width: 400px) and max-width: 524px)': {
      fontSize: '11px',
      top: 43,
    },
    '@media (min-width: 525px) and (max-width: 650px)': {
      fontSize: '12px',
      top: 45,
    },
    '@media (min-width: 651px) and (max-width: 920px)': {
      fontSize: '16px',
      top: 51,
    },
    '@media (min-width: 921px) and (max-width: 1299px)': {
      fontSize: '19px',
      top: 55,
    },
    '@media (min-width: 1300px)': {
      fontSize: '22px',
      top: 58,
    },
    backgroundColor: 'transparent',
    color: 'white',
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? 'white' : 'white',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    color: 'white',
    '&:focus, &:hover, &.Mui-active': {
      color: 'white',
      height: '6px'
    }
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: 'white',
    color: 'white',
    '&:focus, &:hover': {
      color: 'white',
      height: '6px'
    }
  },
  '& .MuiSlider-mark': {
    backgroundColor: 'gray',
    height: 20,
    width: 2,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
      color: 'white'
    },
  },
  '& .MuiSlider-markLabel': {
    fontSize: '18px', // Default font size
    color: 'gray',
    '@media (max-width: 399px)': {
      fontSize: '6px',
    },
    '@media (min-width: 400px) and max-width: 524px)': {
      fontSize: '11px',
    },
    '@media (min-width: 525px) and (max-width: 650px)': {
      fontSize: '12px',
    },
    '@media (min-width: 651px) and (max-width: 920px)': {
      fontSize: '16px',
    },
    '@media (min-width: 921px) and (max-width: 1299px)': {
      fontSize: '19px',
    },
    '@media (min-width: 1300px)': {
      fontSize: '22px',
    },
    '&.MuiSlider-markLabelActive': {
      color: 'white',
      opacity: 1,
    },
  },
  
}));


export default function YearSlider({currentYear, setCurrentYear}) {
  const handleSliderChange = (e, newValue) => {
    setCurrentYear(newValue);
  };
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
    <Box className="w-full flex justify-center">
        <IconButton onClick={handlePrevYear}>
          <SkipPreviousIcon className="text-white"/>
        </IconButton>
      <CustomSlider
        className='mt-5'
        aria-label="Custom marks"
        value={currentYear}
        valueLabelDisplay="auto"
        min={1896}
        max={2024}
        marks={marks}
        onChange={handleSliderChange}
      />
      <IconButton onClick={handleNextYear}>
        <SkipNextIcon className="text-white"/>
      </IconButton>
    </Box>
  );
}
