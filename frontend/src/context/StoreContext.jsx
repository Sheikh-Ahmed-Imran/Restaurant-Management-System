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
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const item = food_list.find((product) => product._id === itemId);
            if (item) {
                totalAmount += item.price * cartItems[itemId];
            }
        }
        return totalAmount;
    };

    // Add to cart function
    const addToCart = async (itemId) => {
        try {
            if (!cartItems[itemId]) {
                setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
            } else {
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            }
            if (token) {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    // Remove from cart function
    const removeFromCart = async (itemId) => {
        try {
            if (cartItems[itemId] > 1) {
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
            } else {
                const updatedCartItems = { ...cartItems };
                delete updatedCartItems[itemId];
                setCartItems(updatedCartItems);
            }
            if (token) {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    // Function to calculate total price based on selected options
    const calculateTotalPrice = () => {
        let totalAmount = 0;
        for (const itemId in selectedOptions) {
            const item = food_list.find((product) => product._id === itemId);
            if (item) {
                const { selectedSubcategories, quantities } = selectedOptions[itemId];
                selectedSubcategories.forEach(subcategory => {
                    const price = getPriceForOption(item.subcategory)[subcategory] || 0;
                    totalAmount += price * quantities[subcategory];
                    console.log(totalAmount)
                });
            }
        }
        return totalAmount + 25; // Include additional fee
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
            await fetchFoodList();
            const localToken = localStorage.getItem("token");
            if (localToken) {
                setToken(localToken);
                await loadCartData(localToken);
            }
        };
        loadData();
    }, []);

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
        calculateTotalPrice,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
