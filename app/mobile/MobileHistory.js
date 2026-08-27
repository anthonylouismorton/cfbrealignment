import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import LogoThumbnail from '../components/LogoThumbnail';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const LOGO_CLASS = 'h-auto w-[22px] min-w-[22px] sm:w-[26px] sm:min-w-[26px] md:min-w-[20px] md:w-[20px]';

function MobileHistory() {
  let { conferenceChanges } = useSelector(state => state.conInfoReducer);
  const scrollRef = useRef(null);
  const [canScrollMore, setCanScrollMore] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollMore(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
  };

  useEffect(() => {
    checkScroll();
  }, [conferenceChanges]);

  return (
    <div className="relative h-full">
      <div ref={scrollRef} onScroll={checkScroll} className="h-full overflow-y-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2 mt-2 mb-1 pb-4">
        {conferenceChanges.map((change, index) => (
          <div
            key={index}
            className={
              change.change === 'history'
                ? 'col-span-2 md:col-span-3 px-2 py-1.5 rounded-sm bg-white bg-opacity-5 border-l-2 border-white border-opacity-20 flex'
                : 'w-[95%] mx-auto flex'
            }
          >
            {change.change === 'dropped' && (
              <div className='flex items-center'>
                <div style={{color: `${change.primaryColor}`}} className="mr-1 text-xs sm:text-sm font-bold">{change.abbreviation}</div>
                <div className="text-xs sm:text-sm text-white">drops to</div>
                <div className="ml-1 text-xs sm:text-sm font-bold text-white">{`Division ${change.division}`}</div>
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
                  <div style={{color: `${change.mapColor}`}} className="mr-1 text-xs sm:text-sm font-bold">{change.abbreviation}</div>
                )}
                <div className="text-xs sm:text-sm text-white">founded</div>
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
                    <div style={{color: `${change.mapColor}`}} className="mr-1 text-xs sm:text-sm font-bold">{change.abbreviation}</div>
                  )}
                  <div className="text-xs sm:text-sm text-white">disbanded</div>
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
                <div className="text-xs sm:text-sm mr-1 text-white">leaves</div>
                {change.oldConferenceLogo ? (
                  <LogoThumbnail
                    className='mr-1'
                    imgClassName={LOGO_CLASS}
                    src={change.oldConferenceLogo}
                    alt="old conference logo"
                    tooltip={change.oldConferenceAbrr}
                  />
                ) : (
                  <div style={{color: `${change.oldConferenceColor}`}} className="mr-1 text-xs sm:text-sm font-bold">{change.oldConferenceAbrr}</div>
                )}
                {change.newConferenceAbbr === "FBS" ? (
                  <div>
                    <p className="text-xs sm:text-sm text-white">becomes<span className="text-xs sm:text-sm font-bold text-blue-400 ml-1">IND</span></p>
                  </div>
                ) : (
                  <div className='flex'>
                    <div className='flex items-center'>
                      <div className="text-xs sm:text-sm mr-1 text-white">joins</div>
                    </div>
                    {change.newConferenceLogo ? (
                      <LogoThumbnail
                        imgClassName={LOGO_CLASS}
                        src={change.newConferenceLogo}
                        alt="new conference logo"
                        tooltip={change.newConferenceAbbr}
                      />
                    ) : (
                      <div style={{ color: change.newConferenceColor ? change.newConferenceColor : 'red' }} className="text-xs sm:text-sm font-bold">
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
                  <div className="text-xs sm:text-sm text-white">joins</div>
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
                    <div style={{color: `${change.mapColor}`}} className="text-xs sm:text-sm font-bold">{change.currentAbbreviation}</div>
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
                  <div className="text-xs sm:text-sm mr-1 text-white">rejoins</div>
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
                      <div style={{color: `${change.mapColor}`}} className="text-xs sm:text-sm font-bold">{change.currentAbbreviation}</div>
                    )}
                </div>
              </div>
            )}
            {change.change === 'nameChange' && (
              <div className='flex items-center'>
                <div style={{color: `${change.mapColor}`}} className="mr-1 text-xs sm:text-sm font-bold">{change.oldName}</div>
                <div className="text-xs sm:text-sm text-white">becomes</div>
                <div style={{color: `${change.mapColor}`}}  className="ml-1 text-xs sm:text-sm font-bold">{change.newName}</div>
              </div>
            )}
            {change.change === 'history' && (
              <div className="flex items-start">
                <p className="text-left text-xs sm:text-sm text-white font-semibold">{change.event}</p>
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
      {canScrollMore && (
        <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-black bg-opacity-60 animate-bounce">
          <KeyboardArrowDownIcon className="text-white text-[18px]" />
        </div>
      )}
    </div>
  );
}

export default MobileHistory;
