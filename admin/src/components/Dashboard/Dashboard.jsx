import { Sidebar } from "./Sidebar";
import { StatsCard } from "./StatsCard";
import { Overview } from "./Overview";
import axios from "axios";
import { useState,useEffect } from "react";
import { LiveOrders } from "./LiveOrders";

const Dashboard = () => {
   const [orders, setOrders] = useState([]);
    
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/order/list`);
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
    }, []);
    const totalOrders = orders.length;

    const avgMaxTime = orders.length
      ? Math.round(
          orders.reduce((sum, order) => sum + (order.maxTime || 0), 0) / orders.length
        )
      : 0;
      const totalCompleted = orders.filter(order => order.status === "Completed").length;
const totalProcessing = orders.filter(order => order.status === "Processing").length;
const totalReady = orders.filter(order => order.status === "Ready").length;
const totalCooking = orders.filter(order => order.status === "Cooking").length;

  return (
    <div className="bg-gray-50 min-h-screen flex w-full">
      {/* Sidebar */}
   

      {/* Main Content */}
      <main className="w-full p-8">
        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard label="Active Orders"  value={totalProcessing} icon="https://cdn.builder.io/api/v1/image/assets/26d5a69107b541308c8fc309cac8cffb/87c7b3f23d0543ba080dba2f5a23c3f027644a14?placeholderIfAbsent=true"  />
          <StatsCard label="Cooking"  value={totalCooking}  icon="https://cdn.builder.io/api/v1/image/assets/26d5a69107b541308c8fc309cac8cffb/961693c37b9bfa9461fe8cc6d3373dd778a7f3cf?placeholderIfAbsent=true" />
          <StatsCard label="Ready for Pickup" value={totalReady} icon="https://cdn.builder.io/api/v1/image/assets/26d5a69107b541308c8fc309cac8cffb/e5bec4d7f539f6c01d58cf0a686adf0bb7100598?placeholderIfAbsent=true" />
          <StatsCard label="Completed Today" value={totalCompleted}  icon="https://cdn.builder.io/api/v1/image/assets/26d5a69107b541308c8fc309cac8cffb/bc68a415b9dbecf48782581baf5f3f60ad3b9370?placeholderIfAbsent=true" />
        </section>

        {/* Overview and Live Orders */}
        <section className="mt-8 flex flex-col md:grid md:grid-cols-3 gap-5">
          <div className="w-full md:col-span-1">
            <Overview count={totalOrders} avgTime={avgMaxTime}/>
          </div>
          <div className="w-full md:col-span-2">
            <LiveOrders orders={orders}/>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;