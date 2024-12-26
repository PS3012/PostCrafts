import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useAuth } from "../contexts/Auth";

function Header() {
     const navigate = useNavigate()
     const { isAuthenticated, logout } = useAuth();

     const handleLogout = async () => {
          await logout();
          toast.success("User Logout successfully.")
          navigate("/login")
     }
     return (
          <>

               <header className="px-4 mx-auto sm:px-6 lg:px-8 border-b">
                    <nav className="relative flex items-center justify-between h-16 bg-white lg:rounded-md lg:h-24 lg:py-6">
                         <div className="flex-shrink-0">
                              <Link to="/" className="flex">
                                   <img className="w-auto h-8 lg:h-10" src="/images/logo.svg" alt="" />
                              </Link>
                         </div>

                         <div className="hidden lg:flex lg:items-center lg:space-x-10">
                              {isAuthenticated ?
                                   <>
                                        <Link to="/" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Become a Seller</Link>
                                        <Link to="/add-product" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Add Product</Link>
                                        <Link to="/" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Cart</Link>
                                        <Link to="/" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Profile</Link>
                                        <button onClick={handleLogout} className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Logout</button>
                                   </> :
                                   <Link to="/login" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Login</Link>
                              }
                         </div>
                    </nav>
               </header>

          </>
     )
}

export default Header
