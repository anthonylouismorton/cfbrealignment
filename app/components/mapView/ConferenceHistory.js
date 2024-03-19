import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../../Legend.css'

function ConferenceHistory() {
  let { conferenceChanges } = useSelector(state => state.conInfoReducer);
  const { mapHeight } = useSelector((state)=> state.layoutReducer);
  const [ hovered, sethovered] = useState(null);
  
  return (
    <div>
      <div className="inline-block legend-history-container w-full flex flex-col items-center pb-5" style={{height: mapHeight? `${mapHeight}px` : "auto"}}>
        <p className="xl:text-xl 2xl:text-2xl font-semibold pb-2 text-white text-center">History</p>
        {conferenceChanges.map((change, index) => (
          <div key={index} className='flex xl:mb-1 w-[90%] items-center'>
            {change.change === 'dropped' && (
              <div className='flex items-center'>
                  <div style={{color: `${change.primaryColor}`}} className="mr-1 text-xs xl:text-sm 2xl:text-base font-bold">{change.abbreviation}</div>
                  <div className="text-xs xl:text-sm 2xl:text-base text-white">drops to</div>
                  <div className="ml-1 text-xs xl:text-sm 2xl:text-base font-bold text-white">{`Division ${change.division}`}</div>
              </div>
            )}
            {change.change === 'founded' && (
              <div className='flex text-center items-center'>
                {change.logo ? (
                <div className="mr-1 flex items-center bg-white p-1 relative">
                  <img
                    onMouseOver={() => sethovered(index)}
                    onMouseLeave={() => sethovered(null)}
                    className='h-auto min-w-[20px] w-[20px] xl:min-w-[28px] xl:w-[28px] 2xl:min-w-[35px] 2xl:w-[35px] p-[1px]'
                    src={change.logo} alt={`${change.abbreviation} logo`} 
                  />
                  {hovered === index &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                      {change.conference}
                    </div>
                  }
                </div>
                ) : (
                  <div style={{color: `${change.mapColor}`}} className="mr-1 text-xs xl:text-sm 2xl:text-base font-bold">{change.abbreviation}</div>
                )}
                <div className="text-xs xl:text-sm 2xl:text-base text-white">founded</div>
              </div>
            )}
            {change.change === 'disbanded' && (
              <div className='flex text-center items-center'>
               {change.logo ? (
                 <div className="mr-1 flex items-center bg-white p-1 relative">
                   <img
                     onMouseOver={() => sethovered(index)}
                     onMouseLeave={() => sethovered(null)}
                     className='h-auto min-w-[20px] w-[20px] xl:min-w-[28px] xl:w-[28px] 2xl:min-w-[35px] 2xl:w-[35px] p-[1px]'
                     src={change.logo} alt={`${change.abbreviation} logo`} 
                   />
                   {hovered === index &&
                     <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                       {change.abbreviation}
                     </div>
                   }
                 </div>
                 ) : (
                   <div style={{color: `${change.mapColor}`}} className="mr-1 text-xs xl:text-sm 2xl:text-base font-bold">{change.abbreviation}</div>
                 )}
                 <div className="text-xs xl:text-sm 2xl:text-base text-white">disbanded</div>
              </div>
            )}
            {change.change === 'left' && (
              <div className='flex text-center items-center'>
                <div className="mr-1 flex items-center overflow-visible bg-white p-1 relative">
                  <img
                    onMouseOver={() => sethovered(index + change.school)}
                    onMouseLeave={() => sethovered(null)}
                    className='h-auto min-w-[20px] w-[20px] xl:min-w-[28px] xl:w-[28px] 2xl:min-w-[35px] 2xl:w-[35px] p-[1px]'
                    src={change.logo} alt={`${change.school} logo`}
                  />
                  {hovered === index + change.school &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                        {change.school}
                      </div>
                  }
                </div>
                <div className="text-xs xl:text-sm 2xl:text-base mr-1 text-white">leaves</div>
                {change.oldConferenceLogo ? (
                  <div className="mr-1 flex items-center bg-white p-1 relative">
                    <img
                      onMouseOver={() => sethovered(index + change.oldConferenceAbrr)}
                      onMouseLeave={() => sethovered(null)}
                      className='h-auto min-w-[20px] w-[20px] xl:min-w-[28px] xl:w-[28px] 2xl:min-w-[35px] 2xl:w-[35px] p-[1px]'
                      src={change.oldConferenceLogo} alt={`old conference logo`}
                    />
                    {hovered === index + change.oldConferenceAbrr &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                        {change.oldConferenceAbrr}
                      </div>
                    }
                  </div>
                ) : (
                  <div style={{color: `${change.oldConferenceColor}`}} className="mr-1 text-xs xl:text-sm 2xl:text-base font-bold">{change.oldConferenceAbrr}</div>
                )}
                {change.newConferenceAbbr === "FBS" ? (
                  <div>
                    <p className="text-xs xl:text-sm 2xl:text-base text-white">becomes<span className="text-xs xl:text-sm 2xl:text-base font-bold text-blue-400 ml-1">IND</span></p>
                  </div>
                ) : (
                  <div className='flex'>
                    <div className='flex items-center'>
                      <div className="text-xs xl:text-sm 2xl:text-base mr-1 text-white">joins</div>
                    </div>
                    {change.newConferenceLogo ? (
                      <div className="flex items-center bg-white p-1 relative">
                        <img
                          onMouseOver={() => sethovered(index + change.newConferenceAbbr)}
                          onMouseLeave={() => sethovered(null)}
                          className='h-auto min-w-[20px] w-[20px] xl:min-w-[28px] xl:w-[28px] 2xl:min-w-[35px] 2xl:w-[35px] p-[1px]'
                          src={change.newConferenceLogo} alt={`new conference logo`}
                        />
                        {hovered === index + change.newConferenceAbbr &&
                          <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                          {change.newConferenceAbbr}
                          </div>
                        }
                      </div>
                    ) : (
                      <div style={{ color: change.newConferenceColor ? change.newConferenceColor : 'red' }} className="text-xs xl:text-sm 2xl:text-base font-bold">
                        {change.newConferenceAbbr}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {change.change === 'joined' && (
              <div className='flex text-center items-center'>
                <div className="mr-1 flex items-center bg-white p-1 relative">
                  <img
                    onMouseOver={() => sethovered(index + change.school)}
                    onMouseLeave={() => sethovered(null)}
                    className='h-auto min-w-[20px] w-[20px] xl:min-w-[28px] xl:w-[28px] 2xl:min-w-[35px] 2xl:w-[35px] p-[1px]'
                    src={change.logo} alt={`${change.school} logo`}
                  />
                  {hovered === index + change.school &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                        {change.school}
                      </div>
                  }
                </div>
                <div className="flex items-center">
                  <div className="text-xs xl:text-sm 2xl:text-base text-white mr-1">joins</div>
                </div>
                <div className="flex items-center">
                  {change.conferenceLogo ? (
                    <div className="flex items-center bg-white p-1 relative">
                      <img
                        onMouseOver={() => sethovered(index + change.conference)}
                        onMouseLeave={() => sethovered(null)}
                        className='h-auto min-w-[20px] w-[20px] xl:min-w-[28px] xl:w-[28px] 2xl:min-w-[35px] 2xl:w-[35px] p-[1px]'
                        src={change.conferenceLogo} alt={`${change.conference} logo`} 
                      />
                      {hovered === index + change.conference &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                        {change.conference}
                      </div>
                      }
                    </div>
                  ) : (
                    <div style={{color: `${change.mapColor}`}} className="text-xs xl:text-sm 2xl:text-base font-bold">{change.conference}</div>
                  )}
                </div>
              </div>
            )}
            {change.change === 'rejoined' && (
              <div className='flex text-center items-center'>
                <div className="mr-1 flex items-center bg-white p-1 relative">
                  <img
                    onMouseOver={() => sethovered(index + change.school)}
                    onMouseLeave={() => sethovered(null)}
                    className='h-auto min-w-[20px] w-[20px] xl:min-w-[28px] xl:w-[28px] 2xl:min-w-[35px] 2xl:w-[35px] p-[1px]'
                    src={change.logo} alt={`${change.school} logo`} 
                  />
                  {hovered === index + change.school &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                        {change.school}
                      </div>
                  }
                </div>
                <div className="flex items-center">
                  <div className="text-xs xl:text-sm 2xl:text-base mr-1 text-white">rejoins</div>
                </div>
                <div className="flex items-center">
                  {change.conferenceLogo ? (
                    <div className="mr-1 flex items-center bg-white p-1 relative">
                      <img
                        onMouseOver={() => sethovered(index + change.conference)}
                        onMouseLeave={() => sethovered(null)}
                        className='h-auto min-w-[20px] w-[20px] xl:min-w-[28px] xl:w-[28px] 2xl:min-w-[35px] 2xl:w-[35px] p-[1px]'
                        src={change.conferenceLogo} alt={`${change.conference} logo`} 
                      />
                      {hovered === index + change.conference &&
                        <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">  
                          {change.conference}
                        </div>
                      }
                    </div>
                    ) : (
                      <div style={{color: `${change.mapColor}`}} className="text-base font-bold">{change.conference}</div>
                    )}
                </div>
              </div>
            )}
            {change.change === 'nameChange' && (
              <div className='flex text-center items-center'>
                <div style={{color: `${change.mapColor}`}} className="mr-1 xl:text-sm 2xl:text-base font-bold">{change.oldName}</div>
                <div className="text-sm xl:text-sm 2xl:text-base text-white">rebrands to</div>
                <div style={{color: `${change.mapColor}`}}  className="ml-1 xl:text-sm 2xl:text-base font-bold">{change.newName}</div>
              </div>
            )}
            {change.change === 'history' && (
              <p className="text-left text-xs xl:text-sm 2xl:text-base text-white font-semibold">{change.event}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConferenceHistory;
