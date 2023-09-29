const ErrorHandler = require("../utils/errorhandler");
const catchAsyncHandler = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendEmail=require("../utils/sendEmail");

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

  sendToken(user, 201, res);
});

//login user

exports.loginUser = catchAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new ErrorHandler("Please Enter email & password", 400));
  }

  //checking if user has given email & password both
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//logout user

exports.logout = catchAsyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

//function for forget password

exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //Get resetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email than please ignore it`;
  try {
    await sendEmail({
      email:user.email,
      subject:`Ecommerce Password Recovery`,
      message
    });
    response.status(200).json({
      success: true,
      message: `email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//get user details

exports.getUserDetails=catchAsyncHandler(async(req, res, next)=>{
  const user= await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user
  })
})

//update user password

exports.updateUserPassword=catchAsyncHandler(async(req, res, next)=>{
  const user= await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
if(req.body.newPassword !==req.body.confirmPassword){
  return next(new ErrorHandler("Password does not match", 400));
}
user.password=req.body.newPassword;

await user.save()
 
sendToken(user,200,res)
})

//update user profile

exports.updateUserProfile=catchAsyncHandler(async(req, res, next)=>{

   const newUserdata={
    name:req.body.name,
    email:req.body.email,
   }

   //we will add cloudinary later
   const user= await User.findByIdAndUpdate(req.user.id,newUserdata,{
    new:true,
    runValidators:true,
    useFindAndModify:false
   })

 
res.status(200).json({
  success:true
})
})

//get all users  --admin
exports.getAllUsers=catchAsyncHandler(async(req, res, next)=>{

const users=await User.find();
res.status(200).json({
  success:true,
  users
})
})

//get single user  --admin
exports.getSingleUser=catchAsyncHandler(async(req, res, next)=>{

  const user=await User.findById(req.params.id);

  if(!user){
    return next( new ErrorHandler(`User does not exits with ${req.params.id}`,400));
  }
  res.status(200).json({
    success:true,
    user
  })
  })

  //update user role --admin

exports.updateUserRole=catchAsyncHandler(async(req, res, next)=>{

  const newUserdata={
   name:req.body.name,
   email:req.body.email,
   role:req.body.role
  }

  
  const user= await User.findByIdAndUpdate(req.params.id,newUserdata,{
   new:true,
   runValidators:true,
   useFindAndModify:false
  })
  if(!user){
    return next(new ErrorHandler(`User does not exits with Id:${req.params.id}`,400));
  }

res.status(200).json({
 success:true
})
})


//delete user profile  --admin

exports.deleteUser=catchAsyncHandler(async(req, res, next)=>{

  // we will remove cloudinary later
  
  const user =await User.findByIdAndDelete(req.params.id);
  if(!user){
    return next(new ErrorHandler(`User does not exits with Id:${req.params.id}`,400));
  }


res.status(200).json({
 success:true,
 message: "User deleted successfully.",
})
})
