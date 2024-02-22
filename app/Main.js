"use client"
import { useEffect } from 'react';
import Year from './components/Year';
import Legend from './components/Legend';
import History from './components/History';
import Header from './components/Header';
import Options from './components/Options';
import MobileSlider from './mobile/MobileSlider';
import Welcome from './components/Welcome';
import MobileOptions from './mobile/MobileOptions';
import ReactMap from './components/map/ReactMap';
import { useSelector, useDispatch } from 'react-redux';
import { setYear } from '@/redux/features/yearSlices';
import { setShowMobile } from '@/redux/features/layoutSlices';

function Main() {
  const dispatch = useDispatch();
  const { fullscreen, showMobile } = useSelector((state)=> state.layoutReducer);
  const option = useSelector((state)=> state.optionsReducer);
  const conFilter = useSelector(state => state.conFilterReducer);
  const year = useSelector(state => state.yearReducer);

  const minWidth = (500);
  //need to fix saving to local storage
  // useEffect(() => {
  //   if(localStorage.savedConferences){
  //     const savedConfList = JSON.parse(localStorage.getItem('savedConferences'));
  //     dispatch(filterCon(savedConfList));
  //   }
  //   if(localStorage.savedOptions){
  //     const savedOptions = JSON.parse(localStorage.getItem('savedOptions'));
  //     dispatch(changeOption(savedOptions));
  //   }
  // },[]);
  useEffect(() => {
    const handleWindowResize = () => {
      console.log(window.innerWidth)
      dispatch(setShowMobile(window.innerWidth <= minWidth))
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
    const saveToLocalStorage = () => {
      localStorage.setItem("savedOptions", JSON.stringify(option))
      localStorage.setItem("savedConferences", JSON.stringify(conFilter))
    }
    saveToLocalStorage();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [year, option, showMobile, conFilter]);
  console.log(showMobile)
  return (
    <div className="w-full">
      {option.showWelcome &&
        <Welcome/>
      }
      {!fullscreen &&
        <div className="flex flex-col justify-center items-center">
          {showMobile &&
            <MobileOptions/>
          }
          {!showMobile &&
            <Year/>
          }
          <div>
            <Header/>
          </div>
          <div className="flex w-full">
            <div className="hidden xl:block xl:w-[17.5%] xl:pt-2 2xl:pt-4">
              {!option.hideHistory &&
                <History/>
              }
            </div>
            <div className="w-full md:w-[80%] lg:w-[75%] xl:w-[65%] flex flex-col items-center">
              <ReactMap/>
              {showMobile &&
              <div className='flex w-full justify-center items-center text-center'>
                <MobileSlider />
              </div>
              }
            </div>
            <div className="flex flex-col hidden md:block md:w-[20%] lg:w-[25%] xl:w-[17.5%] pt-5 md:pt-8 xl:pt-2 2xl:pt-4">
                {!option.hideLegend && !showMobile && (
                  <Legend/>
                )}
            </div>
            {!showMobile &&
              <div>
                <Options/>
              </div>
            }
          </div>
        </div>
      }
      {fullscreen &&
      <div className='flex flex-col items-center justify-center items-center'>
        <ReactMap/>
      </div>
      }
       <div className="xl:hidden">
        <div className="w-full">
          {!option.hideHistory &&
            <History/>
          }
        </div>
      </div>
    </div>
  );
}

export default Main;
