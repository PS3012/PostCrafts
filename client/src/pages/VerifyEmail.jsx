import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosReq from "../utils/axiosReq";

const VerifyEmail = () => {
     const location = useLocation();
     const [message, setMessage] = useState("");
     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();

     useEffect(() => {
          const sendTokenToBackend = async (token) => {
               try {
                    const res = await axiosReq.post("/auth/verifyToken", { token });
                    if (res.status === 200) {
                         alert("Verified Successfully!!");
                         navigate("/login");
                    } else if (res.status === 404) {
                         setMessage(res.data.message || "Token not found");
                    }
               } catch (error) {
                    console.error("Token verification failed:", error);
                    setMessage(error.response?.data?.message || "Token expired or invalid");
               } finally {
                    setLoading(false); 
               }
          };
          const params = new URLSearchParams(location.search);
          const token = params.get("token");
          if (!token) {
               setMessage("Token is missing. Please return to the homepage.");
               setLoading(false);
          } else {
               sendTokenToBackend(token);
          }
     }, [location.search, navigate]); 

     if (loading) {
          return <h2>Verifying your email...</h2>; 
     }

     return (
          <div>
               {message ? (
                    <h3>{message}</h3>
               ) : (
                    <h2>
                         Return to <Link to={"/"}>Home</Link>
                    </h2>
               )}
          </div>
     );
};

export default VerifyEmail;