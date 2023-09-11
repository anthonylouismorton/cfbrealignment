import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

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
  // padding: '15px',
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
    fontSize: 13,
    fontWeight: 'normal',
    top: 47,
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
    color: 'white'
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: 'white',
    color: 'white'
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
    color: 'gray',
    '&.MuiSlider-markLabelActive': {
      opacity: 1,
      // backgroundColor: 'currentColor',
      color: 'white'
    },
  },
}));


export default function YearSlider({currentYear,setCurrentYear}) {
  const handleSliderChange = (e, newValue) => {
    setCurrentYear(newValue);
  };
  return (
    <Box className="pl-10 pr-10 pt-6 w-full">
      <CustomSlider
        aria-label="Custom marks"
        value={currentYear}
        valueLabelDisplay="auto"
        min={1896}
        max={2024}
        marks={marks}
        onChange={handleSliderChange}
      />
    </Box>
  );
}
