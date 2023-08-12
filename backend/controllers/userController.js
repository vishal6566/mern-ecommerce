const ErrorHandler = require("../utils/errorhandler");
const catchAsyncHandler = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendToken=require("../utils/jwtToken")
//Register a User

exports.registerUser = catchAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepic",
    },
  });

  sendToken(user,201,res)
});

//login user

exports.loginUser=catchAsyncHandler(async(req,res,next)=>{
  const {email,password}=req.body;

  if(!email || !password){
    next(new ErrorHandler("Please Enter email & password",400));

  }

  //checking if user has given email & password both
  const user=await User.findOne({email}).select("+password");

  if(!user){
    next(new ErrorHandler("Invalid email or password",401))
  }

  const isPasswordMatched=await user.comparePassword(password);

  if(!isPasswordMatched){
   return next(new ErrorHandler("Invalid email or password",401))
  }

  sendToken(user,200,res)

})


//logout user

exports.logout=catchAsyncHandler(async(req,res,next)=>{

  res.cookie("token",null,{
    httpOnly:true,
    expires:new Date(Date.now())
  })

  res.status(200).json({
    success:true,
    message:"Logged Out Successfully"
  })
})
