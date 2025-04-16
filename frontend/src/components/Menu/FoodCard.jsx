import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MinusCircle, PlusCircle, ShoppingBag, Check, ChevronDown } from "lucide-react";

export const FoodCard = ({ image, name, description, subcategories, prices, onAddToCart ,id}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategories[0] || "");
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentPrice = prices[selectedSubcategory];
  
  const handleAdd = () => {
    if (quantity < 1 || !selectedSubcategory) return;
    
    setIsAdding(true);
    
    // Simulate a short loading state for better feedback
    setTimeout(() => {
      const selectedPrice = prices[selectedSubcategory];
      onAddToCart(quantity, selectedSubcategory);
      setIsAdding(false);
      setShowSuccess(true);
      
      // Reset success animation after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 600);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Format price to always show 2 decimal places
  const formatPrice = (price) => {
    return (price * quantity).toFixed(2);
  };

  // Get subcategory display name (capitalize first letter)
  const getSubcategoryDisplayName = (sub) => {
    return sub.charAt(0).toUpperCase() + sub.slice(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden h-full"
    >
      <div className="relative overflow-hidden">
        <motion.img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {subcategories[0]}
        </motion.div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <motion.div 
            className="text-xl font-bold text-gray-800 leading-tight"
            animate={{ color: isHovered ? "#F97316" : "#1F2937" }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.div>
          <motion.div 
            className="text-lg font-bold text-orange-600"
            animate={{ scale: showSuccess ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.4 }}
          >
            Rs:{formatPrice(currentPrice)}
          </motion.div>
        </div>
        
        <div className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {description}
        </div>
        
        {/* Subcategory Dropdown */}
        <div className="mb-4 relative">
          <div 
            className="w-full border border-gray-300 rounded-lg p-2.5 flex items-center justify-between cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-sm text-gray-700">
              {getSubcategoryDisplayName(selectedSubcategory)}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </div>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-40 overflow-auto"
              >
                {subcategories.map((sub) => (
                  <motion.div
                    key={sub}
                    whileHover={{ backgroundColor: "#FEF3C7" }}
                    className={`px-3 py-2 text-sm cursor-pointer ${selectedSubcategory === sub ? "bg-orange-100 text-orange-600 font-medium" : "text-gray-700"}`}
                    onClick={() => {
                      setSelectedSubcategory(sub);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      {getSubcategoryDisplayName(sub)}
                      <span className="text-orange-600 font-medium">Rs:{prices[sub].toFixed(2)}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Quantity Selector */}
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 mb-4">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-orange-600 transition-colors focus:outline-none"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <MinusCircle className={`w-5 h-5 ${quantity <= 1 ? 'text-gray-300' : 'text-gray-500 hover:text-orange-600'}`} />
            </motion.button>
            
            <motion.span 
              key={quantity}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-medium text-gray-800 w-6 text-center"
            >
              {quantity}
            </motion.span>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-orange-600 transition-colors focus:outline-none"
              onClick={incrementQuantity}
            >
              <PlusCircle className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center ${showSuccess ? 'bg-green-500' : 'bg-orange-600 hover:bg-orange-700'} transition-colors`}
          onClick={handleAdd}
          disabled={isAdding || showSuccess}
        >
          <AnimatePresence mode="wait">
            {isAdding ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
              />
            ) : showSuccess ? (
              <motion.div
                key="success"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex items-center"
              >
                <Check className="w-5 h-5 mr-2" />
                Added to Cart!
              </motion.div>
            ) : (
              <motion.div
                key="add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [0.5, 1.2, 1],
                opacity: [0, 1, 0.8],
              }}
              transition={{ 
                duration: 1,
                times: [0, 0.3, 1]
              }}
              className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
              >
                <Check className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};