import { MoveRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

export const OrderSummary = ({
  total,
  subtotal,
  deliveryFee,
  tax,
  onCheckout,
}) => {
  const navigate=useNavigate()
  const alltotal = subtotal + deliveryFee + tax;
 
  return (
    <div className="bg-white border border-orange-100 p-[25px] rounded-xl w-full">
      <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-black font-medium">Rs:{subtotal}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="text-black font-medium">
            Rs:{deliveryFee.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Tax</span>
          <span className="text-black font-medium">Rs:{tax?tax:'No Tax'}</span>
        </div>
        <div className="h-px bg-gray-100 my-3" />
        <div className="flex justify-between text-lg font-bold">
          <span className="text-black">Total</span>
          <span className="text-orange-500">Rs:{alltotal?alltotal.toFixed(2):'No Total'}</span>
        </div>
      </div>
      <button
   onClick={()=>navigate('/checkout')}
        className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(90deg,#EA580C_0%,#F97316_100%)] text-base text-white mt-6 p-4 rounded-full hover:opacity-90 transition-opacity max-md:mt-4 max-md:p-3"
      >
        <span >Proceed to Checkout</span>
        <MoveRight className="w-[14px] h-[16px]" />
      </button>
    </div>
  );
};
