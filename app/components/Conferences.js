import React from "react";
import conferenceData from "../data/updatedConferenceData.json"
import Image from "next/image";

export default function Conferences(){
  function getYears(years) {
    let simplifiedYears = [];
    let startYear = years[0];
    let endYear = years[0];

    for (let i = 1; i < years.length; i++) {
        if (years[i] === endYear + 1) {
            endYear = years[i];
        } else {
            if (startYear === endYear) {
                simplifiedYears.push(startYear.toString());
            } else {
                simplifiedYears.push(`${startYear} - ${endYear}`);
            }
            startYear = years[i];
            endYear = years[i];
        }
    }

    if (startYear === endYear) {
        simplifiedYears.push(startYear.toString());
    } else {
        simplifiedYears.push(`${startYear} - ${endYear}`);
    }

    return simplifiedYears.join(', ');
}
  return (
    <div className="pl-24 pr-24 pt-2">
      <p className="text-white text-[32px] font-semibold text-center">Conferences</p>
      <div className="grid gap-0 md:gap-2 grid-cols-1 md:grid-cols-1">
        {conferenceData.map((conference, index) => {
          if(conference.founded){
            return(
              <div key={index} className="mt-20">
                <div>
                  <div className="flex items-center justify-center pb-2">
                    {conference.logo &&
                      <Image
                        width={40}
                        height={40}
                        className='max-h-[40px] max-w-auto mr-2 bg-white p-1'
                        src={conference.logo}
                        alt={`${conference.abbreviation} logo`} 
                      />
                    }
                    <span className='text-center text-[20px] text-white font-semibold'>
                      {conference.conference}
                    </span>
                  </div>
                    {conference.disbanded ? (
                      <p className="text-white text-center">Years Active: {conference.founded} - {conference.disbanded}</p>
                    ) : (
                      <p className="text-white text-center">Years Active: {conference.founded} - Present</p>
                    )
                    }
                    {conference.headquarters &&
                      <p className="text-white text-center">Headquarters: {conference.headquarters}</p>
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
                    {conference.schools.map((school, index) => (
                      <div key={index} className="flex flex-col text-white w-1/2 md:w-1/3 px-1">
                        <p>{school.school} {getYears(school.years)}</p>
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