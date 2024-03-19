import React from 'react';
import { useDispatch } from 'react-redux';
import { setShowList } from '@/redux/features/layoutSlices';

export default function MapButton() {
  const dispatch = useDispatch();
  return (
    <div className='flex'>
      <div>
        <button
          onClick={()=> dispatch(setShowList(true))}
          className="flex flex-col"
         >
          <h1 className='text-white font-bold text-[10px]'>
            LIST
          </h1>
        </button>
      </div>
    </div>
  );
}
