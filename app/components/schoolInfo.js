import React, { useEffect, useRef } from 'react';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import Image from 'next/image';

export default function OptionsMenu({schoolmodal, setschoolmodal, selectedschool, setselectedschool, currentYear}) {
  const handleClose = () =>{
    setschoolmodal(!schoolmodal);
    setselectedschool(null);
  }
  var schoolInfo = selectedschool.schoolInfo

  return (
    <div>
      <Modal
        open={schoolmodal}
        onClose={handleClose}
        >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-h-full overflow-y-auto max-w-[600px] bg-black bg-opacity-90 px-5 pt-4 pb-1 rounded">
        <div className="flex items-center justify-center p-1 mb-1">
          {selectedschool.logo &&
            <Image
              width={40}
              height={40}
              className='max-h-[40px] max-w-auto mr-4 p-1'
              src={selectedschool.logo}
              alt={`${selectedschool.abbreviation} logo`} 
            />
          }
          <span className='text-center text-[20px] text-white font-semibold'>
            {selectedschool.name}
          </span>
        </div>
          <div>
            <p className='text-white'>
              Conference: {selectedschool.conference}
            </p>
            {schoolInfo.rejoined && schoolInfo.rejoined.some(x => x.year <= currentYear) ?
              <div>
              <p className='text-white'>
                First Joined: {schoolInfo.years[0]}
              </p>
              <p className='text-white'>
                Rejoined Conference: {schoolInfo.rejoined[0].year} from {schoolInfo.rejoined[0].oldConference}
              </p>
              </div>
              :
              <p className='text-white'>
                Member Since: {schoolInfo.years[0]}
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
    </div>
  );
}
