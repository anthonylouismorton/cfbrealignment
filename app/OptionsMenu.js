import React, { useEffect, useRef } from 'react';
import Modal from '@mui/material/Modal';

export default function OptionsMenu({ options, setOptions, open, setOpen, conList, setConList}) {
  const handleClose = () =>{
    setOpen(!open);
  }

  const handleOptions = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (value === "conFilter") {
      setConList((prevConList) => {
        const updatedConList = { ...prevConList };
        Object.keys(updatedConList).forEach((conference) => {
          updatedConList[conference] = checked;
        });
        return updatedConList;
      });
    }  
    if (value === "showLocation" && checked === false) {
      setOptions({
        ...options,
        showLocation: checked,
        showLogos: checked,
      });
    }
    if (value === "smallLogos" && checked === true) {
      setOptions({
        ...options,
        showLogos: checked,
        [value]: checked
      });
    }  
    if (value === "showLogos" && checked === false) {
      setOptions({
        ...options,
        smallLogos: checked,
        [value]: checked
      });
    }  
    else{
      setOptions({
        ...options,
        [value]: checked,
      });
    }
  };
  

  const handleConferences = (e) => {
    const value = e.target.value;
      setConList({
        ...conList,
        [value]: e.target.checked,
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-h-full overflow-y-auto max-w-[700px] bg-black bg-opacity-80 p-6 rounded">
          <p className='flex flex-col p-3 text-center text-[20px] text-white font-semibold'>SETTINGS</p>
          <div className='pl-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
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
            </div>
          <div className='text-center py-3'>
          <button className='absolute bottom-5 right-5 text-black text-[12px] sm:text-[12px] md:text-[14px] font-semibold bg-white border border-white hover:bg-black hover:text-white hover:border-white p-2 rounded-sm' onClick={handleClose}>
            Hide
          </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
