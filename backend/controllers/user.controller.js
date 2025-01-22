import {User} from '../models/user.model.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
//for register user
export const register = async (req,res)=>{
    try{
        const {fullname,email,phoneNumber,password,role}=req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false,
            });
        };
        const user = await User.findOne({email});
        //chcek mail exit or not
        if(user){
            return res.status(400).json({
                message:"this mail is already exits",
                success:false,
            })
        }

    //conver password into hash
    const hashedPassword = await bcrypt.hash(password,10);

    // now create user and fill all field
    await User.create({
        fullname,
        email,
        phoneNumber,
        password:hashedPassword,
        role,
    })
    return res.status(201).json({
        message:"account craeted succesfully",
        success:true,
    })
    }
    catch(error){
        console.log(error)
    }
}





// for login user 

export const login = async (req,res)=>{
    try{
        const {email,password,role}= req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"something is missing",
                success:false,
            })
        };
        let user = await User.findOne({email})
        // checking user exits or not 
        if(!user){
            return res.status(400).json({
                message:"user does not exits",
                message:"Incorrect email",
                success:false,
            })
        }
        //checking password match or not
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"please enter the coorect password",
                success: false,
            })
        };

        //check for the role 

        if(role != user.role){
            return res.status(400).json({
                message:"account does not exits for current role",
                success: false,
            })
        };

        //now generate toke 
        const tokenData= {
            userId:user._id
        }

        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        

        //modify user
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        //store the token in cookies
        //cookie ke ander token ka name and token 

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly: true,sameSite:'strict'}).json({
            message:`welcome back ${user.fullname}`,
            user,
            success:true
        })

    }catch(error){
        console.log(error)
    }
}

//logout 

export const logout= async (req,res)=>{
    try{

        //make token empty that mean expire
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logout successfully",
            success: true,
        })
    }catch(error){
        console.log(error)
    }
}

// update profile

export const updateProfile = async(req,res)=>{
    try{
        const {fullname, email,phoneNumber,bio,skills}= req.body;
        //extract file
        const file= req.file;

        //setup the file by cloudinary

        //extract skills in array formet from string kyoki skills string me aayega
        let skillsArray;
        if(skills){
            skillsArray = skills.spilt(",");
        }
        const userId = req.id; // form middleware authentication
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"user not found",
                success:false,
            })
        }

            // updating the profile of the user data
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber= phoneNumber;
        if(bio) user.profile.bio= bio;
        if(skills) user.profile.skills= skillsArray
            
        
        //update resume here later

        //after update save the data
        await user.save();
        user= {
            _id:user._id,
            fullname :user.fullname,
            email: user.email,
            phoneNumber : user.phoneNumber,
            role:user.role,
            profile:user.profile

        }

        return res.status(200).json({
            message:"profile updated succfully",
            user,
            success: true,
        })

    }catch(error){
        console.log(error);
    }
}