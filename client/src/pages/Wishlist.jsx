import { useSelector } from 'react-redux';

const Wishlist = () => {
     const products = useSelector((state) => state.product.products);
     console.log(products);

     const wishlist = useSelector((state) => state.auth.user.wishlist);
     console.log(wishlist);

     const wishlistProducts = products.filter((product) => wishlist.includes(product._id));

     return (
          <div>
               <h1>My Wishlist</h1>
               {wishlistProducts.length === 0 ? (
                    <p>Your wishlist is empty.</p>
               ) : (
                    <ul>
                         {wishlistProducts.map((product) => (
                              <li key={product._id}>
                                   <h2>{product.name}</h2>
                                   <p>Brand: {product.brand}</p>
                                   <p>Price: ₹{product.price}</p>
                                   <img src={product.image} alt="" className='w-[50px] h-[50px] rounded-full' />
                              </li>
                         ))}
                    </ul>
               )}
          </div>
     );
};


export default Wishlist