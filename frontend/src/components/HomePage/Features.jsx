import React from 'react';
import { motion } from 'framer-motion';
// Choose icons that best represent your features
import { FiZap, FiPrinter, FiUsers, FiTrendingUp, FiCheckCircle, FiSettings } from 'react-icons/fi'; // Example icons

// Animation Variants for Staggered Fade-In Up Effect on Scroll
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Stagger animation of each card
      delayChildren: 0.1, // Small delay before starting stagger
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 15,
      duration: 0.5,
    },
  },
};

// Feature data - makes it easier to manage and map
const featuresData = [
  {
    icon: FiZap,
    title: 'Live Menu Updates',
    description: 'Real-time synchronization across all devices and platforms.',
  },
  {
    icon: FiPrinter,
    title: 'Auto Print Orders',
    description: 'Instant kitchen notifications and automated printing system.',
  },
  {
    icon: FiUsers,
    title: 'Team Management',
    description: 'Assign roles and track performance with comprehensive analytics.',
  },
   // Add more features if needed
//   {
//     icon: FiTrendingUp,
//     title: 'Sales Analytics',
//     description: 'Gain insights into your performance with detailed reports.',
//   },
//   {
//      icon: FiCheckCircle,
//      title: 'Inventory Tracking',
//      description: 'Manage stock levels efficiently and reduce waste.',
//    },
//    {
//      icon: FiSettings,
//      title: 'Customizable Settings',
//      description: 'Tailor the system to fit your specific restaurant workflow.',
//    }
];

export function Features() {
  return (
    <section
      className="flex flex-col justify-center items-center bg-slate-50 py-20 px-10 max-md:py-16 max-sm:px-5" // Slightly off-white bg, adjusted padding
      id="features"
    >
      {/* Optional Section Title */}
      <motion.div
         initial={{ opacity: 0, y: -20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, amount: 0.5 }} // Trigger when 50% is visible, only once
         transition={{ duration: 0.5 }}
         className="text-center mb-12 max-md:mb-10"
      >
          <h2 className="text-3xl font-bold text-slate-800 mb-2 max-md:text-2xl">
              Everything You Need, Automated
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto max-md:text-base">
              Focus on your food and customers, let our system handle the rest with these powerful features.
          </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl w-full" // Use CSS Grid for better responsive layout
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Trigger animation when the container scrolls into view
        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible, only once
      >
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            className="flex flex-col bg-white border border-gray-100 shadow-lg p-6 rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1" // Modern shadow, subtle lift on hover
            variants={cardVariants} // Apply individual card animation variant
          >
            {/* Icon Container */}
            <div className="mb-5"> {/* Increased margin bottom for icon */}
              <div className="bg-orange-100 text-[#FF5722] rounded-lg p-3 inline-flex">
                <feature.icon size={28} /> {/* Render icon component, adjust size */}
              </div>
            </div>

            {/* Text Content */}
            <h3 className="text-xl font-semibold text-slate-800 mb-2"> {/* Adjusted font weight/color */}
              {feature.title}
            </h3>
            <p className="text-base text-slate-600 leading-relaxed flex-grow"> {/* Adjusted text color/leading, flex-grow if cards need same height */}
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}