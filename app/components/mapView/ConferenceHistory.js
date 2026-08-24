import React from 'react';
import { useSelector } from 'react-redux';
import LogoThumbnail from '../LogoThumbnail';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import '../../../Legend.css'

const LOGO_CLASS = 'h-auto min-w-[20px] w-[20px] xl:min-w-[28px] xl:w-[28px] 2xl:min-w-[35px] 2xl:w-[35px] p-[1px]';

function ConferenceHistory() {
  let { conferenceChanges } = useSelector(state => state.conInfoReducer);
  const { mapHeight } = useSelector((state)=> state.layoutReducer);

  return (
    <div>
      <div className="legend-history-container w-80 flex flex-col items-end pr-2 xl:pr-3 pb-5" style={{height: mapHeight? `${mapHeight}px` : "auto"}}>
        <p className="w-full xl:text-xl 2xl:text-2xl font-semibold pb-2 text-white text-center">History</p>
        {conferenceChanges.map((change, index) => (
          <div key={index} className='flex xl:mb-1 w-[90%] items-center'>
            {change.change === 'dropped' && (
              <div className='flex items-center'>
                  <div style={{color: `${change.primaryColor}`}} className="mr-1 text-xs xl:text-sm 2xl:text-base font-bold">{change.abbreviation}</div>
                  <div className="text-xs xl:text-sm 2xl:text-base text-white">drops to</div>
                  <div className="ml-1 text-xs xl:text-sm 2xl:text-base font-bold text-white">{`Division ${change.division}`}</div>
              </div>
            )}
            {change.change === 'founded' && (
              <div className='flex text-center items-center'>
                {change.logo ? (
                  <LogoThumbnail
                    className='mr-1'
                    imgClassName={LOGO_CLASS}
                    src={change.logo}
                    alt={`${change.currentAbbreviation} logo`}
                    tooltip={change.currentAbbreviation}
                  />
                ) : (
                  <div style={{color: `${change.mapColor}`}} className="mr-1 text-xs xl:text-sm 2xl:text-base font-bold">{change.currentAbbreviation}</div>
                )}
                <div className="text-xs xl:text-sm 2xl:text-base text-white">founded</div>
              </div>
            )}
            {change.change === 'disbanded' && (
              <div className='flex text-center items-center'>
                {change.logo ? (
                  <LogoThumbnail
                    className='mr-1'
                    imgClassName={LOGO_CLASS}
                    src={change.logo}
                    alt={`${change.currentAbbreviation} logo`}
                    tooltip={change.currentAbbreviation}
                  />
                ) : (
                  <div style={{color: `${change.mapColor}`}} className="mr-1 text-xs xl:text-sm 2xl:text-base font-bold">{change.currentAbbreviation}</div>
                )}
                 <div className="text-xs xl:text-sm 2xl:text-base text-white">disbanded</div>
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
                <div className="text-xs xl:text-sm 2xl:text-base mr-1 text-white">leaves</div>
                {change.oldConferenceLogo ? (
                  <LogoThumbnail
                    className='mr-1'
                    imgClassName={LOGO_CLASS}
                    src={change.oldConferenceLogo}
                    alt="old conference logo"
                    tooltip={change.oldConferenceAbrr}
                  />
                ) : (
                  <div style={{color: `${change.oldConferenceColor}`}} className="mr-1 text-xs xl:text-sm 2xl:text-base font-bold">{change.oldConferenceAbrr}</div>
                )}
                {change.newConferenceAbbr === "FBS" ? (
                  <div>
                    <p className="text-xs xl:text-sm 2xl:text-base text-white">becomes<span className="text-xs xl:text-sm 2xl:text-base font-bold text-blue-400 ml-1">IND</span></p>
                  </div>
                ) : (
                  <div className='flex'>
                    <div className='flex items-center'>
                      <div className="text-xs xl:text-sm 2xl:text-base mr-1 text-white">joins</div>
                    </div>
                    {change.newConferenceLogo ? (
                      <LogoThumbnail
                        imgClassName={LOGO_CLASS}
                        src={change.newConferenceLogo}
                        alt="new conference logo"
                        tooltip={change.newConferenceAbbr}
                      />
                    ) : (
                      <div style={{ color: change.newConferenceColor ? change.newConferenceColor : 'red' }} className="text-xs xl:text-sm 2xl:text-base font-bold">
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
                  <div className="text-xs xl:text-sm 2xl:text-base text-white mr-1">joins</div>
                </div>
                <div className="flex items-center">
                  {change.conferenceLogo ? (
                    <LogoThumbnail
                      imgClassName={LOGO_CLASS}
                      src={change.conferenceLogo}
                      alt={`${change.currentAbbreviation} logo`}
                      tooltip={change.currentAbbreviation}
                    />
                  ) : (
                    <div style={{color: `${change.mapColor}`}} className="text-xs xl:text-sm 2xl:text-base font-bold">{change.currentAbbreviation}</div>
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
                  <div className="text-xs xl:text-sm 2xl:text-base mr-1 text-white">rejoins</div>
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
                      <div style={{color: `${change.mapColor}`}} className="text-base font-bold">{change.currentAbbreviation}</div>
                    )}
                </div>
              </div>
            )}
            {change.change === 'nameChange' && (
              <div className='flex text-center items-center'>
                <div style={{color: `${change.mapColor}`}} className="mr-1 xl:text-sm 2xl:text-base font-bold">{change.oldName}</div>
                <div className="text-sm xl:text-sm 2xl:text-base text-white">rebrands to</div>
                <div style={{color: `${change.mapColor}`}}  className="ml-1 xl:text-sm 2xl:text-base font-bold">{change.newName}</div>
              </div>
            )}
            {change.change === 'history' && (
              <div className="flex items-start">
                <p className="text-left text-xs xl:text-sm 2xl:text-base text-white font-semibold">{change.event}</p>
                {change.source && (
                  <a
                    href={change.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View source"
                    className="ml-1 mt-[2px] shrink-0 text-gray-400 hover:text-white"
                  >
                    <OpenInNewIcon style={{ fontSize: '0.9em' }} />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConferenceHistory;
