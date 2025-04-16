import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Upload, Clock, Tag, AlignLeft, Coffee, ChevronDown } from 'lucide-react';

const AddFoodPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [category, setCategory] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [subcategories, setSubcategories] = useState([
    { name: '', price: '' }
  ]);
  const categoryOptions = {
  pizza: ["Small", "Medium", "Large"],
  burger: ["Zinger", "Cheese", "Chicken"],
  pasta: ["Creamy", "Flaming"],
};
const makeRequest = async () => {
  const formData = new FormData();

  // Regular fields
  formData.append('name', name);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('cookTime', cookTime);

  // Image
  if (image) {
    formData.append('image', image);
  }

  // Subcategory names as array
  const subcategoryNames = subcategories.map(item => item.name);
  formData.append('subcategory', JSON.stringify(subcategoryNames));

  // Prices as object { Small: 10, Medium: 12, ... }
  const prices = {};
  subcategories.forEach(item => {
    if (item.name && item.price) {
      prices[item.name] = item.price;
    }
  });
  formData.append('price', JSON.stringify(prices));

  try {
    const response = await fetch('http://localhost:4000/api/food/add', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    
    if (data.success) {
      // Show modal
      setShowModal(true);

      // Reset all form fields
      setName('');
      setDescription('');
      setCategory('');
      setCookTime('');
      setImage(null);
      setImagePreview(null);
      setSubcategories([{ name: '', price: '' }]);
    } 
else {
      alert('Failed to add food');
      console.error('Server error:', data.message);
    }
  } catch (error) {
    console.error('Error in makeRequest:', error);
  }
};

  const [activeStep, setActiveStep] = useState(1);

  const handleSubcategoryChange = (index, field, value) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index][field] = value;
    setSubcategories(updatedSubcategories);
  };

  const addSubcategoryField = () => {
    setSubcategories([...subcategories, { name: '', price: '' }]);
  };

  const removeSubcategoryField = (index) => {
    const updatedSubcategories = subcategories.filter((_, idx) => idx !== index);
    setSubcategories(updatedSubcategories);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log({ name, description, category, cookTime, image, subcategories });
    // Show success message or redirect
  };

  const formSteps = [
    { num: 1, title: "Basic Info" },
    { num: 2, title: "Pricing Options" },
   
  ];

  return (
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg"
    >
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-orange-600 mb-2">Success!</h2>
      <div className="text-gray-700 mb-4">Food added successfully </div>
      <button
        onClick={() => setShowModal(false)}
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
)}

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Add New Menu Item</h2>
        <div className="text-gray-500 mt-2">Complete the form below to add a new product to your menu</div>
      </div>

      {/* Progress steps */}
      <div className="flex items-center justify-between mb-10 px-4">
        {formSteps.map((step) => (
          <div key={step.num} className="flex flex-col items-center relative">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer 
                ${activeStep >= step.num ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}
              onClick={() => setActiveStep(step.num)}
            >
              {step.num}
            </motion.div>
            <span className={`mt-2 text-sm font-medium ${activeStep >= step.num ? 'text-orange-500' : 'text-gray-400'}`}>
              {step.title}
            </span>
          
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Info */}
        {activeStep === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Coffee className="w-4 h-4 mr-2 text-orange-500" />
                  Product Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Spicy Chicken Burger"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <AlignLeft className="w-4 h-4 mr-2 text-orange-500" />
                  Description
                </label>
                <textarea
                  placeholder="Describe your product..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg h-24 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Tag className="w-4 h-4 mr-2 text-orange-500" />
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                      required
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="Pizza">Pizza</option>
                      <option value="Pastas">Pasta</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Drinks">Drinks</option>
                      <option value="Burger">Burger</option>
                      <option value="Shwarma">Shwarma</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-orange-500" />
                    Cook Time (mins)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Upload className="w-4 h-4 mr-2 text-orange-500" />
                  Product Image
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 transition-all hover:border-orange-300">
                  {imagePreview ? (
                    <div className="relative w-full">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-lg" 
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Drag and drop an image or click to browse</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                        required
                      />
                      <label 
                        htmlFor="image-upload"
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors cursor-pointer text-sm font-medium"
                      >
                        Select Image
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
                onClick={() => setActiveStep(2)}
              >
                Continue to Pricing
                <ChevronDown className="w-5 h-5 ml-2 rotate-270" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Pricing Options */}
        {activeStep === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-orange-500" />
                Subcategories & Prices
              </h3>
              <p className="text-sm text-gray-600">
                Add size variations, options, or extras with their respective prices
              </p>
            </div>

            <div className="space-y-4">
              {subcategories.map((sub, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-semibold">
                    {idx + 1}
                  </div>
                  
                  <div className="flex-1">
                    <input
                      placeholder="Option name (e.g. Small, Medium, Extra cheese)"
                      value={sub.name}
                      onChange={(e) => handleSubcategoryChange(idx, "name", e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                      required
                    />
                  </div>
                  
                  <div className="w-32">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs:  </div>
                      <input
                        placeholder="  Price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={sub.price}
                        onChange={(e) => handleSubcategoryChange(idx, "price", e.target.value)}
                        className="w-full p-3 pl-7 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>
                  
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    type="button" 
                    onClick={() => removeSubcategoryField(idx)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                    disabled={subcategories.length === 1}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={addSubcategoryField}
              className="w-full p-4 border border-dashed border-orange-300 rounded-lg text-orange-500 flex items-center justify-center hover:bg-orange-50 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Another Option
            </motion.button>

            <div className="flex justify-between pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                onClick={() => setActiveStep(1)}
              >
                <ChevronDown className="w-5 h-5 mr-2 rotate-90" />
                Back
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
                onClick={() => makeRequest()}
              >
                Review & Submit
                <ChevronDown className="w-5 h-5 ml-2 rotate-270" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Review & Submit */}
       
              </form>
              </motion.div>
  )}
  export default AddFoodPage
              