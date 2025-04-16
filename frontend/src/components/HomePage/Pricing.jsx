import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'; // Icons for features

// Animation variants (similar to Features section for consistency)
const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15, // Stagger animation of each card
            delayChildren: 0.2, // Delay after title animation
        },
    },
};

const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 90,
            damping: 15,
            duration: 0.5,
        },
    },
};


// Pricing plan data structure
const pricingPlans = [
    {
        name: 'Standard',
        description: 'Perfect for small restaurants starting out.',
        price: 49,
        billing: 'Billed annually',
        highlighted: false,
        features: [
            { text: 'Up to 2 devices', included: true },
            { text: 'Menu management', included: true },
            { text: 'Order tracking', included: true },
            { text: 'Analytics dashboard', included: false },
            { text: '24/7 Support', included: false },
        ],
        buttonLabel: 'Get Started',
        buttonVariant: 'secondary', // Style identifier
    },
    {
        name: 'Premium',
        description: 'For growing restaurants needing more power.',
        price: 99,
        billing: 'Billed annually',
        highlighted: true, // This plan will be emphasized
        features: [
            { text: 'Up to 5 devices', included: true },
            { text: 'Menu management', included: true },
            { text: 'Order tracking', included: true },
            { text: 'Analytics dashboard', included: true },
            { text: '24/7 Support', included: false }, // Example: Still excluded here
        ],
        buttonLabel: 'Choose Premium',
        buttonVariant: 'primary', // Style identifier
    },
    {
        name: 'Enterprise',
        description: 'Comprehensive solution for chains & large venues.',
        price: 199, // Or 'Contact Us'
        billing: 'Custom pricing available',
        highlighted: false,
        features: [
            { text: 'Unlimited devices', included: true },
            { text: 'Menu management', included: true },
            { text: 'Order tracking', included: true },
            { text: 'Analytics dashboard', included: true },
            { text: '24/7 Priority Support', included: true }, // Changed text slightly
        ],
        buttonLabel: 'Contact Sales',
        buttonVariant: 'secondary', // Style identifier
    },
];


export function Pricing() {
    return (
        <motion.section
            className="flex justify-center items-center bg-gradient-to-br from-orange-50 via-white to-orange-100 py-24 px-10 max-md:py-20 max-sm:px-5 overflow-hidden" // Consistent gradient, adjusted padding
            id="pricing"
        >
            <div className="flex flex-col items-center max-w-screen-xl w-full">
                {/* Title Section - Animated */}
                <motion.div
                    className="flex flex-col items-center gap-4 mb-16 text-center" // Reduced gap slightly
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={titleVariants}
                >
                    <h2 className="text-4xl font-bold text-slate-800 max-md:text-3xl">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-slate-600 max-w-[600px] max-md:text-lg">
                        Choose the plan that fits your restaurant's needs. No hidden fees, ever.
                    </p>
                </motion.div>

                {/* Pricing Cards Container - Animated */}
                <motion.div
                    className="flex flex-wrap gap-8 w-full justify-center items-stretch" // Use flex-wrap, items-stretch for equal height feel
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }} // Trigger sooner for cards
                >
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col flex-1 min-w-[300px] max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
                                plan.highlighted
                                ? 'border-2 border-[#FF5722] shadow-xl relative scale-[1.02] hover:shadow-2xl' // Highlighted styles
                                : 'border border-gray-100 hover:shadow-xl hover:-translate-y-1' // Standard styles
                            }`}
                            variants={cardVariants}
                        >
                            {/* Most Popular Banner for Highlighted Plan */}
                            {plan.highlighted && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-[#FF5722] text-white text-xs font-semibold px-4 py-1 rounded-b-md shadow-md">
                                    Most Popular
                                </div>
                            )}

                            {/* Card Content */}
                            <div className={`flex flex-col p-8 ${plan.highlighted ? 'pt-12' : ''} h-full`}> {/* Add padding top if highlighted, h-full for button alignment */}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-semibold text-slate-800 mb-1">{plan.name}</h3>
                                    <p className="text-slate-600 text-sm">{plan.description}</p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline"> {/* Use baseline alignment */}
                                        <span className="text-4xl font-bold text-slate-900">Rs: {plan.price}</span>
                                        <span className="text-slate-500 ml-1.5">/month</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">{plan.billing}</p>
                                </div>

                                <ul className="mb-8 space-y-3 text-sm flex-grow"> {/* Use flex-grow to push button down */}
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className={`flex items-start ${feature.included ? 'text-slate-700' : 'text-slate-400 line-through'}`}>
                                            {feature.included ? (
                                                <FiCheckCircle className="w-4 h-4 mr-2 mt-0.5 text-[#FF5722] flex-shrink-0" />
                                            ) : (
                                                <FiXCircle className="w-4 h-4 mr-2 mt-0.5 text-slate-400 flex-shrink-0" />
                                            )}
                                            <span>{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Button - Styled based on variant */}
                                <motion.button
                                    className={`w-full py-3 font-medium rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                        plan.buttonVariant === 'primary'
                                        ? 'bg-[#FF5722] text-white hover:bg-[#E64A19] focus:ring-[#FF5722]'
                                        : 'bg-orange-100 text-[#FF5722] hover:bg-orange-200 focus:ring-orange-300' // Secondary style
                                    }`}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {plan.buttonLabel}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}