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
            <br />{order.address.firstName} {order.address.lastName}
            <br />Table No: 23
          </span>
          <table>
            <thead>
              <tr>
                <th className="quantity">Name</th>
             
         
               {// <th className="price">Total</th>
}
                <th className="subcategories">Subcategories</th> {/* New column */}
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td className="quantity">{item.name}</td>
                 
                
                {//  <td className="price">Rs {order.amount}</td>
}
                  <td className="subcategories">
                    <ul>
                      {item.subcategories.map((subcategory, subIndex) => (
                        <li key={subIndex}>
                          {subcategory.name} - {subcategory.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            
              <tr>
                <td colSpan="3" className="description">Service Charges</td>
                <td className="price">25</td>
              </tr>
              <tr>
                <td colSpan="3" className="description">TOTAL</td>
                <td className="price">Rs {order.amount}</td>
              </tr>
            </tbody>
          </table>
          <span className="centered">
            Thanks for your purchase!
            <br />Please visit again in the future.
          </span>
        </div>
      ))}
      <button onClick={handlePrint}>Print</button>
    </>
  );
};

export default Print;
