const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  walmartRegister,
  getUserProfile,
  updateUserProfile,
  getUserById,
  uploadProfile,
  VerficationStatus,
  userHistory,
  getHistory,
  userStatus,
  sendOtp,
  verifyOtp,
  getVerificationStatus,
  getReward,
  Match,
  getLocation,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware.js");

router.route("/registration").post(registerUser);
router.route("/login").post(authUser);
router.post("/walmart-register", walmartRegister);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post("/upload-profile", protect, uploadProfile);

router.post("/verify-status", protect, VerficationStatus);
router.get("/get-verification", protect, getVerificationStatus);

router.post("/upload-status", protect, userStatus);
router.post("/user-history", protect, userHistory);
router.get("/get-history", protect, getHistory);

router.post("/send-otp", protect, sendOtp);
router.post("/verify-otp", protect, verifyOtp);
router.get("/get-reward", protect, getReward);


router.post("/match", Match);
router.get("/get-location", getLocation);

router
  .route("/:id")
  //   .delete(protect, deleteUser)
  .get(getUserById);
//   .put(protect, updateUser)



module.exports = router;


