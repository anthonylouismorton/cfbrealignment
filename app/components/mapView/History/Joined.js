import React from 'react';
import Image from 'next/image';

function Joined({sethovered, index, change, hovered }) {
  return (
    <div key={index} className='flex text-center items-center w-[140px]'>
      <div className="change-logo mr-1 sm:mr-2 flex items-center bg-white p-1 overflow-visible relative">
        <Image
          onMouseOver={() => sethovered(index + change.school)}
          onMouseLeave={() => sethovered(null)}
          priority={true}
          width={30}
          height={30}
          className='max-h-[30px] max-w-auto'
          src={change.logo} alt={`${change.school} logo`}
        />
        {hovered === index + change.school &&
            <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
              {change.school}
            </div>
        }
      </div>
      <div className="change-logo flex items-center">
        <div className="change-conference text-sm text-white">joins</div>
      </div>
      <div className="change-logo ml-1 sm:ml-2 flex items-center">
        {change.conferenceLogo ? (
          <div className="change-logo flex items-center bg-white p-1 overflow-visible relative">
            <Image
              onMouseOver={() => sethovered(index + change.conference)}
              onMouseLeave={() => sethovered(null)}
              priority={true}
              width={30}
              height={30}
              className='max-h-[30px] max-w-auto'
              src={change.conferenceLogo} alt={`${change.conference} logo`} 
            />
            {hovered === index + change.conference &&
            <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
              {change.conference}
            </div>
            }
          </div>
        ) : (
          <div style={{color: `${change.mapColor}`}} className="change-conference text-sm font-bold">{change.conference}</div>
        )}
      </div>
    </div>
  );
}

export default Joined;
