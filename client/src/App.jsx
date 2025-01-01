import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useDispatch } from 'react-redux'
import { checkAuth } from './store/authSlice'
import { getProduct } from './store/productSlice'
import StaticLayout from "./layouts/StaticLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import VerifyEmail from "./pages/VerifyEmail"
import AddProduct from "./pages/AddProduct"
import RegisterSeller from "./pages/RegisterSeller"
import Profile from "./pages/Profile"
import SingleProduct from "./pages/SingleProduct"
import Cart from "./pages/Cart"
import MyCoupon from "./pages/MyCoupon"
import CreateCoupon from "./pages/CreateCoupon"
import Wishlist from "./pages/Wishlist"
import CheckoutForm from "./pages/CheckoutForm"
import OrderSuccess from "./pages/OrderSuccess"


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getProduct())
  }, [dispatch]);
  return (
    <>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-seller" element={<RegisterSeller />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="" element={<StaticLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/my-coupons' element={<MyCoupon />} />
          <Route path='/my-coupons/add' element={<CreateCoupon />} />
          <Route path='/checkout' element={<CheckoutForm />} />
          <Route path='/order-success' element={<OrderSuccess />} />
        </Route>
      </Routes>
      <Toaster />

    </>
  )
}

export default App
