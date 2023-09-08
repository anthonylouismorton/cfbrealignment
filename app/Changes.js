import React from 'react';

function Changes({ changesList, currentYear }) {
  console.log(changesList)
  return (
    <div className="bg-white absolute top-5 bg-white left-5 pl-8 pr-8 pb-10 rounded">
      <h2 className="text-center font-semibold">Conference History</h2>
      <div id="change">
      {changesList.map((change, index) => (
        <div key={index} className="change-item flex items-center mb-2">
          {change.change === 'founded' && (
            <>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <img src={change.logo} alt={`${change.abbreviation} logo`} />
              </div>
              <div className="change-conference text-sm">{`conference founded`}</div>
            </>
          )}
          {change.change === 'left' && (
            <>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <img src={change.logo} alt={`${change.school} logo`} />
              </div>
              <div className="change-conference text-sm">{`leaves ${change.conference}`}</div>
            </>
          )}
          {change.change === 'joined' && (
            <>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <img src={change.logo} alt={`${change.school} logo`} />
              </div>
              <div className="change-conference text-sm">{`joins ${change.conference}`}</div>
            </>
          )}
        </div>
      ))}

      </div>
    </div>
  );
}

export default Changes;
