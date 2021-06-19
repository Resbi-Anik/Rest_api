const express = require("express");
const morgan = require('morgan')
const logger = require("./logger");
const config = require('config');
const Joi = require("joi");

const app = express();

console.log(`env: ${process.env.NODE_ENV}` );
console.log(`auto env get: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use(logger);

console.log(`server type: ${config.get('name')}`); 
console.log(`mail type: ${config.get('mail.host')}`);

if(app.get('env')==="development"){
  app.use(morgan('tiny'))
  console.log('morgan enable');
}


app.use((req, res, next) => {
  console.log("next()");
  next();
});

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
];

app.get("/", (req, res) => {
  res.send("rest api");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
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

app.put("/api/courses/:id", (req, res) => {
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

app.delete("/api/courses/:id", (req, res) => {
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

const port = process.env.PORT || 3000;
console.log("port", port);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
