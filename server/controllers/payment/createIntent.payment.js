import Stripe from "stripe";

const handleCreatePaymentIntent = async (req, res) => {
  const { amount } = req.body;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, 
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log("payment intent", paymentIntent);

    res.status(200).send({ clientSecret: paymentIntent.client_secret }); 
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error processing payment" });
  }
};

export default handleCreatePaymentIntent;
