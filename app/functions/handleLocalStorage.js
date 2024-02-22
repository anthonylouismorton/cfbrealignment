
export function getLocalStorage(){
  var savedConfList = null;
  var savedOptions = null;
  var savedYear = null;
  if(localStorage.savedConfList){
    savedConfList = JSON.parse(localStorage.getItem('savedConfList'));
  };
  if(localStorage.savedOptions){
    savedOptions = JSON.parse(localStorage.getItem('savedOptions'));
  };
  if(localStorage.savedYear){
    savedYear = JSON.parse(localStorage.getItem('savedYear'));
  };
  return { savedConfList, savedOptions, savedYear };
};


export function setLocalStorage(option, conFilter, year){
  console.log('setting localstorage');
    localStorage.setItem("savedOptions", JSON.stringify(option));
    localStorage.setItem("savedConfList", JSON.stringify(conFilter));
    localStorage.setItem("savedYear", JSON.stringify(year));
};