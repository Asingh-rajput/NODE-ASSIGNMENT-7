// const express = require('express')
// const app = express()
// const bodyParser = require("body-parser");
// const port = 8080
// app.use(express.urlencoded());

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// // your code goes here

// app.listen(port, () => console.log(`App listening on port ${port}!`))
const express = require("express");
const mongoose=require('mongoose');

const app = express();
const bodyParser = require("body-parser");
let studentRecords = require("./InitialData");
const { response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://root:Ashutosh@cluster0.saa8zzo.mongodb.net/?retryWrites=true&w=majority")
.then(response=>{
  console.log("database connected")
})

app.get("/api/student", (req, res) => {
  res.json(studentRecords);
});

app.get("/api/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = studentRecords.find((s) => s.id === id);
  if (!student) {
    return res.status(404).send("Student record not found");
  }
  res.json(student);
});



app.post("/api/student/:id", (req, res) => {
  const { name, currentClass, division } = req.body;
  if (!name || !currentClass || !division) {
    return res.status(400).send("Incomplete student details");
  }
  const newStudent = { id: nextId, name, currentClass, division };
  studentRecords.push(newStudent);
  nextId++;
  res.json({ id: newStudent.id });
});



app.put("/api/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = studentRecords.findIndex((s) => s.id === id);
  if (studentIndex === -1) {
    return res.status(404).send("Student record not found");
  }
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Invalid update");
  }
  studentRecords[studentIndex].name = name;
  res.send("Student record updated");
});

app.delete("/api/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = studentRecords.findIndex((s) => s.id === id);
  if (studentIndex === -1) {
    return res.status(404).send("Student record not found");
  }
  studentRecords.splice(studentIndex, 1);
  res.send("Student record deleted");
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// module.exports = app;
