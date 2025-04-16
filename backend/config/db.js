import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://az123789opp:az123789opp@ahmedkacluster.7khp1.mongodb.net/?retryWrites=true&w=majority&appName=AhmedKaCluster').then(()=>console.log("DataBase Connected"));
}