const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    index: true, // ⚡ Production Tip: Query optimization ke liye indexing zaroori hai
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address'], // Clean email regex
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false, // 🔐 Leakage se bachne ke liye query se automatically exclude rahega
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[0-9]{10}$/, 'Please fill a valid 10-digit phone number'] // Strict 10-digit validation
  },
  village: {
  type: String,
  required: [true, "Village is required"],
  trim: true,
},
  role: {
    type: String,
    enum: ['user', 'artist', 'admin'],
    default: 'user',
   // 🛡️ Security Check: Ek baar set hone ke baad role API se update nahi ho sakega
  },
  fcmToken: {
    type: String,
    default: null,
  }
}, { 
  timestamps: true // Automated createdAt aur updatedAt timestamps
});

// 🧼 Hook: Pre-save hook to hash password automatically
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ⚡ Method: Compatible with your login API for password comparison
userSchema.methods.matchPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);