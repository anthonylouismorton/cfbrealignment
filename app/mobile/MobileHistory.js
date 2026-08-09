import React from 'react';
import { useSelector } from 'react-redux';
import LogoThumbnail from '../components/LogoThumbnail';

const LOGO_CLASS = 'h-auto w-[35px] min-w-[35px] sm:w-[28px] sm:min-w-[28px] md:min-w-[20px] md:w-[20px]';

function MobileHistory() {
  let { conferenceChanges } = useSelector(state => state.conInfoReducer);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-y-1 mt-2 mb-1 max-h-48 overflow-y-auto">
      {conferenceChanges.map((change, index) => (
        <div key={index} className='w-[85%] mx-auto flex'>
          {change.change === 'dropped' && (
            <div className='flex items-center'>
              <div style={{color: `${change.primaryColor}`}} className="mr-1 font-bold">{change.abbreviation}</div>
              <div className="text-lg sm:text-sm text-white">drops to</div>
              <div className="ml-1 text-lg sm:text-sm font-bold text-white">{`Division ${change.division}`}</div>
            </div>
          )}
          {change.change === 'founded' && (
            <div className='flex text-center items-center'>
              {change.logo ? (
                <LogoThumbnail
                  className='mr-1'
                  imgClassName={LOGO_CLASS}
                  src={change.logo}
                  alt={`${change.abbreviation} logo`}
                  tooltip={change.currentAbbreviation}
                />
              ) : (
                <div style={{color: `${change.mapColor}`}} className="mr-1 text-lg sm:text-sm font-bold">{change.abbreviation}</div>
              )}
              <div className="text-lg sm:text-sm text-white">founded</div>
            </div>
          )}
          {change.change === 'disbanded' && (
            <div className='flex text-center items-center'>
              {change.logo ? (
                <LogoThumbnail
                  className='mr-1'
                  imgClassName={LOGO_CLASS}
                  src={change.logo}
                  alt={`${change.abbreviation} logo`}
                  tooltip={change.abbreviation}
                />
                ) : (
                  <div style={{color: `${change.mapColor}`}} className="mr-1 text-lg sm:text-sm font-bold">{change.abbreviation}</div>
                )}
                <div className="text-lg sm:text-sm text-white">disbanded</div>
            </div>
          )}
          {change.change === 'left' && (
            <div className='flex text-center items-center'>
              <LogoThumbnail
                className='mr-1 overflow-visible'
                imgClassName={LOGO_CLASS}
                src={change.logo}
                alt={`${change.school} logo`}
                tooltip={change.school}
              />
              <div className="text-lg sm:text-sm mr-1 text-white">leaves</div>
              {change.oldConferenceLogo ? (
                <LogoThumbnail
                  className='mr-1'
                  imgClassName={LOGO_CLASS}
                  src={change.oldConferenceLogo}
                  alt="old conference logo"
                  tooltip={change.oldConferenceAbrr}
                />
              ) : (
                <div style={{color: `${change.oldConferenceColor}`}} className="mr-1 text-lg sm:text-sm font-bold">{change.oldConferenceAbrr}</div>
              )}
              {change.newConferenceAbbr === "FBS" ? (
                <div>
                  <p className="text-lg sm:text-sm text-white">becomes<span className="text-lg sm:text-sm font-bold text-blue-400 ml-1">IND</span></p>
                </div>
              ) : (
                <div className='flex'>
                  <div className='flex items-center'>
                    <div className="text-lg sm:text-sm mr-1 text-white">joins</div>
                  </div>
                  {change.newConferenceLogo ? (
                    <LogoThumbnail
                      imgClassName={LOGO_CLASS}
                      src={change.newConferenceLogo}
                      alt="new conference logo"
                      tooltip={change.newConferenceAbbr}
                    />
                  ) : (
                    <div style={{ color: change.newConferenceColor ? change.newConferenceColor : 'red' }} className="text-lg sm:text-sm font-bold">
                      {change.newConferenceAbbr}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {change.change === 'joined' && (
            <div className='flex text-center items-center'>
              <LogoThumbnail
                className='mr-1'
                imgClassName={LOGO_CLASS}
                src={change.logo}
                alt={`${change.school} logo`}
                tooltip={change.school}
              />
              <div className="flex items-center">
                <div className="text-lg sm:text-sm text-white">joins</div>
              </div>
              <div className="ml-1 flex items-center">
                {change.conferenceLogo ? (
                  <LogoThumbnail
                    imgClassName={LOGO_CLASS}
                    src={change.conferenceLogo}
                    alt={`${change.currentAbbreviation} logo`}
                    tooltip={change.currentAbbreviation}
                  />
                ) : (
                  <div style={{color: `${change.mapColor}`}} className="text-lg sm:text-sm font-bold">{change.currentAbbreviation}</div>
                )}
              </div>
            </div>
          )}
          {change.change === 'rejoined' && (
            <div className='flex text-center items-center'>
              <LogoThumbnail
                className='mr-1'
                imgClassName={LOGO_CLASS}
                src={change.logo}
                alt={`${change.school} logo`}
                tooltip={change.school}
              />
              <div className="flex items-center">
                <div className="text-lg sm:text-sm mr-1 text-white">rejoins</div>
              </div>
              <div className="flex items-center">
                {change.conferenceLogo ? (
                  <LogoThumbnail
                    className='mr-1'
                    imgClassName={LOGO_CLASS}
                    src={change.conferenceLogo}
                    alt={`${change.currentAbbreviation} logo`}
                    tooltip={change.currentAbbreviation}
                  />
                  ) : (
                    <div style={{color: `${change.mapColor}`}} className="text-lg sm:text-sm font-bold">{change.currentAbbreviation}</div>
                  )}
              </div>
            </div>
          )}
          {change.change === 'nameChange' && (
            <div className='flex items-center'>
              <div style={{color: `${change.mapColor}`}} className="mr-1 text-lg sm:text-sm font-bold">{change.oldName}</div>
              <div className="text-lg sm:text-sm text-white">becomes</div>
              <div style={{color: `${change.mapColor}`}}  className="ml-1 text-lg sm:text-sm font-bold">{change.newName}</div>
            </div>
          )}
          {change.change === 'history' && (
            <p className="text-left text-lg sm:text-sm lg:text-sm text-white font-semibold">{change.event}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default MobileHistory;
