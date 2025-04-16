import React from "react";

export const PreviewCard= ({
  name = "Zinger Burger",
  description = "Crispy chicken fillet with fresh lettuce and special sauce",
  price = "12.99",
  category = "Burgers",
  subcategory = "Large",
  imageUrl = "https://cdn.builder.io/api/v1/image/assets/TEMP/2308ed851d838ad164371c5bde2bf29ce1f6b4fb",
}) => {
  return (
    <div className="w-[395px] max-md:w-full">
      <div className="text-lg font-semibold text-black mb-4">Preview</div>
      <div className="border border overflow-hidden rounded-lg border-solid">
        <div className="w-full h-[693px] max-sm:h-[400px]">
          <img
            src={imageUrl}
            className="w-full h-full object-cover"
            alt={name}
          />
        </div>
        <div className="p-4">
          <div className="text-lg font-semibold text-black mb-2.5">
            {name || "Zinger Burger"}
          </div>
          <div className="text-sm text-gray-600 mb-6">
            {description ||
              "Crispy chicken fillet with fresh lettuce and special sauce"}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-base font-semibold text-orange-500">
              Rs:{price || "No Price"}
            </div>
            <div className="text-sm text-gray-500">
              {category} • {subcategory}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
