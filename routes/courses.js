const express = require("express");
const router = express.Router();


const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
  ];
router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((value) => value.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("not available");
  } else {
    res.send(course);
  }
});

router.post("/", (req, res) => {
  const { error } = validateError(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(newCourse);
  res.send(newCourse);
});

router.put("/:id", (req, res) => {
  const course = courses.find((value) => value.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("not available");
    return;
  }

  const { error } = validateError(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find((value) => value.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("not available");
    return;
  }

  const removeItem = courses.indexOf(course);
  courses.splice(removeItem, 1);
  res.send(courses);
});

const validateError = (course) => {
  const schema = {
    name: Joi.string().min(5).required(),
  };
  return Joi.validate(course, schema);
};

module.exports = router;
