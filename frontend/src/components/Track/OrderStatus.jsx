import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const OrderStatus = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [startTime] = useState(12 * 60);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const statusSteps = ["Processing", "Cooking", "Ready", "Completed"];
  const currentStep = statusSteps.indexOf(order?.status || "Processing");
  const progressPercent = ((currentStep + 1) / statusSteps.length) * 100;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/order/get/${orderId}`
        );
        setOrder(res.data.data);
        if (res.data.data.status === "Completed") {
          setShowModal(true);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 5000);

    return () => clearInterval(interval);
  }, [orderId]);

  useEffect(() => {
    if (order && timeLeft === null) {
      setTimeLeft(startTime);
    }

    if (timeLeft !== null) {
      const countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          setTimeLeft(0);
        } else {
          const newElapsedTime = elapsedTime + 1;
          const remainingTime = startTime - newElapsedTime;
          setElapsedTime(newElapsedTime);
          setTimeLeft(remainingTime);
        }
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [order, timeLeft, elapsedTime, startTime]);

  if (!order || timeLeft === null) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="w-full bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10),0px_10px_15px_0px_rgba(0,0,0,0.10)] p-8 rounded-2xl relative">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          We're on it! Your order is being prepared 🍽️
        </h1>
        <div className="text-gray-600 text-base">
          Order #{order._id?.slice(-4)} —{" "}
          {order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
        </div>
      </div>

      <div className="flex justify-center items-center gap-12 max-sm:flex-col">
        <div className="relative w-40 h-40">
          <div className="absolute w-full h-full rounded-full border-[8px_solid_#FFEDD5]" />
          <div className="absolute flex items-center justify-center inset-0">
            <div className="text-center">
              <div className="text-2xl font-bold">{formattedTime}</div>
              <div className="text-gray-500 text-small">time remaining</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-96 max-sm:w-full">
          <div className="relative w-full h-3 bg-orange-100 rounded-full">
            <div
              className="h-full bg-[linear-gradient(90deg,#FB923C_0%,#EA580C_100%)] opacity-[0.6951] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            {statusSteps.map((step, index) => (
              <span
                key={step}
                className={
                  index === currentStep ? "text-orange-600 font-semibold" : ""
                }
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center w-[90%] max-w-md animate-fade-in-up">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">
              🎉 Order Completed!
            </h2>
            <p className="text-gray-700 mb-6">
              Your delicious meal is ready. Hope you enjoy it!
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full transition duration-300"
            >
              Go to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
