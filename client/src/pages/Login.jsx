import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";

import instance from "../axios.config";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice/authSlice";

function Login() {
  console.log("Login Rendered");
  const isAuthenticated=useSelector((state)=> state.auth.isAuthenticated)
  const dispatch=useDispatch();
  
  

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const referer = searchParams.get("referer");
      console.log("referer", referer);
      if (referer) navigate(referer);
    }
  }, [isAuthenticated, navigate, searchParams]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formdata = new FormData(e.target);
      const finalData = Object.fromEntries(formdata.entries());
      const response = await instance.post("/user/login", finalData);
      if (response.status === 200) {
        const { name } = response.data; // Assuming the API returns a token and user details
      localStorage.setItem("authToken", name); // Save the token to localStorage
        dispatch(loginUser(response.data))
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
      setMessage(error);
    }
  }

  return (
    <>
      {message.length > 0 && (
        <p>
          <em>{message}</em>
        </p>
      )}
      <h2>Log in to your account</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          value={data.username}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        New User? <Link to="/register">Register</Link>
      </p>
    </>
  );
}

export default Login;