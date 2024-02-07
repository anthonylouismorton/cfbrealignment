"use client"
import { useEffect, useState } from 'react';
import mapdata from './data/reactMapData.json';
import Year from './components/Year';
import Legend from './components/Legend';
import History from './components/History';
import Header from './components/Header';
import Options from './components/Options';
import MobileSlider from './mobile/MobileSlider';
import Welcome from './components/Welcome';
import AutoPlay from './AutoPlay';
import MobileOptions from './mobile/MobileOptions';
import ReactMap from './components/ReactMap';
import { useSelector, useDispatch } from 'react-redux';
import { changeOption } from '../redux/features/optionsSlices';

function Main() {
  const dispatch = useDispatch();
  const fullscreen = useSelector((state)=> state.fullscreenReducer);
  const option = useSelector((state)=> state.optionsReducer);
  const [currentYear, setCurrentYear] = useState(1891);
  const [activeConferences, setActiveConferences] = useState(null);
  const [changesList, setChangesList] = useState([]);
  const [conList, setConList] = useState({'SEC':false,'Pac-12':false,'Big 12':false,'ACC':false,'Big Ten':false,'SOCON':false,'Big 8':false,'Border':false,'SWC':false,'C-USA':false,'WAC':false,'MVC':false,'Skyline':false,'WIUFA':false,'SIAA':false,'Big East':false,'BWC':false,'MWC':false,'RMAC':false,'Ivy':false,'Sun Belt':false,'AAC':false,'MAC':false,'Southland':false})
  const [currentConferences, setCurrentConferences] = useState(null);
  const [schoolStates, setSchoolStates] = useState(null);
  const [isYearVisible,setIsYearVisible] = useState(false);
  const minWidth = (768);

  // useEffect(() => {
  //   // console.log(localStorage.savedConferences)
  //   if(localStorage.savedConferences){
  //     setConList(JSON.parse(localStorage.getItem('savedConferences')));
  //   }
  //   if(localStorage.savedOptions){
  //     const savedOptions = JSON.parse(localStorage.getItem('savedOptions'));
  //     dispatch(changeOption(savedOptions));
  //   }
  // },[])
  useEffect(() => {
    const handleWindowResize = () => {
      setIsYearVisible(
        window.innerWidth <= minWidth
      );
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    const handleKeyDown = (e) => {
      if (e.keyCode === 37) {
        setCurrentYear(currentYear - 1);
      } 
      else if (e.keyCode === 39) {
        setCurrentYear(currentYear + 1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const saveToLocalStorage = () => {
      localStorage.setItem("savedOptions", JSON.stringify(option))
      localStorage.setItem("savedConferences", JSON.stringify(conList))
    }
    saveToLocalStorage();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [currentYear, option, isYearVisible, conList]);
  console.log(option)
  return (
    <div>
      {option.showWelcome &&
        <Welcome/>
      }
      {!fullscreen &&

      <div className="flex flex-col justify-center items-center">
        {isYearVisible &&
          <MobileOptions activeConferences={activeConferences} conList={conList} setConList={setConList}/>
        }
        {option.hideYear || !isYearVisible &&
          <Year currentYear={currentYear} setCurrentYear={setCurrentYear} />
        }
        {!option.hideHeader &&
        <div>
          <Header currentYear={currentYear} />
        </div>
        }
        <div className="flex w-full">
          <div className="hidden xl:block xl:w-[17.5%] xl:pt-2 2xl:pt-4">
            {!option.hideHistory &&
              <History changesList={changesList}/>
            }
          </div>
          <div className="w-full md:w-[80%] lg:w-[75%] xl:w-[65%] flex flex-col items-center">
            <ReactMap
              mapdata={mapdata}
              currentYear={currentYear}
              setCurrentYear={setCurrentYear}
              isYearVisible={isYearVisible}
              changesList={changesList}
              setChangesList={setChangesList}
              schoolStates={schoolStates}
              setSchoolStates={setSchoolStates}
              currentConferences={currentConferences}
              setCurrentConferences={setCurrentConferences}
              setActiveConferences={setActiveConferences}
              activeConferences={activeConferences}
              conList={conList}
            />
            {isYearVisible || option.hideYear &&
            <div className='flex w-full justify-center items-center text-center'>
              <MobileSlider currentYear={currentYear} setCurrentYear={setCurrentYear} />
              <AutoPlay currentYear={currentYear} setCurrentYear={setCurrentYear} changesList={changesList} />
            </div>
            }
          </div>
          <div className="flex flex-col hidden md:block md:w-[20%] lg:w-[25%] xl:w-[17.5%] pt-5 md:pt-8 xl:pt-2 2xl:pt-4">
            <div className="flex flex-col">
              <div className="flex flex-row justify-end">
                {!isYearVisible && option.hideYear === false &&
                  <div className="w-full">
                    <AutoPlay currentYear={currentYear} setCurrentYear={setCurrentYear} changesList={changesList} />
                  </div>
                }
                <Options activeConferences={activeConferences} conList={conList} setConList={setConList}/>
              </div>
            {!option.hideLegend && !isYearVisible && (
              <Legend activeConferences={activeConferences} />
            )}
            </div>
          </div>
        </div>
      </div>
      }
      {fullscreen &&
        <div>
          <ReactMap
            mapdata={mapdata}
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            isYearVisible={isYearVisible}
            changesList={changesList}
            setChangesList={setChangesList}
            schoolStates={schoolStates}
            setSchoolStates={setSchoolStates}
            currentConferences={currentConferences}
            setCurrentConferences={setCurrentConferences}
            setActiveConferences={setActiveConferences}
            activeConferences={activeConferences}
            conList={conList}
          />
        </div>
      }
       <div className="xl:hidden">
        <div className="w-full">
          {!option.hideHistory &&
            <History changesList={changesList}/>
          }
        </div>
      </div>
    </div>
  );
}

export default Main;
