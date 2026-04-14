"use client"
import { useEffect } from 'react';
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
import { setMapHeight, closeFullscreen } from '@/redux/features/layoutSlices';
import { setMapInfo } from '@/redux/features/mapSlices';
import { setLocalStorage, getLocalStorage } from './functions/handleLocalStorage';
import { setConFromStor } from '@/redux/features/conFilterSlices';
import { setOptFromStor } from '@/redux/features/optionsSlices';
import Conferences from './components/listView/Conferences';
import MapButton from './components/mapView/MapButton';
import ListButton from './components/listView/ListButton';
import { IconButton } from '@mui/material';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

function Main() {
  const dispatch = useDispatch();
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
      if (window.innerWidth < 1280) {
        dispatch(closeFullscreen());
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

  const handleReset = () => {
    dispatch(setMapInfo({map: "position", value: { coordinates: [-96.6, 38.7], zoom: 1 }}));
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
              <div className='hidden lg:block w-full'>
                <Year/>
              </div>
              <div className="flex justify-center w-full">
                <div className="hidden xl:block w-full min-w-80">
                  {!option.hideHistory && <History/>}
                </div>
                <div className="w-full flex flex-col items-center">
                  <ReactMap/>
                  <div className='block lg:hidden flex w-full justify-center items-center text-center'>
                    <MobileSlider/>
                  </div>
                </div>
                <div className="flex flex-col hidden sm:block w-full min-w-48">
                  {!option.hideLegend && <Legend/>}
                </div>
                <div className="hidden lg:block">
                  <MapButton/>
                  <Options/>
                </div>
              </div>
            </div>
          )}
          {fullscreen && (
            <div className='w-full flex flex-col items-center'>
              <ReactMap/>
              <div className='hidden lg:block absolute bottom-3 lg:right-3'>
                <IconButton className="p-0" id="closefullscreen" onClick={() => dispatch(closeFullscreen())}>
                  <CloseFullscreenIcon className="text-white text-[25px]" />
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
          <div className="xl:hidden">
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
