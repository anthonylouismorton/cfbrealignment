"use client"
import { useEffect } from 'react';
import Year from './components/mapView/Year';
import Legend from './components/mapView/Legend';
import History from './components/mapView/ConferenceHistory';
import Header from './components/mapView/MapHeader';
import Options from './components/mapView/Options';
import MobileSlider from './mobile/MobileSlider';
import Welcome from './components/Welcome';
import MobileOptions from './mobile/MobileOptions';
import ReactMap from './components/map/ReactMap';
import { useSelector, useDispatch } from 'react-redux';
import { setYear } from '@/redux/features/yearSlices';
import { setShowMobile } from '@/redux/features/layoutSlices';
import { setLocalStorage, getLocalStorage } from './functions/handleLocalStorage';
import { setConFromStor } from '@/redux/features/conFilterSlices';
import { setOptFromStor } from '@/redux/features/optionsSlices';
import Conferences from './components/listView/Conferences';
import MapButton from './components/mapView/MapButton';
import ListButton from './components/listView/ListButton';

function Main() {
  const dispatch = useDispatch();
  const { fullscreen, showMobile, showList } = useSelector((state)=> state.layoutReducer);
  const option = useSelector((state)=> state.optionsReducer);
  const conFilter = useSelector(state => state.conFilterReducer);
  const year = useSelector(state => state.yearReducer);
  var screenSize = window.innerWidth

  const minWidth = (500);
  useEffect(() => {
    const { savedConfList, savedOptions, savedYear } = getLocalStorage();
    if(savedConfList && savedOptions && savedYear){
      dispatch(setYear(savedYear));
      dispatch(setConFromStor(savedConfList));
      dispatch(setOptFromStor(savedOptions));
    }
  },[]);

  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(setShowMobile(window.innerWidth <= minWidth))
      console.log(window.innerWidth)
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    const handleKeyDown = (e) => {
      if (e.keyCode === 37) {
        dispatch(setYear(year - 1));
      } 
      else if (e.keyCode === 39) {
        dispatch(setYear(year + 1));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    setLocalStorage(option, conFilter, year);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [year, option, showMobile, conFilter]);
  return (
    <div className="w-full">
      {!showList ? (
        <>
          {option.showWelcome && <Welcome/>}
          {!fullscreen && (
            <div className="flex flex-col justify-center items-center">
              {showMobile && <MobileOptions/>}
              {!showMobile && <Year/>}
              <Header/>
              <div className="flex w-full">
                <div className="hidden xl:block xl:w-[20%]">
                  {!option.hideHistory && <History/>}
                </div>
                <div className="w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[65%] flex flex-col items-center">
                  <ReactMap/>
                  {showMobile && (
                    <div className='flex w-full justify-center items-center text-center'>
                      <MobileSlider />
                    </div>
                  )}
                </div>
                <div className="flex flex-col hidden sm:block sm:w-[10%] md:w-[15%] lg:w-[20%] xl:w-[15%]">
                  {!option.hideLegend && !showMobile && <Legend/>}
                </div>
                {!showMobile && (
                  <div>
                    <MapButton/>
                    <Options/>
                  </div>
                )}
              </div>
            </div>
          )}
          {fullscreen && (
            <div className='flex flex-col items-center justify-center'>
              <ReactMap/>
            </div>
          )}
          <div className="md:hidden">
            <div className="w-full">
              {!option.hideHistory && <History/>}
            </div>
          </div>
        </>
      ) : (
        <div className='flex w-full'>
          <Conferences/>
          <ListButton/>
        </div>
      )}
    </div>
  );
  
}

export default Main;
