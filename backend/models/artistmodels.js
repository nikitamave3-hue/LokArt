const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema(
  {
    name: {
  type: String,
  required: true,
  trim: true,
  maxlength: 100,
   },

    category: {
  type: String,
  required: true,
  trim: true,
   },

  skills: [
  {
    type: String,
    trim: true,
  },
],
   business: {
  type: String,
  trim: true,
  default: "",
    },

   experience: {
  type: Number,
  default: 0,
  min: 0,
    },

   whatsapp: {
  type: String,
  trim: true,
  match: [/^[0-9]{10}$/, "Invalid WhatsApp Number"],
    },
   
    location: {
  type: String,
  required: true,
  trim: true,
    },

    description: {
  type: String,
  trim: true,
  maxlength: 1000,
  default: "",
    },

   phone: {
  type: String,
  required: true,
  trim: true,
  match: [/^[0-9]{10}$/, "Invalid Phone Number"],
    },

   image: {
  type: String,
  trim: true,
  default: "",
    },
    
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
  unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Artist",
  ArtistSchema
);