import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/productSlice";
import ProductCard from "../components/ProductCard"

function Home() {
     const dispatch = useDispatch()
     const products = useSelector((state) => state.product.products);
     useEffect(() => {
          dispatch(getProduct());
     }, [dispatch]);
     return (
          <>
               <div className="py-6 px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-4">
                         {products && products.length > 0 && products.map((product) =>
                              <ProductCard product={product} key={product.uid} />
                         )}
                    </div>
               </div>

          </>
     )
}

export default Home
