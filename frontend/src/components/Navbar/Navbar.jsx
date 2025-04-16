import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, LogOut, LayoutDashboard, ListOrdered, Menu, X, ChevronRight } from "lucide-react";
import { StoreContext } from "../../context/StoreContext";

export function LoggedInHeader() {
  const { cartItems } = useContext(StoreContext);
  const [prevCartCount, setPrevCartCount] = useState(Object.keys(cartItems).length);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const cartCount = Object.keys(cartItems).length;  // Get the count of cart items

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation effect when cart count changes
  useEffect(() => {
    if (cartCount !== prevCartCount) {
      setIsCartUpdated(true);
      setTimeout(() => setIsCartUpdated(false), 1500);
      setPrevCartCount(cartCount); // Update prevCartCount when cart count changes
    }
  }, [cartCount, prevCartCount]);

  // Check if a nav link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`flex justify-center items-center h-[73px] border-b border-gray-100 bg-white/90 backdrop-blur-md z-50 px-20 top-0 max-md:px-10 max-sm:px-5 fixed w-full transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="flex justify-between items-center w-full max-w-screen-xl px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            dangerouslySetInnerHTML={{
              __html: `<svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5 0C18.75 0 13.5 1.5 13.5 8.25V13.5C13.5 15.1547 14.8453 16.5 16.5 16.5H18V22.5C18 23.3297 18.6703 24 19.5 24C20.3297 24 21 23.3297 21 22.5V16.5V11.25V1.5C21 0.670312 20.3297 0 19.5 0ZM3 0.75C3 0.365625 2.71406 0.046875 2.32969 0.0046875C1.94531 -0.0375 1.60313 0.215625 1.51875 0.585938L0.0984375 6.975C0.0328125 7.27031 0 7.57031 0 7.87031C0 10.0219 1.64531 11.7891 3.75 11.9813V22.5C3.75 23.3297 4.42031 24 5.25 24C6.07969 24 6.75 23.3297 6.75 22.5V11.9813C8.85469 11.7891 10.5 10.0219 10.5 7.87031C10.5 7.57031 10.4672 7.27031 10.4016 6.975L8.98125 0.585938C8.89688 0.210938 8.54531 -0.0375 8.16562 0.0046875C7.78594 0.046875 7.5 0.365625 7.5 0.75V7.04062C7.5 7.29375 7.29375 7.5 7.04062 7.5C6.80156 7.5 6.60469 7.31719 6.58125 7.07812L5.99531 0.684375C5.9625 0.295313 5.63906 0 5.25 0C4.86094 0 4.5375 0.295313 4.50469 0.684375L3.92344 7.07812C3.9 7.31719 3.70312 7.5 3.46406 7.5C3.21094 7.5 3.00469 7.29375 3.00469 7.04062V0.75H3ZM5.26406 7.875H5.25H5.23594L5.25 7.84219L5.26406 7.875Z" fill="#FF5722"/>
            </svg>`,
            }}
          />
          <div className="flex flex-col">
            <motion.span 
              className="text-xl font-bold text-[#FF5722]"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              TasteBuds
            </motion.span>
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="h-0.5 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full"
            />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="flex items-center gap-6 max-md:hidden">
          {[ 
            { path: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
            { path: "/orders", icon: <ListOrdered size={18} />, label: "Orders" },
            { path: "/profile", icon: <User size={18} />, label: "Profile" }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all ${isActive(item.path) ? "text-orange-500 bg-orange-50 font-medium" : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/50"}`}
            >
              {item.icon} 
              <span>{item.label}</span>
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Cart & Logout */}
        <div className="flex items-center gap-5">
          <Link to="/cart" className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <ShoppingCart 
                size={24} 
                className={`transition-colors ${isActive("/cart") ? "text-orange-500" : "text-gray-700 hover:text-orange-500"}`} 
              />
               <AnimatePresence>
                {cartCount > 0 && (
                  <motion.div
                    key={cartCount}
                    initial={isCartUpdated ? { scale: 1.5, y: -5 } : { scale: 0 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 20 
                    }}
                    className={`absolute -top-2 -right-2 rounded-full flex items-center justify-center
                      ${isCartUpdated ? "animate-pulse bg-green-500" : "bg-orange-500"}`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <motion.span 
                        key={`cart-count-${cartCount}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs font-medium text-white"
                      >
                        {cartCount}
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-200 text-gray-700 hover:text-orange-500 hover:border-orange-200 transition-all bg-white/80 hover:bg-orange-50/50"
            onClick={async () => {
              try {
                const response = await fetch('http://localhost:4000/api/user/logout', {
                  method: 'POST',
                  credentials: 'include'
                });
                if (response.ok) {
                  window.location.href = '/';
                }
              } catch (error) {
                console.error('Logout failed:', error.message);
              }
            }}
          >
            <LogOut size={16} /> 
            <span className="max-sm:hidden">Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[73px] left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-40 overflow-hidden"
          >
            <nav className="flex flex-col w-full p-4">
              {[
                { path: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
                { path: "/orders", icon: <ListOrdered size={18} />, label: "Orders" },
                { path: "/profile", icon: <User size={18} />, label: "Profile" }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-md ${
                    isActive(item.path)
                      ? "bg-orange-50 text-orange-500 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={16} className={isActive(item.path) ? "text-orange-500" : "text-gray-400"} />
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Cart Animation Notification */}
      <AnimatePresence>
        {isCartUpdated && cartCount > prevCartCount && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50"
          >
            <ShoppingCart size={16} />
            <span>Item added to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}