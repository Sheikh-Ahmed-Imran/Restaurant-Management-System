import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, quantity, subcategory } = req.body;

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    // Use itemId + subcategory as unique key
    const cartKey = `${itemId}_${subcategory}`;

    if (!cartData[cartKey]) {
      cartData[cartKey] = quantity;
    } else {
      cartData[cartKey] += quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding to cart" });
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};
 

  const removeFromCart = async (req, res) => {
    try {
      const userData = await userModel.findById(req.body.userId);
      let cartData = userData.cartData;
  
      // Remove the item entirely
      delete cartData[req.body.itemId];
  
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
  
      res.json({ success: true, message: "Item completely removed from cart" });
    } catch (error) {
      
      res.json({ success: false, message: "Error removing item" });
    }
  };
  
  
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
      
  
      // Send a 500 response if there's a server error
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

export {addToCart,removeFromCart,getCart}