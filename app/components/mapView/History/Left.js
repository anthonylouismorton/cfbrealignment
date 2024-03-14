import React from 'react';


function Left({sethovered, index, change, hovered }) {
  return (
    <div key={index} className='flex text-center items-center'>
    <div className="mr-1 sm:mr-2 flex items-center overflow-visible bg-white p-1 relative">
      <img
        onMouseOver={() => sethovered(index + change.school)}
        onMouseLeave={() => sethovered(null)}
        priority={true}
        className='h-auto w-[35px]'
        src={change.logo} alt={`${change.school} logo`}
      />
      {hovered === index + change.school &&
          <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
            {change.school}
          </div>
      }
    </div>
    <div className="text-sm mr-1 sm:mr-2 text-white">leaves</div>
    {change.oldConferenceLogo ? (
      <div className="mr-1 sm:mr-2 flex items-center bg-white p-1 overflow-visible relative">
        <img
          onMouseOver={() => sethovered(index + change.oldConferenceAbrr)}
          onMouseLeave={() => sethovered(null)}
          priority={true}

          className='h-auto w-[35px]'
          src={change.oldConferenceLogo} alt={`old conference logo`}
        />
        {hovered === index + change.oldConferenceAbrr &&
          <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
            {change.oldConferenceAbrr}
          </div>
        }
      </div>
    ) : (
      <div style={{color: `${change.oldConferenceColor}`}} className="mr-1 sm:mr-2 text-sm font-bold">{change.oldConferenceAbrr}</div>
    )}
    {change.newConferenceAbbr === "FBS" ? (
      <div>
        <p className="text-sm text-white">becomes<span className="text-sm font-bold text-blue-400 ml-1 sm:ml-2">IND</span></p>
      </div>
    ) : (
      <div className='flex'>
        <div flex className='flex items-center'>
          <div className="text-sm text-white">joins</div>
        </div>
        {change.newConferenceLogo ? (
          <div className="ml-1 sm:ml-2 flex items-center bg-white p-1 overflow-visible relative">
            <img
              onMouseOver={() => sethovered(index + change.newConferenceAbbr)}
              onMouseLeave={() => sethovered(null)}
              priority={true}
              width={30}
              height={30}
              className='h-auto w-[35px]'
              src={change.newConferenceLogo} alt={`new conference logo`}
            />
            {hovered === index + change.newConferenceAbbr &&
              <div className="bg-white max-w-24 text-black text-center text-[10px] absolute translate-y-2 top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
              {change.newConferenceAbbr}
              </div>
            }
          </div>
        ) : (
          <div style={{ color: change.newConferenceColor ? change.newConferenceColor : 'red' }} className="ml-1 sm:ml-2 text-sm font-bold">
            {change.newConferenceAbbr}
          </div>
        )}
      </div>
        )}
    </div>
  );
}

export default Left;
