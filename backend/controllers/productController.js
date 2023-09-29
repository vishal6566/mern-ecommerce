const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncHandler = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middlewares/catchAsyncError");
//Create Product  --Admin
exports.createProduct = catchAsyncHandler(async (req, res, next) => {
  req.body.user=req.user.id
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all product
exports.getAllProducts = catchAsyncHandler(async (req, res) => {
  const resultPerPage = 5;
const productCount= await Product.countDocuments()
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .serach()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    Success: true,
    Products: products,
    productCount
  });
});
//update product  --admin

exports.updateProduct = catchAsyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//get product details

exports.getProductDetails = catchAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
//Delete Product --Admin

exports.deleteProduct = catchAsyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
  });
});


//Create new review or Update the review
exports.createProductReview = catchAsyncError(async(req,res,next)=>{
  const {rating,comment,productId}=req.body;
  const review={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }
const product= await Product.findById(productId);

 const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())

if(isReviewed){
product.reviews.forEach(rev=>{
  if(rev=>rev.user.toString()===req.user._id.toString())
    (rev.rating=rating),
   ( rev.comment=comment);
  
 
})


 }else{
  product.reviews.push(review);
  product.numOfReviews=product.reviews.length
 }
 let avg=0
product.reviews.forEach(rev=>{
  avg+=rev.rating
 })
 product.ratings=avg/product.reviews.length;
await product.save({validateBeforeSave: false});
res.status(200).json({
  success:true
})

})