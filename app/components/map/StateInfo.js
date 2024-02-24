import React from 'react';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '@/redux/features/mapSlices';

export default function OptionsMenu() {
  const { year } = useSelector(state => state.yearReducer);
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
          {/* <div className="flex items-center justify-center p-1 mb-1">
            <h1 className='text-white'>{selectedState.name}</h1>
          </div> */}
          <div>
            <p className='text-center text-white font-semibold'>
              Conferences
            </p>
            {selectedState.conferences.map((conference) => (
              <div key={conference.id}>
                <p className='font-semibold' style={{ color: `${conference.color}` }}>{conference.conference}</p>
                {conference.currentSchools.map((school) => (
                  <p key={school.id} className='text-white'>{school.name} - Member Since: {school.schoolInfo.years[0]}</p>
                ))}
              </div>
            ))}
          </div>
          <div className='text-center py-3'>
            <Button className=' text-black text-[14px] rounded-sm p-2 font-bold font-semibold bg-white border-white hover:bg-black hover:text-white hover:border-white' variant='outlined' onClick={handleClose}>
              Hide
            </Button>
          </div>
        </div>
      </Modal>
      }
    </div>
  );
}
