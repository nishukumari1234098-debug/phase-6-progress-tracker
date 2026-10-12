import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import progressDB from "./config/db.js";
import Progress from "./models/progressModel.js";

dotenv.config()
// Database connection is awaited before starting the server.

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("public"));

app.post("/progress", async (req, res)=>{
    try{
        const {studentName, courseName, percentage} = req.body

        const progressData = await Progress.create({
            studentName,
            courseName,
            percentage
        })

        res.status(201).json({
            success: true,
            data: progressData
        })
    } catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
})

app.get("/progress-tracker", async (req, res)=>{
    try{
        const studentTracker = await Progress.find()

        res.status(200).json({
            success: true,
            count: studentTracker.length,
            data: studentTracker
        })

    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

const PORT = process.env.PORT || 5000

async function startServer() {
    try {
        await progressDB();
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`progress-tracker server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
