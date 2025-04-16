import React from "react";
import { PaymentMethodButton } from "./PaymentMethodButton";

export const PaymentForm = ({ placeOrder }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-black mb-6">Payment</h2>
      {/* You can integrate Stripe elements here if needed */}
      <button className="w-full h-14 bg-orange-500 text-white font-semibold text-base cursor-pointer mb-4 rounded-lg border-[none] hover:bg-orange-600 transition-colors" onClick={placeOrder}>
        Place Order &amp; Pay
      </button>
    </div>
  );
};
