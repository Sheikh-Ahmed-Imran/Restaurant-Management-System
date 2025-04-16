import React, { useState, useEffect } from "react";

export const RefreshBar = () => {
  const [seconds, setSeconds] = useState(14);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 14));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setSeconds(14);
    // Add refresh logic here
  };

  return (
    <div className="flex justify-center items-center w-full h-[104px] bg-white px-20 py-6 max-md:px-10 max-sm:px-5">
      <div className="flex flex-col items-center gap-[9px]">
        <div className="text-center">
          <span className="text-gray-500">Refresh in: </span>
          <span className="text-orange-500">{seconds}</span>
          <span className="text-gray-500"> seconds</span>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 text-orange-500 cursor-pointer"
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.59687 6.33105C3.8375 5.6498 4.22812 5.00918 4.77812 4.4623C6.73125 2.50918 9.89688 2.50918 11.85 4.4623L12.3844 4.9998H10.8125C10.2594 4.9998 9.8125 5.44668 9.8125 5.9998C9.8125 6.55293 10.2594 6.9998 10.8125 6.9998H14.7969H14.8094C15.3625 6.9998 15.8094 6.55293 15.8094 5.9998V1.9998C15.8094 1.44668 15.3625 0.999805 14.8094 0.999805C14.2562 0.999805 13.8094 1.44668 13.8094 1.9998V3.5998L13.2625 3.0498C10.5281 0.31543 6.09688 0.31543 3.3625 3.0498C2.6 3.8123 2.05 4.70918 1.7125 5.66855C1.52812 6.19043 1.80313 6.75918 2.32188 6.94355C2.84063 7.12793 3.4125 6.85293 3.59687 6.33418V6.33105Z"
              fill="#F97316"
            />
            <path
              d="M1.53125 9.04043C1.375 9.0873 1.225 9.17168 1.10312 9.29668C0.978125 9.42168 0.89375 9.57168 0.85 9.73418C0.840625 9.77168 0.83125 9.8123 0.825 9.85293C0.815625 9.90605 0.8125 9.95918 0.8125 10.0123V13.9998C0.8125 14.5529 1.25937 14.9998 1.8125 14.9998C2.36563 14.9998 2.8125 14.5529 2.8125 13.9998V12.4029L3.3625 12.9498C6.09688 15.6811 10.5281 15.6811 13.2594 12.9498C14.0219 12.1873 14.575 11.2904 14.9125 10.3342C15.0969 9.8123 14.8219 9.24355 14.3031 9.05918C13.7844 8.8748 13.2125 9.1498 13.0281 9.66855C12.7875 10.3498 12.3969 10.9904 11.8469 11.5373C9.89375 13.4904 6.72813 13.4904 4.775 11.5373L4.77187 11.5342L4.2375 10.9998H5.8125C6.36562 10.9998 6.8125 10.5529 6.8125 9.9998C6.8125 9.44668 6.36562 8.9998 5.8125 8.9998H1.825C1.775 8.9998 1.725 9.00293 1.675 9.00918C1.625 9.01543 1.57812 9.0248 1.53125 9.04043Z"
              fill="#F97316"
            />
          </svg>
          <span>Refresh Now</span>
        </button>
      </div>
    </div>
  );
};
