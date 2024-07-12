import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174";
  
    try {
      // Calculate maximum cook time
      let maxCookTime = 0;
      req.body.items.forEach(item => {
        if (item.cookTime > maxCookTime) {
          maxCookTime = item.cookTime;
        }
      });
  
      // Format items for order creation
      const formattedItems = req.body.items.map(item => ({
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subcategories: item.subcategories.map(sub => ({
          name: sub.name,
          quantity: sub.quantity
        }))
      }));
  
      // Calculate total amount based on the price of the first item
      const totalAmount = req.body.amount;
  
      // Create new order instance
      const newOrder = new orderModel({
        userId: req.body.userId,
        items: formattedItems,
        amount: totalAmount,
        address: req.body.address,
        orderTime: maxCookTime
      });
  
      // Save the order to the database
      await newOrder.save();
  
      // Prepare line items for Stripe checkout session using the price of the first item
      const line_items = formattedItems.map((item, index) => ({
        price_data: {
          currency: "pkr",
          product_data: {
            name: (index === 0 ? 'Total Amount' : '.')
          },
          unit_amount: (index === 0 ? totalAmount : 0) * 100 // Convert price to cents for Stripe, set to 0 for all items except the first
        },
        quantity: item.quantity
      }));
  
      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        metadata: {
          orderId: newOrder._id.toString()
        }
      });
  
      // Respond with success and session URL
      res.json({ success: true, session_url: session.url });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// User orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const getSingleOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);
        if (!order) {
            res.json({ success: false, message: "Error. Order not found" });
        } else {
            res.json({ success: true, data: order });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// API for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params; // Get order ID from request parameters
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);

        if (deletedOrder) {
            res.json({ success: true, message: 'Order deleted successfully', data: deletedOrder });
        } else {
            res.json({ success: false, message: 'Order not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error deleting order' });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, getSingleOrder, deleteOrder };
