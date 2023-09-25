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
  const [options, setOptions] = useState({hideLogos: false, majorConferences: false, hideHistory: false, hideLegend: false, hideHeader: false, hideSettings: false, hideYear: false, showWelcome: true});
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
    // const handleWindowResize = () => {
    //   setIsYearVisible(
    //     options.hideHeader || window.innerWidth <= minWidth
    //   );
    // };

    // handleWindowResize();
    // window.addEventListener('resize', handleWindowResize);
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

  }, [currentYear, options, isYearVisible]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {options.showWelcome &&
          <Welcome options={options} setOptions={setOptions}/>
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
          <div className="md:w-[80%] lg:w-[75%] xl:w-[65%] flex justify-center">
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
          <div className="flex flex-col md:w-[20%] lg:w-[25%] xl:w-[17.5%]">
            <div className="flex flex-col flex-grow">
              <div className="flex flex-row h-[50%]">
                <div className="w-full">
                  <AutoPlay currentYear={currentYear} setCurrentYear={setCurrentYear} changesList={changesList} />
                </div>
                <Options options={options} setOptions={setOptions} activeConferences={activeConferences} />
              </div>
            {!options.hideLegend && (
              <Legend activeConferences={activeConferences} />
            )}
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
