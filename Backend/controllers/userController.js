const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const User = require("../models/userModel.js");
//const sharp = require("sharp");
//const cloudinary = require("../helper/imageUpload");
const path = require("path");
const multer = require("multer");
const otpGenerator = require("otp-generator");

//Login User

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      success: false,
      msg: "Unauthorized user",
    });
  }
});

//  Register a new user

const registerUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  const { name, email, phoneNumber, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      msg: "Entered email id already registered with us. Login to continue",
    });
  }

  const user = new User({
    name,
    email,
    phoneNumber,
    password,
    userHistory: [],
  });

  // save user object
  user.save(function (err, user) {
    if (err) return next(err);
    res.status(201).json({
      success: true,
      msg: "Account Created Sucessfully. Please log in.",
    });
  });
});

//  walmart
const walmartRegister = async (req, res) => {
  try {
    const userDetails = require("../WalMartUser.json");
    const { email, password } = userDetails;

    const user = await User.findOne({ email });
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        success: false,
        msg: "Unauthorized user",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//   Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//  Update user profile

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (req.body.oldPassword) {
      const isPasswordValid = await user.matchPassword(req.body.oldPassword);
      if (!isPasswordValid) {
        res.status(401);
        throw new Error("Invalid password");
      }
    }

    user.name = req.body.name || user.name;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.avatar = req.body.avatar || user.avatar;
    if (req.body.newPassword) {
      user.password = req.body.newPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//   Get user by ID
// access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Upload Profile

const storages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, "avatar-" + uniqueSuffix + fileExtension);
  },
});


const uploads = multer({ storage: storages });

const uploadProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    uploads.single("photo");

    if (req.file) {
      user.avatar = req.file.filename;
      await user.save();
      res.json({ message: "Profile image uploaded successfully" });
    } else {
      res.status(400).json({ error: "No file uploaded" });
    }
  }
};




// app.post('/uploads', uploads(''), (req, res) => {
//   // console.log('file', req.files);
//   // console.log('body', req.body);
//   res.status(200).json({
//     message: 'success!',
//   });
// });

// app.listen(process.env.PORT || 3000, () => {
//   console.log(
//     `server is running at http://localhost:${process.env.PORT || 3000}`
//   );
// });

