import React, { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Print = ({ order }) => {
  const componentRef = useRef();
  console.log(order, 'in print'); // Debugging: log the orders to check the structure

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    handlePrint(); // Automatically print when the component is mounted
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      <div className="ticket p-6 max-w-3xl mx-auto border border-gray-300 rounded-lg shadow-lg" ref={componentRef}>
        <h1 className="font-bold text-xl text-center text-gray-800">Welcome to TasteBuds</h1>
        <div className="mt-6">
          <span className="block text-center text-gray-600">
            <h2 className="text-lg font-semibold mb-2">Order Receipt</h2>
            Name: {order.address ? `${order.address.fullName}` : "Unknown Customer"}
            <br />
            Table No: 23
          </span>
        </div>

        <table className="mt-8 w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Subcategories</th>
              <th className="px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {order.items && order.items.map((item, itemIndex) => (
              <tr key={itemIndex} className="border-b">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">
                  <ul>
                    {Array.isArray(item.subcategories) ? (
                      item.subcategories.map((subcategory, subIndex) => (
                        <li key={subIndex}>{subcategory}</li>
                      ))
                    ) : (
                      <li>{item.subcategories}</li>
                    )}
                  </ul>
                </td>
                <td className="px-4 py-2">{item.quantity}</td>
              </tr>
            ))}
            <tr className="font-semibold text-gray-800">
              <td colSpan="2" className="px-4 py-2 text-right">Service Charges</td>
              <td className="px-4 py-2">Rs 25</td>
            </tr>
            <tr className="font-semibold text-gray-800">
              <td colSpan="2" className="px-4 py-2 text-right">TOTAL</td>
              <td className="px-4 py-2">Rs {order.amount}</td>
            </tr>
          </tbody>
        </table>

        <div className="text-center mt-6 text-gray-600">
          Thanks for your purchase!
          <br />Please visit again in the future.
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Print Receipt
        </button>
      </div>
    </>
  );
};

export default Print;
