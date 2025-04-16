import React, { useContext, useEffect, useState } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { CheckoutFooter } from "./CheckoutFooter";
import { BillingForm } from "./BillingForm";
import { PaymentForm } from "./PaymentForm";
import { OrderSummary } from "./OrderSummary";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { token, food_list, cartItems, selectedOptions, getTotalCartAmount, url } = useContext(StoreContext);
  const [billingInfo, setBillingInfo] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
 
    if (!token || getTotalCartAmount() === 0) {
      //navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  const placeOrder = async () => {
    let orderItems = [];
    
    // Loop through each key in the cartItems
    Object.keys(cartItems).forEach((key) => {
      // Extract itemId (before '_') and quantity (after '_')
      const [itemId, quantity] = key.split('_');
      const qty = parseInt(quantity);  // Quantity as number
  
      // Find the item in the food list using itemId
      const item = food_list.find((food) => food._id === itemId);
      
      if (item) {
        // Assuming we get the subcategory from cartItems directly (F1, F2, etc.)
        const subcategory = cartItems[key];
        
        // Check if subcategory exists in the item's available subcategories
        if (item.subcategory.includes(subcategory)) {
          // Get the price based on the selected subcategory
          const price = item.prices[subcategory];
          
          // Add the order item
          orderItems.push({
            itemId: item._id,
            name: item.name,
            price: price,
            quantity: qty,
            cookTime: item.cookTime,
            subcategory: subcategory
          });
        }
      }
    });
    
    // If no items were selected for ordering, alert the user
    if (orderItems.length === 0) {
      alert("Please select at least one item with a valid quantity.");
      return;
    }
    
    // Calculate the maximum cook time from orderItems
    let maxTime = Math.max(...orderItems.map((i) => i.cookTime));
    
    // Recalculate total based on new items
    const subtotal = getTotalCartAmount()
    const deliveryFee = 30;
    const tax = subtotal * 0.1;
    const totalAmount = Math.round(subtotal + deliveryFee + tax);
    
    const orderData = {
      address: billingInfo,
      items: orderItems,
      amount: totalAmount,
      orderTime: maxTime
    };
    
    
    
    // Make the API call to place the order (uncomment to enable)
    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });
  
      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Error placing order");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order");
    } 
  };
  
  
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CheckoutHeader />

      <main className="flex-1 flex justify-center px-4 py-8">
        <div className="flex gap-8 max-w-[1248px] w-full max-md:flex-col">
          <div className="flex-[2] flex flex-col gap-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-black mb-2.5">Checkout</h1>
              <p className="text-base text-gray-600">Almost there! Just a few details to complete your order.</p>
            </div>

            <BillingForm setBillingInfo={setBillingInfo} />
            <PaymentForm placeOrder={placeOrder} />
          </div>

          <div className="flex-1 max-md:w-full">
          <OrderSummary cartItems={cartItems}  total={total} food_list={food_list} />

          </div>
        </div>
      </main>

      <CheckoutFooter />
    </div>
  );
};

export default Checkout;
