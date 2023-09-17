import React from 'react';
import Image from 'next/image';
// import RedoIcon from '@mui/icons-material/Redo';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

function History({ changesList }) {
  console.log(changesList)
  var width = window.innerWidth
  var height = window.innerHeight
  return (
    <div className="bg-white w-full  xl:w-4/5 pb-5 rounded">
      <div className="text-center" id="change">
      <p className="text-xl font-bold pt-2 pb-4">History</p>
        {changesList.map((change, index) => (
          <div key={index} className="change-item flex items-center mb-2 pl-8">
            {change.change === 'founded' && (
              <>
                <div className="change-logo mr-4 flex items-center">
                  <Image
                    width={30}
                    height={30}
                    src={change.logo} alt={`${change.abbreviation} logo`} 
                  />
                </div>
                <div className="change-conference text-lg font-bold">{`founded`}</div>
              </>
            )}
            {change.change === 'disbanded' && (
              <>
                <div className="change-logo mr-4 flex items-center">
                  <Image
                    width={30}
                    height={30}
                    src={change.logo} alt={`${change.abbreviation} logo`} 
                  />
                </div>
                <div className="change-conference text-lg">{`disbanded`}</div>
              </>
            )}
            {change.change === 'left' && (
              <>
                <div className="change-logo mr-4 flex items-center">
                  <Image
                    width={30}
                    height={30}
                    src={change.logo} alt={`${change.school} logo`}
                  />
                </div>
                <div className="change-logo mr-4 flex items-center">
                  <Image
                    width={30}
                    height={30}
                    src={change.oldConferenceLogo} alt={`old conference logo`}
                  />
                </div>
                <div className="change-logo flex items-center">
                  <TrendingFlatIcon style={{ fontSize: 36 }}/>
                </div>
                <div className="change-logo ml-4 flex items-center">
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
                <div className="change-logo mr-4 flex items-center">
                  <Image
                    width={30}
                    height={30}
                    src={change.logo} alt={`${change.school} logo`}
                  />
                </div>
                <div className="change-logo flex items-center">
                  <TrendingFlatIcon style={{ fontSize: 36 }}/>
                </div>
                <div className="change-logo ml-4 flex items-center">
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
                <div className="change-logo mr-4 flex items-center">
                  <Image
                    width={30}
                    height={30}
                    src={change.logo} alt={`${change.school} logo`} 
                  />
                </div>
                <div className="change-logo flex items-center">
                  <TrendingFlatIcon style={{ fontSize: 36 }}/>
                </div>
                <div className="change-logo ml-4 flex items-center">
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
                  <TrendingFlatIcon style={{ fontSize: 36 }}/>
                </div>
                <div style={{color: `${change.newColor}`}}  className=" ml-4 change-conference text-lg">{change.newName}</div>
              </>
            )}
          </div>
        ))}
        {changesList.length === 0 && (
          <>
            <h2 className='px-4'>Everything stable...for now</h2>
          </>
        )}
        <p>{width}</p>
        <p>{height}</p>
      </div>
    </div>
  );
}

export default History;
