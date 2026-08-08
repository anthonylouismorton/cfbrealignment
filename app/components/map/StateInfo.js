import React from 'react';
import Modal from '@mui/material/Modal';

import { useSelector, useDispatch } from 'react-redux';
import { setState } from '@/redux/features/mapSlices';
import schoolHistory from '../../data/schoolHistory.json';

// Present-tense end years look like a spoiler if you're viewing an earlier
// year than the recorded end -- e.g. a stint that ends in 1932 shouldn't say
// "1932" while you're looking at 1922. Only the stint actually covering the
// currently-viewed year gets labeled "present"; anything that already
// closed by that year shows its real end year.
function formatRange(stint, isCurrent) {
  if (isCurrent) return `${stint.startYear}–present`;
  if (stint.startYear === stint.endYear) return `${stint.startYear}`;
  return `${stint.startYear}–${stint.endYear}`;
}

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
            {selectedState.conferences.map((conference, index) => (
              <div key={index}>
                <p className='font-semibold' style={{ color: `${conference.color}` }}>{conference.conference}</p>
                {conference.currentSchools.map((school, schoolIndex) => {
                  const history = (schoolHistory[school.name]?.conferenceHistory || [])
                    .filter((stint) => stint.startYear <= year);
                  return (
                    <div key={schoolIndex} className='flex items-start mb-2'>
                      {school.schoolInfo?.logo &&
                        <img
                          className='h-auto w-[20px] min-w-[20px] mr-2 mt-[2px] bg-white p-[1px]'
                          src={school.schoolInfo.logo}
                          alt={`${school.name} logo`}
                        />
                      }
                      <div>
                        <p className='text-white font-semibold'>{school.name}</p>
                        {history.length > 0 ? (
                          history.map((stint, i) => {
                            const isCurrent = i === history.length - 1 && stint.endYear >= year;
                            return (
                              <p key={i} className='text-[13px]' style={{ color: '#b4b4b4' }}>
                                {stint.conference}: {formatRange(stint, isCurrent)}
                              </p>
                            );
                          })
                        ) : (
                          <p className='text-[13px]' style={{ color: '#b4b4b4' }}>
                            Member since: {school.schoolInfo.years[0]}
                          </p>
                        )}
                      </div>
                    </div>
                  );
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
