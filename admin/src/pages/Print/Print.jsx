import React, { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Print = ({ orders }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    handlePrint();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      {orders.map((order, index) => (
        <div key={index} className="ticket" ref={componentRef}>
          <span className="centered">
            Order Receipt
            <br />{order.address.firstName}{order.address.lastName}
            <br />Table No :23
          </span>
          <table>
            <thead>
              <tr>
                <th className="quantity">Name</th>
                <th className="description">Quantity</th>
                <th className="price">Price</th>
                <th className="price">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td className="quantity">{item.name}</td>
                  <td className="description">{item.quantity}</td>
                  <td className="price">Rs{item.price}</td>
                  <td className="price">Rs{item.price * item.quantity}</td>
                </tr>
              ))}
            
              <tr>
                <td colSpan="2" className="description">Service Charges</td>
                <td className="price">25</td>
              </tr>
              <tr>
                <td colSpan="2" className="description">TOTAL</td>
                <td className="price">Rs{order.amount}</td>
              </tr>
            </tbody>
          </table>
          <span className="centered">
            Thanks for your purchase!
            <br />Please Visit again in future
          </span>
        </div>
      ))}
      <button onClick={handlePrint}>Print</button>
    </>
  );
};

export default Print;