//Video Verification Status

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const VerficationStatus = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    // upload.fields([{ name: "video" }, { name: "aadhar" }]);
    // const { video, aadhar } = req.files;
    upload.fields([{ name: req.body.photo }]);
    const  aadhar = req.files;
    const profile = req.user.avatar;

    if (!video || !aadhar) {
      return res.status(400).json({
        error: "Video and Aadhar files are required for verification",
      });
    }
    user.verificationStatus = true;
    await user.save();

    res.json({ message: "Identity verified successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

// const getVerificationStatus = async (req, res) => {
//   console.log("first")
//   const user = await User.findById(req.user._id);
//   console.log("2nd")

//   if (user) {
//     const Verification = user ? user.verificationStatus : false;
//     res.json({
//       Verification
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// };
const getVerificationStatus = async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.user._id);
  if (user) {
    //const Verification = user ? user.verificationStatus : fals
    const Verification = user.verificationStatus || false;
    res.json({
      Verification,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

//3.Home
// user - Destination and start point
//userStatus
const userStatus = async (req, res) => {
  const { destinationpt, startingpt } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.destinationpt = destinationpt || user.destinationpt;
      user.startingpt = startingpt || user.startingpt;

      await user.save();
      drivers.forEach((driver) => {
        driver.location = [user.startingpt, user.destinationpt];
        res.json({
          drivers: driver.location,
          message: "User status updated successfully",
        });
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ error: "Error updating user status" });
  }
};
//User History
const userHistory = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    startingpt = user.startingpt;
    destinationpt = user.destinationpt;
    const history = await User.findByIdAndUpdate(user._id, {
      $push: {
        userHistory: {
          startingpt,
          destinationpt,
          timestamp: new Date(),
        },
      },
    });

    res.json({
      _id: history._id,
      name: history.name,
      email: history.email,
      avatar: history.avatar,
      destinationpt: history.destinationpt,
      startingpt: history.startingpt,
      userHistory: history.userHistory,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

//Get History
const getHistory = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const userHistory = user ? user.userHistory : [];
    res.json(userHistory);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

//otp verification

// Generate and send OTP to the customer
// const sendOtp = async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     const otp = otpGenerator.generate(6, {
//       alphabets: false,
//       specialChars: false,
//     });

//     user.phoneNumber = user.phoneNumber;
//     user.otp = otp;

//     await user.save();
//     res.json({
//       _id: user._id,
//       phoneNumber: user.phoneNumber,
//       otp: user.otp,
//       message: "OTP sent successfully",
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// };

// //Verify OTP

// const verifyOtp = async (req, res) => {
//   const userId = req.user._id;
//   const providedOtp = req.body.otp;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (user.otp === providedOtp) {
//       user.otp = "";
//       await user.save();
//       //res.redirect("/reward");
//       res.json({ message: "OTP verified successfully" });
//     } else {
//       res.status(400).json({ error: "Invalid OTP" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to verify OTP" });
//   }
// };



// //otp verification

// // Generate and send OTP to the customer
// const sendOtp = async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     const otp = otpGenerator.generate(6, {
//       alphabets: false,
//       specialChars: false,
//     });

//     user.phoneNumber = user.phoneNumber;
//     user.otp = otp;

//     await user.save();
//     res.json({
//       _id: user._id,
//       phoneNumber: user.phoneNumber,
//       otp: user.otp,
//       message: "OTP sent successfully",
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// };

//Verify OTP


//reward
const getReward = async (req, res) => {
  const userId = req.user._id;
  console.log("userId:", userId);
  try {
    const user = await User.findById(userId);
    console.log("user:", user);
    if (user) {
      const rewardPoints = user.rewardPoints || 0;
      res.json({
        message: "Congratulations! You unlocked a reward!",
        rewardPoints: rewardPoints,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add reward points" });
  }
};

const sendOtp = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const otp = otpGenerator.generate(6, {
      alphabets: false,
      specialChars: false,
    });

    user.phoneNumber = user.phoneNumber;
    user.otp = otp;

    await user.save();
    res.json({
      _id: user._id,
      phoneNumber: user.phoneNumber,
      otp: user.otp,
      message: "OTP sent successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};


// verify otp

const verifyOtp = async (req, res) => {
  const userId = req.user._id;
  const providedOtp = req.body.otp;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.otp === providedOtp) {
      user.otp = "";
      user.rewardPoints += 200;
      await user.save();
      //res.redirect("/reward");
      startingpt = user.startingpt;
      destinationpt = user.destinationpt;
      const history = await User.findByIdAndUpdate(user._id, {
        $push: {
          userHistory: {
            startingpt,
            destinationpt,
            timestamp: new Date(),
          },
        },
      });
      res.json({
        _id: history._id,
        name: history.name,
        email: history.email,
        avatar: history.avatar,
        destinationpt: history.destinationpt,
        startingpt: history.startingpt,
        userHistory: history.userHistory,
        message: "OTP verified successfully",
      });
      // res.json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};

// ml

const riders = [
  { id: "rider_1", location: [10, 5], preferences: "some_preference" },
  { id: "rider_2", location: [11, 6], preferences: "other_preference" },
  { id: "rider_3", location: [12, 5], preferences: "some_preference" },
  { id: "rider_4", location: [19, 8], preferences: "other_preference" },
];

//drivesr == user
const drivers = [
  { id: "driver_101", location: [12, 6], rating: 4.5 },
  // { id: "driver_102", location: [14, 7], rating: 4.8 },
];

// Create dictionaries to map rider and driver IDs to indices
const riderIdToIndex = {};
riders.forEach((rider, idx) => {
  riderIdToIndex[rider.id] = idx;
});

const driverIdToIndex = {};
drivers.forEach((driver, idx) => {
  driverIdToIndex[driver.id] = idx;
});

// Create the cost matrix using the indices
const numRiders = riders.length;
const numDrivers = drivers.length;
const costMatrix = Array.from({ length: numRiders }, () =>
  Array(numDrivers).fill(0)
);

// Create a bipartite graph (as an adjacency matrix)
const graph = Array.from({ length: numRiders }, () =>
  Array(numDrivers).fill(null)
);
riders.forEach((rider, riderIdx) => {
  drivers.forEach((driver, driverIdx) => {
    const distance = Math.sqrt(
      Math.pow(rider.location[0] - driver.location[0], 2) +
        Math.pow(rider.location[1] - driver.location[1], 2)
    );
    graph[riderIdx][driverIdx] = distance;
  });
});

function hungarianAlgorithm(costMatrix) {
  const numRows = costMatrix.length;
  const numCols = costMatrix[0].length;

  const assignments = [];
  for (let riderIdx = 0; riderIdx < numRows; riderIdx++) {
    for (let driverIdx = 0; driverIdx < numCols; driverIdx++) {
      if (costMatrix[riderIdx][driverIdx] === 0) {
        assignments.push([riderIdx, driverIdx]);
        break;
      }
    }
  }

  return assignments;
}

// Solve the assignment problem using the implemented Hungarian algor
const assignments = hungarianAlgorithm(costMatrix);

// Print the matched pairs
assignments.forEach((assignmentPair) => {
  const [riderIdx, driverIdx] = assignmentPair;
  const matchedRider = riders[riderIdx];
  const matchedDriver = drivers[driverIdx];
  //return matchedRider.id;
  console.log(
    `Match: Rider ${matchedRider.id} with Driver ${matchedDriver.id}`
  );
});

const Match = async (req, res) => {
  // Solve the assignment problem using the implemented Hungarian alg
  const assignments = hungarianAlgorithm(costMatrix);

  const matchedPairs = assignments.map((assignmentPair) => {
    const [riderIdx, driverIdx] = assignmentPair;
    const matchedRider = riders[riderIdx];
    const matchedDriver = drivers[driverIdx];
    return {
      rider: matchedRider,
      driver: matchedDriver,
    };
  });

  res.json(matchedPairs); // Send the matched pairs as JSON response
};

const getLocation = async (req, res) => {
  const riderLocations = riders.map((rider) => rider.location);
  const driverLocations = drivers.map((driver) => driver.location);

  res.json({ riderLocations, driverLocations });
};

module.exports = {
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
  getReward,
  getVerificationStatus,
  Match,
  getLocation
};
