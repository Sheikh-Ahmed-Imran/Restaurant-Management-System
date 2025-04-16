import React from "react";
import { MenuCard } from "./MenuCard";



export const MenuGrid= ({
  items,
  onEdit,
  onDelete,
  onSelect,
}) => {
  
  return (
    <div className="grid grid-cols-3 gap-8 max-md:grid-cols-2 max-sm:grid-cols-1">
      {items.map((item) => (
        <MenuCard
          key={item._id}
          {...item}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};