import React, { useEffect, useState } from "react";
import axios from "axios";
import { OrdersHeader } from "../../components/Orders/OrderHeader";
import { OrdersFilter } from "../../components/Orders/OrdersFilter";
import { OrderCard } from "../../components/Orders/OrderCard";
import { FloatingActionButton } from "../../components/Orders/FloatingActionButton";

const OrderIndex = ({ url }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        
      } else {
        console.error("Error:", response.data.message);
      }
      
   
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [url]);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleFilterClick = () => {
    ;
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleStatusChange = async (orderId, currentStatus) => {
    const statusFlow = {
      Processing: "Processing",
      Cooking: "Cooking",
      Ready: "Ready",
      Completed: "Completed", // No change
    };
  
    const nextStatus = statusFlow[currentStatus];
  
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: nextStatus,
      });
  
      if (response.data.success) {
        // Update the local state so UI changes
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status: nextStatus } : order
          )
        );
      } else {
        console.log("Update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating status", error);
    }
  };
  
  const handleFloatingButtonClick = () => {
    ;
  };

  const filteredOrders = orders.filter((order) => {
    const matchSearch = order.address?.fullName
      ?.toLowerCase()
      .includes(searchQuery);
    const matchFilter =
      activeFilter === "all" || order.status === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 max-md:p-4">
      <OrdersHeader onSearch={handleSearch} onFilterClick={handleFilterClick} />

      <OrdersFilter
        filters={[
          { label: "All", count: orders.length, value: "all" },
          { label: "Processing", count: orders.filter(o => o.status === "Processing").length, value: "Processing" },
          { label: "Cooking", count: orders.filter(o => o.status === "Cooking").length, value: "Cooking" },
          { label: "Ready", count: orders.filter(o => o.status === "Ready").length, value: "Ready" },
          { label: "Completed", count: orders.filter(o => o.status === "Completed").length, value: "Completed" },
        ]}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={{
            id: order._id,
            status: order.status,
            timeAgo: "Just now", // Replace with time formatting if needed
            items: order.items.map(item => ({
              quantity: item.quantity,
              name: item.name,
              subcategory:item.subcategories,
              price: item.price,
              
            })),
            total: order.amount
          }} onStatusChange={handleStatusChange} />
        ))}
      </div>

      <FloatingActionButton onClick={handleFloatingButtonClick} />
    </div>
  );
};

export default OrderIndex;
