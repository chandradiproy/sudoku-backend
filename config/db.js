// Relative Path: ./config/db.js
// -----------------------------------------------------------------------------
// This file contains the logic to connect to your MongoDB Atlas database
// using the Mongoose library.

import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};
export default connectDB;