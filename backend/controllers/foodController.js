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


export {addFood,listFood,removeFood}