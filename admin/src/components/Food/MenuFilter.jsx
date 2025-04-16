import React, { useState } from "react";

const categorySubcategoryMap = {
  Pizza: ["Large", "Medium", "Small"],
  Pastas: ["Creamy", "Spicy", "Cheesy"],
  Desserts: ["Ice Cream", "Cakes", "Pastries"],
  Shwarma: ["Ice Cream", "Cakes", "Pastries"],
  Burger: ["Ice Cream", "Cakes", "Pastries"],

};

export const MenuFilters = ({ onSearch, onCategoryChange, onSubcategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value);
    onSubcategoryChange(""); // Reset subcategory when category changes
  };

  return (
    <div className="bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6 rounded-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search items..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full h-[50px] border border-gray-200 text-base text-[#ADAEBC] px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Search menu items"
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <select
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="h-[50px] border border-gray-200 bg-white text-base pl-3 pr-[42px] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Select category"
          >
            <option value="">All Categories</option>
            {Object.keys(categorySubcategoryMap).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => onSubcategoryChange(e.target.value)}
            className="h-[50px] border border-gray-200 bg-white text-base pl-3 pr-[42px] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Select subcategory"
          >
            <option value="">All Subcategories</option>
            {selectedCategory &&
              categorySubcategoryMap[selectedCategory]?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};
