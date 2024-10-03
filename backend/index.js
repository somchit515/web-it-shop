import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config({ path: "backend/config/config.env" });
import { connectDatabase } from "./config/dbConnect.js";

import errorsMiddleware from "./middlewares/errors.js";




//handle Uncaught exception
process.on("uncaughtException",(err)=> {
  console.log(`ERROR: ${err}`);
  console.log("Shutting Dowm servre Due toUncaught exception");
  process.exit(1)})

// Connecting to database
connectDatabase();

app.use(express.json());
app.use(cookieParser());

// Import all routes
import productRoutes from "./routes/products.js";

import authRoutes from "./routes/auth.js"

import orderRoutes from "./routes/order.js";

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);


//using error middleware
app.use (errorsMiddleware)




const Server = app.listen(process.env.PORT, () => {
    console.log(
      `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode. `
    );
  });

// Handle Promise Rejection 

process.on('unhandledRejection',(err)=> {
  console.log(`ERROR: ${err}`);
  console.log("Shutting Dowm servre Due to Unhandled promise Rejection");
  Server.close (() => {
    process.exit(1)
  })
})