import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Print from '../Print/Print'; // Import the Print component
import './orderdetail.css'; // Import CSS file for styling

const OrderDetail = ({ url, orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${url}/api/order/get/${orderId}`);
    
        if (response.data.success) {
          setOrder(response.data.data);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchOrder();
  }, [url, orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="order-details">
      <h5>Order Details</h5>
      <div>
        <h5>Items:</h5>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>{item.name} x {item.quantity}</li>
          ))}
        </ul>
      </div>
      <div className="delivery-address">
        <h5>Delivery Info:</h5>
        <p>{order.address.firstName} {order.address.lastName}</p>
     
      
        <p>Phone: {order.address.phone}</p>
      </div>
      <div>
        <h5 className="order-amount">Order Amount:</h5>
        <p>{order.amount}</p>
      </div>
      <div>
        <h5 className="status">Status:</h5>
        <p>{order.status}</p>
      </div>

      {/* Render the Print component and pass the order data */}
      <Print orders={[order]} />
    </div>
  );
};

export default OrderDetail;
