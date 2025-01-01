import { useState } from "react";
import instance from "../axios.config";

function CreateCoupons() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    minPrice: "",
    discountPercentage: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await instance.post("/coupon/create", formData);
      setSuccess("Coupon created successfully");
      setFormData({ name: "", code: "", minPrice: "", discountPercentage: "" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating coupon");
      setSuccess("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 min-h-screen"
    >
      <h2 className="text-2xl font-bold">Create Coupon</h2>

      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}

      <div>
        <label className="block mb-1">Coupon Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Coupon Code</label>
        <input
          type="text"
          value={formData.code}
          onChange={(e) =>
            setFormData({ ...formData, code: e.target.value.toUpperCase() })
          }
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Minimum Price</label>
        <input
          type="number"
          value={formData.minPrice}
          onChange={(e) =>
            setFormData({ ...formData, minPrice: e.target.value })
          }
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Discount Percentage</label>
        <input
          type="number"
          value={formData.discountPercentage}
          onChange={(e) =>
            setFormData({ ...formData, discountPercentage: e.target.value })
          }
          className="w-full border p-2 rounded"
          min="0"
          max="100"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-600"
      >
        Create Coupon
      </button>
    </form>
  );
}

export default CreateCoupons;