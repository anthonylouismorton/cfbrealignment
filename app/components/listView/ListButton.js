import React from 'react';
import { useDispatch } from 'react-redux';
import { setShowList } from '@/redux/features/layoutSlices';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ListButton() {
  const dispatch = useDispatch();
  return (
    <div className='fixed top-0 left-0 flex justify-start bg-black bg-opacity-80'>
      <IconButton onClick={()=> dispatch(setShowList(false))}>
        <ArrowBackIcon className="text-white" style={{ fontSize: '15px' }}/>
        <h1 className='text-white font-bold text-[10px]'>
          Back to map
        </h1>
      </IconButton>
    </div>
  );
}
