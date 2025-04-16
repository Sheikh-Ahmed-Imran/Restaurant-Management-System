import React from "react";


export const OrdersHeader = ({
  onSearch,
  onFilterClick,
}) => {
  return (
    <div className="flex justify-between items-center mb-8 max-md:flex-col max-md:gap-4 max-md:items-start">
      <h1 className="text-2xl font-bold text-black">Orders Management</h1>
      <div className="flex gap-4 max-md:w-full max-sm:flex-col">
        <div className="flex gap-4 max-md:w-full max-sm:flex-col">
          <div className="relative w-[373px] max-md:w-full">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7969 6.5C13.7969 7.93437 13.3313 9.25938 12.5469 10.3344L16.5031 14.2937C16.8937 14.6844 16.8937 15.3188 16.5031 15.7094C16.1125 16.1 15.4781 16.1 15.0875 15.7094L11.1313 11.75C10.0563 12.5375 8.73125 13 7.29688 13C3.70625 13 0.796875 10.0906 0.796875 6.5C0.796875 2.90937 3.70625 0 7.29688 0C10.8875 0 13.7969 2.90937 13.7969 6.5ZM7.29688 11C7.88782 11 8.47299 10.8836 9.01895 10.6575C9.56492 10.4313 10.061 10.0998 10.4789 9.68198C10.8967 9.26412 11.2282 8.76804 11.4543 8.22208C11.6805 7.67611 11.7969 7.09095 11.7969 6.5C11.7969 5.90905 11.6805 5.32389 11.4543 4.77792C11.2282 4.23196 10.8967 3.73588 10.4789 3.31802C10.061 2.90016 9.56492 2.56869 9.01895 2.34254C8.47299 2.1164 7.88782 2 7.29688 2C6.70593 2 6.12076 2.1164 5.5748 2.34254C5.02883 2.56869 4.53276 2.90016 4.11489 3.31802C3.69703 3.73588 3.36556 4.23196 3.13942 4.77792C2.91327 5.32389 2.79687 5.90905 2.79687 6.5C2.79687 7.09095 2.91327 7.67611 3.13942 8.22208C3.36556 8.76804 3.69703 9.26412 4.11489 9.68198C4.53276 10.0998 5.02883 10.4313 5.5748 10.6575C6.12076 10.8836 6.70593 11 7.29688 11Z"
                fill="#9CA3AF"
              />
            </svg>
            <input
              type="text"
              placeholder="Search orders..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full h-[42px] border text-base text-black pl-10 pr-4 py-0 rounded-full border-solid focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={onFilterClick}
            className="flex items-center gap-2 h-[42px] border text-base text-black bg-white px-[17px] py-0 rounded-full border-solid max-sm:w-full hover:bg-gray-50 transition-colors"
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.918587 1.71563C1.12484 1.27813 1.56234 1 2.04671 1H15.5467C16.0311 1 16.4686 1.27813 16.6748 1.71563C16.8811 2.15313 16.8186 2.66875 16.5123 3.04375L10.7967 10.0281V14C10.7967 14.3781 10.5842 14.725 10.2436 14.8938C9.90296 15.0625 9.49984 15.0281 9.19671 14.8L7.19671 13.3C6.94359 13.1125 6.79671 12.8156 6.79671 12.5V10.0281L1.07796 3.04063C0.774837 2.66875 0.709212 2.15 0.918587 1.71563Z"
                fill="black"
              />
            </svg>
            <span>Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
