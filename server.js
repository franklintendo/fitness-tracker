const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.MONGODB_URI || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI);

// API Routes
// app.get("/api/workouts", (req,res) => {
//     db.Workout.find({})
//     .then(workouts => {
//         res.json(workouts);
//     })
//     .catch(err => {
//         res.json(err);
//     });
// });

app.get("/api/workouts/range", (req,res) => {
    db.Workout.find({})
    .then(workouts => {
        res.json(workouts);
    })
    .catch(err => {
        res.json(err);
    });
});

app.get("/api/workouts/:id", (req,res) => {
    db.Workout.findOne({_id: req.params.id}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
});



app.post("/api/workouts/", (req,res) => {

    db.Workout.create({})
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.json(err);
    });

    
});

app.put("/api/workouts/:id", (req,res) => {
    db.Workout.updateOne({ _id: req.params.id}, {$push: {exercises: req.body}})
    .then((data) => {
        res.json(data);
        console.log("Successfully updated!")
    })
    .catch(err => {
        res.send(err);
        console.log(err);
    });
});

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