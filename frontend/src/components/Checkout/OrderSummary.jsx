import React from "react";

export const OrderSummary = ({ cartItems, food_list, total ,subtotal}) => {

  const itemsList = Object.keys(cartItems).map((itemId) => {
    const item = food_list.find((food) => food._id === itemId);
  
    if (item) {
      const itemPrice = item.price * cartItems[itemId];  // Calculate price for this item
      return (
        <div key={itemId} className="order-[item] border-b-gray-100 flex justify-between mb-4 pb-4 border-b border-solid">
          <div className="flex flex-col gap-[3px]">
            <div className="text-base text-black">{item.name}</div>
            <div className="text-sm text-gray-500">{item.subcategory}</div>
          </div>
          <div className="text-base text-black">Rs: {itemPrice}</div> {/* Price for this item */}
        </div>
      );
    }
    return null;
  });

 
  const deliveryFee = 30;  // Assuming a fixed delivery fee
  const tax = total * 0.1;  // Assuming 10% tax

  const alltotal = total + deliveryFee + tax;

  return (
    <div className="order-[summary] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] bg-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-black mb-6">Order Summary</h2>
      <div className="order-[items] mb-6">
        {itemsList}
      </div>
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex justify-between text-gray-500 text-sm">
          <span>Subtotal</span>
          <span>Rs:{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500 text-sm">
          <span>Sevice Fee</span>
          <span>Rs:{deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500 text-sm">
          <span>Tax</span>
          <span>Rs:{tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between items-center pt-5 pb-1 px-0 border-t border-solid">
        <span className="text-lg font-semibold text-black">Total</span>
        <span className="text-lg font-semibold text-orange-500">Rs:{alltotal.toFixed(2)}</span>
      </div>
    </div>
  );
};
