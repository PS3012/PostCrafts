import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosReq from "../utils/axiosReq";

function MyCoupon() {
     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
     const [coupons, setCoupons] = useState([]);
     useEffect(() => {
          if (!isAuthenticated) return;
          fetchCoupons();
     }, [isAuthenticated]);

     async function fetchCoupons() {
          try {
               const response = await axiosReq.get("/coupon");
               console.log(response);
               setCoupons(response.data);
          } catch (error) {
               console.log(error.message);
          }
     }

     function convertToIST(timestamp) {
          const utcDate = new Date(timestamp);
          const offsetDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
          const formattedDate = offsetDate
               .toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
               })
               .replace(",", "");
          return formattedDate;
     }

     return (
          <div className="min-h-screen p-6">
               <div className="text-right">
                    <Link to="/my-coupons/add" className="bg-purple-400 text-white px-8 py-2 rounded">
                         Add Coupon
                    </Link>
               </div>

               <div className="w-full py-4 px-2">
                    <h3>MyCoupons</h3>
                    {coupons.length > 0 &&
                         coupons.map((coupon) => {
                              return (
                                   <div
                                        key={coupon._id}
                                        className="p-1 mb-1 flex w-full justify-evenly"
                                   >
                                        <p>{coupon.name}</p>
                                        <p>{coupon.code}</p>
                                        <p>{coupon.minPrice}</p>
                                        <p>{coupon.discountPercentage}</p>
                                        <p>{convertToIST(coupon.expiryDate)}</p>
                                   </div>
                              );
                         })}
               </div>
          </div>
     );
}

export default MyCoupon;