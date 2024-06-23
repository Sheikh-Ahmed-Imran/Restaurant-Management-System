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
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchAllOrders();
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
          <div key={index} className="order-item-container">
            <Link to={`/orders/${order._id}`} className="order-item-link">
              <div className='order-item'>
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className='order-item-food'>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                  <div className="order-item-address">
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>Rs{order.amount}</p>
                <p>{order._id}</p>

                <select>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Food Ready">Out for delivery</option>
                  <option value="Food Delivered">Delivered</option>
                </select>
              </div>
            </Link>
            <button onClick={() => deleteOrder(order._id)} className="delete-order-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
