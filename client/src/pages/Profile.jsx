import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosReq from "../utils/axiosReq";

function Profile() {
     const [data, setData] = useState({});
     const [changes, setChanges] = useState(false);
     const navigate = useNavigate();
     useEffect(() => {
          fetchData();
     }, []);

     async function fetchData() {
          try {
               const response = await axiosReq.get("/user/profile", {
                    withCredentials: true,
               });
               setData(response.data);
          } catch (error) {
               console.log(error);
               setData({});
          }
     }

     function handleChange(e) {
          const { name, value } = e.target;
          setData({ ...data, [name]: value });
          setChanges(true);
     }

     async function handleSubmit(e) {
          e.preventDefault();
          const response = await axiosReq.put("/user/profile", data);
          if (response.status === 200) {
               navigate("/profile?success=true");
          }
     }

     return (
          <>
               <div id="profile">
                    <main>
                         {data.name && (
                              <form action="" onSubmit={handleSubmit}>
                                   <div className="form-group">
                                        <label htmlFor="">Name</label>
                                        <input
                                             type="text"
                                             name="name"
                                             placeholder="Your name"
                                             value={data.name}
                                             onChange={handleChange}
                                        />
                                   </div>

                                   <div className="form-group">
                                        <label htmlFor="">Email</label>
                                        <input
                                             type="email"
                                             name="email"
                                             placeholder="Your email"
                                             value={data.email}
                                             onChange={handleChange}
                                        />
                                   </div>

                                   <div className="form-group">
                                        <label htmlFor="">Phone</label>
                                        <input
                                             type="text"
                                             name="phone"
                                             placeholder="Your phone"
                                             value={data.phone}
                                             onChange={handleChange}
                                        />
                                   </div>

                                   <div className="form-group">
                                        <label htmlFor="">Username</label>
                                        <input
                                             type="text"
                                             name="username"
                                             placeholder="Your username"
                                             value={data.username}
                                             onChange={handleChange}
                                        />
                                   </div>

                                   <div className="form-group">
                                        <label htmlFor="">Role</label>
                                        <select
                                             name="role"
                                             id=""
                                             value={data.role}
                                             onChange={handleChange}
                                        >
                                             <option value="buyer">Buyer</option>
                                             <option value="seller">Seller</option>
                                        </select>
                                   </div>
                                   <div >
                                        <button type="submit" disabled={changes ? false : true}>
                                             Save Details
                                        </button>
                                   </div>
                              </form>
                         )}
                    </main>
               </div>
          </>
     );
}

export default Profile;