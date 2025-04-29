import React from 'react';

import { Sidebar } from './components/Sidebar/Sidebar';
import  OrderIndex  from './components/Orders/OrderIndex';
import { Routes, Route, useParams } from 'react-router-dom'; // Import useParams


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard/Dashboard';
import Menu from './components/Food/MenuIndex';
import AddFoodPage from './components/AddFood/AddFood';
import EditFood from './components/Food/EditFood';


const App = () => {
  const url = "http://localhost:4000";

  return (
    <div className="flex">
      {/* Sidebar is always visible */}
     
      <Sidebar />
  

      <div className="flex-1">
       
        {/* Main Content */}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Dashboard url={url} />} />
          

        
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/food" element={<Menu url={url} />} />
          <Route path="/addfood" element={<AddFoodPage />} />
          <Route path="/allorders" element={<OrderIndex url={url} />} />
          <Route path="/editfood/:id" element={<EditFood />} />
        </Routes>
      </div>
    </div>
  );
};



export default App;
