import React, { useEffect, useRef } from 'react';
import Modal from '@mui/material/Modal';

export default function OptionsMenu({ options, setOptions, open, setOpen }) {
  const conferences = ['SEC','Pac-12','Big 12','ACC','Big Ten','SOCON','BIG 8','Border','Southwest','C-USA','WAC','MVC','Skyline','WIUFA','SIAA','Big East','BWC','MWC','RMAC','Ivy','Sun Belt','AAC','MAC','Southland']
  const handleClose = () =>{
    setOpen(!open);
  }

  const handleOptions = (e) => {
    const value = e.target.value;
      setOptions({
        ...options,
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
          <div className='pl-2 flex flex-wrap'>
            <div className='flex items-center w-1/2'>
              <input type="checkbox" checked={options.hideLogos} value="hideLogos" onChange={handleOptions} />
              <label className='pl-2 text-[16px] text-white font-normal'>Logos off</label>
            </div>
            <div className='flex items-center w-1/2'>
              <input type="checkbox" checked={options.majorConferences} value="majorConferences" onChange={handleOptions} />
              <label className='pl-2 text-[16px] text-white font-normal'>Major Conferences (1892 - 1997)</label>
            </div>
            <div className='flex items-center w-1/2'>
              <input type="checkbox" checked={options.smallLogos} value="smallLogos" onChange={handleOptions} />
              <label className='pl-2 text-[16px] text-white font-normal'>Small Logos</label>
            </div>
            <div className='flex items-center w-1/2'>
              <input type="checkbox" checked={options.aqConferences} value="aqConferences" onChange={handleOptions} />
              <label className='pl-2 text-[16px] text-white font-normal'>AQ Conferences (1998 - 2013)</label>
            </div>
            <div className='flex items-center w-1/2'>
              <input type="checkbox" checked={options.hideHistory} value="hideHistory" onChange={handleOptions} />
              <label className='pl-2 text-[16px] text-white font-normal'>Hide History</label>
            </div>
            <div className='flex items-center w-1/2'>
              <input type="checkbox" checked={options.powerConferences} value="powerConferences" onChange={handleOptions} />
              <label className='pl-2 text-[16px] text-white font-normal'>Power Five Conferences (2014 - Present)</label>
            </div>
            <div className='flex items-center w-1/2'>
              <input type="checkbox" checked={options.hideLegend} value="hideLegend" onChange={handleOptions} />
              <label className='pl-2 text-[16px] text-white font-normal'>Hide Legend</label>
            </div>
            <div className='hidden md:flex items-center w-1/2'>
              <input type="checkbox" checked={options.hideHeader} value="hideHeader" onChange={handleOptions} />
              <label className='pl-2 text-[16px] text-white font-normal'>Hide Header</label>
            </div>
            <div className='flex items-center w-1/2'>
              <input type="checkbox" checked={options.conFilter} value="conFilter" onChange={handleOptions} />
              <label className='pl-2 text-[16px] text-white font-normal'>Filter by Conference</label>
            </div>
            <div className='hidden md:flex items-center w-1/2'>
              <input type="checkbox" checked={options.hideYear} value="hideYear" onChange={handleOptions} />
              <label className='pl-2 text-[16px] text-white font-normal'>Hide Year Bar</label>
            </div>
          </div>
          <p className='flex flex-col p-3 text-center text-[18px] text-white font-semibold'>Conferences</p>
            <div className='pl-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5'>
              {options.conFilter &&
                conferences.map((conference) => (
                  <div key={conference} className='flex items-center'>
                    <input
                      type="checkbox"
                      checked={options[conference]}
                      value={conference}
                      onChange={handleOptions}
                    />
                    <label className='pl-2 text-[16px] text-white font-normal'>{conference}</label>
                  </div>
                ))
              }
            </div>


          <div className='text-center py-3'>
            <button className='bg-white text-black text-[16px] rounded p-2 font-bold' onClick={handleClose}>
              Hide
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
