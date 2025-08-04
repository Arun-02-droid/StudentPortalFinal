// index.js (ES Module version)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import StudentModel from "./models/students.js";
import TimetableModel from "./models/timetable.js";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://Arun:Arun2002@cluster0.xuaiahm.mongodb.net/student-portal?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ---------- Student Auth Routes ----------

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { registerno, password, name, email, role } = req.body;

    // Validate required fields
    if (!registerno || !password || !name || !email) {
      return res.status(400).json({ status: "Error", message: "All fields are required" });
    }

    // Check if student already exists
    const existingStudent = await StudentModel.findOne({ registerno });
    if (existingStudent) {
      return res.status(400).json({ status: "Error", message: "Student already exists" });
    }

    // Create new student
    const student = await StudentModel.create({
      registerno,
      password,  // Plain text — consider hashing before production.
      name,
      email,
      role: role || "student"
    });

    return res.status(201).json({ status: "Success", student });

  } catch (error) {
    console.error("Registration Error:", error);

    // Handle MongoDB unique constraint errors
    if (error.code === 11000) {
      return res.status(400).json({
        status: "Error",
        message: "Duplicate entry: registerno or email already exists"
      });
    }

    return res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});


// Login Route for Students
app.post("/login", async (req, res) => {
  const { registerno, password } = req.body;

  try {
    const student = await StudentModel.findOne({ registerno, role: "student" });
    if (!student) {
      return res.json({ status: "Error", message: "No student found" });
    }

    if (password === student.password) {
      res.json({
        status: "Success",
        user: {
          registerno: student.registerno,
          name: student.name,
          email: student.email,
          role: student.role
        }
      });
    } else {
      res.json({ status: "Error", message: "Password is Incorrect" });
    }
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
});

// Admin Login Route
app.post("/admin-login", async (req, res) => {
  const { registerno, password } = req.body;

  try {
    console.log("Admin login attempt with registerno:", registerno);

    if (!registerno || !password) {
      console.log("Registerno or password is missing");
      return res.status(400).json({ status: "Error", message: "Registerno and password are required" });
    }

    const admin = await StudentModel.findOne({ registerno, role: "admin" });
    if (!admin) {
      console.log("No admin found for registerno:", registerno);
      return res.json({ status: "Error", message: "Admin not found" });
    }

    if (password === admin.password) {
      res.json({
        status: "Success",
        user: {
          registerno: admin.registerno,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });
      console.log(admin.role)
    } else {
      console.log("Entered", password, "but expected:", admin.password);
      console.log("Incorrect password for registerno:", registerno);
      res.json({ status: "Error", message: "Password is Incorrect" });
    }
  } catch (err) {
    console.error("Error during admin login:", err);
    res.status(500).json({ status: "Error", message: err.message });
  }
});

// ---------- Timetable Routes ----------
app.get("/timetable", async (req, res) => {
  try {
    const entries = await TimetableModel.find();
    const timetableData = {};
    entries.forEach(entry => {
      if (!timetableData[entry.day]) timetableData[entry.day] = {};
      timetableData[entry.day][entry.time] = entry.content;
    });
    res.json(timetableData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/timetable", async (req, res) => {
  const { day, time, content } = req.body;
  try {
    await TimetableModel.findOneAndUpdate(
      { day, time },
      { content },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: "Cell saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/timetable", async (req, res) => {
  const { day, time } = req.body;
  try {
    await TimetableModel.findOneAndDelete({ day, time });
    res.status(200).json({ message: "Cell deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/timetable/update-time", async (req, res) => {
  const { oldTime, newTime } = req.body;
  try {
    const entries = await TimetableModel.find({ time: oldTime });
    for (const entry of entries) {
      entry.time = newTime;
      await entry.save();
    }
    res.status(200).json({ message: "Time slot updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- Server Listen ----------
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
