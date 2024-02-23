import React from 'react';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { setSchool } from '@/redux/features/mapSlices';

export default function OptionsMenu() {
  const { year } = useSelector(state => state.yearReducer);
  const { selectedState, stateModal } = useSelector(state => state.mapReducer);
  const dispatch = useDispatch();
  const handleClose = () =>{
    dispatch(setSchool({modal: !stateModal, school: null}));
  }

  return (
    <div>
      {selectedState &&
      <Modal
        open={stateModal}
        onClose={handleClose}
        >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-h-full overflow-y-auto max-w-[600px] bg-black bg-opacity-90 px-5 pt-4 pb-1 rounded">
          <h1 className='text-white'>{selectedState.state}</h1>
          {/* <div className="flex items-center justify-center p-1 mb-1">
            {selectedState.logo &&
              <Image
                width={40}
                height={40}
                className='max-h-[40px] max-w-auto mr-4 p-1'
                src={selectedState.logo}
                alt={`${selectedState.abbreviation} logo`} 
              />
            }
            <span className='text-center text-[20px] text-white font-semibold'>
              {selectedState.name}
            </span>
          </div>
          <div>
            <p className='text-white'>
              Conference: {selectedState.conference}
            </p>
            {selectedState.schoolInfo.rejoined && selectedState.schoolInfo.rejoined.some(x => x.year <= year) ?
              <div>
              <p className='text-white'>
                First Joined: {selectedState.schoolInfo.years[0]}
              </p>
              <p className='text-white'>
                Rejoined Conference: {selectedState.schoolInfo.rejoined[0].year} from {selectedState.schoolInfo.rejoined[0].oldConference}
              </p>
              </div>
              :
              <p className='text-white'>
                Member Since: {selectedState.schoolInfo.years[0]}
              </p>
            }
          </div>
          <div className='text-center py-3'>
            <Button className=' text-black text-[14px] rounded-sm p-2 font-bold font-semibold bg-white border-white hover:bg-black hover:text-white hover:border-white' variant='outlined' onClick={handleClose}>
              Hide
            </Button>
          </div> */}
        </div>
      </Modal>
      }
    </div>
  );
}
