import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import LoginPopup from '../LoginPopup/LoginPopup';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const [showLogin, setShowLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden flex justify-center items-center bg-gradient-to-r from-orange-50 to-orange-100 pt-24 px-20 max-md:px-10 max-sm:px-5">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-40 w-64 h-64 rounded-full bg-orange-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-orange-300 opacity-20 blur-3xl"></div>
      </div>

      <div className="flex flex-row justify-between items-center max-w-screen-xl w-full gap-16 py-16 max-md:flex-col relative z-10">
        {/* LEFT: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col max-w-[616px] gap-8 flex-1"
        >
          <div className="flex flex-col space-y-3">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center bg-orange-100 border border-orange-200 rounded-full px-4 py-1.5 text-sm font-medium text-orange-600"
            >
              <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2"></span>
              New Feature: Kitchen Display System
            </motion.div>
            
            <h1 className="text-5xl font-bold leading-tight tracking-tight max-md:text-[40px] max-sm:text-[32px]">
              <span>From Orders to Kitchen </span>
              <span className="relative text-[#FF5722] inline-block">
                in Seconds
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,5 Q50,0 100,5 T200,5" stroke="#FF5722" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-[487px]">
            Streamline your restaurant operations with smart automation that
            connects your front-of-house with kitchen staff seamlessly.
          </p>
          
          <div className="flex gap-5 max-sm:flex-col">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-[#FF5722] text-white px-8 py-5 rounded-full hover:bg-[#FF5722]/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            onClick={()=>navigate('/menu')}>
              How It Works
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group text-[#FF5722] text-base px-8 py-5 rounded-full border-2 border-[#FF5722] hover:bg-[#FF5722]/10 transition-all flex items-center justify-center gap-2"
              onClick={() => setShowLogin(true)}
            >
              <Play className="w-5 h-5" />
            Login
            </motion.button>
          </div>
          
          <div className="flex items-center gap-6 mt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-orange-${i*100} overflow-hidden`}>
                  {/* Profile images would go here */}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">500+ restaurants</span> trust our solution
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center items-center w-full max-w-[616px] flex-1"
        >
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                <ChevronDown className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-md border shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] p-[25px] rounded-2xl border-white/20 transition-all"
            >
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/590f15b3214f31221b843574eabd15532d5c0c03"
                  alt="Dashboard Interface"
                  className="w-full h-auto rounded-[12px]"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent opacity-40"></div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-600">Live dashboard</span>
                </div>
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-md">Interactive Demo</span>
              </div>
            </motion.div>
            
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-100 rounded-full blur-xl opacity-60"></div>
          </div>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 border-2 border-orange-300 rounded-full flex justify-center pt-2">
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-orange-400 rounded-full"
            />
          </div>
          <span className="text-xs text-gray-500 font-medium">Scroll</span>
        </motion.div>
      </motion.div>

      {/* Render LoginPopup when showLogin is true */}
      {showLogin && (
  <div className="fixed inset-0  z-50 flex items-center justify-center">
    <LoginPopup setShowLogin={setShowLogin} />
  </div>
)}



    </section>
  );
}