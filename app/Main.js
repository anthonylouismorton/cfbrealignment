"use client"
import { useEffect } from 'react';
import Year from './components/mapView/Year';
import Legend from './components/mapView/Legend';
import History from './components/mapView/ConferenceHistory';
import Header from './components/mapView/MapHeader';
import Options from './components/mapView/Options';
import Welcome from './components/Welcome';
import MobileSlider from './mobile/MobileSlider';
import MobileOptions from './mobile/MobileOptions';
import MobileHistory from './mobile/MobileHistory';
import MobileMapButton from './mobile/MobileMapButton';
import ReactMap from './components/map/ReactMap';
import { useSelector, useDispatch } from 'react-redux';
import { setYear } from '@/redux/features/yearSlices';
import { setMapHeight } from '@/redux/features/layoutSlices';
import { setLocalStorage, getLocalStorage } from './functions/handleLocalStorage';
import { setConFromStor } from '@/redux/features/conFilterSlices';
import { setOptFromStor } from '@/redux/features/optionsSlices';
import Conferences from './components/listView/Conferences';
import MapButton from './components/mapView/MapButton';
import ListButton from './components/listView/ListButton';

function Main() {
  const dispatch = useDispatch();
  const { fullscreen, showList, mapHeight } = useSelector((state)=> state.layoutReducer);
  const option = useSelector((state)=> state.optionsReducer);
  const conFilter = useSelector(state => state.conFilterReducer);
  const year = useSelector(state => state.yearReducer);

  useEffect(() => {
    const { savedConfList, savedOptions, savedYear } = getLocalStorage();
    if(savedConfList && savedOptions && savedYear){
      dispatch(setYear(savedYear));
      dispatch(setConFromStor(savedConfList));
      dispatch(setOptFromStor(savedOptions));
    }
  },[]);

  useEffect(() => {

    const updateMapHeight = () => {
      const mapElements = document.getElementsByClassName('map');
      if (mapElements.length > 0) {
        const mapElement = mapElements[0].offsetHeight;
        dispatch(setMapHeight(mapElement));
      };
      
    };

    updateMapHeight();

    window.addEventListener('resize', updateMapHeight);

    const handleKeyDown = (e) => {
      if (e.keyCode === 37) {
        dispatch(setYear(year - 1));
      } 
      else if (e.keyCode === 39) {
        dispatch(setYear(year + 1));
      };
    };

    document.addEventListener('keydown', handleKeyDown);
    setLocalStorage(option, conFilter, year);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [year, option, conFilter]);

  return (
    <div className="min-w-[400px] w-full">
      {!showList ? (
        <>
          {option.showWelcome && <Welcome/>}
          {!fullscreen && (
            <div className="flex flex-col justify-center items-center">
              <div className='lg:hidden flex items-start w-[95%]'>
                <MobileOptions/>
                <MobileMapButton/>
              </div>
              <div className='hidden lg:block w-full'>
                <Year/>
                <Header/>
              </div>
              <div className="flex w-full">
                <div className="hidden xl:block xl:w-[20%]">
                  {!option.hideHistory && <History/>}
                </div>
                <div className="w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[65%] flex flex-col items-center">
                  <ReactMap/>
                  <div className='block lg:hidden flex w-full justify-center items-center text-center'>
                    <MobileSlider/>
                  </div>
                </div>
                <div className="flex flex-col hidden sm:block sm:w-[10%] md:w-[15%] lg:w-[20%] xl:w-[15%]">
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
            <div className='flex flex-col items-center justify-center'>
              <ReactMap/>
            </div>
          )}
          <div className="xl:hidden">
            <div>
              {!option.hideHistory && <MobileHistory/>}
            </div>
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center'>
          <ListButton/>
          <Conferences/>
        </div>
      )}
    </div>
  );
  
}

export default Main;
