import React from 'react';


function Founded({sethovered, index, change, hovered }) {
  return (
    <div key={index} className='flex text-center items-center'>
      {change.logo ? (
      <div className="change-logo mr-1 sm:mr-2 flex items-center bg-white p-1 overflow-visible relative">
        <img
          onMouseOver={() => sethovered(index)}
          onMouseLeave={() => sethovered(null)}
          className='h-auto w-[35px] p-[1px]'
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
  );
}

export default Founded;
