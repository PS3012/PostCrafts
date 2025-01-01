import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { AddProduct, Cart, Contact, Home, Layout, Login, Profile, Register,RegisterSeller, SingleProduct } from './pages'
import ProtectedRoute from './components/ProtectedRoute'
import VerifyEmail from './components/VerifyEmail'
import { useDispatch} from 'react-redux'
import { checkAuth } from './store/authSlice/authSlice'
import Wishlist from './pages/Wishlist'
import { getProduct } from './store/productSlice/productSlice'
import CreateCoupons from './pages/CreateCoupon'
import MyCoupons from './pages/MyCoupon'
import CheckoutForm from './pages/CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import OrderSuccess from './pages/OrderSuccess;'


function App() {
  const dispatch=useDispatch();
  const StripePromise = loadStripe(import.meta.env.VITE_PUBLISH_KEY);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getProduct())
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Elements stripe={StripePromise}><Layout/></Elements>}>
          <Route index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/register-seller' element={<RegisterSeller/>}/>
          <Route path='/verify-email' element={<VerifyEmail/>}/>
          <Route path='/add-product' element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
          <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path='/product/:id' element={<ProtectedRoute><SingleProduct/></ProtectedRoute>}/>
          <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
          <Route path='/wishlist' element={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
          <Route path='/my-coupons' element={<ProtectedRoute><MyCoupons/></ProtectedRoute>}/>
          <Route path='/my-coupons/add' element={<ProtectedRoute><CreateCoupons/></ProtectedRoute>}/>
          <Route path='/checkout' element={<ProtectedRoute><CheckoutForm/></ProtectedRoute>}/>
          <Route path='/order-success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
          {/* <Route path='' element={<Home/>}/> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
