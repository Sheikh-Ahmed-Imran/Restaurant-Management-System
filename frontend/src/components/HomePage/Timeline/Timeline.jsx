import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Monitor, Printer, CheckCircle, ChevronDown, Smartphone } from "lucide-react";

// Enhanced TimelineIcon with animations
export const TimelineIcon = ({ icon, active }) => {
  const iconControls = useAnimation();
  
  useEffect(() => {
    if (active) {
      iconControls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.5 }
      });
    }
  }, [active, iconControls]);
  
  const getIcon = () => {
    switch (icon) {
      case "device-mobile":
        return <Smartphone className="w-6 h-6" />;
      case "printer":
        return <Printer className="w-6 h-6" />;
      case "check":
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Monitor className="w-6 h-6" />;
    }
  };

  return (
    <motion.div 
      className="absolute -translate-x-2/4 left-2/4 z-10 max-sm:static max-sm:translate-x-0 max-sm:mb-4"
      animate={iconControls}
    >
      <motion.div 
        className={`flex items-center justify-center w-16 h-16 rounded-full border-4 ${active ? "border-orange-400 bg-orange-100" : "border-gray-200 bg-white"} transition-colors duration-300`}
        whileHover={{ scale: 1.1 }}
      >
        <span className={`${active ? "text-orange-500" : "text-gray-500"} transition-colors duration-300`}>
          {getIcon()}
        </span>
      </motion.div>
    </motion.div>
  );
};

// Enhanced TimelineItem with animations and interaction
export const TimelineItem = ({
  title,
  description,
  icon,
  image,
  imageAlt,
  isReversed = false,
  isActive = false,
  onHover,
  index
}) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: false, amount: 0.5 });
  
  useEffect(() => {
    if (isInView) {
      onHover(index);
    }
  }, [isInView, onHover, index]);

  const TextContent = () => (
    <motion.div
      initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 50 : -50 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`text-${isReversed ? "right" : "left"} max-w-[320px] max-sm:text-center max-sm:mx-auto max-sm:my-0`}
    >
      <div className={`text-2xl font-bold mb-3 ${isActive ? "text-orange-500" : "text-black"} transition-colors duration-300`}>
        {title}
      </div>
      <div className="text-base text-gray-600 leading-relaxed">{description}</div>
      <motion.div 
        initial={{ width: 0 }}
        animate={isActive ? { width: "40px" } : { width: 0 }}
        transition={{ duration: 0.3 }}
        className={`h-1 bg-orange-400 mt-3 ${isReversed ? "ml-auto" : ""} rounded-full`}
      />
    </motion.div>
  );

  const ImageContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        className="absolute -top-3 -right-3 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs font-bold"
      >
        {index + 1}
      </motion.div>
      <div className="relative overflow-hidden rounded-lg shadow-[0px_10px_30px_rgba(0,0,0,0.15)] group">
        <img
          src={image}
          alt={imageAlt}
          className="w-64 h-64 object-cover rounded-lg transition-transform duration-700 group-hover:scale-105 max-md:w-[220px] max-md:h-[220px] max-sm:w-full max-sm:max-w-[300px] max-sm:h-auto"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent pointer-events-none"
        />
      </div>
    </motion.div>
  );

  return (
    <div 
      ref={itemRef}
      className="flex justify-between items-center relative mb-24 max-sm:flex-col max-sm:mb-16"
    >
      <div className="w-6/12 flex items-center justify-end pr-4 max-sm:w-full max-sm:justify-center max-sm:mb-4 max-sm:p-0">
        {isReversed ? <TextContent /> : <ImageContent />}
      </div>
      <TimelineIcon icon={icon} active={isActive} />
      <div className="w-6/12 flex items-center justify-start pl-4 max-sm:w-full max-sm:justify-center max-sm:mb-4 max-sm:p-0">
        {isReversed ? <ImageContent /> : <TextContent />}
      </div>
    </div>
  );
};

// Enhanced Timeline component
export const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: false, amount: 0.2 });

  const timelineData = [
    {
      title: "Customer Places Order",
      description: "Customers can easily place orders through our intuitive mobile interface. Clear categories, quick add options, and seamless checkout.",
      icon: "device-mobile",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/f41eab65b8b8bbae451fd8c85c5a679847ecaecf?placeholderIfAbsent=true",
      imageAlt: "Mobile ordering interface",
      isReversed: true,
    },
    {
      title: "Kitchen Receives Order",
      description: "Orders instantly appear on kitchen displays with auto-sorting by priority. Print tickets automatically or manage digitally.",
      icon: "printer",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e81b1c8352770d25f2bc58a0e975c9f06205ddf0?placeholderIfAbsent=true",
      imageAlt: "Kitchen display system",
    },
    {
      title: "Order Completed",
      description: "Track order progress in real-time. Get notifications when your food is ready for pickup or when delivery is on its way.",
      icon: "check",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/da1ffc9488d7df2d9373ec812d8292dd1c868677?placeholderIfAbsent=true",
      imageAlt: "Order completion interface",
      isReversed: true,
    },
  ];

  const handleItemHover = (index) => {
    setActiveIndex(index);
  };

  return (
    <section ref={timelineRef} className="max-w-none flex justify-center items-center mx-auto p-20 max-md:p-10 max-sm:p-5 overflow-hidden">
      <div className="max-w-screen-xl px-6 py-10 max-sm:px-3 max-sm:py-5 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center bg-orange-100 border border-orange-200 rounded-full px-4 py-1.5 text-sm font-medium text-orange-600 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2"></span>
            Simple Process
          </div>
          <h1 className="text-4xl font-bold text-center text-black mb-6 max-sm:text-2xl">
            A Day in the Life with <span className="text-orange-500">TasteBuds</span>
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            See how our platform creates a seamless experience from order to delivery
          </p>
        </motion.div>

        <div className="relative w-full">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              {...item}
              index={index}
              isActive={activeIndex === index}
              onHover={handleItemHover}
            />
          ))}

          {/* Animated timeline line */}
          <motion.div 
            initial={{ height: "0%" }}
            animate={isInView ? { height: "100%" } : { height: "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute -translate-x-2/4 w-0.5 bg-gradient-to-b from-orange-100 via-orange-300 to-orange-100 left-2/4 inset-y-0 max-sm:hidden"
          />
          
          {/* Animated timeline dots */}
          {[0, 0.33, 0.66, 1].map((position, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.2 + (position * 0.5), duration: 0.4 }}
              className="absolute -translate-x-2/4 w-2 h-2 bg-orange-400 rounded-full left-2/4 max-sm:hidden"
              style={{ top: `${position * 100}%` }}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-orange-500 text-white rounded-full px-8 py-4 font-medium shadow-lg hover:bg-orange-600 transition-colors flex items-center mx-auto"
          >
            See it in action
            <ChevronDown className="ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};