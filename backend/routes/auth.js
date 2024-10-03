import express from "express";
import {
  forgotPassword,
  getAllUser,
  getDeleteUser,
  getUpdatePassword,
  getUpdateProfile,
  getUpdateUser,
  getUserDetials,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controllers/authController.js"; // Ensure the path and filename are correct
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/auth.js";

const router = express.Router(); // Correctly initialize the express Router

// Define the /register route that handles POST requests
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, getUpdatePassword);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/me/update").put(isAuthenticatedUser, getUpdateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetials)
  .put(isAuthenticatedUser, authorizeRoles("admin"), getUpdateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), getDeleteUser);

// Export the router for use in your main app file
export default router;
