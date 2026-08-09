"use client"
import { useEffect, useRef } from 'react';
import Year from './components/mapView/Year';
import Legend from './components/mapView/Legend';
import History from './components/mapView/ConferenceHistory';
import Options from './components/mapView/Options';
import Welcome from './components/Welcome';
import MobileSlider from './mobile/MobileSlider';
import MobileOptions from './mobile/MobileOptions';
import MobileHistory from './mobile/MobileHistory';
import MobileMapButton from './mobile/MobileMapButton';
import MobileLegend from './mobile/MobileLegend';
import ReactMap from './components/map/ReactMap';
import { useSelector, useDispatch } from 'react-redux';
import { setYear } from '@/redux/features/yearSlices';
import { setMapHeight, closeFullscreen, openFullscreen } from '@/redux/features/layoutSlices';
import { setMapInfo } from '@/redux/features/mapSlices';
import { setLocalStorage, getLocalStorage } from './functions/handleLocalStorage';
import { setConFromStor } from '@/redux/features/conFilterSlices';
import { setOptFromStor } from '@/redux/features/optionsSlices';
import Conferences from './components/listView/Conferences';
import MapButton from './components/mapView/MapButton';
import ListButton from './components/listView/ListButton';
import { IconButton } from '@mui/material';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { requestBrowserFullscreen, exitBrowserFullscreen, isBrowserFullscreen, isPhoneLandscape, isTouchPrimaryDevice } from './functions/handleFullscreen';

