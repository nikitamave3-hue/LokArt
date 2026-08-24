const User = require("../models/usermodels");
const jwt = require("jsonwebtoken");

// =======================
// GENERATE TOKEN
// =======================
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// =======================
// REGISTER USER
// =======================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, village, role } = req.body;
    if (!name || !email || !password || !phone || !village) {
  return res.status(400).json({
    message: "Please fill all required fields",
  });
}

      const cleanEmail = email.toLowerCase().trim();
      const userExists = await User.findOne({
      email: cleanEmail,
});
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email: cleanEmail,
      password, // 🔥 model will hash automatically
      phone,
      village,
      role: role === "artist" ? "artist" : "user",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      village: user.village,
      role: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// LOGIN USER
// =======================
const loginUser = async (req, res) => {
  try {
    console.log("========== LOGIN REQUEST ==========");
    console.log(req.body);

    const { email, password } = req.body;
    if (!email || !password) {
  return res.status(400).json({
    message: "Email and Password are required",
  });
}

const cleanEmail = email.toLowerCase().trim();

  const user = await User.findOne({
  email: cleanEmail,
}).select("+password");  
    console.log("User Found:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Login Success");

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      village: user.village,
      role: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  } // <-- Yahan missing brace fix kar diya hai
};

// =======================
// SAVE FCM TOKEN
// =======================
const saveFcmToken = async (req, res) => {
  try {
    const { fcmToken } = req.body;

    if (!fcmToken) {
      return res.status(400).json({
        message: "FCM token is required",
      });
    }

    await User.findByIdAndUpdate(req.user.id, {
      fcmToken,
    });

    res.json({
      message: "FCM token saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// GET USERS
// =======================
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET PROFILE
// =======================
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserProfile,
  saveFcmToken,
};