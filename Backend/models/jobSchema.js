import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide jobTitle"],
        minLength: [3, "Job title must contain at least 3 characters"],
        maxLength: [50, "Job title cannot exceed 50 characters"]
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: [true, "Job category is required"]
    },
    country: {
        type: String,
        required: [true, "Job country is required"]
    },
    city: {
        type: String,
        required: [true, "Job city is required"]
    },
    location: {
        type: String,
        required: [true, "Please provide exact location is required"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Fixed salary must contain at least 4 digits"],
        maxLength: [8, "Fixed salary cannot exceed 8 digits"]
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "SalaryFrom must contain at least 4 digits"],
        maxLength: [8, "SalaryFrom cannot exceed 8 digits"]
    },
    salaryTo: {
        type: Number,
        minLength: [4, "SalaryTo must contain at least 4 digits"],
        maxLength: [8, "SalaryTo cannot exceed 8 digits"]
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now()
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});

export const Job = mongoose.model("Job",jobSchema);