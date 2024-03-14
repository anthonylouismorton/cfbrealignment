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
    <div className='text-center overflow-x-auto'>
      <div className="inline-block text-left legend-history-container pb-5">
        <p className="text-md md:text-lg lg:text-xl xl:text-2xl font-semibold pb-2 text-white text-center">History</p>
        {conferenceChanges.map((change, index) => (
          <div key={index} className='mb-1'>
            {change.change === 'dropped' && (
              <div className='flex text-center items-center'>
                  <div style={{color: `${change.primaryColor}`}} className="mr-2 change-conference text-sm xl:text-md 2xl:text-lg font-bold">{change.abbreviation}</div>
                  <div className="change-conference text-md text-white">to</div>
                  <div className="ml-2 change-conference text-sm xl:text-md 2xl:text-lg font-bold text-white">{`Division ${change.division}`}</div>
              </div>
            )}
            {change.change === 'founded' && (
              <div className='flex text-center items-center'>
                {change.logo ? (
                <div className="change-logo mr-1 sm:mr-2 flex items-center bg-white p-1">
                  <img
                    onMouseOver={() => sethovered(index)}
                    onMouseLeave={() => sethovered(null)}
                    className='h-auto min-w-[35px] w-[35px] p-[1px]'
                    src={change.logo} alt={`${change.abbreviation} logo`} 
                  />
                  {hovered === index &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                      {change.conference}
                    </div>
                  }
                </div>
                ) : (
                  <div style={{color: `${change.mapColor}`}} className="change-conference mr-1 sm:mr-2 text-md font-bold">{change.abbreviation}</div>
                )}
                <div className="change-conference text-md text-white">founded</div>
              </div>
            )}
            {change.change === 'disbanded' && (
              <div className='flex text-center items-center'>
               {change.logo ? (
                 <div className="change-logo mr-1 sm:mr-2 flex items-center bg-white p-1">
                   <img
                     onMouseOver={() => sethovered(index)}
                     onMouseLeave={() => sethovered(null)}
                     className='h-auto min-w-[35px] w-[35px] p-[1px]'
                     src={change.logo} alt={`${change.abbreviation} logo`} 
                   />
                   {hovered === index &&
                     <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                       {change.abbreviation}
                     </div>
                   }
                 </div>
                 ) : (
                   <div style={{color: `${change.mapColor}`}} className="change-conference mr-1 sm:mr-2 text-md font-bold">{change.abbreviation}</div>
                 )}
                 <div className="change-conference text-md text-white">disbanded</div>
              </div>
            )}
            {change.change === 'left' && (
              <div className='flex text-center items-center'>
                <div className="mr-1 sm:mr-2 flex items-center overflow-visible bg-white p-1 relative">
                  <img
                    onMouseOver={() => sethovered(index + change.school)}
                    onMouseLeave={() => sethovered(null)}
                    className='h-auto min-w-[35px] w-[35px] p-[1px]'
                    src={change.logo} alt={`${change.school} logo`}
                  />
                  {hovered === index + change.school &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                        {change.school}
                      </div>
                  }
                </div>
                <div className="text-md mr-1 sm:mr-2 text-white">leaves</div>
                {change.oldConferenceLogo ? (
                  <div className="mr-1 sm:mr-2 flex items-center bg-white p-1">
                    <img
                      onMouseOver={() => sethovered(index + change.oldConferenceAbrr)}
                      onMouseLeave={() => sethovered(null)}
                      className='h-auto min-w-[35px] w-[35px] p-[1px]'
                      src={change.oldConferenceLogo} alt={`old conference logo`}
                    />
                    {hovered === index + change.oldConferenceAbrr &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                        {change.oldConferenceAbrr}
                      </div>
                    }
                  </div>
                ) : (
                  <div style={{color: `${change.oldConferenceColor}`}} className="mr-1 sm:mr-2 text-md font-bold">{change.oldConferenceAbrr}</div>
                )}
                {change.newConferenceAbbr === "FBS" ? (
                  <div>
                    <p className="text-md text-white">becomes<span className="text-md font-bold text-blue-400 ml-1 sm:ml-2">IND</span></p>
                  </div>
                ) : (
                  <div className='flex'>
                    <div flex className='flex items-center'>
                      <div className="text-md text-white">joins</div>
                    </div>
                    {change.newConferenceLogo ? (
                      <div className="ml-1 sm:ml-2 flex items-center bg-white p-1">
                        <img
                          onMouseOver={() => sethovered(index + change.newConferenceAbbr)}
                          onMouseLeave={() => sethovered(null)}
                          width={30}
                          height={30}
                          className='h-auto min-w-[35px] w-[35px] p-[1px]'
                          src={change.newConferenceLogo} alt={`new conference logo`}
                        />
                        {hovered === index + change.newConferenceAbbr &&
                          <div className="bg-white max-w-24 text-black text-center text-[10px] absolute translate-y-2 top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                          {change.newConferenceAbbr}
                          </div>
                        }
                      </div>
                    ) : (
                      <div style={{ color: change.newConferenceColor ? change.newConferenceColor : 'red' }} className="ml-1 sm:ml-2 text-md font-bold">
                        {change.newConferenceAbbr}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {change.change === 'joined' && (
              <div className='flex text-center items-center'>
                <div className="change-logo mr-1 sm:mr-2 flex items-center bg-white p-1">
                  <img
                    onMouseOver={() => sethovered(index + change.school)}
                    onMouseLeave={() => sethovered(null)}
                    className='h-auto min-w-[35px] w-[35px] p-[1px]'
                    src={change.logo} alt={`${change.school} logo`}
                  />
                  {hovered === index + change.school &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                        {change.school}
                      </div>
                  }
                </div>
                <div className="change-logo flex items-center">
                  <div className="change-conference text-md text-white">joins</div>
                </div>
                <div className="change-logo ml-1 sm:ml-2 flex items-center">
                  {change.conferenceLogo ? (
                    <div className="change-logo flex items-center bg-white p-1">
                      <img
                        onMouseOver={() => sethovered(index + change.conference)}
                        onMouseLeave={() => sethovered(null)}
                        className='h-auto min-w-[35px] w-[35px] p-[1px]'
                        src={change.conferenceLogo} alt={`${change.conference} logo`} 
                      />
                      {hovered === index + change.conference &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                        {change.conference}
                      </div>
                      }
                    </div>
                  ) : (
                    <div style={{color: `${change.mapColor}`}} className="change-conference text-md font-bold">{change.conference}</div>
                  )}
                </div>
              </div>
            )}
            {change.change === 'rejoined' && (
              <div className='flex text-center items-center'>
                <div className="change-logo mr-1 sm:mr-2 flex items-center bg-white p-1 relative">
                  <img
                    onMouseOver={() => sethovered(index + change.school)}
                    onMouseLeave={() => sethovered(null)}
                    className='h-auto min-w-[35px] w-[35px] p-[1px]'
                    src={change.logo} alt={`${change.school} logo`} 
                  />
                  {hovered === index + change.school &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                        {change.school}
                      </div>
                  }
                </div>
                <div className="change-logo flex items-center">
                  <div className="change-conference text-md text-white">rejoins</div>
                </div>
                <div className="change-logo ml-1 sm:ml-2 flex items-center">
                  {change.conferenceLogo ? (
                    <div className="change-logo mr-1 sm:mr-2 flex items-center bg-white p-1">
                      <img
                        onMouseOver={() => sethovered(index + change.conference)}
                        onMouseLeave={() => sethovered(null)}
                        className='h-auto min-w-[35px] w-[35px] p-[1px]'
                        src={change.conferenceLogo} alt={`${change.conference} logo`} 
                      />
                      {hovered === index + change.conference &&
                        <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">  
                          {change.conference}
                        </div>
                      }
                    </div>
                    ) : (
                      <div style={{color: `${change.mapColor}`}} className="change-conference text-md font-bold">{change.conference}</div>
                    )}
                </div>
              </div>
            )}
            {change.change === 'nameChange' && (
              <div className='flex text-center items-center'>
                <div style={{color: `${change.mapColor}`}} className="mr-1 change-conference text-sm xl:text-md 2xl:text-lg font-bold">{change.oldName}</div>
                <div className="change-conference text-sm xl:text-sm 2xl:text-md text-white">rebrands to</div>
                <div style={{color: `${change.mapColor}`}}  className="ml-1 change-conference text-sm xl:text-md 2xl:text-lg font-bold">{change.newName}</div>
              </div>
            )}
            {change.change === 'history' && (
              <div  className='flex text-center items-center'>
                <div className="p-4 change-conference text-md text-white font-semibold">{change.event}</div>
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