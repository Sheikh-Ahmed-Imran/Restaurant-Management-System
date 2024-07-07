import foodModel from '../models/foodModel.js'
import fs from 'fs'
import cloudinary from 'cloudinary';
cloudinary.v2.config({
    cloud_name: 'deuv7ybym',
    api_key: '783822973561523',
    api_secret: 'P-j-cNnxmPSlko9rWhnN-sWzOUU'
});


// add food item
const addFood = async (req, res) => {
    const { name, description, price, category, subcategory, cookTime } = req.body;
    
    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        
        // Create a new food item with the Cloudinary URL
        const food = new foodModel({
            name,
            description,
            price,
            category,
            subcategory,
            cookTime,
            image: result.secure_url // Store Cloudinary URL
        });

        // Save the food item to the database
        await food.save();

        // Send a success response
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        // Send an error response
        res.json({ success: false, message: "Error" });
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
  
  
// remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {addFood,listFood,removeFood}