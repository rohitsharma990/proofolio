const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },

    githubUsername: {
      type: String,
      trim: true,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Hash Password Before Saving

userSchema.pre("save", async function () {

  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);

});

//Compare Password

userSchema.methods.comparePassword = async function (enteredPassword) {

  return await bcrypt.compare(
    enteredPassword,
    this.password
  );

};

module.exports = mongoose.model("User", userSchema);