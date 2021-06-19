const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
];

app.get("/", (req, res) => {
  res.send("rest api");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((value) => value.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("not available");
  } else {
    res.send(course);
  }
});

app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string().length(5).required(),
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send("must present && length should be maximum 4");
    return;
  }

  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(newCourse);
  res.send(newCourse);
});

const port = process.env.PORT || 3000;
console.log("port", port);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
