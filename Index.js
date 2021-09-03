const express = require("express");

const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("connect"))
  .catch((err) => console.log("error -->", err));

app.get("/", (request, response) => {
  response.send("working");
});

const CourseSchema = new mongoose.Schema({
  tags: Array,
  date: Date,
  // name: { type: String, required: true },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", CourseSchema);
// const createCourse = async () => {
//   const course = new Course({
//     title: "express learning2",
//     courseType: "expert leve2",
//     welcome: false,
//     price: 25
//   });

//   const result = await course.save();
//   console.log("res-->", result);
// };

// const getCourses = async () => {
//   const course = await Course.find({
//     name: "Angular Course",
//   })
//   console.log("Get course:", course.length);
  // course.map((value, index) => {
  //   console.log(value.name, value.author);
  // });
  // log
// };

// getCourses();

// // createCourse();

app.listen(3000, () => {
  console.log("listening");
});
