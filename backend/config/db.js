import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://az123789opp:az123789opp@devcluster.bawl3cd.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster').then(()=>console.log("DataBase Connected"));
}