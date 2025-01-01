import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/cartSlice/cartSlice';
import { logout } from '../store/authSlice/authSlice';
import { IoIosSettings } from 'react-icons/io';

const Header = () => {
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
    <div className="p-4 flex justify-between items-center bg-purple-400 text-white text-lg shadow-md">
      {/* Logo */}
      <Link to={'/'} className="font-bold text-xl">
        Geekster <span className="text-purple-800 text-2xl">Ecom</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link to={'/contact'} className="hover:text-purple-200">
          Contact Us
        </Link>
        <Link to={'/register-seller'} className="hover:text-purple-200">
          Register Seller
        </Link>

        {/* Authentication Links */}
        {!isAuthenticated ? (
          <Link to={'/login'} className="hover:text-purple-200">
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            {/* Cart Link */}
            <Link to="/cart" className="relative hover:text-purple-200">
              Cart{' '}
              {cart && cartLength > 0 && (
                <span className="absolute -top-2 -right-3 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartLength}
                </span>
              )}
            </Link>

            {/* Settings Dropdown */}
            <div className="relative">
              <IoIosSettings
                onClick={handleSetting}
                className="text-2xl cursor-pointer hover:text-purple-200"
              />
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
