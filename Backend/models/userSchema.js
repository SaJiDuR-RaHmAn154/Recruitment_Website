import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide your name"],
        minLength: [3, "Name must contain at least 3 characters"],
        maxLength: [30, "Exceeded 30 characters limit"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        reuqired: [true, "Please provide your password"],
        minLength: [5, "Password must contain at least 5 characters"],
        maxLength: [32, "Exceeded 32 characters limit"],
        select: false
    },
    role: {
        type: String,
        required: [true, "Please provide your role"],
        enum: ["Job Seeker", "Employer"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encryption (Password hashing)
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);// New password will be hashed
});

// Comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generating jwt token for authorization
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);


