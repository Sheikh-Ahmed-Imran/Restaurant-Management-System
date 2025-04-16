import React from "react";


export const TimelineIcon = ({ icon }) => {
  return (
    <div className="w-8 h-8 flex justify-center items-center absolute -translate-x-2/4 z-[2] bg-[#FF5722] rounded-[50%] left-2/4 max-sm:relative max-sm:mx-auto max-sm:my-4 max-sm:left-auto">
      <i className={`ti ti-${icon} text-[white] text-base`} />
    </div>
  );
};
