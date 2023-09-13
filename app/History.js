import React from 'react';
import Image from 'next/image';
import RedoIcon from '@mui/icons-material/Redo';

function History({ changesList }) {
  return (
    <div className="bg-white bg-opacity-40 absolute bottom-2 left-2 pl-8 pr-8 pb-2 rounded">
      <h2 className="text-center font-semibold text-white pt-1 mb-2">History</h2>
      <div id="change">
      {changesList.map((change, index) => (
        <div key={index} className="change-item flex items-center mb-2">
          {change.change === 'founded' && (
            <>
              <div className="change-logo w-25 h-25 mr-2 flex items-center">
                <Image
                  width={25}
                  height={25}
                 src={change.logo} alt={`${change.abbreviation} logo`} 
                 />
              </div>
              <div className="change-conference text-sm text-white">{`founded`}</div>
            </>
          )}
          {change.change === 'disbanded' && (
            <>
              <div className="change-logo w-25 h-25 mr-2 flex items-center">
                <Image
                  width={25}
                  height={25}
                src={change.logo} alt={`${change.abbreviation} logo`} />
              </div>
              <div className="change-conference text-sm text-white">{`disbanded`}</div>
            </>
          )}
          {change.change === 'left' && (
            <>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <Image
                  width={25}
                  height={25}
                src={change.logo} alt={`${change.school} logo`} />
              </div>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <Image
                  width={25}
                  height={25}
                  src={change.oldConferenceLogo} alt={`old conference logo`}
                />
              </div>
              <div className="change-logo w-4 h-4 flex items-center">
                <RedoIcon className='text-white'/>
              </div>
              <div className="change-logo w-4 h-4 ml-4 flex items-center">
                <Image
                  width={25}
                  height={25}
                  src={change.newConferenceLogo} alt={`new conference logo`}
                />
              </div>
            </>
          )}
          {change.change === 'joined' && (
            <>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <Image
                  width={25}
                  height={25}
                  src={change.logo} alt={`${change.school} logo`}
                />
              </div>
              <div className="change-logo w-4 h-4 flex items-center">
                <RedoIcon className='text-white'/>
              </div>
              <div className="change-logo w-4 h-4 ml-4 flex items-center">
                <Image
                  width={25}
                  height={25}
                  src={change.conferenceLogo} alt={`${change.conferenceLogo} logo`} 
                />
              </div>
            </>
          )}
          {change.change === 'rejoined' && (
            <>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <Image
                  width={25}
                  height={25}
                  src={change.logo} alt={`${change.school} logo`} 
                />
              </div>
              <div className="change-logo w-4 h-4 flex items-center">
                <RedoIcon className='text-white'/>
              </div>
              <div className="change-logo w-4 h-4 ml-4 flex items-center">
                <Image                   
                  width={25}
                  height={25}
                  src={change.conferenceLogo} alt={`${change.conferenceLogo} logo`} 
                />
              </div>
            </>
          )}
        </div>
      ))}

      </div>
    </div>
  );
}

export default History;
