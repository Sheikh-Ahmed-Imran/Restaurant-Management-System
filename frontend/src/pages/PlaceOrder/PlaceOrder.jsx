import React, { useEffect, useState, useContext } from 'react';
import './PlaceOrder.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { token, food_list, cartItems, selectedOptions, calculateTotalPrice, url } = useContext(StoreContext);
    const navigate = useNavigate();
   //console.log(cartItems)
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        
        // Prepare order items from cartItems and selectedOptions
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                const subcategories = selectedOptions[item._id]?.selectedSubcategories || [];
                const quantities = selectedOptions[item._id]?.quantities || {};
        
                let itemInfo = {
                    itemId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: cartItems[item._id],
                    cookTime: item.cookTime, // Add cookTime here
                    subcategories: subcategories.map(sub => ({
                        name: sub,
                        quantity: quantities[sub]
                    }))
                };
                orderItems.push(itemInfo);
            }
        });
        
        // Calculate max cook time from order items
        let maxTime = 0;
        orderItems.forEach((item) => {
            if (item.cookTime > maxTime) {
                maxTime = item.cookTime;
            }
        });
    
        // Prepare order data to send to backend
        const orderData = {
            address: data,
            items: orderItems,
            amount: calculateTotalPrice() + 25, // Include additional fee
            orderTime: maxTime
        };
        
        console.log(orderData); // Log orderData to verify `amount`
        
        try {
            // Send orderData to backend for processing with Stripe integration
            let response = await axios.post(`${url}/api/order/place`, orderData, {
                headers: { token }
            });
        
            // If order placement is successful, redirect to Stripe checkout session
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert('Error placing order');
            }
        } catch (error) {
            console.error(error);
            alert('Error placing order');
        }
    };
    
    useEffect(() => {
        // Redirect to cart page if no token or no items in cart
        if (!token || calculateTotalPrice() === 0) {
            navigate('/cart');
        }
    }, [token, calculateTotalPrice, navigate]);

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className='place-order-left'>
                <p className='title'>Your Information</p>
                <div className='multi-fields'>
                    <input
                        required
                        name='firstName'
                        onChange={onChangeHandler}
                        value={data.firstName}
                        type='text'
                        placeholder='First Name'
                    />
                    <input
                        required
                        name='lastName'
                        onChange={onChangeHandler}
                        value={data.lastName}
                        type='text'
                        placeholder='Last Name'
                    />
                </div>
                <input
                    className='email'
                    required
                    name='email'
                    onChange={onChangeHandler}
                    value={data.email}
                    type='email'
                    placeholder='Email address'
                />

                <input
                    className='phone'
                    required
                    name='phone'
                    onChange={onChangeHandler}
                    value={data.phone}
                    type='text'
                    placeholder='Phone'
                />
            </div>
            <div className='place-order-right'>
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>pkr:{calculateTotalPrice()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Total Fee</p>
                            <p>pkr:{calculateTotalPrice() === 0 ? 0 : 25}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>pkr:{calculateTotalPrice() === 0 ? 0 : calculateTotalPrice() + 25}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
