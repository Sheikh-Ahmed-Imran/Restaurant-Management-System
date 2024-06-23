import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';

const NewComponent = () => {
    const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

    return (
        <div className='new-component'>
            <h3>User Added Items</h3>
            {food_list.length > 0 ? (
                <ul className='cart-items-list'>
                    {food_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            
                            return (
                                <React.Fragment key={item._id}>
                                    <li className='cart-items-item'>
                                        <p>Name : {item.name}</p>
                                        <p>Price : {item.price}pkr</p>
                                        <p>Quantiy : {cartItems[item._id]}</p>
                                        <p>Total : {item.price * cartItems[item._id]}pkr</p>
                                        <p onClick={() => removeFromCart(item._id)} className='cross'>Remove Item</p>
                                    </li>
                                    <hr />
                                </React.Fragment>
                            );
                        }
                        
                        return null;
                    })}
                </ul>
            ) : (
                <p>No items added by the user.</p>
            )}
        </div>
    );
};

export default NewComponent;