function Main() {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const buttonsRef = useRef(null);
  // true only while `fullscreen` is currently set by phone-rotation auto-fill (not a manual tap)
  const autoFullscreenRef = useRef(false);
  // true after the user manually exits fullscreen while still phone-landscape, so the
  // orientation effect doesn't immediately re-trigger auto-fill; cleared on leaving landscape
  const manualOverrideRef = useRef(false);
  // mirrors `fullscreen` for the fullscreenchange listener (registered once on mount,
  // would otherwise close over a stale value)
  const fullscreenRef = useRef(false);
  const { fullscreen, showList } = useSelector((state)=> state.layoutReducer);
  const option = useSelector((state)=> state.optionsReducer);
  const conFilter = useSelector(state => state.conFilterReducer);
  const year = useSelector(state => state.yearReducer);

  useEffect(() => {
    const { savedConfList, savedOptions, savedYear } = getLocalStorage();
    if (savedConfList && savedOptions && savedYear) {
      dispatch(setYear(savedYear));
      dispatch(setConFromStor(savedConfList));
      dispatch(setOptFromStor(savedOptions));
    }
  }, []);
  
  useEffect(() => {
    const updateMapHeight = () => {
      const mapElements = document.getElementsByClassName('map');
      if (mapElements.length > 0) {
        const mapElement = mapElements[0].offsetHeight;
        dispatch(setMapHeight(mapElement));
      };
    };
  
    const handleResize = () => {
      // Touch-primary devices (phones AND tablets, portrait or landscape) are exempt:
      // mobile/tablet fullscreen must survive resize events from browser-chrome show/hide
      // and orientation changes, not just desktop windows narrowed below lg. A device
      // counts as touch-primary when its main input has no hover and a coarse pointer,
      // which correctly excludes touchscreen laptops (their primary input stays
      // mouse/trackpad even though touch is also available).
      if (window.innerWidth < 1280 && !isTouchPrimaryDevice()) {
        dispatch(closeFullscreen());
        exitBrowserFullscreen();
      }
    };
  
    updateMapHeight();
  
    window.addEventListener('resize', updateMapHeight);
    window.addEventListener('resize', handleResize);
  
    const handleKeyDown = (e) => {
      if (e.keyCode === 37 && year > 1891) {
        dispatch(setYear(year - 1));
      } else if (e.keyCode === 39 && year < 2026) {
        dispatch(setYear(year + 1));
      };
    };
  
    document.addEventListener('keydown', handleKeyDown);
  
    setLocalStorage(option, conFilter, year);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updateMapHeight);
      window.removeEventListener('resize', handleResize);
    };
  }, [option, conFilter, year]);

  useEffect(() => {
    fullscreenRef.current = fullscreen;
  }, [fullscreen]);

  useEffect(() => {
    let orientationTimeout;

    const handleOrientation = () => {
      const phoneLandscape = isPhoneLandscape();
      if (phoneLandscape) {
        if (!fullscreen && !manualOverrideRef.current) {
          autoFullscreenRef.current = true;
          dispatch(openFullscreen());
        }
      } else {
        manualOverrideRef.current = false;
        if (fullscreen && autoFullscreenRef.current) {
          autoFullscreenRef.current = false;
          dispatch(closeFullscreen());
        }
      }
    };

    const handleOrientationChangeEvent = () => {
      // Some browsers (notably older iOS Safari) fire `orientationchange` before
      // window.innerWidth/innerHeight settle to the new viewport -- re-check shortly
      // after so isPhoneLandscape() doesn't read stale dimensions.
      clearTimeout(orientationTimeout);
      orientationTimeout = setTimeout(handleOrientation, 150);
    };

    handleOrientation();

    window.addEventListener('resize', handleOrientation);
    window.addEventListener('orientationchange', handleOrientationChangeEvent);

    return () => {
      clearTimeout(orientationTimeout);
      window.removeEventListener('resize', handleOrientation);
      window.removeEventListener('orientationchange', handleOrientationChangeEvent);
    };
  }, [fullscreen, dispatch]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      // Only sync Redux back off when a real (manual) fullscreen session ends via
      // OS controls (Esc, back gesture) -- rotation auto-fill never enters real
      // browser fullscreen, so isBrowserFullscreen() is already false there.
      if (!isBrowserFullscreen() && fullscreenRef.current && !autoFullscreenRef.current) {
        dispatch(closeFullscreen());
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [dispatch]);

  const handleReset = () => {
    dispatch(setMapInfo({map: "position", value: { coordinates: [-96.6, 38.7], zoom: 1 }}));
  };

  const handleOpenFullscreen = () => {
    autoFullscreenRef.current = false;
    manualOverrideRef.current = false;
    dispatch(openFullscreen());
    requestBrowserFullscreen();
  };

  const handleCloseFullscreen = () => {
    if (isPhoneLandscape()) {
      manualOverrideRef.current = true;
    }
    autoFullscreenRef.current = false;
    dispatch(closeFullscreen());
    exitBrowserFullscreen();
  };

  return (
    <div className='min-w-[225px] w-full'>
      {!showList ? (
        <>
          {/* {option.showWelcome && <Welcome/>} */}
          {!fullscreen && (
            <div className="flex flex-col justify-center items-center w-full">
              <div className='lg:hidden flex items-start w-[95%] py-[1px]'>
                <MobileOptions/>
                <MobileMapButton/>
              </div>
              <div className='hidden lg:block w-full' ref={headerRef}>
                <Year/>
              </div>
              <div className="flex justify-center w-full">
                <div className="flex items-start">
                  <div className="hidden lg:block w-80 min-w-80 max-w-80">
                    {!option.hideHistory && <History/>}
                  </div>
                  <div className="flex flex-col items-center">
                    <ReactMap headerRef={headerRef} buttonsRef={buttonsRef} onOpenFullscreen={handleOpenFullscreen}/>
                    <div className='block lg:hidden flex w-full justify-center items-center text-center'>
                      <MobileSlider/>
                    </div>
                  </div>
                  <div className="hidden sm:block w-48 min-w-48 max-w-48">
                    {!option.hideLegend && <Legend/>}
                  </div>
                  <div className="hidden lg:block" ref={buttonsRef}>
                    <MapButton/>
                    <Options/>
                  </div>
                </div>
              </div>
            </div>
          )}
          {fullscreen && (
            <div className='w-full flex flex-col items-center'>
              <ReactMap onOpenFullscreen={handleOpenFullscreen}/>
              <div className='absolute bottom-1 right-1 sm:bottom-2 sm:right-2 lg:bottom-3 lg:right-3'>
                <IconButton className="p-[2px] md:p-[3px] lg:p-1" id="closefullscreen" onClick={handleCloseFullscreen}>
                  <CloseFullscreenIcon className="text-white text-[18px] sm:text-[20px] lg:text-[25px]" />
                </IconButton>
              </div>
              <button className='absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-3 lg:right-3 text-black text-[10px] md:text-[12px] lg:text-[14px] font-semibold bg-white border border-white hover:bg-black hover:text-white hover:border-white p-[2px] md:p-[3px] lg:p-1 rounded-sm' onClick={handleReset}>
                Reset
              </button>
            </div>
          )}
          <div className="sm:hidden flex justify-center">
              {!option.hideLegend && <MobileLegend/>}
          </div>
          <div className="lg:hidden">
              {!option.hideHistory && <MobileHistory/>}
          </div>
        </>
      ) : (
        <div className='flex flex-col'>
          <ListButton/>
          <Conferences/>
        </div>
      )}
    </div>
  );  
  
}

export default Main;
