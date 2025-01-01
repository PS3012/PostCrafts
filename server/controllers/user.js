import { sendVerificationEmail } from "../middleware/verification.js";
import "dotenv/config"
import bcrypt from 'bcrypt'

import jwt from "jsonwebtoken";
import Users from "../models/user.js";

export async function register(req, res) {
  console.log("reached register");
  

  const { name, username, email, phone, gender } = req.body;
    console.log(req.body);
  try {
    //check if username exists
    const existingUsername = await Users.findOne({ username });

    if (existingUsername)
      return res.status(400).send({ message: `Username ${username} exists` });

    //check if email exists
    const existingEmail = await Users.findOne({ email });
    
    if (existingEmail)
      return res.status(400).send({ message: `Email ${username} exists` });
    
    //encryption: converting plain text password into a jumbled up hash
    const password = await bcrypt.hash(req.body.password, 10);
    
    const newUser = new Users({
      name,
      username,
      email,
      phone,
      password,
      gender,
    });
    console.log("reached newUser",newUser)
    await newUser.save();

    //Send Email
    await sendVerificationEmail(newUser._id, newUser.email);

    return res.status(201).send({ message: "User registered" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
}
export async function registerSeller(req, res) {
  console.log("reached register seller");
  

  const { name, username, email, phone, gender } = req.body;
  console.log(req.body);
  try {
    //check if username exists
    const existingUsername = await Users.findOne({ username });

    if (existingUsername){
      
      return res.status(400).send({ message: `Username ${username} exists` });
    }

    //check if email exists
    const existingEmail = await Users.findOne({ email });
    

    if (existingEmail){
      if(existingEmail.role==="seller") return res.status(400).send({ message: `Email ${username} exists` });
      else{
        await Users.findOneAndUpdate({ email }, { role: "seller" });

      return res
        .status(200)
        .send({ message: `Your status is now elevated to a seller` });
      } 

    }

    //encryption: converting plain text password into a jumbled up hash
    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = new Users({
      name,
      username,
      email,
      phone,
      password,
      gender,
      role:"seller",
    });
    console.log("new user",newUser);
    
    await newUser.save();
    console.log("not saved");
    

    //Send Email
    await sendVerificationEmail(newUser._id, newUser.email);

    return res.status(201).send({ message: "User registered" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
}


export async function login(request, response) {
  console.log("reached login");
  
    const { username, password } = request.body;
    console.log(request.body);
    // console.log("reached login");
    
    
    try {
      const user = await Users.findOne({ username });
    //   console.log(user);
      
  
      if (!user)
        return response.status(401).send({ message: "Incorrect credentials" });
  
      //see if emailisVerified
    //   console.log(user.isEmailVerified);
      
  
      if (!user.isEmailVerified)
        return response
          .status(403)
          .send({ message: "Please verify your email before logging in" });
  
      //see if passwords match
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch)
        return response.status(401).send({ message: "Incorrect credentials" });
      console.log("reached pass match");
      

      //AUTHORISATION
    // SESSION VARIABLE = TOKEN

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    console.log("token created",token);
    
    //Send it to frontend:
    //1. send it with response return response.status(200).send({token: token})
    //2. send the token as an HTTP cookie

    // Set cookie with JWT token
    response.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const loggedInUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
      };
    //   console.log(loggedInUser);
      
      // res.send(user).select(-password);
      response.send(loggedInUser);
  
    } catch (error) {
      return response.status(500).send({ message: error });
    }
  }

export function logout(req,res){
  console.log("reached logout");
  
  res.clearCookie("token");
  res.status(201).send({message:"Logout succesfully!!"})
}

export async function profile(req,res){
  try {
    const user=req.user;
    console.log("user1",user);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    } 
    res.status(200).send({_id:user._id,
      name:user.name,
      username:user.username,
      phone:user.phone,
      email:user.email,
      gender: user.gender,
      createdAt: user.createdAt,
      role: user.role,
    }) 
  } catch (error) {
    return res.status(500).send({ message: "Error sendind User details",
      error
     });
  }
}

export async function editProfile(req,res){
  const {name,username,phone,role,email}=req.body;
  try {
    await Users.findByIdAndUpdate(req.user._id,{
      name,username,phone,role,email
    });
    res.status(200).send({message:"Profile updated sucessfully!!"})
    
  } catch (error) {
    res.status(500).send({ message: "Error sendind User details",
      error
     });
  }
}
export async function addToWishList(req,res){
  try {
    const {productId}=req.body;
    const userId=req.user._id;
  console.log("reached add to");
  
   const user= await Users.findById(userId);
   console.log(user);
   
   if(user.wishlist.includes(productId)){
    return res.status(400).send({message:"Product already in a wishlist"})
   }

   console.log("reached push");
   user.wishlist.push(productId)
   
   console.log(user);
   
   await user.save(); // Save the changes
  
  //  await Users.findByIdAndUpdate(userId,{
  //   $push:{wishlist:productId}
  //  })
  //  await user.populate("wishlist");
   res.status(200).send({message:"Product added to wishList succesfully!!"})
  } catch (error) {
    res.status(500).send({message:"Error adding product",error})
  }

}
export async function removeFromWishList(req,res){
try {
  const { productId } = req.body; // Extract productId from the request body
  const userId = req.user._id;   // Extract userId from the authenticated user's details

  // Check if the product exists in the user's wishlist
  const user = await Users.findById(userId);
  if (!user.wishlist.includes(productId)) {
    return res.status(400).send({ message: "Product not found in wishlist" });
  }

  // Use the $pull operator to remove the productId from the wishlist array
  await Users.findByIdAndUpdate(userId, {
    $pull: { wishlist: productId }
  });
  

  res.status(200).send({ message: "Product removed from wishlist successfully!" });
} catch (error) {
  res.status(500).send({message:"Error remocing product",error})
}
}
