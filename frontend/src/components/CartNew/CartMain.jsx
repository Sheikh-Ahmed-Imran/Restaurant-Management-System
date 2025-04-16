import { useContext, useEffect, useState } from "react";
import { CartHeader } from "./CartHeader";
import { CartItem } from "./CartItem";
import { OrderSummary } from "./OrderSummary";
import { StoreContext } from "../../context/StoreContext";

const CartIndex = () => {
  const {
    cartItems: contextCartItems,
    food_list: contextFoodList,
    setCartItems,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const [localCartItems, setLocalCartItems] = useState({});
  const [localFoodList, setLocalFoodList] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const subtotal=getTotalCartAmount()
  // Load from localStorage or context on first mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "{}");
    const storedFoodList = JSON.parse(localStorage.getItem("food_list") || "[]");

    const finalCartItems = Object.keys(contextCartItems || {}).length
      ? contextCartItems
      : storedCartItems;

    const finalFoodList = contextFoodList?.length
      ? contextFoodList
      : storedFoodList;

    setLocalCartItems(finalCartItems);
    setLocalFoodList(finalFoodList);

    // Update localStorage if context has data
    if (contextFoodList?.length) {
      localStorage.setItem("food_list", JSON.stringify(contextFoodList));
    }
    if (Object.keys(contextCartItems || {}).length) {
      localStorage.setItem("cartItems", JSON.stringify(contextCartItems));
    }

    setIsReady(true);
  }, [contextCartItems, contextFoodList]);

  const parseCartKey = (key) => {
    const [foodId, selectedCategorystr] = key.split("_");
    
    
    return {
      foodId,
      selectedSubcategory: selectedCategorystr,
      quantity: localCartItems[key],
    };
  };

  const handleRemoveItem = (key) => {
    const updated = { ...localCartItems };
    delete updated[key];
    setCartItems(updated);
    setLocalCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    removeFromCart(key);
  };

  const handleQuantityChange = (key, newQuantity) => {
    const { foodId, selectedSubcategory } = parseCartKey(key);
    const updated = { ...localCartItems };
    delete updated[key];
    const newKey = `${foodId}_${newQuantity}`;
    updated[newKey] = selectedSubcategory;
    setCartItems(updated);
    setLocalCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

 

   

  const deliveryFee = 30;
  const tax = Number((subtotal * 0.1).toFixed(2));
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    
  };

  if (!isReady) {
    return <div className="text-center py-10">Loading cart data...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 mt-7">
      <CartHeader />
      <main className="flex justify-center px-20 py-8 max-md:px-10 max-sm:px-5">
        <div className="flex gap-8 w-full max-w-screen-xl max-md:flex-col">
          <section className="flex-1">
            <div className="flex flex-col gap-4">
              {Object.keys(localCartItems).map((key) => {
                const { foodId, quantity, selectedSubcategory } = parseCartKey(key);
                const item = localFoodList.find((f) => f._id === foodId);
                if (!item) return null;

                return (
                  <CartItem
                    key={key}
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    prices={item.prices}
                    selectedSubcategory={selectedSubcategory}
                    initialQuantity={quantity}
                    onQuantityChange={(newQty) =>
                      handleQuantityChange(key, newQty)
                    }
                    onRemove={() => handleRemoveItem(key)}
                  />
                );
              })}
            </div>
          </section>
          <aside className="w-[405px] max-md:w-full">
            <OrderSummary
              total={total}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              onCheckout={handleCheckout}
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CartIndex;
