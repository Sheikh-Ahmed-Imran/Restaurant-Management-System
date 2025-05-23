import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    cookTime: { type: Number, required: true },
    subcategory: { type: [String], required: true },

    prices: {
        type: Map,
        of: Number,
        required: true
      }
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
