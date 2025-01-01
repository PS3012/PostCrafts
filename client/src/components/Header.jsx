import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { fetchCart } from '../store/cartSlice';
import { logout } from '../store/authSlice';

function Header() {
     const cart = useSelector((state) => state.cart.cart);
     const user = useSelector((state) => state.auth.user);
     const [visible, setVisible] = useState(false);
     const dispatch = useDispatch();
     const handleSetting = () => {
          setVisible(!visible);
     };
     let cartLength = 0;
     if (cart) {
          cartLength = cart.items.reduce((acc, item) => acc + item.quantity, 0);
     }
     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
     const handleLogout = async () => {
          dispatch(logout());
     };
     useEffect(() => {
          dispatch(fetchCart());
     }, [dispatch]);
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
                              <Link to="/register-seller" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Become a Seller</Link>
                              {isAuthenticated ?
                                   <>
                                        <Link to="/add-product" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Add Product</Link>
                                        <Link to="/cart" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                                             Cart&nbsp;
                                             {cart && cartLength > 0 && (
                                                  <span className="absolute -top-2 -right-3 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                                       {cartLength}
                                                  </span>
                                             )}
                                        </Link>
                                        <div className="relative">
                                             <div onClick={handleSetting} className="text-2xl cursor-pointer hover:text-purple-200">Settings</div>
                                             {visible && (
                                                  <div className="absolute right-0 top-8 w-48 bg-white shadow-md rounded-lg flex flex-col gap-3 p-4 text-purple-700 z-50">
                                                       {user?.role === 'seller' && (
                                                            <>
                                                                 <Link
                                                                      to={'/add-product'}
                                                                      className="hover:text-purple-500"
                                                                 >
                                                                      Add Product
                                                                 </Link>
                                                                 <Link to={'/my-coupons'} className="hover:text-purple-500">
                                                                      My Coupons
                                                                 </Link>
                                                            </>
                                                       )}
                                                       <Link to={'/profile'} className="hover:text-purple-500">
                                                            Profile
                                                       </Link>
                                                       <Link to={'/wishlist'} className="hover:text-purple-500">
                                                            Wishlist
                                                       </Link>
                                                       <button
                                                            onClick={handleLogout}
                                                            className="text-left hover:text-purple-500"
                                                       >
                                                            Logout
                                                       </button>
                                                  </div>
                                             )}
                                        </div>
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
