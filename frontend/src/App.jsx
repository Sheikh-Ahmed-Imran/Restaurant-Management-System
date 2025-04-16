import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';

import Print from './pages/Print/print';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import {MenuLayout} from './components/Menu/MenuLayout';
import CartIndex from './components/CartNew/CartMain';
import DebugCart from './DebugCart';
import Checkout from './components/Checkout/CheckoutMain';
import { OrderTracker } from './components/Track/OrderTracker';
import { LoggedInHeader } from './components/Navbar/Navbar';
import { Header } from './components/HomePage/Navbar';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      {/* Conditionally render headers */}
      {isHomePage ? <Header /> : <LoggedInHeader />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/myorders' element={<MyOrders />} />
        <Route path='/print' element={<Print />} />
        <Route path='/menu' element={<MenuLayout />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/cart' element={<CartIndex />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/cartold' element={<Cart />} />
        <Route path='/debugCart' element={<DebugCart />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/track/:orderId' element={<OrderTracker />} />
      </Routes>
    </>
  );
};

export default App;
