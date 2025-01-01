import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../store/authSlice";


const ProtectedRoute = (_props) => {
     const dispatch = useDispatch();
     const { isAuthenticated, loading } = useSelector((state) => state.auth);
     useEffect(() => {
          if (!isAuthenticated) {
               dispatch(checkAuth());
          }
     }, [dispatch, isAuthenticated]);
     if (loading) {
          return <h2>Loading...</h2>;
     }
     return isAuthenticated ? _props.children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;