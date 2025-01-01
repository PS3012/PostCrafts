import React, { useState } from "react";
import instance from "../axios.config";

const AddProduct = () => {
  
  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    attributes: [{ name: "", value: "" }],
    inStock: "true",
    inventory: "",
    image: "",
  });

  function handleAttributeChange(index, field, value) {
    const newAttributes = data.attributes.map((attr, i) => {
      if (i === index) {
        return { ...attr, [field]: value };
      }
      return attr;
    });

    setData({
      ...data,
      attributes: newAttributes,
    });
  }

  function addNewAttribute() {
    setData({
      ...data,
      attributes: [...data.attributes, { name: "", value: "" }],
    });
  }

  function handleChange(e) {
    if (e.target.name === "image") {
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("category", data.category);
    formdata.append("brand", data.brand);
    formdata.append("description", data.description);
    formdata.append("attributes", JSON.stringify(data.attributes));
    formdata.append("inStock", data.inStock);
    formdata.append("inventory", data.inventory);
    formdata.append("image", data.image);

    try {
      const response = await instance.post("/product/add", formdata, {
        withCredentials: true,
      });
      console.log(response);
      
      if (response.status === 201) {
        alert("Product added successfully!");
        setData({
          name: "",
          brand: "",
          category: "",
          price: "",
          description: "",
          attributes: [{ name: "", value: "" }],
          inStock: "true",
          inventory: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={data.name}
              name="name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Brand"
              value={data.brand}
              name="brand"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Category"
              value={data.category}
              name="category"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Price"
              value={data.price}
              name="price"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            name="description"
            value={data.description}
            placeholder="Description"
            onChange={handleChange}
            className="w-full mt-4 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <div className="mt-4">
            <label className="block font-medium text-gray-700 mb-1">
              Attributes
            </label>
            {data.attributes.map((attribute, index) => (
              <div
                className="grid grid-cols-2 gap-2 mb-2"
                key={index}
              >
                <input
                  type="text"
                  name="attributeName"
                  placeholder="Attribute Name"
                  value={attribute.name}
                  onChange={(e) =>
                    handleAttributeChange(index, "name", e.target.value)
                  }
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="attributeValue"
                  placeholder="Attribute Value"
                  value={attribute.value}
                  onChange={(e) =>
                    handleAttributeChange(index, "value", e.target.value)
                  }
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addNewAttribute}
              className="text-blue-500 hover:underline"
            >
              Add Attribute
            </button>
          </div>
          <div className="mt-4">
            <label className="block font-medium text-gray-700 mb-1">
              In Stock
            </label>
            <div className="flex items-center gap-4">
              <label>
                <input
                  type="radio"
                  name="inStock"
                  value="true"
                  onChange={handleChange}
                  checked={data.inStock === "true"}
                />
                <span className="ml-2">True</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="inStock"
                  value="false"
                  onChange={handleChange}
                  checked={data.inStock === "false"}
                />
                <span className="ml-2">False</span>
              </label>
            </div>
          </div>
          <input
            type="number"
            name="inventory"
            placeholder="Inventory Count"
            value={data.inventory}
            onChange={handleChange}
            className="w-full mt-4 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full mt-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg p-3 mt-6 hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
