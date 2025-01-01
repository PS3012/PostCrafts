import { useWishlist } from "../hooks/useWishlist";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { isInWishlist, handleWishlistToggle } = useWishlist(product);
  console.log(isInWishlist);
  

  return (
    <div className="product">
      <div className="productImage">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt="Product Image" />
        </Link>
      </div>
      <div className="productContent">
        <h3>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        <p>{product.brand}</p>
        <p className="price">
          <LiaRupeeSignSolid /> {product.price}
        </p>
        {isInWishlist ? (
          <button
            className="px-5 py-2 rounded-lg bg-purple-400 text-white mx-3"
            onClick={() => handleWishlistToggle("remove")}
          >
            Remove from Wishlist
          </button>
        ) : (
          <button
            className="px-5 py-2 rounded-lg bg-purple-400 text-white mx-3"
            onClick={() => handleWishlistToggle("add")}
          >
            Add to Wishlist
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
