import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import instance from "../axios.config";

const VerifyEmail = () => {
  const location = useLocation(); // Use location to get query params
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const sendTokenToBackend = async (token) => {
    try {
      console.log("Sending token to backend...");
      const res = await instance.post("/auth/verifyToken", { token });

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
      setLoading(false); // Set loading to false after request
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) {
      setMessage("Token is missing. Please return to the homepage.");
      setLoading(false);
    } else {
      sendTokenToBackend(token);
    }
  }, [location.search]); // Dependency array ensures this runs only when `location.search` changes

  if (loading) {
    return <h2>Verifying your email...</h2>; // Show loading message
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
