import foodModel from '../models/foodModel.js'
import fs from 'fs'


// add food item

const addFood = async (req, res) => {
    // Get the filename of the uploaded image
    let image_filename = `${req.file.filename}`;

    // Create a new food item with the data from the request body
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        subcategory: req.body.subcategory, // New field for subcategory
        cookTime: req.body.cookTime, // New field for cook time in minutes
        image: image_filename
    });

    try {
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


// all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

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