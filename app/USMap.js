"use client"
import { useEffect, useState } from 'react';
import mapdata from './data/mapData.json';
import Year from './Year';
import Legend from './Legend';
import Changes from './History';
import Header from './Header';
import Options from './Options';
import MobileSlider from './MobileSlider';
import Welcome from './Welcome';
import Map from './Map';
import AutoPlay from './AutoPlay';

function USMap() {
  const [currentYear, setCurrentYear] = useState(1892);
  const [activeConferences, setActiveConferences] = useState(null);
  const [changesList, setChangesList] = useState([]);
  const [options, setOptions] = useState({logos: false, majorConferences: false, hideHistory: false, hideLegend: false, hideHeader: false, hideSettings: false, hideYear: false, showWelcome: true});
  const [currentConferences, setCurrentConferences] = useState(null);
  const [schoolStates, setSchoolStates] = useState(null);
  const [isYearVisible,setIsYearVisible] = useState(false);
  const minWidth = (768)

  // useEffect(() => {
  //   if(localStorage.savedYear){
  //     setCurrentYear(parseInt(localStorage.savedYear))
  //   }
  //   if(localStorage.savedOptions){
  //     setOptions(JSON.parse(localStorage.getItem('savedOptions')));
  //   }
  // },[])

  useEffect(() => {
    const handleWindowResize = () => {
      setIsYearVisible(
        options.hideHeader || window.innerWidth <= minWidth
      );
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    const handleKeyDown = (e) => {
      if (e.keyCode === 37) { // Left arrow key
        setCurrentYear(currentYear - 1);
      } else if (e.keyCode === 39) { // Right arrow key
        setCurrentYear(currentYear + 1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const saveToLocalStorage = () => {
      localStorage.setItem("savedYear", JSON.stringify(currentYear))
      localStorage.setItem("savedOptions", JSON.stringify(options))
    }
    saveToLocalStorage();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [mapdata, currentYear, options, isYearVisible]);
  // console.log(window.innerWidth)
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {options.showWelcome &&
          <Welcome setOptions={setOptions}/>
        }
        {!options.hideYear &&
          <Year currentYear={currentYear} setCurrentYear={setCurrentYear} />
        }
          {!options.hideHeader &&
          <div>
            <Header currentYear={currentYear} />
          </div>
          }
        <div className="flex w-full">
          <div className="hidden xl:block xl:w-[17.5%]">
            {!options.hideHistory &&
              <Changes changesList={changesList}/>
            }
          </div>
          <div className="w-[90%] lg:w-[95%] xl:w-[65%] flex justify-center">
            <Map
              mapdata={mapdata}
              currentYear={currentYear}
              options={options}
              isYearVisible={isYearVisible}
              changesList={changesList}
              setChangesList={setChangesList}
              schoolStates={schoolStates}
              setSchoolStates={setSchoolStates}
              currentConferences={currentConferences}
              setCurrentConferences={setCurrentConferences}
              setActiveConferences={setActiveConferences}
              activeConferences={activeConferences}
            />
          </div>
          <div className="hidden sm:block sm:absolute right-[15px] top-[200px] sm:right-[80px] sm:top-[150px] md:right-[90px] md:top-[250px] lg:right-[25px] lg:top-[400px] xl:right-[40px] xl:top-[480px] 2xl:right-[110px] 2xl:top-[375px] z-0">
            {!options.hideLegend &&
              <Legend activeConferences={activeConferences} />
            }
          </div>
          <div className="w-[10%] lg:w-[5%] xl:w-[17.5%]">
            <div className="flex flex-col">
              <div className='flex flew-row justify-between'>
                <div className='w-full'>
                  <AutoPlay currentYear={currentYear} setCurrentYear={setCurrentYear} changesList={changesList}/>
                </div>
                <Options options={options} setOptions={setOptions} activeConferences={activeConferences} />
              </div>
            </div>
            </div>
          </div>
        </div>
      <div className='flex justify-center'>
        {isYearVisible &&
          <MobileSlider currentYear={currentYear} setCurrentYear={setCurrentYear}/>
        }
      </div>
      <div className="xl:hidden">
        <div className="w-full">
          {!options.hideHistory &&
            <Changes changesList={changesList}/>
          }
        </div>
      </div>
    </div>
  );
}

export default USMap;
