import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowList } from '@/redux/features/layoutSlices';

export default function View() {
  const dispatch = useDispatch();
  const { showList } = useSelector((state)=> state.layoutReducer);
  return (
    <div className='menu-container z-10 flex justify-end pr-1 lg:pr-2'>
      <div>
        <button
          onClick={()=> dispatch(setShowList(!showList))}
          className="flex flex-col items-center text-center font-bold"
         >
          <h1 className='pr-2 mt-5 text-[8px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px]' style={{color: 'white', letterSpacing: '3px', transform: 'rotate(180deg)', writingMode: 'vertical-lr', lineHeight: '1.2'}}>
            {showList ? "MAP" : "LIST"}
          </h1>
        </button>
      </div>
    </div>
  );
}
