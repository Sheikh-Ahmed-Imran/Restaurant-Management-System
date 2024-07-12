import express from "express"
import cors from "cors"   
import { connectDB } from "./config/db.js"    
import webhook from './controllers/webhook.js'
import foodRouter from "./routes/foodRoute.js"        
import userRouter from "./routes/userRoute.js"     
import 'dotenv/config'      
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"     
     
// app config      
const app = express()  
app.use('/webhook', webhook);

const port = 4000       
const corsOption = {
    origin: ['http://localhost:5174','http://localhost:5173'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
// middleware    
app.use(express.json())
app.use(cors(corsOption))

// db connection
connectDB();
  
// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

  

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// YOU CAN SAVE UR DATABASE IN THIS COMMENT IF U WANT --> 