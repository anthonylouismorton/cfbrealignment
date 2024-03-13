import React, { useState } from 'react';
import Rejoined from './Rejoined';
import Joined from './Joined';
import Left from './Left';
import Disbanded from './Disbanded';
import Founded from './Founded';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import '../../../../Legend.css'

function ConferenceHistory() {
  let { conferenceChanges } = useSelector(state => state.conInfoReducer);
  const [ hovered, sethovered] = useState(null);
  
  return (
    <div className="w-full pl-1 pr-1 pb-5 legend-history-container overflow-visible">
      <div className="text-center flex flex-col" id="change">
        <p className="text-md md:text-lg lg:text-xl font-semibold pb-2 text-white">History</p>
        <div className='flex flex-wrap flex-column items-center w-full'>
          {conferenceChanges.map((change, index) => (
            <div key={index} className="change-item flex justify-center items-center pl-[1px] pr-[1px] mb-2 w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-full 2xl:w-full">
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
    </div>
  );
}

export default ConferenceHistory;
