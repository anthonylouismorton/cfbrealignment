import React from 'react';
import Image from 'next/image';

function Disbanded({sethovered, index, change, hovered }) {
  return (
    <div key={index} className='flex text-center items-center w-[140px]'>
    {change.logo ? (
      <div className="change-logo mr-1 sm:mr-2 flex items-center bg-white p-1 overflow-visible relative">
        <Image
          onMouseOver={() => sethovered(index)}
          onMouseLeave={() => sethovered(null)}
          priority={true}
          width={30}
          height={30}
          className='max-h-[30px] max-w-auto'
          src={change.logo} alt={`${change.abbreviation} logo`} 
        />
        {hovered === index &&
          <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
            {change.abbreviation}
          </div>
        }
      </div>
      ) : (
        <div style={{color: `${change.mapColor}`}} className="change-conference mr-1 sm:mr-2 text-sm font-bold">{change.abbreviation}</div>
      )}
      <div className="change-conference text-sm text-white">disbanded</div>
    </div>
  );
}

export default Disbanded;

