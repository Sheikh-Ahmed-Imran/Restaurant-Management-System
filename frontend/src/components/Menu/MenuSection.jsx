import React from "react";


export const MenuSection = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-6 w-full max-w-screen-xl ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {children}
    </div>
  );
};