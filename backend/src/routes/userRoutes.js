import express from "express";
<<<<<<< HEAD
import { verifyToken } from "../middleware/authmiddleware.js";
=======
import { verifyToken, authorizeRoles } from "../middleware/authmiddleware.js";
>>>>>>> fa7d4b60bc871122a25387589696ab1194809c05
import { upload } from "../middleware/upload.js";
import {
  updateProfile,
  changePassword,
  deleteAccount,
<<<<<<< HEAD
  rejectAdmin
=======
  rejectAdmin,
  getAllUsers
>>>>>>> fa7d4b60bc871122a25387589696ab1194809c05
} from "../controllers/userController.js";

const router = express.Router();

router.put(
  "/update-profile",
  verifyToken,
  upload.single("profileImage"),
  updateProfile
);

router.put("/change-password", verifyToken, changePassword);

router.delete("/delete-account", verifyToken, deleteAccount);

<<<<<<< HEAD
// Reject admin route
router.put("/reject-admin/:id", rejectAdmin);
=======
// Reject admin (only super admin)
router.put(
  "/reject-admin/:id",
  verifyToken,
  authorizeRoles("super_admin"),
  rejectAdmin
);
router.get(
  "/all-users",
  verifyToken,
  authorizeRoles("super_admin"),
  getAllUsers
);
>>>>>>> fa7d4b60bc871122a25387589696ab1194809c05

export default router;