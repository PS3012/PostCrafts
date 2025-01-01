import { useNavigate, useParams } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import instance from "../axios.config";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice/cartSlice";

function SingleProduct() {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated)
  
  
  const { id } = useParams();
  if (!id) navigate("/");
  const { isInWishlist, handleWishlistToggle } = useWishlist(product);

  const handleAddToCart = (productId) => {
    if (!isAuthenticated) {
      navigate(`/login?referer=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  async function fetchData(id) {
    try {
      const response = await instance.get("/product/get/" + id);
      console.log(response.data);
      
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div id="singleProduct" className="flex gap-2 px-12 py-12">
      <div className="left w-1/4 mr-6">
        <img src={product.image} alt="Product Image" />
      </div>
      <div className="right w-3/4">
        <h3 className="text-4xl mb-2">{product.name}</h3>
        <p className="flex items-center font-bold mb-2">
          <LiaRupeeSignSolid />
          {product.price}
        </p>
        <p className="mb-2">{product.category}</p>
        <p className="mb-2">{product.brand}</p>
        <p className="mb-2">{product.description}</p>
        {isInWishlist ? (
          <button
            className=" px-5 py-2 rounded-lg bg-purple-400 text-white mx-3"
            onClick={() => handleWishlistToggle("remove")}
          >
            Remove from Wishlist
          </button>
        ) : (
          <button
            className=" px-5 py-2 rounded-lg bg-purple-400 text-white mx-3"
            onClick={() => handleWishlistToggle("add")}
          >
            Add to Wishlist
          </button>
        )}
                    <button
              onClick={() => handleAddToCart(product._id)}
              className=" px-5 py-2 rounded-lg bg-purple-400 text-white mx-3"
              
            >
              Add To Cart
            </button>

      </div>
    </div>
  );
}

export default SingleProduct;
