import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../store/authSlice/authSlice";


const ProtectedRoute = ({ children }) => {
  console.log("Protected Route Rendered");
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  

  useEffect(() => {
    // Revalidate authentication status when the component mounts
    if (!isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated]);

  // Show a loading message while checking authentication status
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // Redirect to login if not authenticated
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
