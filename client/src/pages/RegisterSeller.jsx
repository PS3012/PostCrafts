import { Link } from "react-router-dom";
import { useState } from "react";
import axiosReq from "../utils/axiosReq";

function RegisterSeller() {
     const [data, setData] = useState({
          name: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          phone: "",
          gender: "",
     });
     const [message, setMessage] = useState("");

     function handleChange(e) {
          const { name, value } = e.target;
          setData((prev) => {
               return { ...prev, [name]: value };
          });
     }

     async function handleSubmit(e) {
          e.preventDefault();
          if (!data.name || !data.email || !data.phone || !data.username || !data.password || !data.confirmPassword || !data.gender) {
               setMessage("All fields are required.");
               return;
          }
          if (data.password !== data.confirmPassword) {
               setMessage("Passwords does not matched.");
               return;
          }
          try {
               const response = await axiosReq.post("/user/register-seller", data);
               console.log(response);
               if (response.status === 201) {
                    setMessage(response.data.message);
               } else {
                    setMessage("Unexpected response from server.");
               }
          } catch (error) {
               console.error("Registration failed:", error);
               setMessage(error.response?.data?.message || "Something went wrong.");
          }
     }

     return (
          <>
               {message.length > 0 ? <h3>{message}</h3> : ""}
               <h2>Register as a seller</h2>

               <form action="" onSubmit={handleSubmit}>
                    <input
                         type="text"
                         name="name"
                         placeholder="Enter your Name"
                         value={data.name}
                         onChange={handleChange}
                         autoFocus
                    />
                    <br />
                    <input
                         type="email"
                         name="email"
                         placeholder="Enter your Email"
                         value={data.email}
                         onChange={handleChange}
                    />
                    <br />
                    <input
                         type="text"
                         name="phone"
                         placeholder="Enter your Phone"
                         value={data.phone}
                         onChange={handleChange}
                    />
                    <br />
                    <input
                         type="text"
                         name="username"
                         placeholder="Pick a Username"
                         value={data.username}
                         onChange={handleChange}
                    />
                    <br />
                    <input
                         type="password"
                         name="password"
                         placeholder="Choose a strong password"
                         value={data.password}
                         onChange={handleChange}
                    />
                    <br />
                    <input
                         type="password"
                         name="confirmPassword"
                         placeholder="Confirm password"
                         value={data.confirmPassword}
                         onChange={handleChange}
                    />
                    <br />
                    <input type="text" name="gender" placeholder="Enter gender" value={data.gender}
                         onChange={handleChange} />
                    <br />
                    <button type="submit">Register</button>
               </form>
               <p>
                    Already have an account? <Link to="/login">Login</Link>
               </p>
          </>
     );
}

export default RegisterSeller;