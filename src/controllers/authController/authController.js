import AppError from "../../middleware/appError.js";
import signupvalidation from "../../middleware/joiValidation/signValidation.js";
import User from "../../models/userSchema/userSchema.js";
import { comparepassword, hashPassword } from "../../utils/bcrypt.js";
import { generateAccessToken, generateRefreshToken, generateToken } from "../../utils/jwt.js";
export const signup=async (req,res)=>{
    
        const {name,email,password,role}=req.body;
        // console.log(req.body)
        const existuser=await User.findOne({email})
        if(existuser)
            {
                // return res.status(400).json({success:false,message:`user laready exist`})
                throw new AppError(`user aready exist`,400)
            }
        const validateuser=await signupvalidation.validateAsync({
    name,email,password
    })
    const hashedPassword=await hashPassword(password)
    const newUser=new User({
        name:validateuser.name,
        email:validateuser.email,
        password:hashedPassword,
        role:role || "user"

    })
    await newUser.save()
    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        data: newUser,
      });
    }
    

export const login=async(req,res)=>{
    
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user)
            {
                throw new AppError(`no user found ,please create an account`,404)
            }
                
        if(user.isBlocked)  throw new AppError(`sorry user is temporarly blocked`,400)
        const validateuser=await comparepassword(password,user.password)
        if(!validateuser) throw new AppError(`inncorrect username/password `,400)
        // const accessToken = generateAccessToken(user);
        // const refreshToken = generateRefreshToken(user);
        
        const token=generateToken(user.id);
       
        if(user.role=='admin'){

            res
            // .cookie('accessToken', accessToken, { httpOnly: true, secure: false, maxAge: 3 * 24 * 60 * 60 * 1000, path: '/' })   //res.cookie(name, value, options(expiration, security))
            // .cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .status(200).json({
                status: true,
                message: 'admin logged in successfull',
                user: {
                  id: user._id,
                  email: user.email,
                  role:user.role
                },token
              }
            )
        }else{
            res
            // .cookie('accessToken', accessToken, { httpOnly: true, secure: false, maxAge: 3 * 24 * 60 * 60 * 1000, path: '/' })   //res.cookie(name, value, options(expiration, security))
            // .cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .status(200).json({
                status: true,
                message: 'user logged in successfull',
                user: {
                  id: user._id,
                  email: user.email,
                  name: user.name,
                  role:user.role
                },token
              }
            )
        }
    
}
export const logout=async(req,res)=>{
    try{
        // console.log(`user logout`)
        res.cookie('token',null,{expires:new Date(Date.now()),httpOnly:true})
        res.status(200).json({success:true,message:'user logout successfully'})
    }
    catch(error){
        return res.status(500).json({success:false,message:`internal server error ${error.message}`})
    }
}

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
  
    if(!refreshToken){
        throw new AppError("Refresh token missing",401);
   }
   const decoded=verifyToken(refreshToken,process.env.JWT_REFRESH_SECRET);
   if(!decoded){
    throw new AppError("Invalid or expired refresh token", 403)
}
const user=await User.findById(decoded.id)
    
if(!user){
    throw new AppError("User not found",404)
}
const newAccessToken=generateAccessToken(user)
    
   
    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 15 * 60 * 1000,
      })
      .status(200)
      .json({
        status: STATUS.SUCCESS,
        message: "Access token refereshed",
      });
  };


//   export const refreshAccessTokenService=async(refreshToken)=>{

//     //refresh token exists
//     if(!refreshToken){
//          throw new CustomError("Refresh token missing",401)
//     }
//     //verify refresh token
//     const decoded=verifyToken(refreshToken,process.env.JWT_REFRESH_SECRET)
//     console.log(decoded,"decoded data.......")
//     if(!decoded){
//         throw new CustomError("Invalid or expired refresh token", 403)
//     }
//     const user=await User.findById(decoded.id)
    
//     if(!user){
//         throw new CustomError("User not found",404)
//     }
//     const newAccessToken=generateAccessToken(user)
//     return {newAccessToken}
//   }