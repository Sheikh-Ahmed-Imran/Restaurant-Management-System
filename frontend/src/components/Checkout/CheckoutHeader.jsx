import React from "react";

export const CheckoutHeader= () => {
  return (
    <header className="h-[65px] flex justify-center items-center bg-white border-b border-solid">
      <div className="w-[1280px] flex justify-between items-center p-4 max-sm:px-6 max-sm:py-4">
        <div className="flex items-center gap-2">
          <div>
            <svg
              width="21"
              height="24"
              viewBox="0 0 21 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 0C18.75 0 13.5 1.5 13.5 8.25V13.5C13.5 15.1547 14.8453 16.5 16.5 16.5H18V22.5C18 23.3297 18.6703 24 19.5 24C20.3297 24 21 23.3297 21 22.5V16.5V11.25V1.5C21 0.670312 20.3297 0 19.5 0ZM3 0.75C3 0.365625 2.71406 0.046875 2.32969 0.0046875C1.94531 -0.0375 1.60313 0.215625 1.51875 0.585938L0.0984375 6.975C0.0328125 7.27031 0 7.57031 0 7.87031C0 10.0219 1.64531 11.7891 3.75 11.9813V22.5C3.75 23.3297 4.42031 24 5.25 24C6.07969 24 6.75 23.3297 6.75 22.5V11.9813C8.85469 11.7891 10.5 10.0219 10.5 7.87031C10.5 7.57031 10.4672 7.27031 10.4016 6.975L8.98125 0.585938C8.89688 0.210938 8.54531 -0.0375 8.16562 0.0046875C7.78594 0.046875 7.5 0.365625 7.5 0.75V7.04062C7.5 7.29375 7.29375 7.5 7.04062 7.5C6.80156 7.5 6.60469 7.31719 6.58125 7.07812L5.99531 0.684375C5.9625 0.295313 5.63906 0 5.25 0C4.86094 0 4.5375 0.295313 4.50469 0.684375L3.92344 7.07812C3.9 7.31719 3.70312 7.5 3.46406 7.5C3.21094 7.5 3.00469 7.29375 3.00469 7.04062V0.75H3ZM5.26406 7.875H5.25H5.23594L5.25 7.84219L5.26406 7.875Z"
                fill="#F97316"
              />
            </svg>
          </div>
          <div className="text-xl font-semibold text-black">TasteBuds</div>
        </div>
        <div className="flex items-center max-sm:hidden">
          <div className="text-white w-8 h-8 text-base relative rounded-[50%]">
            1
          </div>
          <div className="w-16 h-1 bg-gray-300" />
          <div className="text-white w-8 h-8 text-base relative rounded-[50%]">
            2
          </div>
          <div className="w-16 h-1 bg-gray-300" />
          <div className="text-black w-8 h-8 text-base relative rounded-[50%]">
            3
          </div>
        </div>
      </div>
    </header>
  );
};
