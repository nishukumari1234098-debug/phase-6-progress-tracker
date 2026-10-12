import mongoose from "mongoose";

const progressTrackerSchema = new mongoose.Schema(
    {
        studentName:{
            type: String,
            required: true,
            trim: true
        },
        courseName:{
            type: String,
            required: true
        },
        percentage:{
            type: Number,
            required: true,
            min: [0, "Percentage cannot be negative"],
            max: [100, "percentage should maximum 100"]
        },
        lastUpadated:{
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

const Progress = mongoose.model("Progress", progressTrackerSchema)

export default Progress