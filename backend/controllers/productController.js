const Product=require("../models/productModel")

//Create Product  --Admin
 exports.createProduct=async(req,res,next)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
    }

//get all product
exports.getAllProducts=async(req,res)=>{
    const products=await Product.find()
    res.status(200).json({
        Success:true,
        Products:products
    })
}

//update product  --admin

exports.updateProduct=async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
       return res.status(500).json({
            success:false,
            message:"Product not found."
        })
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
}

//Delete Product --Admin

 exports.deleteProduct=async(req,res,next)=>{
  const product=await Product.findByIdAndDelete(req.params.id)
console.log(product)
  if(!product){
    return res.status(500).json({
        success:false,
        message:"Product not found."
    })
}



await res.status(200).json({
success:true,
message:"Product deleted successfully."
 })
 }