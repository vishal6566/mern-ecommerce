const ErrorHandler = require("../utils/errorhandler");
const catchAsyncHandler = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");

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

  res.status(201).json({
    success:true,
    user,
  })
});
