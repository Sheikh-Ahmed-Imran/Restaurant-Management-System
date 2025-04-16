import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("");
    const url = "http://localhost:4000";

    // Function to get total cart amount
  
    const addToCart = async (itemId, subcategory, quantity = 1) => {
        try {
          const cartKey = `${itemId}_${subcategory}`;
          setCartItems((prev) => {
            const currentQty = prev[cartKey] || 0;
            return { ...prev, [cartKey]: quantity };
          });
      
          if (token) {
            await axios.post(url + "/api/cart/add", {
              itemId,
              quantity,
              subcategory,
            }, {
              headers: { token },
            });
          }

         
        } catch (error) {
          console.error("Error adding to cart:", error);
        }
      };
      
    

    // Remove from cart function
    const removeFromCart = async (itemId) => {
        const updatedCartItems = { ...cartItems };
        delete updatedCartItems[itemId]; // ⛔ remove it completely
      
      
        setCartItems(updatedCartItems);
      
        if (token) {
          await axios.post(url + "/api/cart/remove", { itemId }, {
            headers: { token },
          });
        }
      };
      
    // Function to calculate total price based on selected options
    const calculateTotalAmount = () => {
        let totalAmount = 0;
      
        for (const key in cartItems) {
          const [foodId, quantityStr] = key.split("_");
          const quantity = parseInt(quantityStr);
          const selectedSubcategory = cartItems[key];
      
          const item = food_list.find((product) => product._id === foodId);
          const price = item?.price?.[selectedSubcategory] || 0;
      
          totalAmount += price * quantity;
        }
      
        return totalAmount;
      };
      
    

    // Fetch food list from server
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Load cart data from server using token
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // Fetch food list and load cart data on component mount
    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([
                    fetchFoodList(),
                    (() => {
                        const localToken = localStorage.getItem("token");
                        if (localToken) {
                            setToken(localToken);
                            return loadCartData(localToken);
                        }
                        return Promise.resolve();
                    })()
                ]);
            } catch (error) {
                console.error("Error loading initial data:", error);
            }
        };
        loadData();
    }, []);
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        
        // Check if data is loaded
        if (!food_list.length || !Object.keys(cartItems).length) {
            return 0;
        }
        for (const key in cartItems) {
          const [foodId, subcategory] = key.split("_"); // correct this line
          const quantity = parseInt(cartItems[key]); // quantity is the value now
      
          if (isNaN(quantity)) continue;
      
          const item = food_list.find((product) => product._id === foodId);
          if (!item || !item.prices) continue;
      
          const price = item.prices[subcategory] || 0;
      
          if (!isNaN(price)) {
              totalAmount += price * quantity;
          }
      }
      
        
        return totalAmount;
    };
      
    // Function to get price options based on subcategory
    const getPriceForOption = (subcategory) => {
        switch (subcategory) {
            case 'pizza':
                return { 'Large': 1200, 'Medium': 700, 'Small': 300 };
            case 'pasta':
                return { 'F1': 350, 'F2': 500 };
            case 'icecream':
                return { '2 Scoop': 100, '3 Scoop': 150, '4 Scoop': 200 };
            case 'zingerburger':
                return { 'zinger': 350 };
            case 'cheeseburger':
                return { 'cheese': 300 };
            case 'chickenburger':
                return { 'chicken': 200 };
            case 'zingershwarma':
                return { 'zingershwarma': 300 };
            case 'chickenshwarma':
                return { 'chickenshwarma': 200 };
            case 'zingercheeseshwarma':
                return { 'zingercheeseshwarma': 350 };
            case 'extras':
                return { '50rp': 50, '100rp': 100 };
            case 'coldrinks':
                return { '1l': 150, '1.5l': 200, '2l': 250 };
            case 'fries':
                return { 'smallf': 150, 'mediumf': 250, 'largef': 400 };
            default:
                return {};
        }
    };

    // Context value to provide to consumers
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        selectedOptions,
        setSelectedOptions,
        addToCart,
        removeFromCart,
        calculateTotalAmount,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
