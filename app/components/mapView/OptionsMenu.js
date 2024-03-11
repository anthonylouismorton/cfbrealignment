import React from 'react';
import Modal from '@mui/material/Modal';
import { changeOption } from '../../../redux/features/optionsSlices';
import { filterCon } from '@/redux/features/conFilterSlices';
import { useDispatch, useSelector } from 'react-redux';

export default function OptionsMenu({open, setOpen}) {
  const dispatch = useDispatch();
  const option = useSelector((state) => state.optionsReducer);
  const conFilter = useSelector(state => state.conFilterReducer);
  const handleClose = () =>{
    setOpen(!open);
  }

  const handleOptions = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (value === "smallLogos" && checked === true) {
      dispatch(changeOption({ option: value, value: checked }));
      dispatch(changeOption({ option: "showLogos", value: checked }));
    }  
    if (value === "showLogos" && checked === false) {
      dispatch(changeOption({ option: value, value: checked }));
      dispatch(changeOption({ option: "smallLogos", value: checked }));
    }  
    else{
      dispatch(changeOption({option: value, value: checked}))
    }
  };
  

  const handleConferences = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
      dispatch(filterCon({ option: value, value: checked }));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-h-full overflow-y-auto max-w-[700px] bg-black bg-opacity-80 py-4 px-6 rounded">
          <p className='flex flex-col p-3 text-center text-[20px] text-white font-semibold'>SETTINGS</p>
          <div className='pl-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={option.showLocation}
                value="showLocation"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>School Locations</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={option.showLogos}
                value="showLogos"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Show Logos</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={option.majorConferences}
                value="majorConferences"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Major Conferences</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={option.smallLogos}
                value="smallLogos"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Small Logos</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={option.aqConferences}
                value="aqConferences"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>AQ Conferences</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={option.hideHistory}
                value="hideHistory"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Hide History</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={option.powerConferences}
                value="powerConferences"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Power 5 Conferences</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={option.hideLegend}
                value="hideLegend"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Hide Legend</label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type="checkbox"
                checked={option.conFilter}
                value="conFilter"
                onChange={handleOptions}
              />
              <label className='pl-2 text-[16px] text-white font-normal'>Filter by Conference</label>
            </div>
          </div>
            {option.conFilter && conFilter &&
              <p className='flex flex-col p-3 text-center text-[18px] text-white font-semibold'>Conferences</p>
            }
            <div className='pl-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5'>
              {option.conFilter && conFilter &&
                Object.entries(conFilter).map(([conference, checked]) => (
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
          <div className='text-center py-3 pt-6'>
            <button className='text-black text-[12px] sm:text-[12px] md:text-[14px] font-semibold bg-white border border-white hover:bg-black hover:text-white hover:border-white p-2 rounded-sm' onClick={handleClose}>
              Hide
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
