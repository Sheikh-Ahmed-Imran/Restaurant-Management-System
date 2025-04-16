import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { OrderStatus } from "./OrderStatus";
import { OrderSteps } from "./OrderSteps";
import { OrderSummary } from "./OrderSummary";
import { ReceiptSection } from "./ReceiptSection";
import { RefreshBar } from "./Refreshbar";
import axios from "axios";

export const OrderTracker = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/order/get/${orderId}`);
        setOrder(res.data.data); // access the actual order object
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return <div className="p-6 text-center">Loading order details...</div>;
  }

  if (!order) {
    return <div className="p-6 text-center text-red-500">Order not found.</div>;
  }

  return (
    <div className="flex flex-col items-start w-full bg-white rounded-lg border-[2px_solid_#CED4DA]">
      <div className="w-full bg-[linear-gradient(90deg,#FFF7ED_0%,#FFF_100%)]">
        <Header />
        <main className="flex flex-col items-center gap-8 max-w-4xl mx-auto px-4 py-8">
          <OrderStatus orderId={order._id} />
          <OrderSteps orderId={orderId}/>
          <OrderSummary order={order}/>
          <ReceiptSection order={order}/>
        </main>
        <RefreshBar />
      </div>
    </div>
  );
};
