import React from "react";
import conferenceData from "../../data/updatedConferenceData.json"
import Image from "next/image";

export default function Conferences(){
  function getYears(years) {
    let simplifiedYears = [];
    let startYear = years[0];
    let endYear = years[0];

    for(const year of years.slice(1)){
      if(year === endYear + 1){
          endYear = year;
      }
      else{
        if(startYear === endYear){
          simplifiedYears.push(startYear.toString());
        }
        else{
          simplifiedYears.push(`${startYear} - ${endYear}`);
        }
        startYear = year;
        endYear = year;
      }
  }

    if(startYear === endYear){
      simplifiedYears.push(startYear.toString());
    }
    else{
      simplifiedYears.push(`${startYear} - ${endYear}`);
    }

    return simplifiedYears.join(', ');
  }

  return (
    <div className="pl-24 pr-24 pt-2">
      <p className="text-white text-[32px] font-semibold text-center">Conferences</p>
      <div className="grid gap-0 md:gap-2 grid-cols-1 md:grid-cols-1">
        {conferenceData
          .slice()
          .sort((a, b) => a.founded - b.founded)
          .map((conference, index) => {
          if(conference.founded){
            return(
              <div key={index} className="mt-10">
                <div>
                  <div className="flex items-center justify-center">
                    {conference.logo &&
                      <Image
                        width={40}
                        height={40}
                        className='max-h-[40px] max-w-auto mr-2 bg-white p-1'
                        src={conference.logo}
                        alt={`${conference.abbreviation} logo`} 
                      />
                    }
                    <span className='text-center text-[22px] text-white font-semibold'>
                      {conference.conference}
                    </span>
                  </div>
                    {conference.disbanded ? (
                      <p className="text-white text-sm text-center">Years Active: {conference.founded} - {conference.disbanded}</p>
                    ) : (
                      <p className="text-white text-sm text-center">Years Active: {conference.founded} - Present</p>
                    )
                    }
                    {conference.headquarters &&
                      <p className="text-white text-sm text-center">Headquarters: {conference.headquarters}</p>
                    }
                    {conference.names.length > 1 && 
                      <div className="pt-6">
                        <p className="text-center text-[20px] text-white font-semibold">Name History</p>
                        <div className="flex flex-wrap text-center">
                          {conference.names.map((names, index) => (
                            <div key={index} className="flex flex-col text-white w-1/2 md:w-1/3 px-1">
                              {names.endYear ? (
                                <p className="text-white">{names.conference} {names.startYear} - {names.endYear}</p>
                              ) : (
                                <p className="text-white">{names.conference} {names.startYear} - Present</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    }
                </div>
                <div className="pt-6">
                  <p className='text-center text-[20px] text-white font-semibold'>Members</p>
                  <div className="flex flex-wrap pt-2 text-center">
                  {conference.schools
                    .slice()
                    .sort((a, b) => a.years[0] - b.years[0])
                    .map((school, index) => (
                      <div key={index} className="flex flex-col text-white w-1/2 md:w-1/3 px-1">
                        <p>
                          {school.years[0] === conference.founded ? <span className="text-red-500 text-bold">*</span> : null }
                          {school.nickName} {getYears(school.years)}, {school.years.length} years
                        </p>
                      </div>
                  ))}
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
};