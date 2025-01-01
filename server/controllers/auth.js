
import jwt from "jsonwebtoken";
import "dotenv/config";
import Users from "../models/user.js";


export const verifyToken=async(req,res)=>{
  console.log("verify token reached");
  
    const {token}=req.body;
    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        // console.log(decoded);
        const user=await Users.findOneAndUpdate({_id:decoded.userId},{isEmailVerified:true});
        if(!user){
          return  res.status(404).send({message:"User doesn't exist"})
        }

        return res.status(200).send({message:"User Verified Succesfully!!"})
        
    } catch (error) {
      console.log("token expired");
      
      return  res.status(404).send({message:"token expired"})
        
    }
    
}

