const express = require("express");
// const mongojs = require("mongojs");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// API Routes
app.get("/api/workouts", (req,res) => {
    db.Workout.find({})
    .then(workouts => {
        res.json(workouts);
    })
    .catch(err => {
        res.json(err);
    });
});

// app.get("/api/workouts/:id", (req,res) => {
//     db.Workout.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, data) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.json(data);
//         }
//     });
// });

// HTML Routes
app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, './public', 'exercise.html'));
});

app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname, './public', 'stats.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
  });