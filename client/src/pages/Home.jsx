import { useEffect, useState } from "react";
import instance from "../axios.config";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/productSlice/productSlice";



function Home() {
  // const [products, setProducts] = useState([]);
  const dispatch=useDispatch()
  const products=useSelector((state)=> state.product.products);

  useEffect(() => {
    // fetchData();
    dispatch(getProduct());
  }, []);

  async function fetchData() {
    const response = await instance.get("/product/get");
    console.log(response.data);
    setProducts(response.data.products);
  }
  return (
    <>
      <div className="  min-h-screen  grid grid-cols-3 p-4 place-items-center">
        {products.length > 0 &&
          products.map((product) => {
            return <ProductCard product={product} key={product.uid} />;
          })}
      </div>
    </>
  );
}

export default Home;