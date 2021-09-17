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
  name: {
    type: String,
    validate: {
      isAsync: true,
      validator: async function (v) {
        setTimeout(() => {
          const result = (await v) && v >= 3;
          return result;
        }, 3000);
      },
      message: `A course should have at least 1 tag.`,
    },
  },
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", CourseSchema);
const createCourse = async () => {
  const course = new Course({
    name: "An",
    title: "express learning2",
    courseType: "expert leve2",
    welcome: false,
    price: 25,
  });

  const result = await course.save();
  console.log("res-->", result);
};

const getCourses = async () => {
  const course1 = await Course.find({
    name: "React Course",
  }).sort({ name: 1 });
  console.log("Get course:", course1.length);
  // course1.map((value, index)=>{
  //   console.log(value.name, value.author);
  // })
};

// getCourses();

createCourse();

app.listen(3000, () => {
  console.log("listening2");
});
