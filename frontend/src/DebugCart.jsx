import React, { useContext } from 'react';
import { StoreContext } from './context/StoreContext';

const DebugCart = () => {
  const { cartItems, removeFromCart, food_list } = useContext(StoreContext);

  return (
    <div style={{ background: "#f9f9f9", padding: "1rem", marginTop: "1rem", border: "1px solid #ccc" }}>
      <h3>🛒 Debug Cart Panel</h3>
      {Object.keys(cartItems).length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.entries(cartItems).map(([itemId, quantity]) => {
            const food = food_list.find(f => f._id === itemId);
            return (
              <li key={itemId} style={{ marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
                <strong>{food?.name || "Unknown item"}</strong> — Quantity: {quantity}
                <button 
                  onClick={() => removeFromCart(itemId)} 
                  style={{ marginLeft: '1rem', background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                >
                  Remove One
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DebugCart;
