import mongoose from "mongoose";
import "dotenv/config"

export async function connectToDB() {
    
    await mongoose.connect(process.env.MONGODBURL)
}