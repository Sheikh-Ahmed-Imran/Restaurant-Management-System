import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async (req, res) => {
    try {
      // Fetch user data from the database
      let userData = await userModel.findById(req.body.userId);
  
      // Check if user data is null
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Fetch cart data from the user data
      let cartData = userData.cartData || {};
  
      // Update cart data
      if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
      } else {
        cartData[req.body.itemId] += 1;
      }
  
      // Update user cart data in the database
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
  
      // Send success response
      res.json({ success: true, message: "Added to cart" });
    } catch (error) {
      // Handle and log any errors that occur
      console.log(error);
  
      // Send error response
      res.status(500).json({ success: false, message: "Error" });
    }
  };
  


// remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }  
}
  
// fetch user cart data
const getCart = async (req, res) => {
    try {
      // Fetch user data from the database
      let userData = await userModel.findById(req.body.userId);
  
      // Check if user data is null
      if (!userData) {
        // Send a 404 response if the user is not found
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Fetch cart data from the user data
      let cartData = userData.cartData;
  
      // Check if cart data is null
      if (!cartData) {
        // Send a 404 response if the cart is not found
        return res.status(404).json({ success: false, message: "Cart not found" });
      }  
  
      // Send a 200 response with the cart data
      res.json({ success: true, cartData });
    } catch (error) {
      // Handle and log any errors that occur
      console.log(error);
  
      // Send a 500 response if there's a server error
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

export {addToCart,removeFromCart,getCart} 