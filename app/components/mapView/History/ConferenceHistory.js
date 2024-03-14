import React, { useState } from 'react';
import Rejoined from './Rejoined';
import Joined from './Joined';
import Left from './Left';
import Disbanded from './Disbanded';
import Founded from './Founded';
import { useSelector } from 'react-redux';
import '../../../../Legend.css'

function ConferenceHistory() {
  let { conferenceChanges } = useSelector(state => state.conInfoReducer);
  const [ hovered, sethovered] = useState(null);
  
  return (
    <div className='text-center'>
      <div className="inline-block text-left legend-history-container overflow-auto pb-5">
        <p className="text-md md:text-lg lg:text-xl xl:text-2xl font-semibold pb-2 text-white text-center">History</p>
        {conferenceChanges.map((change, index) => (
          <div>
            {change.change === 'dropped' && (
              <div key={index} className='flex text-center items-center'>
                  <div style={{color: `${change.primaryColor}`}} className="mr-2 change-conference text-sm xl:text-md 2xl:text-lg font-bold">{change.abbreviation}</div>
                  <div className="change-conference text-sm text-white">to</div>
                  <div className="ml-2 change-conference text-sm xl:text-md 2xl:text-lg font-bold text-white">{`Division ${change.division}`}</div>
              </div>
            )}
            {change.change === 'founded' && (
              <Founded change={change} index={index} sethovered={sethovered} hovered={hovered}/>
            )}
            {change.change === 'disbanded' && (
              <Disbanded change={change} index={index} sethovered={sethovered} hovered={hovered}/>
            )}
            {change.change === 'left' && (
              <Left change={change} index={index} sethovered={sethovered} hovered={hovered}/>
            )}
            {change.change === 'joined' && (
              <Joined change={change} index={index} sethovered={sethovered} hovered={hovered}/>
            )}
            {change.change === 'rejoined' && (
              <Rejoined change={change} index={index} sethovered={sethovered} hovered={hovered}/>
            )}
            {change.change === 'nameChange' && (
              <div key={index} className='flex text-center items-center'>
                <div style={{color: `${change.mapColor}`}} className="mr-1 change-conference text-sm xl:text-md 2xl:text-lg font-bold">{change.oldName}</div>
                <div className="change-conference text-sm xl:text-sm 2xl:text-md text-white">rebrands to</div>
                <div style={{color: `${change.mapColor}`}}  className="ml-1 change-conference text-sm xl:text-md 2xl:text-lg font-bold">{change.newName}</div>
              </div>
            )}
            {change.change === 'history' && (
              <div  key={index} className='flex text-center items-center'>
                <div className="p-4 change-conference text-sm text-white font-semibold">{change.event}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConferenceHistory;



// className='lg:max-h-[30px] xl:max-w-[40px] xl:max-h-[30px] xl:max-w-[40px]'