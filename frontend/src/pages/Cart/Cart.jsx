import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, food_list, selectedOptions, removeFromCart, calculateTotalPrice, url } = useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <div className='cart'>
            <h1 className='cart-title'>Cart</h1>
            <div className='cart-items'>
                <div className='cart-items-title cart-items-item'>
                    <p>Image</p>
                    <p>Name</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        const subcategories = selectedOptions[item._id]?.selectedSubcategories || [];
                        const quantities = selectedOptions[item._id]?.quantities || {};

                        return (
                            <div key={index}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>{item.price} pkr</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>{item.price * cartItems[item._id]} pkr</p>
                                    <p>
                                        {subcategories.map((sub, idx) => (
                                            <div key={idx}>
                                                <span>{sub}: {quantities[sub]} pcs</span>
                                            </div>
                                        ))}
                                    </p>
                                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>{calculateTotalPrice()} pkr</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Service Fee</p>
                            <p>{calculateTotalPrice() === 0 ? 0 : 25} pkr</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>{calculateTotalPrice() === 0 ? 0 : calculateTotalPrice() + 25} pkr</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
