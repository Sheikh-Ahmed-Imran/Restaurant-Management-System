import express from "express"
import { addFood,listFood,removeFood,getFoodById, editFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();

// Use memory storage instead of disk storage
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Temporarily remove image upload from routes
foodRouter.post("/add", async (req, res) => {
    // Call addFood without image
    res.json({ message: "File uploads temporarily disabled" })
})
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);
foodRouter.get("/:id", getFoodById);
foodRouter.put("/edit", async (req, res) => {
    // Call editFood without image
    res.json({ message: "File uploads temporarily disabled" })
})

export default foodRouter;
