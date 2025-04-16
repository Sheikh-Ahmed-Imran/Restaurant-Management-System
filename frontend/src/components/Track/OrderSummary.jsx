import React from "react";

export const OrderSummary = ({ order }) => {
  if (!order) return null;

  return (
    <div className="w-full bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10),0px_10px_15px_0px_rgba(0,0,0,0.10)] p-8 rounded-2xl">
      <div className="text-2xl font-bold mb-6">Order Summary</div>
      <div className="flex flex-col gap-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-start py-2 border-[1px_solid_#E5E7EB]"
          >
            <div className="flex flex-col gap-px">
              <div className="text-base font-bold">{item.name}</div>
              <div className="text-gray-500 text-sm">
                {item.subcategories || "No subcategory"}
              </div>
            </div>
            <div className="flex flex-col items-end gap-px">
              <div className="text-base font-bold">
                ${item.price} × {item.quantity}
              </div>
              <div className="text-gray-500 text-sm">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-[1px_solid_#E5E7EB]">
        <div className="flex flex-col gap-px">
          <div className="text-base font-bold">Total Amount</div>
          <div className="text-gray-500 text-sm">
            {order.payment ? "Paid via Stripe" : "Cash on Delivery"}
          </div>
        </div>
        <div className="text-2xl font-bold text-orange-500">
          ${order.amount.toFixed(2)}
        </div>
      </div>
    </div>
  );
};
