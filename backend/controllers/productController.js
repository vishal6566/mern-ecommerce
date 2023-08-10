const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncHandler=require("../middlewares/catchAsyncError")
//Create Product  --Admin
exports.createProduct =catchAsyncHandler(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}) 

//get all product
exports.getAllProducts =catchAsyncHandler(( async (req, res,next) => {
    const products = await Product.find()
    res.status(200).json({
        Success: true,
        Products: products
    })
}
))
//update product  --admin

exports.updateProduct =catchAsyncHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
}) 

//get product details

exports.getProductDetails =catchAsyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
}
) 
//Delete Product --Admin

exports.deleteProduct =catchAsyncHandler(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }



    await res.status(200).json({
        success: true,
        message: "Product deleted successfully."
    })
}) 