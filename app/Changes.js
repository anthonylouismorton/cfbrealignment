import React from 'react';
import { } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

function Changes({ changesList }) {
  return (
    <div className="bg-white absolute bottom-0 left-0 pl-8 pr-8 pb-2 rounded">
      <h2 className="text-center font-semibold pt-1">History</h2>
      <div id="change">
      {changesList.map((change, index) => (
        <div key={index} className="change-item flex items-center mb-2">
          {change.change === 'founded' && (
            <>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <img src={change.logo} alt={`${change.abbreviation} logo`} />
              </div>
              <div className="change-conference text-sm">{`founded`}</div>
            </>
          )}
          {change.change === 'disbanded' && (
            <>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <img src={change.logo} alt={`${change.abbreviation} logo`} />
              </div>
              <div className="change-conference text-sm">{`disbanded`}</div>
            </>
          )}
          {change.change === 'left' && (
            <>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <img src={change.logo} alt={`${change.school} logo`} />
              </div>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <img src={change.oldConferenceLogo} alt={`old conference logo`} />
              </div>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <FaArrowRight icon="fa-right-to-bracket" />
              </div>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <img src={change.newConferenceLogo} alt={`new conference logo`} />
              </div>
            </>
          )}
          {change.change === 'joined' && (
            <>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <img src={change.logo} alt={`${change.school} logo`} />
              </div>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <FaArrowRight icon="fa-right-to-bracket" />
              </div>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <img src={change.conferenceLogo} alt={`${change.conferenceLogo} logo`} />
              </div>
            </>
          )}
          {change.change === 'rejoined' && (
            <>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <img src={change.logo} alt={`${change.school} logo`} />
              </div>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <FaArrowRight icon="fa-right-to-bracket" />
              </div>
              <div className="change-logo w-4 h-4 mr-2 flex items-center">
                <img src={change.conferenceLogo} alt={`${change.conferenceLogo} logo`} />
              </div>
            </>
          )}
        </div>
      ))}

      </div>
    </div>
  );
}

export default Changes;
