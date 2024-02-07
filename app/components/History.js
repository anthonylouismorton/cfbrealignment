import React from 'react';
import Image from 'next/image';

function History({ changesList }) {

  return (
    <div className="w-full pl-1 pb-5">
      <div className="text-center flex flex-col" id="change">
        <p className="text-md md:text-lg lg:text-xl font-bold pb-4 text-white">HISTORY</p>
        <div className='flex flex-wrap flex-column items-center w-full'>
          {changesList.map((change, index) => (
            <div key={index} className="change-item flex justify-center items-center pl-[1px] pr-[1px] mb-2 w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-full 2xl:w-full">
              {change.change === 'dropped' && (
                <div className='flex text-center items-center'>
                    <div style={{color: `${change.primaryColor}`}} className="mr-2 change-conference text-sm xl:text-md 2xl:text-lg font-bold">{change.abbreviation}</div>
                    <div className="change-conference text-sm text-white">{`to`}</div>
                    <div className="ml-2 change-conference text-sm xl:text-md 2xl:text-lg font-bold text-white">{`Division ${change.division}`}</div>
                </div>
              )}
              {change.change === 'founded' && (
                <div className='flex text-center items-center w-[140px]'>
                  {change.logo ? (
                  <div className="change-logo mr-1 sm:mr-3 bg-white p-1">
                    <Image
                      priority={true}
                      width={30}
                      height={30}
                      className='max-h-[30px] max-w-auto'
                      src={change.logo} alt={`${change.abbreviation} logo`} 
                      />
                  </div>
                  ) : (
                    <div style={{color: `${change.mapColor}`}} className="change-conference mr-1 sm:mr-3 text-sm lg:text-lg">{change.abbreviation}</div>
                  )}
                  <div className="change-conference text-sm text-white">{`founded`}</div>
                </div>
              )}
              {change.change === 'disbanded' && (
                <div className='flex text-center items-center w-[140px]'>
                  {change.logo ? (
                    <div className="change-logo mr-1 sm:mr-3 bg-white p-1">
                      <Image
                        priority={true}
                        width={30}
                        height={30}
                        className='max-h-[30px] max-w-auto'
                        src={change.logo} alt={`${change.abbreviation} logo`} 
                        />
                    </div>
                  ) : (
                    <div style={{color: `${change.mapColor}`}} className="change-conference mr-1 sm:mr-3 text-sm lg:text-lg">{change.abbreviation}</div>
                  )}
                  <div className="change-conference text-sm lg:text-lg text-white">{`disbanded`}</div>
                </div>
              )}
              {change.change === 'left' && (
                <div className='flex text-center items-center'>
                  <div className="change-logo mr-1 sm:mr-3 flex items-center bg-white p-1">
                    <Image
                      priority={true}
                      width={30}
                      height={30}
                      className='max-h-[30px] max-w-auto'
                      src={change.logo} alt={`${change.school} logo`}
                    />
                  </div>
                  <div className="change-conference text-sm mr-1 sm:mr-3 text-white">{`leaves`}</div>
                    {change.oldConferenceLogo ? (
                      <div className="change-logo mr-1 sm:mr-3 flex items-center bg-white p-1">
                        <Image
                          priority={true}
                          width={30}
                          height={30}
                          className='max-h-[30px] max-w-auto'
                          src={change.oldConferenceLogo} alt={`old conference logo`}
                        />
                      </div>
                    ) : (
                      <div style={{color: `${change.oldConferenceColor}`}} className="change-conference mr-1 sm:mr-3 text-sm">{change.oldConferenceAbrr}</div>
                    )}
                  <div className="change-logo">
                  <div className="change-conference text-sm text-white">{`joins`}</div>
                </div>
                  {change.newConferenceLogo ? (
                    <div className="change-logo ml-1 sm:ml-3 flex items-center bg-white p-1">
                      <Image
                        priority={true}
                        width={30}
                        height={30}
                        className='max-h-[30px] max-w-auto'
                        src={change.newConferenceLogo} alt={`new conference logo`}
                        />
                    </div>
                  ) : (
                    <div style={{color: `${change.newConferenceColor}`}} className="change-conference ml-1 sm:ml-3 text-sm">{change.newConferenceAbbr}</div>
                  )}
                </div>
              )}
              {change.change === 'joined' && (
                <div className='flex text-center items-center w-[140px]'>
                  <div className="change-logo mr-1 sm:mr-3 flex items-center bg-white p-1">
                    <Image
                      priority={true}
                      width={30}
                      height={30}
                      className='max-h-[30px] max-w-auto'
                      src={change.logo} alt={`${change.school} logo`}
                    />
                  </div>
                  <div className="change-logo flex items-center">
                  <div className="change-conference text-sm text-white">{`joins`}</div>
                </div>
                  <div className="change-logo ml-1 sm:ml-3 flex items-center">
                  {change.conferenceLogo ? (
                    <div className="change-logo mr-1 sm:mr-3 bg-white p-1">
                      <Image
                        priority={true}
                        width={30}
                        height={30}
                        className='max-h-[30px] max-w-auto'
                        src={change.conferenceLogo} alt={`${change.conference} logo`} 
                        />
                    </div>
                    ) : (
                      <div style={{color: `${change.mapColor}`}} className="change-conference text-sm">{change.conference}</div>
                    )}
                  </div>
                </div>
              )}
              {change.change === 'rejoined' && (
                <div className='flex text-center items-center w-[140px]'>
                  <div className="change-logo mr-1 sm:mr-3 flex items-center bg-white p-1">
                    <Image
                      priority={true}
                      width={30}
                      height={30}
                      className='max-h-[30px] max-w-auto'
                      src={change.logo} alt={`${change.school} logo`} 
                    />
                  </div>
                  <div className="change-logo flex items-center">
                    <div className="change-conference text-sm text-white">{`rejoins`}</div>
                  </div>
                  <div className="change-logo ml-1 sm:ml-3 flex items-center">
                    {change.conferenceLogo ? (
                      <div className="change-logo mr-1 sm:mr-3 bg-white p-1">
                        <Image
                          priority={true}
                          width={30}
                          height={30}
                          className='max-h-[30px] max-w-auto'
                          src={change.conferenceLogo} alt={`${change.conference} logo`} 
                          />
                      </div>
                      ) : (
                        <div style={{color: `${change.mapColor}`}} className="change-conference text-sm">{change.conference}</div>
                      )}
                  </div>
                </div>
              )}
              {change.change === 'nameChange' && (
                <div className='flex text-center items-center'>
                  <div style={{color: `${change.mapColor}`}} className="mr-1 change-conference text-sm xl:text-md 2xl:text-lg font-bold">{change.oldName}</div>
                  <div className="change-conference text-sm xl:text-sm 2xl:text-md text-white">{`rebrands to`}</div>
                  <div style={{color: `${change.mapColor}`}}  className="ml-1 change-conference text-sm xl:text-md 2xl:text-lg font-bold">{change.newName}</div>
                </div>
              )}
              {change.change === 'history' && (
                <div className='flex text-center items-center'>
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

export default History;
