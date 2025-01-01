import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createPaymentIntent(req, res) {
  const { amount } = req.body;
  console.log("amount",amount);
  

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // e.g., 500 for $5.00
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log("payment intent",paymentIntent);

    res.status(200).send({ clientSecret: paymentIntent.client_secret }); //UNIQUE TRANSACTION ID
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error processing payment" });
  }
}