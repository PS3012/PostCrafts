import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import StaticLayout from "./layouts/StaticLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import VerifyEmail from "./pages/VerifyEmail"
import AddProduct from "./pages/AddProduct"


function App() {
  return (
    <>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="" element={<StaticLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Route>
      </Routes>
      <Toaster />

    </>
  )
}

export default App
