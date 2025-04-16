import React from "react";



export const MenuHeader= ({ onAddItem }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Menu Management</h1>
        <h5 className="text-sm md:text-base text-gray-800">
          Manage your restaurant's food items across all categories
        </h5>
      </div>
      <button
        onClick={onAddItem}
        className="flex items-center gap-2 bg-[linear-gradient(90deg,#F97316_0%,#EA580C_100%)] text-white px-4 py-2 md:px-6 md:py-3.5 rounded-lg hover:opacity-90 transition-opacity w-full md:w-auto"
        aria-label="Add new menu item"
      >
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_4_1951)">
            <path
              d="M8.46875 2.5C8.46875 1.94687 8.02187 1.5 7.46875 1.5C6.91563 1.5 6.46875 1.94687 6.46875 2.5V7H1.96875C1.41562 7 0.96875 7.44688 0.96875 8C0.96875 8.55312 1.41562 9 1.96875 9H6.46875V13.5C6.46875 14.0531 6.91563 14.5 7.46875 14.5C8.02187 14.5 8.46875 14.0531 8.46875 13.5V9H12.9688C13.5219 9 13.9688 8.55312 13.9688 8C13.9688 7.44688 13.5219 7 12.9688 7H8.46875V2.5Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_4_1951">
              <path d="M0.46875 0H14.4688V16H0.46875V0Z" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>Add New Item</span>
      </button>
    </div>
  );
};
