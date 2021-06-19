const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("rest api");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

const port = process.env.PORT || 3000
console.log('port', port);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
