import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Clock, 
  X, 
  Plus, 
  Trash2, 
  Save, 
  Image as ImageIcon, 
  Tag, 
  FileText, 
  Menu, 
  AlertCircle 
} from "lucide-react";

const EditFood = () => {
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foodItem, setFoodItem] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: [],
    prices: {},
    cookTime: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/food/${id}`);
        if (response.data.success) {
          setFoodItem(response.data.data);
          if (response.data.data.image) {
            setPreviewImage(response.data.data.image);
          }
        } else {
          setError("Failed to load food details");
          toast.error("Failed to load food details");
        }
      } catch (err) {
        setError("Error fetching food details");
        toast.error("Error fetching food details");
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        toast.warning("Image size should be less than 5MB");
        return;
      }
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handlePriceChange = (e, subcategory) => {
    const { value } = e.target;
    setFoodItem((prev) => ({
      ...prev,
      prices: { ...prev.prices, [subcategory]: value },
    }));
  };

  const handleAddSubcategory = () => {
    const newSubcategory = foodItem.newSubcategory?.trim();
    const newPrice = foodItem.newPrice?.trim();

    if (newSubcategory && newPrice) {
      if (foodItem.subcategory.includes(newSubcategory)) {
        toast.warning("This subcategory already exists");
        return;
      }
      
      setFoodItem((prev) => ({
        ...prev,
        subcategory: [...prev.subcategory, newSubcategory],
        prices: { ...prev.prices, [newSubcategory]: newPrice },
        newSubcategory: "",
        newPrice: "",
      }));
      toast.success("Subcategory added");
    } else {
      toast.warning("Please provide both subcategory and price");
    }
  };

  const handleRemoveSubcategory = (subcategoryToRemove) => {
    setFoodItem((prev) => {
      const filteredSubcategories = prev.subcategory.filter(
        (sub) => sub !== subcategoryToRemove
      );
      const { [subcategoryToRemove]: _, ...remainingPrices } = prev.prices;
      return {
        ...prev,
        subcategory: filteredSubcategories,
        prices: remainingPrices,
      };
    });
    toast.info("Subcategory removed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", foodItem.name);
      formData.append("description", foodItem.description);
      formData.append("category", foodItem.category);
      formData.append("cookTime", foodItem.cookTime);
      if (newImage) formData.append("imageFile", newImage);

      formData.append("subcategory", JSON.stringify(foodItem.subcategory));
      formData.append("prices", JSON.stringify(foodItem.prices));

      const response = await axios.put("http://localhost:4000/api/food/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Food item updated successfully");
        navigate("/food");
      } else {
        toast.error(response.data.message || "Failed to update food item");
      }
    } catch (err) {
      toast.error(err.message || "Error updating food item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.");
    if (confirmCancel) {
      navigate("/food");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-orange-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading food details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Food Item</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/food")}
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Back to Foods
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-orange-500 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Menu className="w-5 h-5 mr-2" /> Edit Food Item
            </h2>
            <button
              type="button"
              onClick={handleCancel}
              className="text-white hover:text-orange-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Food Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Tag className="w-4 h-4 inline mr-1" /> Food Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={foodItem.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    placeholder="Enter food name"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FileText className="w-4 h-4 inline mr-1" /> Description
                  </label>
                  <textarea
                    name="description"
                    value={foodItem.description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all min-h-32"
                    placeholder="Enter food description"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Menu className="w-4 h-4 inline mr-1" /> Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={foodItem.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    placeholder="Enter food category"
                    required
                  />
                </div>

                {/* Cook Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="w-4 h-4 inline mr-1" /> Cook Time
                  </label>
                  <input
                    type="text"
                    name="cookTime"
                    value={foodItem.cookTime}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    placeholder="e.g. 15-20 mins"
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <ImageIcon className="w-4 h-4 inline mr-1" /> Food Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500 transition-colors cursor-pointer relative">
                    <div className="space-y-1 text-center">
                      {previewImage ? (
                        <div className="relative">
                          <img
                            src={previewImage}
                            alt="Food Preview"
                            className="mx-auto h-40 w-auto object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewImage(null);
                              setNewImage(null);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-500 hover:text-orange-600 focus-within:outline-none transition-colors">
                              <span>Upload an image</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleImageChange}
                                accept="image/*"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Add New Subcategory */}
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Plus className="w-4 h-4 inline mr-1" /> Add New Variant/Size
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="newSubcategory"
                      value={foodItem.newSubcategory || ""}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      placeholder="Size/Variant name"
                    />
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">Rs</span>
                      <input
                        type="number"
                        name="newPrice"
                        value={foodItem.newPrice || ""}
                        onChange={handleChange}
                        className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="Price"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSubcategory}
                    className="mt-3 w-full p-2 bg-orange-100 text-orange-600 rounded-md hover:bg-orange-200 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Variant/Size
                  </button>
                </div>

                {/* Subcategories and Prices */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variants/Sizes and Prices
                  </label>
                  <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
                    {foodItem.subcategory.length === 0 ? (
                      <p className="text-gray-500 text-sm italic p-2 text-center">
                        No variants or sizes added yet
                      </p>
                    ) : (
                      foodItem.subcategory.map((sub) => (
                        <div 
                          key={sub} 
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <span className="font-medium text-gray-700">{sub}</span>
                          <div className="flex items-center">
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">Rs </span>
                              <input
                                type="number"
                                value={foodItem.prices[sub] || ""}
                                onChange={(e) => handlePriceChange(e, sub)}
                                className="w-24 p-2 pl-6 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                step="0.01"
                                min="0"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveSubcategory(sub)}
                              className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                              title="Remove variant"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
              >
                <X className="w-4 h-4 mr-2" /> Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? "Updating..." : "Update Food"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFood;