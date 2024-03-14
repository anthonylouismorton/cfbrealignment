import React from 'react';
import Modal from '@mui/material/Modal';

import { useSelector, useDispatch } from 'react-redux';
import { setSchool } from '@/redux/features/mapSlices';
import { select } from 'd3';

export default function OptionsMenu() {
  const year = useSelector(state => state.yearReducer);
  const { selectedSchool, schoolModal } = useSelector(state => state.mapReducer);
  const dispatch = useDispatch();

  const handleClose = () =>{
    dispatch(setSchool({modal: !schoolModal, school: null}));
  }

  var rejoinYear = null
  if(selectedSchool){
    if(selectedSchool.schoolInfo.rejoined){
      for(const rejoin of selectedSchool.schoolInfo.rejoined){
        if(rejoin.year <= year){
          if(!rejoinYear){
            rejoinYear = rejoin;
          }
          else{
            if(rejoin.year > rejoinYear.year){
              rejoinYear = rejoin
            }
          }
        }
      }
    }
  }

  return (
    <div>
      {selectedSchool &&
      <Modal
        open={schoolModal}
        onClose={handleClose}
        >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-h-full overflow-y-auto max-w-[600px] bg-black bg-opacity-90 px-5 pt-4 pb-1 rounded">
        <div className="flex items-center justify-center p-1 mb-1">
          {selectedSchool.logo &&
            <img
              className='max-h-[40px] max-w-auto mr-4 p-[1px]'
              src={selectedSchool.logo}
              alt={`${selectedSchool.abbreviation} logo`} 
            />
          }
          <span className='text-center text-[20px] text-white font-semibold'>
            {selectedSchool.name}
          </span>
        </div>
          <div>
            <p className='text-white'>
              Conference: {selectedSchool.conference}
            </p>
            {rejoinYear ? (
              <p className='text-white'>
                Rejoined: {rejoinYear.year}
              </p>
            ) : (
              <p className='text-white'>
                Member Since: {selectedSchool.schoolInfo.years[0]}
              </p>
            )}
          </div>
          <div className='text-center py-3'>
            <button className='text-black text-[12px] sm:text-[12px] md:text-[14px] font-semibold bg-white border border-white hover:bg-black hover:text-white hover:border-white p-2 rounded-sm' onClick={handleClose}>
              Hide
            </button>
          </div>
        </div>
      </Modal>
      }
    </div>
  );
}
