import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowList } from '@/redux/features/layoutSlices';

export default function ListButton() {
  const dispatch = useDispatch();
  const { showList } = useSelector((state)=> state.layoutReducer);
  return (
    <div className='flex'>
      <div>
        <button
          onClick={()=> dispatch(setShowList(false))}
          className="flex flex-col"
         >
          <h1 className='text-white font-bold text-[8px] sm:text-[8px] md:text-[9px]'>
            MAP
          </h1>
        </button>
      </div>
    </div>
  );
}
