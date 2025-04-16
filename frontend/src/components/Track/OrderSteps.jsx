import React, { useState, useEffect } from "react";
import axios from "axios";

// Function to fetch the order status from the backend (replace with your actual API call)
const fetchOrderStatus = async (orderId) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/order/get/${orderId}`);
    console.log(response.data.data.status)
    return response.data.data.status; // Assuming your backend response has the 'status' field
  } catch (error) {
    console.error("Error fetching order status:", error);
    return null;
  }
};

export const OrderSteps = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    // Polling for order status every 5 seconds
    const interval = setInterval(async () => {
      const status = await fetchOrderStatus(orderId);
      if (status) {
        setOrderStatus(status);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [orderId]);

  // Function to determine if a step is active or inactive based on the status
  const getStepStatus = (step) => {
    if (orderStatus === step) return "active";
    if (orderStatus && orderStatus !== step) return "inactive";
    return "default";
  };

  return (
    <div className="w-full bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10),0px_10px_15px_0px_rgba(0,0,0,0.10)] p-8 rounded-2xl">
      <div className="flex flex-col gap-8">
        {["Processing", "Cooking", "Ready", "Completed"].map((step, index) => (
          <div key={index} className={`flex items-start gap-4 ${getStepStatus(step) === "inactive" ? "opacity-50" : ""}`}>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                getStepStatus(step) === "active"
                  ? "bg-emerald-500"
                  : getStepStatus(step) === "inactive"
                  ? "bg-gray-300"
                  : "bg-gray-300"
              }`}
            >
              {/* Replace this part with step-specific SVGs as required */}
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7066 3.29395C14.0973 3.68457 14.0973 4.31895 13.7066 4.70957L5.70664 12.7096C5.31602 13.1002 4.68164 13.1002 4.29102 12.7096L0.291016 8.70957C-0.0996094 8.31895 -0.0996094 7.68457 0.291016 7.29395C0.681641 6.90332 1.31602 6.90332 1.70664 7.29395L5.00039 10.5846L12.2941 3.29395C12.6848 2.90332 13.3191 2.90332 13.7098 3.29395H13.7066Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-px">
              <div className="text-base font-bold">{step}</div>
              <div className="text-gray-500 text-sm">
                {step === "Processing"
                  ? "Your payment was processed successfully"
                  : step === "Cooking"
                  ? "Your order is being prepared by our chefs"
                  : step === "Ready"
                  ? "Your food is being cooked to perfection"
                  : "Your order will be ready for serving"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
