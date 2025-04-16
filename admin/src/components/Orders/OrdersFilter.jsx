import React from "react";

import { cn } from "../../lib/utils";



export const OrdersFilter= ({
  filters,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex gap-2 border w-fit bg-white mb-8 p-[5px] rounded-full border-solid max-md:w-full max-md:overflow-x-auto max-md:p-[5px]">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "text-base text-black cursor-pointer px-6 py-2 rounded-full border-none max-md:whitespace-nowrap transition-colors",
            activeFilter === filter.value && "bg-orange-500 text-white",
          )}
        >
          {`${filter.label} (${filter.count})`}
        </button>
      ))}
    </div>
  );
};
