import foodModel from '../models/foodModel.js'
import fs from 'fs'
import mongoose from 'mongoose';
import cloudinary from '../config/cloudinary.js';


const addFood = async (req, res) => {
    try {
      const {
        name,
        description,
        category,
        cookTime
      } = req.body;
  
      // Parse subcategory and prices JSON
      const subcategory = JSON.parse(req.body.subcategory); // Array
      const prices = JSON.parse(req.body.price); // Object
  
      const result = await cloudinary.uploader.upload(req.file.path);
  
      const food = new foodModel({
        name,
        description,
        category,
        cookTime,
        subcategory,
        prices,
        image: result.secure_url
      });
  
      await food.save();
      res.json({ success: true, message: "Food Added" });
    } catch (error) {
      console.error("Error adding food:", error);
      res.json({ success: false, message: "Error adding food" });
    }
  };
  

const listFood = async (req, res) => {
    
    
  
   
  
    try {
      const foods = await foodModel.find();
     
      res.json({ success: true, data: foods });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };
  
  const removeFood = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }

        const deleted = await foodModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Food not found or already deleted" });
        }

        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};



const editFood = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      category,
      cookTime,
      subcategory,
      prices,
      image: oldImageUrl, // current cloudinary URL
    } = req.body;
console.log(req.file)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const updatedData = {
      name,
      description,
      category,
      cookTime,
      subcategory: JSON.parse(subcategory),
      prices: JSON.parse(prices),
    };

    // If a new image is uploaded
    if (req.file) {
      // Upload new image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path);

      updatedData.image = uploadResult.secure_url;

      // OPTIONAL: Delete old image from Cloudinary
      if (oldImageUrl) {
        const publicId = oldImageUrl.split('/').pop().split('.')[0]; // extract file name
        try {
          await cloudinary.uploader.destroy(`folder_name/${publicId}`); // replace folder_name if used
        } catch (err) {
          console.warn("Failed to delete old image:", err.message);
        }
      }
    }

    const updatedFood = await foodModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedFood) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    res.json({ success: true, message: "Food Updated", data: updatedFood });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ success: false, message: "Error updating food" });
  }
};



const getFoodById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }

        const food = await foodModel.findById(id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        res.json({ success: true, data: food });
    } catch (error) {
        console.error("Error getting food:", error);
        res.status(500).json({ success: false, message: "Error getting food" });
    }
};

export {addFood,listFood,removeFood,editFood,getFoodById}