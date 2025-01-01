import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import instance from "../axios.config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/cartSlice/cartSlice";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const cart=useSelector((state)=>state.cart.cart);
  

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch=useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);
    try {
      // Create payment intent on the server
      const data = await instance.post("/pay/create-payment-intent", {
        amount: Math.round(cart.total),
      });
      console.log(data);
      

      const result = await stripe.confirmCardPayment(data.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(result)
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setSuccess(true);

        // Call backend to create order
        await instance.post("/orders/create", {
          paymentIntentId: result.paymentIntent.id,
        });
        dispatch(fetchCart())

        navigate("/order-success");
        
      }
    } catch (error) {
      console.log(error);
      if(error?.response?.data?.message==="Error processing payment")setError("Payment failed. Please try again.");
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        action=""
        className="container max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-4 mt-4"
        onSubmit={handleSubmit}
      >
        <CardElement />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded mt-8"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">Payment Successful!</p>}
      </form>
    </>
  );
}

export default CheckoutForm;