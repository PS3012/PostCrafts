import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

function ProtectedRoute(_props) {
     const { isAuthenticated, loading } = useAuth();
     if (loading) return <h3>Loading...</h3>;
     return isAuthenticated ? _props.children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;