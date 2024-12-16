import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js"
import { sendToken } from "../utils/jwtToken.js"

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !role || !password) {
        return next(new ErrorHandler("Please fill the form properly"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email already used"));
    }
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password
    });
    sendToken(user, 200, res, "User Registered Successfully");
});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !role || !password) {
        return next(new ErrorHandler("Please provide email,password and role", 400));
    }
    const user = await User.findOne({ email }).select("+password");// password will remain hidden
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    if (user.role !== role) {
        return next(new ErrorHandler("User with this role not found!", 400));
    }
    sendToken(user, 200, res, "User Logged In Successfully");
});

// Logout
export const logout = catchAsyncError(async (req, res, next) => {
    // Deleting cookies
    res.status(200).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User Logged Out Successfully!"
    });
});

export const getuser = catchAsyncError((req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success:true,
        user
    })
})

