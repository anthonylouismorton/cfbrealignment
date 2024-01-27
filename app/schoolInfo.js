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
  console.log(selectedschool)
  return (
    <div>
      <Modal
        open={schoolmodal}
        onClose={handleClose}
        >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-h-full overflow-y-auto max-w-[600px] bg-black bg-opacity-80 px-5 pt-4 pb-1 rounded">
        <div className="flex items-center justify-center p-1 mb-1">
          <Image
            width={40}
            height={40}
            className='max-h-[40px] max-w-auto mr-4'
            src={selectedschool.logo}
            alt={`${selectedschool.abbreviation} logo`} 
          />
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
          {/* <div className='pl-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={options.showLocation}
                value="showLocation"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>School Locations</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={options.showLogos}
                value="showLogos"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Show Logos</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={options.majorConferences}
                value="majorConferences"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Major Conferences</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={options.smallLogos}
                value="smallLogos"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Small Logos</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={options.aqConferences}
                value="aqConferences"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>AQ Conferences</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={options.hideHistory}
                value="hideHistory"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Hide History</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={options.powerConferences}
                value="powerConferences"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Power 5 Conferences</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={options.hideLegend}
                value="hideLegend"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Hide Legend</label>
            </div>
            <div className='hidden md:flex items-center w-full'>
              <input
                type="checkbox"
                checked={options.hideHeader}
                value="hideHeader"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Hide Header</label>
            </div>
            <div className='hidden md:flex items-center w-full'>
              <input
                type="checkbox"
                checked={options.hideYear}
                value="hideYear"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Hide Year Bar</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={options.conFilter}
                value="conFilter"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Filter by Conference</label>
            </div>
          </div>
          <p className='flex flex-col p-3 text-center text-[18px] text-white font-semibold'>Conferences</p>
            <div className='pl-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5'>
              {options.conFilter && conList &&
                Object.entries(conList).map(([conference, checked]) => (
                  <div key={conference} className='flex items-center'>
                    <input
                      type="checkbox"
                      checked={checked}
                      value={conference}
                      onChange={handleConferences}
                    />
                    <label className='pl-2 text-[16px] text-white font-normal'>{conference}</label>
                  </div>
                ))
              }
            </div> */}
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
