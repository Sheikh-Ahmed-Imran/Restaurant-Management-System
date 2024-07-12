// /pages/api/webhook.js

import { buffer } from 'micro';
import Stripe from 'stripe';
import orderModel from '../models/orderModel.js'; // Adjust the import path as needed
   
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export const config = {
  api: {
    bodyParser: false,
  },
};   

const webhookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      try {
        await orderModel.findByIdAndUpdate(session.metadata.orderId, { payment: true });
      } catch (error) {
        console.error('Error updating order payment status:', error);
        return res.status(500).send('Internal Server Error');
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};

export default webhookHandler;
