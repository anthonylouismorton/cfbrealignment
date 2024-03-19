import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function MobileHistory() {
  let { conferenceChanges } = useSelector(state => state.conInfoReducer);
  const [ hovered, sethovered] = useState(null);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-y-1 mt-2 mb-1">
      {conferenceChanges.map((change, index) => (
        <div key={index} className='w-[85%] mx-auto flex'>
          {change.change === 'dropped' && (
            <div className='flex'>
              <div style={{color: `${change.primaryColor}`}} className="mr-1 font-bold">{change.abbreviation}</div>
              <div className="text-lg sm:text-sm text-white">drops to</div>
              <div className="ml-1 text-lg sm:text-sm font-bold text-white">{`Division ${change.division}`}</div>
            </div>
          )}
          {change.change === 'founded' && (
            <div className='flex text-center items-center'>
              {change.logo ? (
              <div className="mr-1 flex items-center bg-white p-1 relative">
                <img
                  onMouseOver={() => sethovered(index)}
                  onMouseLeave={() => sethovered(null)}
                  className='h-auto w-[35px] min-w-[35px] sm:w-[28px] sm:min-w-[28px] md:min-w-[20px] md:w-[20px]'
                  src={change.logo} alt={`${change.abbreviation} logo`} 
                />
                {hovered === index &&
                    <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                    {change.conference}
                  </div>
                }
              </div>
              ) : (
                <div style={{color: `${change.mapColor}`}} className="mr-1 text-lg sm:text-sm font-bold">{change.abbreviation}</div>
              )}
              <div className="text-lg sm:text-sm text-white">founded</div>
            </div>
          )}
          {change.change === 'disbanded' && (
            <div className='flex text-center items-center'>
              {change.logo ? (
                <div className="mr-1 flex items-center bg-white p-1 relative">
                  <img
                    onMouseOver={() => sethovered(index)}
                    onMouseLeave={() => sethovered(null)}
                    className='h-auto w-[35px] min-w-[35px] sm:w-[28px] sm:min-w-[28px] md:min-w-[20px] md:w-[20px]'
                    src={change.logo} alt={`${change.abbreviation} logo`} 
                  />
                  {hovered === index &&
                    <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                      {change.abbreviation}
                    </div>
                  }
                </div>
                ) : (
                  <div style={{color: `${change.mapColor}`}} className="mr-1 text-lg sm:text-sm font-bold">{change.abbreviation}</div>
                )}
                <div className="text-lg sm:text-sm text-white">disbanded</div>
            </div>
          )}
          {change.change === 'left' && (
            <div className='flex text-center items-center'>
              <div className="mr-1 flex items-center overflow-visible bg-white p-1 relative">
                <img
                  onMouseOver={() => sethovered(index + change.school)}
                  onMouseLeave={() => sethovered(null)}
                  className='h-auto w-[35px] min-w-[35px] sm:w-[28px] sm:min-w-[28px] md:min-w-[20px] md:w-[20px]'
                  src={change.logo} alt={`${change.school} logo`}
                />
                {hovered === index + change.school &&
                    <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                      {change.school}
                    </div>
                }
              </div>
              <div className="text-lg sm:text-sm mr-1 text-white">leaves</div>
              {change.oldConferenceLogo ? (
                <div className="mr-1 flex items-center bg-white p-1 relative">
                  <img
                    onMouseOver={() => sethovered(index + change.oldConferenceAbrr)}
                    onMouseLeave={() => sethovered(null)}
                    className='h-auto w-[35px] min-w-[35px] sm:w-[28px] sm:min-w-[28px] md:min-w-[20px] md:w-[20px]'
                    src={change.oldConferenceLogo} alt={`old conference logo`}
                  />
                  {hovered === index + change.oldConferenceAbrr &&
                    <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                      {change.oldConferenceAbrr}
                    </div>
                  }
                </div>
              ) : (
                <div style={{color: `${change.oldConferenceColor}`}} className="mr-1 text-lg sm:text-sm font-bold">{change.oldConferenceAbrr}</div>
              )}
              {change.newConferenceAbbr === "FBS" ? (
                <div>
                  <p className="text-lg sm:text-sm text-white">becomes<span className="text-lg sm:text-sm font-bold text-blue-400 ml-1">IND</span></p>
                </div>
              ) : (
                <div className='flex'>
                  <div className='flex items-center'>
                    <div className="text-lg sm:text-sm mr-1 text-white">joins</div>
                  </div>
                  {change.newConferenceLogo ? (
                    <div className="flex items-center bg-white p-1 relative">
                      <img
                        onMouseOver={() => sethovered(index + change.newConferenceAbbr)}
                        onMouseLeave={() => sethovered(null)}
                        className='h-auto w-[35px] min-w-[35px] sm:w-[28px] sm:min-w-[28px] md:min-w-[20px] md:w-[20px]'
                        src={change.newConferenceLogo} alt={`new conference logo`}
                      />
                      {hovered === index + change.newConferenceAbbr &&
                        <div className="bg-white max-w-24 text-black text-center text-[10px] absolute translate-y-2 top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                        {change.newConferenceAbbr}
                        </div>
                      }
                    </div>
                  ) : (
                    <div style={{ color: change.newConferenceColor ? change.newConferenceColor : 'red' }} className="text-lg sm:text-sm font-bold">
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
                  className='h-auto w-[35px] min-w-[35px] sm:w-[28px] sm:min-w-[28px] md:min-w-[20px] md:w-[20px]'
                  src={change.logo} alt={`${change.school} logo`}
                />
                {hovered === index + change.school &&
                    <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                      {change.school}
                    </div>
                }
              </div>
              <div className="flex items-center">
                <div className="text-lg sm:text-sm text-white">joins</div>
              </div>
              <div className="ml-1 flex items-center">
                {change.conferenceLogo ? (
                  <div className="flex items-center bg-white p-1 relative">
                    <img
                      onMouseOver={() => sethovered(index + change.conference)}
                      onMouseLeave={() => sethovered(null)}
                      className='h-auto w-[35px] min-w-[35px] sm:w-[28px] sm:min-w-[28px] md:min-w-[20px] md:w-[20px]'
                      src={change.conferenceLogo} alt={`${change.conference} logo`} 
                    />
                    {hovered === index + change.conference &&
                    <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                      {change.conference}
                    </div>
                    }
                  </div>
                ) : (
                  <div style={{color: `${change.mapColor}`}} className="text-lg sm:text-sm font-bold">{change.conference}</div>
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
                  className='h-auto w-[35px] min-w-[35px] sm:w-[28px] sm:min-w-[28px] md:min-w-[20px] md:w-[20px]'
                  src={change.logo} alt={`${change.school} logo`} 
                />
                {hovered === index + change.school &&
                    <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
                      {change.school}
                    </div>
                }
              </div>
              <div className="flex items-center">
                <div className="text-lg sm:text-sm mr-1 text-white">rejoins</div>
              </div>
              <div className="flex items-center">
                {change.conferenceLogo ? (
                  <div className="mr-1 flex items-center bg-white p-1 relative">
                    <img
                      onMouseOver={() => sethovered(index + change.conference)}
                      onMouseLeave={() => sethovered(null)}
                      className='h-auto w-[35px] min-w-[35px] sm:w-[28px] sm:min-w-[28px] md:min-w-[20px] md:w-[20px]'
                      src={change.conferenceLogo} alt={`${change.conference} logo`} 
                    />
                    {hovered === index + change.conference &&
                      <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">  
                        {change.conference}
                      </div>
                    }
                  </div>
                  ) : (
                    <div style={{color: `${change.mapColor}`}} className="text-lg sm:text-sm font-bold">{change.conference}</div>
                  )}
              </div>
            </div>
          )}
          {change.change === 'nameChange' && (
            <div className='flex items-center'>
              <div style={{color: `${change.mapColor}`}} className="mr-1 text-lg sm:text-sm font-bold">{change.oldName}</div>
              <div className="text-lg sm:text-sm text-white">becomes</div>
              <div style={{color: `${change.mapColor}`}}  className="ml-1 text-lg sm:text-sm font-bold">{change.newName}</div>
            </div>
          )}
          {change.change === 'history' && (
            <p className="text-left text-lg sm:text-sm lg:text-sm text-white font-semibold">{change.event}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default MobileHistory;
