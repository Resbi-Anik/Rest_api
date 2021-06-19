const express = require("express");

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
  // console.log(typeof(req.params.id));
  const course = courses.find((value) => value.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("not available");
  } else {
    res.send(course);
  }
});

app.post("/api/courses", (req, res) => {
  if (req.body.name.length < 5 || !req.body.name) {
    res.status(400).send("must present & min length 5");
    return;
  }
  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };
  
  courses.push(newCourse);
  res.send(newCourse);
});

// app.get("/api/post/:year/:month", (req, res) => {
//   res.send(req.query);
// });

const port = process.env.PORT || 3000;
console.log("port", port);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
