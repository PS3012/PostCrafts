import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosReq from "../utils/axiosReq";

function VerifyEmail() {
     const URL = new URLSearchParams(window.location.search);

     const [message, setMessage] = useState("");
     const navigate = useNavigate();

     const token = URL.get("token");

     if (!token) {
          return (
               <h2>
                    Missing Token. Go back to <Link to="/">Home</Link>
               </h2>
          );
     } else {
          sendTokenToBackend();
     }

     async function sendTokenToBackend() {
          const response = await axiosReq.post("/auth/verifyToken", {
               token: token,
          });
          console.log(response);
          if (response.status === 200)
               return navigate("/login?msg=verification_successful");

          if (response.status === 404) setMessage(response.message);
     }

     return <>{message.length > 0 ? <h3>{message}</h3> : ""}</>;
}

export default VerifyEmail;