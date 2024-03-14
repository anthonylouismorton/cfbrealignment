import React from 'react';
import Modal from '@mui/material/Modal';

import { useSelector, useDispatch } from 'react-redux';
import { setState } from '@/redux/features/mapSlices';

export default function StateInfo() {
  const year = useSelector(state => state.yearReducer);
  const { selectedState, stateModal } = useSelector(state => state.mapReducer);
  const dispatch = useDispatch();
  const handleClose = () =>{
    dispatch(setState({modal: !stateModal, state: null}));
  };

  return (
    <div>
      {selectedState &&
      <Modal
        open={stateModal}
        onClose={handleClose}
        >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-h-full overflow-y-auto max-w-[600px] bg-black px-5 pt-4 pb-1 rounded">
          <div>
            <p className='text-center text-white font-semibold'>
              Conferences
            </p>
            {selectedState.conferences.map((conference) => (
              <div key={conference.id}>
                <p className='font-semibold' style={{ color: `${conference.color}` }}>{conference.conference}</p>
                {conference.currentSchools.map((school) => {
                  const { rejoined } = school.schoolInfo;
                  if(!rejoined){
                    return(
                      <p key={school.id} className='text-white'>
                        {school.name} - Member Since: {school.schoolInfo.years[0]}
                      </p>
                    );
                  }
                  else{
                    var rejoinYear = null
                    for(const rejoin of rejoined){
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
                    if(rejoinYear){
                      return(
                        <p key={school.id} className='text-white'>
                          {school.name} - Rejoined: {rejoinYear.year}
                        </p>
                      )
                    }
                    else{
                      return(
                        <p key={school.id} className='text-white'>
                          {school.name} - Member Since: {school.schoolInfo.years[0]}
                        </p>
                      ); 
                    }
                  }
                })}
              </div>
            ))}
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
