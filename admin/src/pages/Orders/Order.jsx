import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get(`${url}/api/order/list`);
        if (response.data.success) {
          setOrders(response.data.data);
        } else {
          // Handle error
          console.error("Failed to fetch orders:", response.data.message);
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching orders:", error);
      }
    };

    // Initial fetch
    fetchAllOrders();

    // Set up polling
    const intervalId = setInterval(fetchAllOrders, 5000); // Adjust the interval as needed

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [url]);

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`${url}/api/order/delete/${orderId}`);
      if (response.data.success) {
        setOrders(orders.filter(order => order._id !== orderId));
      } else {
        // Handle error
        console.log(response.data.message);
      }
    } catch (error) {
      // Handle error
      console.error("There was an error deleting the order!", error);
    }
  };

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item-container" style={{ backgroundColor: order.payment ? '#90EE90' : '#ffcccb' }}>
            <Link to={`/orders/${order._id}`} className="order-item-link">
              <div className='order-item'>
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>Amount: Rs {order.amount}</p>
                <p>Status:</p>
                <select value={order.address.status} readOnly>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Food Ready">Out for delivery</option>
                  <option value="Food Delivered">Delivered</option>
                </select>
                <p>Payment: {order.payment ? "Paid" : "Pending"}</p>
              </div>
            </Link>
            <br />
            <button onClick={() => deleteOrder(order._id)} className="delete-order-button">Delete</button>
            <br />
            <br />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
