import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import OptionsMenu from './OptionsMenu';

export default function Options({ options, setOptions }) {
  const [menu, setMenu] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [showHiddenDiv, setShowHiddenDiv] = useState(false)

  const openMenu = () => {
    setMenu(!menu);
    setShowDiv(!menu);
    if(options.hideSettings){
      setShowHiddenDiv(false);
    }
    // if (!menu) {
    //   setTimeout(() => {
    //     setShowDiv(!menu);
    //   }, 50);
    // }
    //  else {
    //   setShowDiv(false);
    // }
  };
  const handleMouseLeave = () => {
  
      setShowHiddenDiv(false);
  };
  const handleMouseEnter = () => {
    if (options.hideSettings) {
      setShowHiddenDiv(true);
    }
  };
  console.log(!options.hideSettings, !showHiddenDiv)
  return (
    <div className='menu-container'>
      {!options.hideSettings && !showDiv && (
        <div className='bg-white'>
        <button
          onClick={openMenu}
          className="flex flex-col items-center text-center font-bold"
         >
          <h1 className='px-2 py-5' style={{fontSize: '1rem', color: 'black', letterSpacing: '3px', transform: 'rotate(180deg)', writingMode: 'vertical-lr', lineHeight: '1.2'}}>
            SETTINGS
          </h1>
        </button>
      </div>
      )}
      {options.hideSettings && !showHiddenDiv && !showDiv &&(
        <div className="hover-div w-[35.19px] h-[144.56px]" onMouseEnter={handleMouseEnter}></div>
      )}
      {showHiddenDiv &&
        <div className='bg-white'>
        <button
          onClick={openMenu}
          onMouseLeave={handleMouseLeave}
          className="flex flex-col items-center text-center font-bold"
        >
            <h1 className='px-2 py-5' style={{fontSize: '1rem', color: 'black', letterSpacing: '3px', transform: 'rotate(180deg)', writingMode: 'vertical-lr', lineHeight: '1.2'}}>
              SETTINGS
            </h1>
        </button>
      </div>
      }
      <CSSTransition
        in={menu}
        timeout={200}
        classNames="menu"
        unmountOnExit
        onExited={() => {
          if (!menu) {
            setShowDiv(false);
          }
        }}
      >
        <div>
          {showDiv && (
            <OptionsMenu options={options} setOptions={setOptions} menu={menu} setMenu={setMenu} />
          )}
        </div>
      </CSSTransition>
    </div>
  );
}
