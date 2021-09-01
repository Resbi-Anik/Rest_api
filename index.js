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

// const CourseSchema = new mongoose.Schema({
//   title: String,
//   courseType: String,
//   welcome: Boolean,
//   price: Number
// });

const CourseSchema = new mongoose.Schema({
  tags: Array,
  date: Date,
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

const getCourses = async () => {
  const course = await Course.find({
    tags: "backend",
  }).sort({ name: 1 });
  // console.log("Get course:", course);
  course.map((value, index)=>{
    console.log(value.name, value.author);
  })
};

getCourses();

// // createCourse();

app.listen(3000, () => {
  console.log("listening");
});
