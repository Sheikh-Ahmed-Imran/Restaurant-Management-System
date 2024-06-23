import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Print from './pages/Print/Print';
import { Routes, Route, useParams } from 'react-router-dom'; // Import useParams
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Order';
import OrderDetail from './pages/Orders/OrderDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
          <Route path="/orders/:id" element={<OrderDetailPage url={url}/>}/> {/* Use a new component for OrderDetailPage */}
          <Route path="/print" element={<Print />}/>
        </Routes>
      </div>
    </div>
  );
};

// Define a new component for handling the OrderDetail page
const OrderDetailPage = ({url}) => {
  const { id } = useParams(); // Use useParams hook to get the id from the URL
  return <OrderDetail url={url} orderId={id} />;
};

export default App;
