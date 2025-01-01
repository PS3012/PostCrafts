import { createContext, useContext, useEffect, useState } from "react";
import axiosReq from "../utils/axiosReq";

const AuthContext = createContext(null);

export function AuthProvider(_props) {
     const [authState, setAuthState] = useState({
          isAuthenticated: false,
          user: null,
          loading: true,
          error: null,
     });

     useEffect(() => {
          checkAuth();
     }, []);

     async function checkAuth() {
          try {
               const response = await axiosReq.get("/auth/validate-token", {
                    withCredentials: true,
               });
               setAuthState({
                    isAuthenticated: true,
                    user: response.data.user,
                    loading: false,
                    error: null,
               });
          } catch (error) {
               setAuthState({
                    isAuthenticated: false,
                    user: null,
                    loading: false,
                    error: error.response.data.message,
               });
          }
     }

     function login(userData) {
          setAuthState({
               isAuthenticated: true,
               user: userData,
               loading: false,
               error: null,
          });
     }

     async function logout() {
          try {
               await axiosReq.post("/user/logout", {}, { withCredentials: true, });
               setAuthState({
                    isAuthenticated: false,
                    user: null,
                    loading: false,
                    error: null,
               });
          } catch (error) {
               setAuthState({
                    isAuthenticated: false,
                    user: null,
                    loading: false,
                    error: error.response.data.message,
               });
          }
     }

     function updateUser(userData) {
          setAuthState({ ...authState, user: userData });
     }

     return (
          <AuthContext.Provider value={{ ...authState, login, logout, updateUser }}>
               {_props.children}
          </AuthContext.Provider>
     );
}

export function useAuth() {
     const context = useContext(AuthContext);
     return context;
}