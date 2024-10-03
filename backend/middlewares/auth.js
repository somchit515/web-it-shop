import jwt from "jsonwebtoken";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import user from "../models/user.js";

// Check if the user is authenticated
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // Get token from cookies or Authorization header
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  // Optionally store the decoded user info (like userId) in req.user for future use
  req.user = await user.findById(decoded.id);

  next();
});


//AuthorizeRoles 
export const authorizeRoles = (...roles) =>{
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed  access this resource`, 403));

        }
        next();
    };
    };
