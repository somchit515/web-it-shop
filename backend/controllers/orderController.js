import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"; // Ensure correct path and extension
import Order from "../models/orders.js";
import Product from "../models/product.js"; // Correctly reference the Order model
import user from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js"; // Make sure this file exists and is correctly implemented

// Create new Order =>   /api/v1/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    totalAmount,
    shippingAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  // Create the order
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    totalAmount,
    shippingAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get current user orders =>   /api/v1/me/orders
export const myOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }); // Find orders by user

  if (!orders || orders.length === 0) {
    return next(new ErrorHandler("No orders found for this user", 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get Order Details =>   /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); // Correct the typo here

  if (!order) {
    return next(new ErrorHandler("No Order Found With This ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get All  orders =>   /api/v1/admin/orders
export const allOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find(); // Find orders by user

  if (!orders || orders.length === 0) {
    return next(new ErrorHandler("No orders found for this user", 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get Update  orders - Admin =>   /api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);



  if (!order) {
    return next(new ErrorHandler("No Order Found With This ID", 404));
  }

  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already Delivered this order", 400));
  };


  // Update Product stock
  order?.orderItems?.forEach(async(item) =>{
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
        return next(new ErrorHandler("No Product Found With This ID", 404));
      };

    product.stock =product.stock - quantity;
    await product.save({ validateBeforeSave: false});
  });

  order.orderStatus =req.body.status;
  order.deliveredAt = Date.now();


  res.status(200).json({
    success: true,
   
  });
});



// Delete Order  =>   /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id); 
  
    if (!order) {
      return next(new ErrorHandler("No Order Found With This ID", 404));
    }


    await order.deleteOne();
  
    res.status(200).json({
      success: true,
     });
  });