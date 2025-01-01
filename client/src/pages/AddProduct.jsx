import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosReq from "../utils/axiosReq";

function AddProduct() {
     const navigate = useNavigate()
     const initialData = {
          name: "",
          brand: "",
          category: "",
          price: "",
          description: "",
          inventory: "",
          image: "",
     }
     const [product, setProduct] = useState(initialData)
     function handleChange(e) {
          const { name, value } = e.target
          if (e.target.name === "image") {
               setProduct({ ...product, [name]: e.target.files[0] });
          } else {
               setProduct({ ...product, [name]: value });
          }
     }

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!product.name || product.name.trim() === "") {
               toast.error("Product Name is required.")
          } else if (!product.brand || product.brand.trim() === "") {
               toast.error("Product Brand is required.")
          } else if (!product.inventory || product.inventory.trim() === "") {
               toast.error("Enter valid product inventory")
          } else if (!product.category || product.category.trim() === "") {
               toast.error("Select valid product category.")
          } else if (!product.price || product.price.trim() === "") {
               toast.error("Enter valid product price.")
          } else {
               try {
                    const formdata = new FormData(e.target);
                    formdata.append("name", product.name);
                    formdata.append("price", product.price);
                    formdata.append("category", product.category);
                    formdata.append("brand", product.brand);
                    formdata.append("description", product.description);
                    formdata.append("inventory", product.inventory);
                    formdata.append("image", product.image);
                    const response = await axiosReq.post("/product", formdata, { withCredentials: true});
                    if (response.status === 201) {
                         toast.success("Product added successfully.")
                         setProduct(initialData)
                         navigate("/");
                    }
               } catch (error) {
                    console.log(error);
               }
          }
     }
     return (
          <>

               <div className="py-6 px-4 mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold mb-4">Add Product</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <div className="grid grid-cols-3 gap-4">
                              <div>
                                   <label className="block text-sm font-medium mb-1">Name <span className="text-red-600">*</span></label>
                                   <input
                                        type="text" name="name"
                                        value={product.name} onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium mb-1">Brand <span className="text-red-600">*</span></label>
                                   <input
                                        type="text" name="brand"
                                        value={product.brand} onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium mb-1">Category <span className="text-red-600">*</span></label>
                                   <input
                                        type="text" name="category"
                                        value={product.category} onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium mb-1">Price <span className="text-red-600">*</span></label>
                                   <input
                                        type="text" name="price"
                                        value={product.price} onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium mb-1">Image</label>
                                   <input
                                        type="file" name="image" onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium mb-1">Inventory Count <span className="text-red-600">*</span></label>
                                   <input
                                        type="number" name="inventory"
                                        value={product.inventory} onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                   />
                              </div>
                         </div>
                         <div>
                              <label className="block text-sm font-medium mb-1">Description</label>
                              <textarea
                                   name="description" value={product.description} onChange={handleChange}
                                   className="w-full border border-gray-300 p-2 rounded"
                              />
                         </div>
                         <button type="submit"
                              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                         >Add Product</button>
                    </form>
               </div>

          </>
     )
}

export default AddProduct
