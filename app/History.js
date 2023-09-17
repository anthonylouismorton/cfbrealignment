import React from 'react';
import Image from 'next/image';
// import RedoIcon from '@mui/icons-material/Redo';

function History({ changesList }) {
  console.log(changesList)
  return (
    <div className="w-full pb-5 rounded">
      <div className="text-center flex flex-col" id="change">
        <p className="text-xl font-bold pt-2 pb-4 text-white">HISTORY</p>
        {/* <p className='text-white font-bold text-lg'>{window.innerWidth}</p> */}
        <div className='flex flex-wrap flex-column justify-center items-center w-full'>
          {changesList.map((change, index) => (
            <div key={index} className="change-item flex justify-center items-center mb-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-full">
              {change.change === 'founded' && (
                <div className='flex text-center items-center w-[140px]'>
                  <div className="change-logo mr-3 bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.logo} alt={`${change.abbreviation} logo`} 
                    />
                  </div>
                  <div className="change-conference text-sm text-white">{`founded`}</div>
                </div>
              )}
              {change.change === 'disbanded' && (
                <div className='flex text-center items-center w-[140px]'>
                  <div className="change-logo mr-3 bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.logo} alt={`${change.abbreviation} logo`} 
                    />
                  </div>
                  <div className="change-conference text-lg text-white">{`disbanded`}</div>
                </div>
              )}
              {change.change === 'left' && (
                <>
                  <div className="change-logo mr-3 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.logo} alt={`${change.school} logo`}
                    />
                  </div>
                  <div className="change-conference text-sm mr-3 text-white">{`leaves`}</div>
                  <div className="change-logo mr-3 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.oldConferenceLogo} alt={`old conference logo`}
                    />
                  </div>
                  <div className="change-logo">
                  <div className="change-conference text-sm text-white">{`joins`}</div>
                  </div>
                  <div className="change-logo ml-3 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.newConferenceLogo} alt={`new conference logo`}
                    />
                  </div>
                </>
              )}
              {change.change === 'joined' && (
                <div className='flex text-center items-center w-[140px]'>
                  <div className="change-logo mr-3 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.logo} alt={`${change.school} logo`}
                    />
                  </div>
                  <div className="change-logo flex items-center">
                  <div className="change-conference text-sm text-white">{`joins`}</div>
                  </div>
                  <div className="change-logo ml-3 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.conferenceLogo} alt={`${change.conferenceLogo} logo`} 
                    />
                  </div>
                </div>
              )}
              {change.change === 'rejoined' && (
                <div className='flex text-center items-center w-[140px]'>
                  <div className="change-logo mr-3 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.logo} alt={`${change.school} logo`} 
                    />
                  </div>
                  <div className="change-logo flex items-center">
                    <div className="change-conference text-sm text-white">{`rejoins`}</div>
                  </div>
                  <div className="change-logo ml-3 flex items-center bg-white p-1">
                    <Image                   
                      width={30}
                      height={30}
                      src={change.conferenceLogo} alt={`${change.conferenceLogo} logo`} 
                    />
                  </div>
                </div>
              )}
              {change.change === 'nameChange' && (
                <div className='flex text-center items-center'>
                  <div style={{color: `${change.oldColor}`}} className="mr-1 change-conference text-lg font-bold">{change.oldName}</div>
                  <div className="change-conference text-md text-white">{`rebrands to`}</div>
                  <div style={{color: `${change.newColor}`}}  className="ml-1 change-conference text-lg font-bold">{change.newName}</div>
                </div>
              )}
            </div>
          ))}
          {/* {changesList.length === 0 && (
              <h2 className='text-white text-lg'>Everything stable...for now</h2>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default History;
