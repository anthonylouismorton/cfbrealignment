import React from 'react';
import Image from 'next/image';
// import RedoIcon from '@mui/icons-material/Redo';

function History({ changesList }) {
  console.log(changesList)
  return (
    <div className="w-full pb-5 rounded">
      <div className="text-center flex flex-col items-center" id="change">
        <p className="text-xl font-bold pt-2 pb-4 text-white">History</p>
        <div className='flex flex-wrap'>
          {changesList.map((change, index) => (
            <div key={index} className="change-item flex items-center mb-2 pl-3 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-full">
              {change.change === 'founded' && (
                <>
                  <div className="change-logo mr-4 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.logo} alt={`${change.abbreviation} logo`} 
                    />
                  </div>
                  <div className="change-conference text-lg font-bold text-white">{`founded`}</div>
                </>
              )}
              {change.change === 'disbanded' && (
                <>
                  <div className="change-logo mr-4 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.logo} alt={`${change.abbreviation} logo`} 
                    />
                  </div>
                  <div className="change-conference text-lg text-white">{`disbanded`}</div>
                </>
              )}
              {change.change === 'left' && (
                <>
                  <div className="change-logo mr-4 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.logo} alt={`${change.school} logo`}
                    />
                  </div>
                  <div className="change-conference text-lg font-bold mr-4 text-white">{`leaves`}</div>
                  <div className="change-logo mr-4 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.oldConferenceLogo} alt={`old conference logo`}
                    />
                  </div>
                  <div className="change-logo flex items-center">
                  <div className="change-conference text-lg font-bold text-white">{`joins`}</div>
                  </div>
                  <div className="change-logo ml-4 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.newConferenceLogo} alt={`new conference logo`}
                    />
                  </div>
                </>
              )}
              {change.change === 'joined' && (
                <>
                  <div className="change-logo mr-4 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.logo} alt={`${change.school} logo`}
                    />
                  </div>
                  <div className="change-logo flex items-center">
                  <div className="change-conference text-lg font-bold text-white">{`joins`}</div>
                  </div>
                  <div className="change-logo ml-4 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.conferenceLogo} alt={`${change.conferenceLogo} logo`} 
                    />
                  </div>
                </>
              )}
              {change.change === 'rejoined' && (
                <>
                  <div className="change-logo mr-4 flex items-center bg-white p-1">
                    <Image
                      width={30}
                      height={30}
                      src={change.logo} alt={`${change.school} logo`} 
                    />
                  </div>
                  <div className="change-logo flex items-center">
                  <div className="change-conference text-lg font-bold text-white">{`rejoins`}</div>
                  </div>
                  <div className="change-logo ml-4 flex items-center bg-white p-1">
                    <Image                   
                      width={30}
                      height={30}
                      src={change.conferenceLogo} alt={`${change.conferenceLogo} logo`} 
                    />
                  </div>
                </>
              )}
              {change.change === 'nameChange' && (
                <>
                  <div style={{color: `${change.oldColor}`}} className="mr-4 change-conference text-lg">{change.oldName}</div>
                  <div className="change-logo flex items-center">
                  <div className="change-conference text-lg font-bold text-white">{`rebrands to`}</div>
                  </div>
                  <div style={{color: `${change.newColor}`}}  className=" ml-4 change-conference text-lg">{change.newName}</div>
                </>
              )}
            </div>
          ))}
          {changesList.length === 0 && (
            <>
              <h2 className='text-white font-bold text-lg'>Everything stable...for now</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;
