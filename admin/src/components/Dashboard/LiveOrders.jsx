import { useState,useEffect } from "react";
import { OrderCard } from "./OrderCard";

import { cn } from "../../lib/utils";

const OrderStatus = "all" | "Processing" | "coCCoking" | "ready";

export const LiveOrders = ({orders}) => {
  const [activeFilter, setActiveFilter] = useState("all");
 

  const FilterButton = ({ status }) => (
    <button
      onClick={() => setActiveFilter(status)}
      className={cn(
        "px-4 py-2.5 rounded-lg capitalize",
        activeFilter === status ? "bg-orange-500 text-white" : "text-gray-600"
      )}
    >
      {status}
    </button>
  );

  return (
    <div className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] w-full p-6 rounded-xl ">
      <div className="flex w-full items-stretch gap-5 flex-wrap justify-between">
        <div className="text-black text-lg font-semibold leading-none my-auto">
          Live Orders
        </div>
        <div className="flex items-stretch gap-2 text-sm font-normal text-center">
          <FilterButton status="all" />
          <FilterButton status="Processing" />
          <FilterButton status="Cooking" />
          <FilterButton status="Ready" />
        </div>
      </div>
      <div className="text-sm font-normal mt-6">
      {orders
        .filter(order => activeFilter === "all" || order.status === activeFilter)
        .map(order => (
          <OrderCard
            key={order._id} // assuming each order has a unique _id
            orderNumber={order._id}
            items={order.items.map(item => `${item.name} x${item.quantity}`).join(", ")}
            time={order.maxTime || "Just now"} // use order.timeAgo or create your own formatter
            status={order.status}
          />
        ))}
      </div>
    </div>
  );
};
