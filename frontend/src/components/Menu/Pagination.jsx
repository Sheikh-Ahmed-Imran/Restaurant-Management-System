import React from "react";


export const Pagination= ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 bg-gray-100 text-gray-700 px-[18px] py-2 rounded-lg"
      >
        <svg
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[10px] h-[16px]"
        >
          <path
            d="M0.293762 7.29365C-0.0968628 7.68428 -0.0968628 8.31865 0.293762 8.70928L6.29376 14.7093C6.68439 15.0999 7.31876 15.0999 7.70939 14.7093C8.10001 14.3187 8.10001 13.6843 7.70939 13.2937L2.41564 7.9999L7.70626 2.70615C8.09689 2.31553 8.09689 1.68115 7.70626 1.29053C7.31564 0.899902 6.68126 0.899902 6.29064 1.29053L0.290637 7.29053L0.293762 7.29365Z"
            fill="#374151"
          />
        </svg>
        <span>Previous</span>
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-[38px] h-10 ${
            currentPage === page
              ? "bg-orange-600 text-white"
              : "bg-gray-100 text-black"
          } rounded-lg`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 bg-gray-100 text-gray-700 px-[18px] py-2 rounded-lg"
      >
        <span>Next</span>
        <svg
          width="11"
          height="16"
          viewBox="0 0 11 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[10px] h-[16px]"
        >
          <g clipPath="url(#clip0_4_1455)">
            <path
              d="M10.6281 7.29365C11.0187 7.68428 11.0187 8.31865 10.6281 8.70928L4.62812 14.7093C4.23749 15.0999 3.60312 15.0999 3.21249 14.7093C2.82187 14.3187 2.82187 13.6843 3.21249 13.2937L8.50624 7.9999L3.21562 2.70615C2.82499 2.31553 2.82499 1.68115 3.21562 1.29053C3.60624 0.899902 4.24062 0.899902 4.63124 1.29053L10.6312 7.29053L10.6281 7.29365Z"
              fill="#374151"
            />
          </g>
          <defs>
            <clipPath id="clip0_4_1455">
              <path d="M0.921875 0H10.9219V16H0.921875V0Z" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};