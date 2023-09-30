const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncHandler = require("../middlewares/catchAsyncError");
const Product = require("../models/productModel");

//creating new order

exports.newOrder = catchAsyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

//get single order --admin
exports.getSingleOrder = catchAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user orders
exports.myOrders = catchAsyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders --admin
exports.getAllOrders = catchAsyncHandler(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount=0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })
  
    res.status(200).json({
      success: true,
      orders,
      totalAmount
    });
  });


  //update Order Status --admin
  exports.updateOrder = catchAsyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 404));
    }

    if(order.orderStatus==="Delivered"){
      return next(new ErrorHandler("You have already delivered this order",404))
    }
   order.orderItems.forEach(async(o)=>{
    await updateStock(o.product,o.quantity)
   });

   order.orderStatus=req.body.status;
   
   if(req.body.status==="Delivered"){
    order.deliveredAt=Date.now()
   }
  
   await order.save({validateBeforeSave:false})
    res.status(200).json({
      success: true,
   
    });
  });

  //update stock function
  async function updateStock(id,quantity){
const product=await Product.findById(id);
product.stock-=quantity;
await product.save({validateBeforeSave:false})

  }

  //Delete Order --admin
exports.deleteOrder = catchAsyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    message:"Order deleted successfully"
  });
});
