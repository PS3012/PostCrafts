import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosReq from "../utils/axiosReq";
import { useAuth } from "../contexts/Auth";

function useCart() {
     const { isAuthenticated } = useAuth();
     const [cart, setCart] = useState(null);
     const navigate = useNavigate();

     useEffect(() => {
          if (isAuthenticated) fetchCart();
     }, [isAuthenticated]);

     async function addToCart(productId, quantity = 1) {
          if (!isAuthenticated) {
               const currentPath = location.pathname;
               navigate(`/login?referer=${encodeURIComponent(currentPath)}`);
               return;
          }
          try {
               const response = await axiosReq.post("/cart/add", {
                    productId,
                    quantity,
               });
               console.log(response.data.cart);
               setCart(response.data.cart);
          } catch (error) {
               console.log("Error adding product to cart", error);
          }
     }

     async function fetchCart() {
          if (!isAuthenticated) return;
          try {
               const response = await axiosReq.get("/cart");
               setCart(response.data.cart);
          } catch (error) {
               console.error("Error fetching cart:", error);
          }
     }

     async function updateQuantity(productId, quantity) {
          try {
               const response = await axiosReq.put("/cart/quantity", {
                    productId,
                    quantity,
               });
               setCart(response.data.cart);
          } catch (error) {
               console.error("Error updating quantity:", error);
          }
     }
     async function removeFromCart(productId) {
          try {
               const response = await axiosReq.delete("/cart/remove/" + productId);
               console.log(response);
               setCart(response.data.cart);
          } catch (error) {
               console.error("Error removing from cart:", error);
          }
     }

     return { addToCart, cart, fetchCart, updateQuantity, removeFromCart };
}

export default useCart;