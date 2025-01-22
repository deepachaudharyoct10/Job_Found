import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
//at the importing time alway add js extension
dotenv.config({});
const app = express();
 

//middleware
app.use(express.json());
app.use(express.urlencoded(
    {
        extended:true
    }
));

//cookie parese
app.use(cookieParser());

// corse
const corsOptions= {
    origin:'http//localhost:5173',
    credentials:true, //credentials not credentials
}

app.use(cors(corsOptions));

const PORT= process.env.PORT || 3000;

//connect with routes using use
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)
 //api formet will be http://localhost:8000/api/v1/user/login
app.listen(PORT, ()=>{
    connectDB();
    console.log(`server running at port ${PORT}`)
})