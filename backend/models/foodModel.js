import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    cookTime: {type: Number, required: true}, // New field for cook time in minutes
    subcategory: {type: String, required: true} // New field for subcategory
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
