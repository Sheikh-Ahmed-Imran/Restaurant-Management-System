
import React from "react";





export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto max-w-full py-2 max-sm:justify-start sm:flex-wrap sm:justify-center sm:gap-2 sm:py-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`flex-[shrink] ${
            selectedCategory === category.id
              ? "bg-orange-600 text-white"
              : "bg-gray-100 text-gray-700"
          } px-6 py-2 rounded-full`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};