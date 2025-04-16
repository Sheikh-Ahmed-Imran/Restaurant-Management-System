import React from "react";
import { cn } from "../../lib/utils";

export const OrderCard = ({ order, onStatusChange }) => {
  const statusStyles = {
    Processing: {
      container: "border-l-orange-500",
      badge: "border-orange-200 text-orange-600 bg-orange-50",
      dot: "bg-orange-500",
    },
    Cooking: {
      container: "border-l-blue-500",
      badge: "border-blue-200 text-blue-600 bg-blue-50",
      dot: "bg-blue-500",
    },
    Ready: {
      container: "border-l-green-500",
      badge: "border-green-200 text-green-600 bg-green-50",
      dot: "bg-green-500",
    },
    Completed: {
      container: "border-l-gray-500",
      badge: "border-gray-200 text-gray-600 bg-gray-50",
      dot: "bg-gray-500",
    },
  };

  const style = statusStyles[order.status];

  const statuses = ["Processing", "Cooking", "Ready", "Completed"];

  return (
    <div
      className={cn(
        "border-l-4 shadow bg-white p-6 rounded-xl border-solid",
        style.container
      )}
    >
      <div className="flex justify-between items-center mb-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <div className="flex flex-col gap-1">
          <div className="text-gray-500 text-sm">#{order.id}</div>
          <div className="flex items-center gap-2 text-sm">
            <div className={cn("w-2 h-2 rounded-full", style.dot)} />
            <span>{order.orderTime}</span>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center gap-2 h-8 border text-sm px-3 rounded-full",
            style.badge
          )}
        >
          <span className="capitalize">{order.status}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex flex-col text-base gap-1">
            <div className="font-semibold">{item.name}</div>
            <div className="flex justify-between text-sm text-gray-700 pl-4">
              <div>
                {item.quantity}x {item.name}
              </div>
              <div>Rs:{item.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t max-sm:flex-col max-sm:gap-4">
        <div className="flex gap-3 text-sm">
          <span className="text-gray-500">Total:</span>
          <span className="font-bold">Rs: {order.total || "N/A"}</span>
        </div>

        <div className="flex items-center gap-2 max-sm:w-full">
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value)}
            className="border border-gray-300 rounded-full px-3 py-1 text-sm max-sm:w-full"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
