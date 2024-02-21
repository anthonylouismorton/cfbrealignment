import React from 'react';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { setSchool } from '@/redux/features/mapSlices';

export default function OptionsMenu() {
  const { year } = useSelector(state => state.yearReducer);
  const { selectedSchool, schoolModal } = useSelector(state => state.mapReducer);
  const dispatch = useDispatch();
  const handleClose = () =>{
    dispatch(setSchool({modal: !schoolModal, school: null}));
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
            <Image
              width={40}
              height={40}
              className='max-h-[40px] max-w-auto mr-4 p-1'
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
            {selectedSchool.schoolInfo.rejoined && selectedSchool.schoolInfo.rejoined.some(x => x.year <= year) ?
              <div>
              <p className='text-white'>
                First Joined: {selectedSchool.schoolInfo.years[0]}
              </p>
              <p className='text-white'>
                Rejoined Conference: {selectedSchool.schoolInfo.rejoined[0].year} from {selectedSchool.schoolInfo.rejoined[0].oldConference}
              </p>
              </div>
              :
              <p className='text-white'>
                Member Since: {selectedSchool.schoolInfo.years[0]}
              </p>
            }
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
