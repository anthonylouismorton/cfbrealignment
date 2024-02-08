import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { setYear } from '@/redux/features/yearSlices';

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

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
    fontSize: '12px',
    top: 7,
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
    color: 'gray',
    '@media (max-width: 399px)': {
      fontSize: '6px',
    },
    '@media (min-width: 400px) and (max-width: 549px)': {
      fontSize: '10px',
    },
    '@media (min-width: 550px) and (max-width: 650px)': {
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


export default function YearSlider() {
  const dispatch = useDispatch();
  const year = useSelector(state => state.yearReducer);
  const handleSliderChange = (e, newValue) => {
    dispatch(setYear(newValue));
  };

  return (
    <Box className="w-[50%] lg:w-[90%] flex items-center justify-center content-center mr-3">
      <CustomSlider
        value={year}
        valueLabelDisplay="auto"
        min={1891}
        max={2025}
        onChange={handleSliderChange}
      />
    </Box>
  );
}
