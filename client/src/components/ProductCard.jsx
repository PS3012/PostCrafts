
function ProductCard(_props) {
     const { product } = _props
     return (
          <>

               <div className="text-gray-700 bg-white shadow bg-clip-border rounded-xl">
                    <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-52">
                         <img
                              src={`${import.meta.env.VITE_SERVER_URL}/uploads/products/${product.image}`} 
                              alt={product.name} className="object-cover w-full h-full"
                         />
                    </div>
                    <div className="px-6 py-4">
                         <div className="flex items-center justify-between mb-2">
                              <p className="block antialiased font-medium leading-relaxed text-blue-gray-900">{product.name}</p>
                              <p className="block antialiased font-medium leading-relaxed text-blue-gray-900">INR {product.price}</p>
                         </div>
                         <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75 mb-3">
                              With plenty of talk and listen time, voice-activated Siri access, and an
                              available wireless charging case.
                         </p>
                         <div className="flex items-center gap-4">
                              <button
                                   type="button"
                                   className="text-sm rounded-md flex-1 py-2 bg-slate-100 font-semibold transition-all duration-200 hover:bg-slate-200"
                              >View Product</button>
                              <button
                                   type="button"
                                   className="text-sm rounded-md flex-1 py-2 bg-yellow-300 font-semibold transition-all duration-200 hover:bg-yellow-400"
                              >Add to Wishlist</button>
                         </div>
                    </div>
               </div>

          </>
     )
}

export default ProductCard
