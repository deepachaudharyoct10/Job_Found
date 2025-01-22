import mongoose from "mongoose";

//data base connection

const connectDB= async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected succesfully")
    }
    catch(error){
        console.log(error);
    }
}

export default connectDB;