import React from "react";

export const MenuCard = ({
  _id,
  name,
  image,
  category,
  subcategories = [],
  onEdit,
  onDelete,
  onSelect,
}) => {
  return (
    <div className="bg-white border border-gray-100 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden rounded-xl">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-[192px] object-cover" />
        <input
          type="checkbox"
          onChange={(e) => onSelect(_id, e.target.checked)}
          className="absolute w-5 h-5 bg-white rounded-[1px] border-[0.5px] border-black right-2 top-2 cursor-pointer"
          aria-label={`Select ${name}`}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base text-gray-800 font-medium">{name}</h3>
        </div>
        <div className="text-sm text-gray-500 mb-2">{category}</div>

        <div className="space-y-1 mb-4">
          {subcategories.map((sub, index) => (
            <div
              key={index}
              className="text-sm text-gray-700 flex justify-between"
            >
              <span>{sub.name}</span>
              <span className="text-orange-600 font-medium">${sub.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(_id)}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-50 text-orange-600 py-2.5 rounded-lg hover:bg-orange-100 transition-colors"
            aria-label={`Edit ${name}`}
          >
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="..." fill="#EA580C" />
            </svg>
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="w-[38px] h-10 flex items-center justify-center bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            aria-label={`Delete ${name}`}
          >
          <svg width="15" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M3 6h18M8 6v12m8-12v12M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"
    stroke="#DC2626"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

          </button>
        </div>
      </div>
    </div>
  );
};
